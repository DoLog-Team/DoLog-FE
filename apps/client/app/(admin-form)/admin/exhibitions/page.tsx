import type { Metadata } from "next";
import { ExhibitionSettingsForm } from "./_components/ExhibitionSettingsForm";

export const metadata: Metadata = {
	title: "전시 관리 | 두록",
	robots: { index: false, follow: false },
};

export default function AdminExhibitionsPage() {
	return <ExhibitionSettingsForm />;
}
