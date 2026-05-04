import { getExhibitions } from "@/lib/api/exhibition";
import { MOCK_EXHIBITIONS } from "../_mocks/exhibition";
import ExhibitionsClient from "./_components/ExhibitionsClient";

export default async function ExhibitionsPage() {
	const baseURL = process.env.NEXT_PUBLIC_API_URL;
	const exhibitions = baseURL ? await getExhibitions(baseURL) : MOCK_EXHIBITIONS;

	return <ExhibitionsClient exhibitions={exhibitions} />;
}
