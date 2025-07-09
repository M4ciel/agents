import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export function NewRoomFormComponent() {
	return (
		<>
			<h3 className="text-2xl font-bold text-primary">
				Crie uma nova sala
			</h3>

			<Input placeholder="Nome da sala" className="w-full" />
			<Button className="w-full bg-violet-500 hover:bg-violet-600 text-zinc-100 cursor-pointer">
				Criar sala
			</Button>
			<p className="text-sm text-zinc-400 dark:text-zinc-600">
				Quer entrar em uma sala já existente?{" "}
				<Link
					to="/signin"
					className="underline cursor-pointer text-pink-500"
				>
					Clique aqui
				</Link>
			</p>
		</>
	);
}
