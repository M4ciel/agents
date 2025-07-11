import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { AuthService } from "./auth.service.ts";
import { AuthController } from "./auth.controller.ts";

export const AuthModule: FastifyPluginCallbackZod = (app) => {
	const service = new AuthService(app);
	const controller = new AuthController(service);

	controller.registerRoutes(app);
};
