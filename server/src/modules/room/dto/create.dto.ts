import { z } from "zod/v4";

export const createRoomBodySchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
	isPublic: z.boolean(),
	userId: z.uuid(),
});

export type CreateRoomBody = z.infer<typeof createRoomBodySchema>;

export const createRoomResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	isPublic: z.boolean(),
	createdAt: z.date(),
});

export const CreateRoomDto = {
	schema: {
		description: "Criação das questões",
		tags: ["rooms"],
		body: createRoomBodySchema,
		response: {
			201: createRoomResponseSchema,
		},
	},
};
