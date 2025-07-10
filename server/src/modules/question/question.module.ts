import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { QuestionController } from "./question.controller.ts";
import { QuestionService } from "./question.service.ts";
import { GeminiService } from "../gemini/gemini.service.ts";

export const QuestionModule: FastifyPluginCallbackZod = (app) => {
	const gemini = new GeminiService();
	const service = new QuestionService(gemini);
	const controller = new QuestionController(service);

	controller.registerRoutes(app);
};
