import ExhibitionsClient from "./_components/ExhibitionsClient";
import { MOCK_EXHIBITIONS } from "../_mocks/exhibition";

export default function ExhibitionsPage() {
  return <ExhibitionsClient exhibitions={MOCK_EXHIBITIONS} />;
}
