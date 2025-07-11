import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft, Radio } from "lucide-react";

interface HeaderProps {
	roomId?: string;
	title: string;
	description?: string;
}

export function HeaderComponent({ roomId, title, description }: HeaderProps) {
	const navigate = useNavigate();

	return (
		<div className="mb-8">
			<div className="mb-4 flex items-center justify-between">
				<Button
					variant="outline"
					className="cursor-pointer"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft className="mr-2 size-4" />
					Voltar
				</Button>
				{roomId && (
					<Link to={`/room/${roomId}/audio`}>
						<Button
							className="flex items-center gap-2 cursor-pointer"
							variant="outline"
						>
							<Radio className="size-4" />
							Gravar Áudio
						</Button>
					</Link>
				)}
			</div>
			<h1 className="mb-2 font-bold text-3xl text-foreground">{title}</h1>
			{description && (
				<p className="text-muted-foreground">{description}</p>
			)}
		</div>
	);
}
