import { AuthLayout, SignInFormComponent } from "@/modules/auth/components";
import { useSignIn } from "@/modules/auth/hooks/use-signin";

export function SignInAuth() {
	useSignIn();

	return (
		<AuthLayout>
			<SignInFormComponent />
		</AuthLayout>
	);
}
