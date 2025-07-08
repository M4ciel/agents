import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";
import { z } from "zod/v4";
import { count, eq } from "drizzle-orm";

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
	app.get(
		"/rooms",
		{
			schema: {
				description: "Listagem das salas",
				tags: ["rooms"],
				response: {
					200: z.array(
						z.object({
							id: z.string(),
							name: z.string(),
							questionsCount: z.coerce.number(),
							createdAt: z.date(),
						})
					),
				},
			},
		},
		async () => {
			const results = await db
				.select({
					id: schema.rooms.id,
					name: schema.rooms.name,
					questionsCount: count(schema.questions.id),
					createdAt: schema.rooms.createdAt,
				})
				.from(schema.rooms)
				.leftJoin(
					schema.questions,
					eq(schema.questions.roomId, schema.rooms.id)
				)
				.groupBy(schema.rooms.id)
				.orderBy(schema.rooms.createdAt);

			return results;
		}
	);
};
