import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";
import { string, z } from "zod/v4";
import { desc, eq } from "drizzle-orm";

export const getQuestionsRoute: FastifyPluginCallbackZod = (app) => {
	app.get(
		"/questions/:roomId",
		{
			schema: {
				description: "Listagem das perguntas por sala",
				tags: ["questions"],
				params: z.object({
					roomId: z.string(),
				}),
				response: {
					200: z.array(
						z.object({
							id: string(),
							question: z.string(),
							answer: z.string().nullable(),
							createdAt: z.date(),
						})
					),
				},
			},
		},
		async (request) => {
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
	);
};
