import { type FastifyInstance } from "fastify";
import { QuestionService } from "./question.service.ts";
import { CreateQuestionDto } from "./dto/create.dto.ts";
import { GetQuestionDto } from "./dto/get.dto.ts";
import { UploadQuestionDto } from "./dto/upload.dt.ts";

export class QuestionController {
	private readonly questionService: QuestionService;
	constructor(questionService: QuestionService) {
		this.questionService = questionService;
	}

	public registerRoutes(app: FastifyInstance) {
		app.post(
			"/questions/:roomId",
			CreateQuestionDto,
			this.questionService.create.bind(this.questionService)
		);

		app.get(
			"/questions/:roomId",
			GetQuestionDto,
			this.questionService.get.bind(this.questionService)
		);

		app.post(
			"/questions/:roomId/audio",
			UploadQuestionDto,
			this.questionService.upload.bind(this.questionService)
		);
	}
}
