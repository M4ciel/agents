import { z } from "zod/v4";

export const getRoomQueryStringSchema = z.object({
	page: z.coerce.number().optional().default(1),
	isPublic: z.string(),
});

export type GetRoomQueryString = z.infer<typeof getRoomQueryStringSchema>;

export const getRoomParamsSchema = z.object({
	userId: z.string(),
});

export type GetRoomParams = z.infer<typeof getRoomParamsSchema>;

export const getRoomResponseSchema = z.object({
	info: z.object({
		page: z.number(),
		itemsPerPage: z.number(),
		totalPages: z.number(),
	}),
	data: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			questionsCount: z.coerce.number(),
			isPublic: z.boolean(),
			createdAt: z.date(),
		})
	),
});

export const GetRoomDto = {
	schema: {
		description: "Criação das questões",
		tags: ["rooms"],
		querystring: getRoomQueryStringSchema,
		params: getRoomParamsSchema,
		response: {
			200: getRoomResponseSchema,
		},
	},
};
