import Image from "next/image";
import Link from "next/link";

export function AdminAuthHeader() {
	return (
		<header className="w-full shrink-0 border-b border-stroke-lightest">
			<div className="mx-auto flex h-11 w-full max-w-285 items-center px-4 min-[721px]:h-17 min-[721px]:px-8">
				<Link href="/" aria-label="두록 홈">
					<Image src="/images/logo.svg" alt="DoLog" width={48} height={20} priority />
				</Link>
			</div>
		</header>
	);
}
