import z from "zod/v4";

export const createRoomSchema = z.object({
	name: z.string().min(3, { message: "Inclua no mínimo 3 caracteres" }),
	description: z.string(),
});

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;
