import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva("flex items-center rounded-sm px-1.5 py-1 text-body4-bold", {
	variants: {
		color: {
			default: "bg-fg-lighter text-light",
			light: "bg-fg-light text-light",
			coral: "bg-admin2 text-admin1",
		},
	},
	defaultVariants: {
		color: "default",
	},
});

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
	label: string;
}

export function StatusBadge({ label, color }: StatusBadgeProps) {
	return <span className={badgeVariants({ color })}>{label}</span>;
}
