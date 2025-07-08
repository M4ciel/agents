import { fastify } from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { roomsRoute } from "./http/routes/rooms/index.ts";
import { questionsRoute } from "./http/routes/questions/index.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
	origin: ["http://localhost:5173", "https://agents-lime.vercel.app"],
});

await app.register(fastifySwagger, {
	openapi: {
		openapi: "3.1.0",
		info: {
			title: "NLW Agents API",
			version: "1.0.0",
			description: "API construída durante a NLW da Rocketseat",
		},
		servers: [
			{
				url:
					env.NODE_ENV === "production"
						? "https://agents-server-uvvj.onrender.com"
						: `http://localhost:${env.PORT}`,
				description:
					env.NODE_ENV === "production"
						? "Render Production Server"
						: "Development server",
			},
		],
	},
	transform: jsonSchemaTransform,
});

await app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.get("/health", () => {
	return "OK";
});

app.register(roomsRoute);
app.register(questionsRoute);

await app.ready();
app.swagger();

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
	console.log(`Port: ${env.PORT}`);
	console.log("HTTP server running!");
});
