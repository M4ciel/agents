import { z } from "zod/v4";

export const getUserQueryStringSchema = z.object({
	code: z.string().min(1, "Código de autorização ausente"),
});

export type GetUserQueryString = z.infer<typeof getUserQueryStringSchema>;

export const GetUserResponseSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	avatar_url: z.string(),
	createdAt: z.date(),
});

export const GetUserDto = {
	schema: {
		description: "SignIn",
		tags: ["auth"],
		querystring: getUserQueryStringSchema,
		response: {
			201: GetUserResponseSchema,
		},
	},
};
