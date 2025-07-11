import { RoomFormComponent, RoomListComponent } from "@/modules/room";
import { RoomLayout } from "./_layout";
import { ValidateRoom } from "@/modules/room/components/validate-room";

export function CreateRoomPage() {
	return (
		<RoomLayout>
			<div className="grid gap-8 grid-cols-2 items-start">
				<RoomFormComponent />
				<div className="flex flex-col gap-4">
					<ValidateRoom />
					<RoomListComponent isPublic/>
					<RoomListComponent />
				</div>
			</div>
		</RoomLayout>
	);
}
