import { useAuthContext } from "@/contexts/auth/auth-context";
import { useRoomContext } from "@/contexts/room/room-context";

export function useNavbar() {
	const { roomId } = useRoomContext();
	const { signOut, user } = useAuthContext();

	return { user, roomId, signOut };
}
