import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { getQuestionsRoute } from "./get-questions.ts";
import { createQuestionsRoute } from "./create-questions.ts";

export const questionsRoute: FastifyPluginCallbackZod = (app) => {
	app.register(getQuestionsRoute);
	app.register(createQuestionsRoute);
};
