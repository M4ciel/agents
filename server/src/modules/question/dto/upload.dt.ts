import { z } from "zod/v4";

export const uploadQuestionParamsSchema = z.object({
	roomId: z.string(),
});

export type UploadQuestionParams = z.infer<typeof uploadQuestionParamsSchema>;

export const uploadQuestionResponseSchema = z.object({
	id: z.string(),
	roomId: z.string(),
	transcription: z.string(),
	embeddings: z.number().array(),
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
