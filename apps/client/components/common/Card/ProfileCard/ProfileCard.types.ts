export interface ProfileCardProps {
	imageUrl: string;
	// 비어 있으면 이름 줄을 그리지 않는다
	name?: string;
	engName?: string;
	bio?: string;
	bottomSlot?: React.ReactNode;
}
