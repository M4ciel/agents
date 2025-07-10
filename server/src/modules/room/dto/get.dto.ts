import { z } from "zod/v4";

export const getRoomResponseSchema = z.array(
	z.object({
		id: z.string(),
		name: z.string(),
		questionsCount: z.coerce.number(),
		createdAt: z.date(),
	})
);

export const GetRoomDto = {
	schema: {
		description: "Criação das questões",
		tags: ["rooms"],
		response: {
			200: getRoomResponseSchema,
		},
	},
};
