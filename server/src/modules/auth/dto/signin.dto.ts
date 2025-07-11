import { z } from "zod/v4";

export const signInQueryStringSchema = z.object({
	code: z.string().min(1, "Código de autorização ausente"),
	state: z.string(),
});

export type SignInQueryString = z.infer<typeof signInQueryStringSchema>;

export const signInResponseSchema = z.object({
	accessToken: z.string(),
});

export const SignInDto = {
	schema: {
		description: "SignIn",
		tags: ["auth"],
		querystring: signInQueryStringSchema,
		response: {
			201: signInResponseSchema,
		},
	},
};
