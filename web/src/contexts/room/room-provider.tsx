import { useState } from "react";
import { RoomContext } from "./room-context";

export function RoomProvider({ children }: { children: React.ReactNode }) {
	const [roomId, setRoomId] = useState<string | null>(null);

	return (
		<RoomContext.Provider value={{ roomId, setRoomId }}>
			{children}
		</RoomContext.Provider>
	);
}
