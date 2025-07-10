import { type FastifyReply, type FastifyRequest } from "fastify";

import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { and, desc, eq, sql } from "drizzle-orm";

import {
	type CreateQuestionBody,
	type CreateQuestionParams,
} from "./dto/create.dto.ts";
import { type GetQuestionParams } from "./dto/get.dto.ts";
import { type UploadQuestionParams } from "./dto/upload.dt.ts";
import { GeminiService } from "../gemini/gemini.service.ts";
import { vector } from "drizzle-orm/pg-core";

export class QuestionService {
	private readonly geminiService: GeminiService;
	constructor(geminiService: GeminiService) {
		this.geminiService = geminiService;
	}

	public async create(
		request: FastifyRequest<{
			Params: CreateQuestionParams;
			Body: CreateQuestionBody;
		}>,
		reply: FastifyReply
	) {
		const { roomId } = request.params;
		const { question } = request.body;

		const embeddings = await this.geminiService.generateEmbeddings(
			question
		);
		const embeddingsAsString = `[${embeddings.join(",")}]`;

		const chunks = await db
			.select({
				id: schema.audioChunks.id,
				transcription: schema.audioChunks.transcription,
				similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
			})
			.from(schema.audioChunks)
			.where(
				and(
					eq(schema.audioChunks.roomId, roomId),
					sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > 0.7`
				)
			)
			.orderBy(
				sql`${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector`
			)
			.limit(3);

		let answer: string | null = null;

		if (chunks.length > 0) {
			const transcription = chunks.map((chunk) => chunk.transcription);

			answer = await this.geminiService.generateAnswer(
				question,
				transcription
			);
		}

		const results = await db
			.insert(schema.questions)
			.values({
				roomId,
				question,
				answer,
			})
			.returning();

		const insertedQuestion = results[0];

		if (!insertedQuestion) {
			throw new Error("Failed to create new room.");
		}

		return reply.status(201).send(insertedQuestion);
	}

	public async get(
		request: FastifyRequest<{
			Params: GetQuestionParams;
		}>
	) {
		const { roomId } = request.params;

		const result = await db
			.select({
				id: schema.questions.id,
				question: schema.questions.question,
				answer: schema.questions.answer,
				createdAt: schema.questions.createdAt,
			})
			.from(schema.questions)
			.where(eq(schema.questions.roomId, roomId))
			.orderBy(desc(schema.questions.createdAt));

		return result;
	}

	public async upload(
		request: FastifyRequest<{
			Params: UploadQuestionParams;
		}>,
		reply: FastifyReply
	) {
		const { questionId } = request.params;

		const question = await db
			.select({
				roomId: schema.questions.roomId,
			})
			.from(schema.questions)
			.where(eq(schema.questions.id, questionId));

		if (!question) {
			throw new Error("Question not found");
		}

		const roomId = question[0].roomId;

		const audio = await request.file();

		if (!audio) {
			throw new Error("Audio is required");
		}

		const audioBuffer = await audio.toBuffer();
		const audioAsBase64 = audioBuffer.toString("base64");

		const transcription = await this.geminiService.transcribeAudio(
			audioAsBase64,
			audio.mimetype
		);
		const embeddings = await this.geminiService.generateEmbeddings(
			transcription
		);

		const result = await db
			.insert(schema.audioChunks)
			.values({
				roomId,
				questionId,
				transcription,
				embeddings,
			})
			.returning();

		const chunk = result[0];

		if (!chunk) {
			throw new Error("Erro ao salvar chunk de áudio.");
		}

		return reply.status(201).send(chunk);
	}
}
