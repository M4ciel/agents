import { Link } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { dayjs } from "@/lib/dayjs";
import { ArrowRight } from "lucide-react";
import { useRoom } from "@/modules/room/hooks/use-room";
import { useRoomContext } from "@/contexts/room/room-context";
import { RoomPagination } from "./room-pagination";

interface RoomListProps {
	isPublic?: boolean;
}

export function RoomListComponent({ isPublic = false }: RoomListProps) {
	const { data, isLoading, page, setPage } = useRoom(isPublic);
	const { setRoomId } = useRoomContext();

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					Salas {isPublic ? "públicas" : "privadas"}
				</CardTitle>
				<CardDescription>
					Acesso rápido para as salas{" "}
					{isPublic ? "públicas" : "privadas"}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				{isLoading && (
					<p className="text-muted-foreground text-sm">
						Carregando salas...
					</p>
				)}

				{!isLoading && (!data || data?.data.length === 0) && (
					<p className="text-muted-foreground text-sm">
						Nenhuma sala disponível no momento
					</p>
				)}
				{data && (
					<>
						{data?.data.map((room) => (
							<Link
								key={room.id}
								to={`/room/${room.id}`}
								onClick={() => setRoomId(room.id)}
								className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 cursor-pointer"
							>
								<div className="flex-1 flex flex-col gap-1">
									<h3 className="font-medium">{room.name}</h3>
									<div className="flex items-center gap-2">
										<Badge
											variant="outline"
											className="text-xs"
										>
											{dayjs(room.createdAt).toNow()}
										</Badge>
										<Badge
											variant="default"
											className="text-xs"
										>
											{room.questionsCount} pergunta(s)
										</Badge>
									</div>
								</div>

								<span className="flex items-center gap-1 text-sm text-secondary">
									Entrar
									<ArrowRight className="size-3" />
								</span>
							</Link>
						))}
						<RoomPagination
							page={page}
							totalPages={data!.info.totalPages}
							onPageChange={setPage}
						/>
					</>
				)}
			</CardContent>
		</Card>
	);
}
