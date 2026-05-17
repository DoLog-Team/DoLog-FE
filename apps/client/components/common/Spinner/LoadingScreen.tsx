import { Spinner } from "./Spinner";

interface LoadingScreenProps {
	color?: string;
}

export function LoadingScreen({ color }: LoadingScreenProps) {
	return (
		<div className="flex flex-1 items-center justify-center min-h-screen">
			<Spinner color={color} />
		</div>
	);
}
