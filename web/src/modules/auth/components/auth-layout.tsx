import { AuthBannerComponent } from "./auth-banner";
import Logo from "@/assets/logo.svg?react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 grid grid-cols-2">
			<AuthBannerComponent />
			<div className="flex items-center justify-center">
				<div className="w-full max-w-sm flex flex-col items-center gap-6 px-8">
					<Logo />
					{children}
				</div>
			</div>
		</div>
	);
}
