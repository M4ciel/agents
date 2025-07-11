import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.ts";

export const rooms = pgTable("rooms", {
	id: uuid().primaryKey().defaultRandom(),
	userId: uuid()
		.references(() => users.id)
		.notNull(),
	name: text().notNull(),
	description: text(),
	isPublic: boolean().default(true),
	createdAt: timestamp().defaultNow().notNull(),
});
