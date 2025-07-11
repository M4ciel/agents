import { type FastifyReply, type FastifyRequest } from "fastify";
import { type CreateRoomBody } from "./dto/create.dto.ts";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { and, count, eq, or } from "drizzle-orm";
import { type ValidateRoomBody } from "./dto/validate.dto.ts";
import {
	type GetRoomQueryString,
	type GetRoomParams,
	getRoomQueryStringSchema,
} from "./dto/get.dto.ts";

export class RoomService {
	public async create(
		request: FastifyRequest<{
			Body: CreateRoomBody;
		}>,
		reply: FastifyReply
	) {
		const { name, description, isPublic, userId } = request.body;
		const results = await db
			.insert(schema.rooms)
			.values({
				name,
				description,
				isPublic,
				userId,
			})
			.returning();

		const insertedRoom = results[0];

		if (!insertedRoom) {
			throw new Error("Failed to create new room.");
		}

		return reply.status(201).send(insertedRoom);
	}

	public async get(
		request: FastifyRequest<{
			Params: GetRoomParams;
			Querystring: GetRoomQueryString;
		}>,
		reply: FastifyReply
	) {
		const { userId } = request.params;
		const { page, isPublic } = request.query;

		const itemsPerPage = 3;
		const condition =
			isPublic === "true"
				? eq(schema.rooms.isPublic, true)
				: and(
						eq(schema.rooms.userId, userId),
						eq(schema.rooms.isPublic, false)
				  );

		const [{ total }] = await db
			.select({ total: count(schema.rooms.id).as("total") })
			.from(schema.rooms)
			.where(condition);

		const results = await db
			.select({
				id: schema.rooms.id,
				name: schema.rooms.name,
				questionsCount: count(schema.questions.id),
				isPublic: schema.rooms.isPublic,
				createdAt: schema.rooms.createdAt,
			})
			.from(schema.rooms)
			.leftJoin(
				schema.questions,
				eq(schema.questions.roomId, schema.rooms.id)
			)
			.where(condition)
			.groupBy(schema.rooms.id)
			.orderBy(schema.rooms.createdAt)
			.limit(itemsPerPage)
			.offset(itemsPerPage * (page - 1));

		return reply.status(200).send({
			info: {
				page,
				itemsPerPage,
				totalPages: Math.ceil(Number(total) / itemsPerPage),
			},
			data: results,
		});
	}

	public async validate(
		request: FastifyRequest<{
			Body: ValidateRoomBody;
		}>,
		reply: FastifyReply
	) {
		const { roomCode } = request.body;
		const results = await db
			.select({
				id: schema.rooms.id,
			})
			.from(schema.rooms)
			.where(eq(schema.rooms.id, roomCode));

		return reply.status(201).send({
			roomId: roomCode,
			isValid: results.length > 0,
		});
	}
}
