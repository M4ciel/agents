import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useSignIn } from "../hooks/use-signin";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { LoadingComponent } from "@/components/loading";
import { GoogleIcon } from "@/components/google-icon";
import { API_URL } from "@/lib/utils";

export function SignInFormComponent() {
	// const { signInForm, handleSignIn, isLoading } = useSignIn();

	return (
		<>
			<Button
				variant="outline"
				className="w-full flex items-center gap-2  border-zinc-300"
				onClick={() => {
					window.location.href = `${API_URL}/auth/google`;
				}}
			>
				<GoogleIcon />
				<p className="text-base font-medium">
					Faça login com Google
				</p>
			</Button>

			{/* <div className="flex items-center gap-4 text-zinc-400 w-full">
				<Separator className="flex-1" />
				<span className="text-sm whitespace-nowrap">
					ou entre em uma sala
				</span>
				<Separator className="flex-1" />
			</div>

			{isLoading ? (
				<LoadingComponent message="Buscando sala..." />
			) : (
				<Form {...signInForm}>
					<form
						onSubmit={signInForm.handleSubmit(handleSignIn)}
						className="w-full space-y-4"
					>
						<FormField
							control={signInForm.control}
							name="roomCode"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											{...field}
											placeholder="Digite o código da sala"
											className="w-full"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="w-full text-zinc-100 cursor-pointer">
							<LogIn />
							Entrar na sala
						</Button>
					</form>
				</Form>
			)} */}
		</>
	);
}
