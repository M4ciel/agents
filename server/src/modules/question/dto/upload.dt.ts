import { z } from "zod/v4";

export const uploadQuestionParamsSchema = z.object({
	questionId: z.string(),
});

export type UploadQuestionParams = z.infer<typeof uploadQuestionParamsSchema>;

export const uploadQuestionResponseSchema = z.object({
	id: z.string(),
	questionId: z.number(),
	roomId: z.number(),
	transcription: z.string(),
	embeddings: z.array(z.number()),
	createdAt: z.date(),
});

export const UploadQuestionDto = {
	schema: {
		description: "Upload dos audios",
		tags: ["questions"],
		params: uploadQuestionParamsSchema,
		response: {
			201: uploadQuestionResponseSchema,
		},
	},
};
