import { NavbarComponent } from "@/components/navbar";
import { useRoomContext } from "@/contexts/room/room-context";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface RoomLayoutProps {
	children: React.ReactNode;
	className?: string;
}

export function RoomLayout({ children, className }: RoomLayoutProps) {
	const { setRoomId } = useRoomContext();
	const { pathname } = useLocation();

	useEffect(() => {
		if (!pathname.includes("/room/")) {
			setRoomId(null);
		}
	}, [pathname]);

	return (
		<div className="min-h-screen flex flex-col">
			<NavbarComponent />
			<main
				className={`flex-1 flex flex-col container mx-auto max-w-4xl px-4 py-8 ${className}`}
			>
				{children}
			</main>
		</div>
	);
}
