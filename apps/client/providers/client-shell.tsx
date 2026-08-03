import { GoogleAnalytics } from "@next/third-parties/google";
import { AmplitudeProvider } from "@/providers/amplitude-provider";

export function ClientShell({ children }: { children: React.ReactNode }) {
	return (
		<>
			{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
				<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
			)}
			<AmplitudeProvider>
				<main
					className="
					w-full
					min-h-dvh
					relative
					flex flex-col
					"
				>
					{children}
				</main>
			</AmplitudeProvider>
		</>
	);
}
