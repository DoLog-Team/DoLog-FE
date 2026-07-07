export function resolveSnsHref(platformName: string, url: string): string | null {
	const isInstagram = platformName.toLowerCase() === "instagram" || platformName === "인스타그램";
	const isUrl = url.startsWith("http://") || url.startsWith("https://");

	if (isInstagram) {
		return `https://instagram.com/${url.startsWith("@") ? url.slice(1) : url}/`;
	}
	if (isUrl) return url;
	return null;
}
