import { z } from "zod/v4";

export const signInSchema = z.object({
	roomCode: z
		.uuid({
			error: "Não é um código válido",
		})
		.min(1, "Código da sala é obrigatório"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
