import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/google-icon";
import { API_URL } from "@/lib/utils";

export function SignInFormComponent() {
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
				<p className="text-base font-medium">Faça login com Google</p>
			</Button>
		</>
	);
}
