import { z } from "zod/v4";

export const getQuestionParamsSchema = z.object({
	roomId: z.string(),
});

export type GetQuestionParams = z.infer<typeof getQuestionParamsSchema>;

export const getQuestionResponseSchema = z.array(
	z.object({
		id: z.string(),
		question: z.string(),
		answer: z.string().nullable(),
		createdAt: z.date(),
	})
);

export const GetQuestionDto = {
	schema: {
		description: "Listagem das perguntas por sala",
		tags: ["questions"],
		params: getQuestionParamsSchema,
		response: {
			200: getQuestionResponseSchema,
		},
	},
};
