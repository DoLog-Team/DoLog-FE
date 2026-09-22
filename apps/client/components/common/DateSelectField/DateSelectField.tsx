import { Select } from "@/components/common/Select/Select";

export interface DateSelectFieldProps {
	label: string;
	placeholder: string;
	options: { label: string; value: string }[];
	value: string | undefined;
	onChange: (value: string) => void;
	disabled?: boolean;
}

export const DateSelectField = ({
	label,
	placeholder,
	options,
	value,
	onChange,
	disabled,
}: DateSelectFieldProps) => (
	<div className="flex min-w-0 flex-1 flex-col gap-1">
		<span className="text-body3 text-light">{label}</span>
		<Select
			options={options}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
		/>
	</div>
);
