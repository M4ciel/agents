import { RoomFormComponent, RoomListComponent } from "@/modules/room";

export function CreateRoomPage() {
	return (
		<div className="min-h-screen px-4 py-8">
			<div className="mx-auto max-w-4xl">
				<div className="grid gap-8 grid-cols-2 items-start">
					<RoomFormComponent />
					<RoomListComponent />
				</div>
			</div>
		</div>
	);
}
