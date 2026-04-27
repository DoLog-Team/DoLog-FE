import { MOCK_BEHIND_THE_SCENE } from "./_mocks/behind-the-scene";
import BehindTheSceneClient from "./_components/BehindTheSceneClient";

export default function BtsPage() {
	return <BehindTheSceneClient items={MOCK_BEHIND_THE_SCENE} />;
}
