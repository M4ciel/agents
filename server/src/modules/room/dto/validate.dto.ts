import { z } from "zod/v4";

export const validateRoomBodySchema = z.object({
	roomCode: z.string(),
});

export type ValidateRoomBody = z.infer<typeof validateRoomBodySchema>;

export const validateRoomResponseSchema = z.object({
	roomId: z.string(),
	isValid: z.boolean(),
});

export const ValidateRoomDto = {
	schema: {
		description: "Valida o código da sala",
		tags: ["rooms"],
		body: validateRoomBodySchema,
		response: {
			201: validateRoomResponseSchema,
		},
	},
};
