import type { Metadata } from "next";
import { getMyExhibitionId } from "@/lib/api/account";
import { getExhibitionSettings } from "./_api/getExhibitionSettings";
import { ExhibitionSettingsForm } from "./_components/ExhibitionSettingsForm";

export const metadata: Metadata = {
	title: "전시 관리 | 두록",
	robots: { index: false, follow: false },
};

export default async function AdminExhibitionsPage() {
	const exhibitionId = await getMyExhibitionId();
	const settings = await getExhibitionSettings(exhibitionId);

	return <ExhibitionSettingsForm exhibitionId={exhibitionId} initialSettings={settings} />;
}
