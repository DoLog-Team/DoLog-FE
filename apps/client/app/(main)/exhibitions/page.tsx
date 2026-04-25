import { MOCK_EXHIBITIONS } from "../_mocks/exhibition";
import ExhibitionsClient from "./_components/ExhibitionsClient";

export default function ExhibitionsPage() {
	return <ExhibitionsClient exhibitions={MOCK_EXHIBITIONS} />;
}
