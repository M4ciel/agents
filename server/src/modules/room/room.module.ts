import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { RoomService } from "./room.service.ts";
import { RoomController } from "./room.controller.ts";

export const RoomModule: FastifyPluginCallbackZod = (app) => {
	const service = new RoomService();
	const controller = new RoomController(service);

	controller.registerRoutes(app);
};
