import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../../db/connection.ts";
import { schema } from "../../../db/schema/index.ts";
import { z } from "zod/v4";

export const createRoomsRoute: FastifyPluginCallbackZod = (app) => {
	app.post(
		"/rooms",
		{
			schema: {
				description: "Criação das salas",
				tags: ["rooms"],
				response: {
					201: z.object({
						id: z.string(),
						name: z.string(),
						description: z.string().nullable(),
						createdAt: z.date(),
					}),
				},
				body: z.object({
					name: z.string().min(1),
					description: z.string().optional(),
				}),
			},
		},
		async (request, reply) => {
			const { name, description } = request.body;
			const results = await db
				.insert(schema.rooms)
				.values({
					name,
					description,
				})
				.returning();

			const insertedRoom = results[0];

			if (!insertedRoom) {
				throw new Error("Failed to create new room.");
			}

			return reply.status(201).send(insertedRoom);
		}
	);
};
