import { type FastifyReply, type FastifyRequest } from "fastify";
import { type CreateRoomBody } from "./dto/create.dto.ts";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { count, eq } from "drizzle-orm";

export class RoomService {
	public async create(
		request: FastifyRequest<{
			Body: CreateRoomBody;
		}>,
		reply: FastifyReply
	) {
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

	public async get() {
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
}
