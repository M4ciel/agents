import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	NODE_ENV: z.string().default("development"),
	DATABASE_URL: z.string().url().startsWith("postgresql://"),
	GEMINI_API_KEY: z.string(),
	JWT_SECRET: z.string().default("supersecret"),
	GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID é obrigatório"),
	GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET é obrigatório"),
});

export const env = envSchema.parse(process.env);
