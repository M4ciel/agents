import z from "zod/v4";

export const validateRoomSchema = z.object({
	roomCode: z.string().min(36, {
		error: "Código inválido!",
	}),
});

export type ValidateRoomFormData = z.infer<typeof validateRoomSchema>;
