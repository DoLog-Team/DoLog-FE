import { ProfileCard } from "./ProfileCard";

export const ProfileCardGrid = ({ items }: { items: any[] }) => {
	return (
		<div className="flex flex-col gap-[10px] px-4 pb-6 w-full">
			{items.map((item) => (
				<ProfileCard key={item.id} {...item} />
			))}
		</div>
	);
};
