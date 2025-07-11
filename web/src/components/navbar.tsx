import Logo from "@/assets/logo.svg?react";
import { Copy } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavbar } from "@/hooks/use-navbar";

export function NavbarComponent() {
	const { roomId, signOut, user } = useNavbar();

	return (
		<header className="flex w-full h-20 shadow">
			<div className="mx-auto w-4xl flex items-center justify-between">
				<Logo />
				<div className="flex gap-3">
					<ModeToggle />
					{roomId && (
						<>
							<div className="flex items-stretch overflow-hidden rounded-xl border border-primary">
								<button
									onClick={() =>
										navigator.clipboard.writeText(roomId)
									}
									className="bg-primary px-3 flex items-center justify-center cursor-pointer"
								>
									<Copy className="size-4 text-white" />
								</button>
								<p className="px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
									Sala #{roomId}
								</p>
							</div>
						</>
					)}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar className="cursor-pointer">
								<AvatarImage src={user?.avatar_url} />
								<AvatarFallback>
									{user?.name?.[0] ?? "?"}
								</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={() => signOut()}>
								Sair
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
