import { env } from "../../env.ts";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { eq } from "drizzle-orm";

import {
	type FastifyInstance,
	type FastifyReply,
	type FastifyRequest,
} from "fastify";
import { type OAuth2Namespace } from "@fastify/oauth2";
import { type SignInQueryString } from "./dto/signin.dto.ts";
import { type GetUserQueryString } from "./dto/get-user.dto.ts";

interface GoogleUserInfo {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
}

type FastifyWithGoogleOAuth = FastifyInstance & {
	googleOAuth2: OAuth2Namespace;
};

export class AuthService {
	private readonly app: FastifyWithGoogleOAuth;

	constructor(app: FastifyInstance) {
		this.app = app as FastifyWithGoogleOAuth;
	}

	public async signinWithGoogle(
		request: FastifyRequest<{
			Querystring: SignInQueryString;
		}>,
		reply: FastifyReply
	) {
		try {
			const token =
				await this.app.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
					request
				);

			const response = await fetch(
				"https://www.googleapis.com/oauth2/v2/userinfo",
				{
					headers: {
						Authorization: `Bearer ${token.token.access_token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				const error = await response.text(); // você pode logar isso
				return reply.status(400).send({
					message: "Erro ao buscar perfil do Google",
					error,
				});
			}

			const userInfo = (await response.json()) as GoogleUserInfo;
			const user = { id: userInfo.id, email: userInfo.email };

			const accessToken = await reply.jwtSign(
				{ sub: user.id },
				{ expiresIn: "15m" }
			);

			const refreshToken = await reply.jwtSign(
				{ sub: user.id },
				{ expiresIn: "7d" }
			);

			reply.setCookie("refreshToken", refreshToken, {
				path: "/",
				httpOnly: true,
				sameSite: "lax",
				secure: env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 7, // 7 dias
			});

			const localUser = await db
				.select({ id: schema.users.id })
				.from(schema.users)
				.where(eq(schema.users.email, userInfo.email));

			if (!localUser[0]) {
				await db.insert(schema.users).values({
					name: userInfo.name,
					email: userInfo.email,
					avatar_url: userInfo.picture,
					google_access_token: accessToken,
				});
			} else {
				await db
					.update(schema.users)
					.set({
						google_access_token: accessToken,
						avatar_url: userInfo.picture,
						name: userInfo.name,
					})
					.where(eq(schema.users.email, userInfo.email));
			}

			return reply.redirect(
				`http://localhost:5173/signin?token=${accessToken}`
			);
		} catch (error) {
			return reply
				.status(500)
				.send({ message: "Erro no login", erro: error });
		}
	}

	public async getUser(
		request: FastifyRequest<{
			Querystring: GetUserQueryString;
		}>,
		reply: FastifyReply
	) {
		const { code } = request.query;

		const user = await db
			.select({
				id: schema.users.id,
				name: schema.users.name,
				email: schema.users.email,
				avatar_url: schema.users.avatar_url,
				createdAt: schema.users.createdAt,
			})
			.from(schema.users)
			.where(eq(schema.users.google_access_token, code));

		const uniqueUser = user[0];

		if (!uniqueUser) {
			throw new Error("Usuário não encontrado");
		}

		return reply.status(200).send({
			id: uniqueUser.id,
			name: uniqueUser.name,
			email: uniqueUser.email,
			avatar_url: uniqueUser.avatar_url,
			createAt: uniqueUser.createdAt,
		});
	}
}
