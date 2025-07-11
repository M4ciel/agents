import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

const seedSchema = {
	users: schema.users,
	rooms: schema.rooms,
	questions: schema.questions,
};

await reset(db, seedSchema);
await seed(db, seedSchema).refine((f) => {
	return {
		users: {
			count: 3,
			columns: {
				name: f.fullName(),
				email: f.email(),
				google_access_token: f.uuid(),
			},
		},
		rooms: {
			count: 20,
			columns: {
				name: f.companyName(),
				description: f.loremIpsum(),
				isPublic: f.boolean(),
			},
		},
		questions: {
			count: 20,
			columns: {
				question: f.loremIpsum(),
			},
		},
	};
});

await sql.end();
