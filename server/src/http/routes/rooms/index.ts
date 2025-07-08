import { createRoomsRoute } from "./create-rooms.ts";
import { getRoomsRoute } from "./get-rooms.ts";
import { type FastifyPluginCallbackZod } from "fastify-type-provider-zod";

export const roomsRoute: FastifyPluginCallbackZod = (app) => {
	app.register(getRoomsRoute);
	app.register(createRoomsRoute);
};
