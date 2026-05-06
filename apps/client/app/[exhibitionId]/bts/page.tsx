import BehindTheSceneClient from "./_components/BehindTheSceneClient";
import { MOCK_BEHIND_THE_SCENE } from "./_mocks/behind-the-scene";

export default function BtsPage() {
	return <BehindTheSceneClient items={MOCK_BEHIND_THE_SCENE} />;
}
