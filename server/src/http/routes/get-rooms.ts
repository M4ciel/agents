import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { z } from "zod";

const roomSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
	app.get(
		"/rooms",
		{
			schema: {
				description: "Listagem das salas",
				tags: ["rooms"],
				response: {
					200: z.array(roomSchema),
				},
			},
		},
		async () => {
			const results = await db
				.select({
					id: schema.rooms.id,
					name: schema.rooms.name,
				})
				.from(schema.rooms)
				.orderBy(schema.rooms.createdAt);

			return results;
		}
	);
};
