import { z } from "zod/v4";

export const createQuestionParamsSchema = z.object({
	roomId: z.string(),
});

export type CreateQuestionParams = z.infer<typeof createQuestionParamsSchema>;

export const createQuestionBodySchema = z.object({
	question: z.string().min(1),
});

export type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>;

export const createQuestionResponseSchema = z.object({
	id: z.string(),
	question: z.string(),
	answer: z.string().nullable(),
	createdAt: z.date(),
});

export const CreateQuestionDto = {
	schema: {
		description: "Criação das questões",
		tags: ["questions"],
		params: createQuestionParamsSchema,
		body: createQuestionBodySchema,
		response: {
			201: createQuestionResponseSchema,
		},
	},
};
