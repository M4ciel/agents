import { createContext, useContext } from "react";

type RoomContextType = {
	roomId: string | null;
	setRoomId: (id: string | null) => void;
};

export const RoomContext = createContext<RoomContextType | null>(null);

export function useRoomContext() {
	const context = useContext(RoomContext);
	if (!context) {
		throw new Error("useRoomContext must be used within RoomProvider");
	}

	return context;
}
