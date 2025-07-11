import { AuthLayout, SignInFormComponent } from "@/modules/auth/components";
import { useSignIn } from "@/modules/auth/hooks/use-signin";

export function SignInAuth() {
	const { isBackendOnline } = useSignIn();

	if (!isBackendOnline) {
		return (
			<AuthLayout>
				<div className="flex-1 flex flex-col items-center justify-center text-center">
					<h1 className="text-2xl font-bold text-primary">
						Erro de conexão
					</h1>
					<p className="mt-2 text-zinc-600">
						Não foi possível conectar ao servidor. Tente novamente
						mais tarde.
					</p>
				</div>
			</AuthLayout>
		);
	}

	return (
		<AuthLayout>
			<SignInFormComponent />
		</AuthLayout>
	);
}
