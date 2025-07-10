import { z } from "zod/v4";

export const createRoomBodySchema = z.object({
	name: z.string().min(1),
	description: z.string().optional(),
});

export type CreateRoomBody = z.infer<typeof createRoomBodySchema>;

export const createRoomResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
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
