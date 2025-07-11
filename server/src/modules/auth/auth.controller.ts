import { type FastifyInstance } from "fastify";
import { type AuthService } from "./auth.service.ts";
import { SignInDto } from "./dto/signin.dto.ts";
import { GetUserDto } from "./dto/get-user.dto.ts";

export class AuthController {
	private readonly authService: AuthService;

	constructor(authService: AuthService) {
		this.authService = authService;
	}

	public registerRoutes(app: FastifyInstance) {
		app.get(
			"/auth/google/callback",
			SignInDto,
			this.authService.signinWithGoogle.bind(this.authService)
		);

		app.get(
			"/user",
			GetUserDto,
			this.authService.getUser.bind(this.authService)
		);
	}
}
