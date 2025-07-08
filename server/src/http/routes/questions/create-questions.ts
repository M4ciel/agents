import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";
import { z } from "zod/v4";

export const createQuestionsRoute: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/questions/:roomId",
		{
			schema: {
				description: "Criação das questões",
				tags: ["questions"],
				params: z.object({
					roomId: z.string(),
				}),
				body: z.object({
					question: z.string().min(1),
				}),
				response: {
					201: z.object({
						id: z.string(),
						question: z.string(),
						answer: z.string().nullable(),
						createdAt: z.date(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { roomId } = request.params;
			const { question } = request.body;
			const results = await db
				.insert(schema.questions)
				.values({
					roomId,
					question,
				})
				.returning();

			const insertedQuestion = results[0];

			if (!insertedQuestion) {
				throw new Error("Failed to create new room.");
			}

			return reply.status(201).send(insertedQuestion);
		}
	);
};
