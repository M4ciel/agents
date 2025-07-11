import { Loader2 } from "lucide-react";

interface LoadingProps {
	message: string;
}

export function LoadingComponent({ message }: LoadingProps) {
	return (
		<div className="flex items-center space-x-2">
			<Loader2 className="size-4 animate-spin text-primary" />
			<span className="text-primary text-sm italic">{message}...</span>
		</div>
	);
}
