import { AuthLayout } from "@/modules/auth/components";
import { NewRoomFormComponent } from "@/modules/auth/components/new-room-form";

export function NewRoomAuth() {
	return (
		<AuthLayout>
			<NewRoomFormComponent />
		</AuthLayout>
	);
}
