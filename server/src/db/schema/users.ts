import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid().primaryKey().defaultRandom(),
	name: text(),
	email: text().notNull().unique(),
	avatar_url: text(),
	google_access_token: text().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
});
