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

export function RoomListComponent() {
	const { data, isLoading } = useRoom();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Salas recentes</CardTitle>
				<CardDescription>
					Acesso rápido para as salas criadas recentemente
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				{isLoading && (
					<p className="text-muted-foreground text-sm">
						Carregando salas...
					</p>
				)}
				{data?.map((room) => (
					<Link
						key={room.id}
						to={`/room/${room.id}`}
						className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 cursor-pointer"
					>
						<div className="flex-1 flex flex-col gap-1">
							<h3 className="font-medium">{room.name}</h3>
							<div className="flex items-center gap-2">
								<Badge variant="secondary" className="text-xs">
									{dayjs(room.createdAt).toNow()}
								</Badge>
								<Badge variant="secondary" className="text-xs">
									{room.questionsCount} pergunta(s)
								</Badge>
							</div>
						</div>

						<span className="flex items-center gap-1 text-sm">
							Entrar
							<ArrowRight className="size-3" />
						</span>
					</Link>
				))}
			</CardContent>
		</Card>
	);
}
