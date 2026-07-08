import { getExhibitions } from "@/lib/api/exhibition";
import { MOCK_EXHIBITIONS } from "../_mocks/exhibition";
import ExhibitionsClient from "./_components/ExhibitionsClient";

export default async function ExhibitionsPage() {
	const exhibitions = await getExhibitions();
	// TODO: 배포 전 mock 제거
	const displayExhibitions = exhibitions.length > 0 ? exhibitions : MOCK_EXHIBITIONS;

	return <ExhibitionsClient exhibitions={displayExhibitions} />;
}
