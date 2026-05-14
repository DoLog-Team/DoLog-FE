export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	if (!lat || !lng) {
		return new Response("lat, lng 파라미터가 필요합니다", { status: 400 });
	}

	const url = new URL("https://maps.apigw.ntruss.com/map-static/v2/raster");
	url.searchParams.set("w", "600");
	url.searchParams.set("h", "338");
	url.searchParams.set("center", `${lng},${lat}`);
	url.searchParams.set("level", "16");
	url.searchParams.set("markers", `type:d|size:mid|pos:${lng} ${lat}`);
	url.searchParams.set("scale", "2");

	const res = await fetch(url.toString(), {
		headers: {
			"X-NCP-APIGW-API-KEY-ID": process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID!,
			"X-NCP-APIGW-API-KEY": process.env.NAVER_MAP_CLIENT_SECRET!,
		},
	});

	if (!res.ok) {
		const body = await res.text();
		console.error("[map-image] status:", res.status);
		console.error("[map-image] body:", body);
		console.error("[map-image] KEY-ID:", process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID);
		console.error("[map-image] SECRET length:", process.env.NAVER_MAP_CLIENT_SECRET?.length);
		return new Response("지도 이미지를 불러오지 못했습니다", { status: res.status });
	}

	return new Response(res.body, {
		headers: { "Content-Type": res.headers.get("Content-Type") ?? "image/png" },
	});
}
