import Image from "next/image";
import { cn } from "components";

interface FilterChipProps {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
  className?: string;
}

export const FilterChip = ({
  label,
  options,
  selected,
  onSelect,
  className,
}: FilterChipProps) => {
  return (
    <div
      className={cn(
        "relative items-center rounded-lg px-1.5 py-2 text-element2 whitespace-nowrap shrink-0 border border-stroke-lighter",
        selected ? "text-lighter" : "text-disable",
        className,
      )}
    >
      <span className="flex items-center pointer-events-none">
        <span className="px-1">{selected ?? label}</span>
        <Image
          src="/icons/arrowDown.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden
        />
      </span>

      <select
        value={selected ?? ""}
        onChange={(e) => onSelect(e.target.value || null)}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
