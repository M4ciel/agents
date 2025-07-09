import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function SignInFormComponent() {
	return (
		<>
			<Button
				variant="outline"
				className="w-full gap-2 text-base font-medium border-zinc-300"
			>
				{/* <g size={20} /> */}
				Crie sua sala com o Google
			</Button>

			<div className="flex items-center gap-4 text-zinc-400 w-full">
				<Separator className="flex-1" />
				<span className="text-sm whitespace-nowrap">
					ou entre em uma sala
				</span>
				<Separator className="flex-1" />
			</div>

			<Input placeholder="Digite o código da sala" className="w-full" />
			<Button className="w-full bg-violet-500 hover:bg-violet-600 text-zinc-100 cursor-pointer">
				<LogIn />
				Entrar na sala
			</Button>
		</>
	);
}
