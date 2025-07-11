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
import fastifyMultipart from "@fastify/multipart";
import { QuestionModule } from "./modules/question/question.module.ts";
import { RoomModule } from "./modules/room/room.module.ts";
import { AuthModule } from "./modules/auth/auth.module.ts";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { fastifyOauth2 } from "@fastify/oauth2";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, {
	origin: ["http://localhost:5173", "https://agents-lime.vercel.app"],
	credentials: true,
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
app.register(fastifyMultipart);
app.register(fastifyCookie);
app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: "refreshToken",
		signed: false,
	},
	sign: {
		expiresIn: "15m",
	},
});
app.register(fastifyOauth2, {
	name: "googleOAuth2",
	scope: ["profile", "email"],
	credentials: {
		client: {
			id: env.GOOGLE_CLIENT_ID,
			secret: env.GOOGLE_CLIENT_SECRET,
		},
		auth: fastifyOauth2.GOOGLE_CONFIGURATION,
	},
	startRedirectPath: "/auth/google",
	callbackUri: "http://localhost:3333/auth/google/callback",
});

app.get("/health", () => {
	return "OK";
});

app.register(AuthModule);
app.register(RoomModule);
app.register(QuestionModule);

await app.ready();
app.swagger();

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
	console.log(`Port: ${env.PORT}`);
	console.log("HTTP server running!");
});
