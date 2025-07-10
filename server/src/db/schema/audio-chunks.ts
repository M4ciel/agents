import { pgTable, text, timestamp, uuid, vector } from "drizzle-orm/pg-core";
import { rooms } from "./rooms.ts";
import { questions } from "./questions.ts";

export const audioChunks = pgTable("audio_chunks", {
	id: uuid().primaryKey().defaultRandom(),
	roomId: uuid()
		.references(() => rooms.id)
		.notNull(),
	questionId: uuid()
		.references(() => questions.id)
		.notNull(),
	transcription: text().notNull(),
	embeddings: vector({ dimensions: 768 }).notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});
