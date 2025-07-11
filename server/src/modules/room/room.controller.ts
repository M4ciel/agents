import { type FastifyInstance } from "fastify";
import { RoomService } from "./room.service.ts";
import { CreateRoomDto } from "./dto/create.dto.ts";
import { GetRoomDto } from "./dto/get.dto.ts";
import { ValidateRoomDto } from "./dto/validate.dto.ts";

export class RoomController {
	private readonly roomService: RoomService;

	constructor(roomService: RoomService) {
		this.roomService = roomService;
	}

	public registerRoutes(app: FastifyInstance) {
		app.post(
			"/rooms",
			CreateRoomDto,
			this.roomService.create.bind(this.roomService)
		);

		app.get(
			"/rooms/:userId",
			GetRoomDto,
			this.roomService.get.bind(this.roomService)
		);

		app.post(
			"/rooms/validate",
			ValidateRoomDto,
			this.roomService.validate.bind(this.roomService)
		);
	}
}
