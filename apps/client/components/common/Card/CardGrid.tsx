import { CardGridProps } from "@/app/types/card";
import { Card } from "./Card";

export const CardGrid = ({ items, limit }: CardGridProps) => {
  const displayedItems = limit ? items.slice(0, limit) : items;

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 w-full">
      {displayedItems.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};
