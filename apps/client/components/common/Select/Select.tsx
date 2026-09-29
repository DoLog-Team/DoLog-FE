"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface SelectOption {
	label: string;
	value: string;
}

export interface SelectProps {
	options: SelectOption[];
	value?: string;
	onChange: (value: string) => void;
	placeholder?: string;
	error?: boolean;
	disabled?: boolean;
	className?: string;
	actionLabel?: string;
	onActionClick?: () => void;
	// (이메일 도메인 추가 입력 용도) 목록에 없는 값을 직접 입력해 선택할 수 있게 한다
	creatable?: boolean;
	id?: string;
	name?: string;
}

export const Select = ({
	options,
	value,
	onChange,
	placeholder,
	error,
	disabled,
	className,
	actionLabel,
	onActionClick,
	creatable,
	id,
	name,
}: SelectProps) => {
	const generatedId = useId();
	const inputId = id ?? generatedId;
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const containerRef = useRef<HTMLDivElement>(null);

	const selectedLabel =
		options.find((option) => option.value === value)?.label ?? (creatable ? value : "") ?? "";
	const filteredOptions = query
		? options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
		: options;

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				// 직접 입력을 허용하면 입력하던 값을 그대로 선택값으로 받는다
				if (creatable && query.trim()) onChange(query.trim());
				setIsOpen(false);
				setQuery("");
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isOpen, creatable, query, onChange]);

	const handleSelect = (option: SelectOption) => {
		onChange(option.value);
		setIsOpen(false);
		setQuery("");
	};

	return (
		<div ref={containerRef} className={cn("relative w-full", className)}>
			<div
				className={cn(
					"flex h-11 w-full items-center gap-2 rounded-lg border bg-bg-normal pr-3 transition-colors",
					error ? "border-error" : isOpen ? "border-stroke-inverse" : "border-stroke-lighter",
					disabled ? "pointer-events-none bg-fg-lighter" : "cursor-text",
				)}
			>
				<input
					id={inputId}
					name={name ?? inputId}
					className="min-w-0 flex-1 p-3 bg-transparent text-body1 text-light outline-none placeholder:text-disable disabled:text-disable"
					placeholder={isOpen ? undefined : placeholder}
					value={isOpen ? query : selectedLabel}
					onFocus={() => setIsOpen(true)}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={(e) => {
						if (creatable && e.key === "Enter" && query.trim()) {
							e.preventDefault();
							onChange(query.trim());
							setIsOpen(false);
							setQuery("");
							e.currentTarget.blur();
						}
					}}
					disabled={disabled}
				/>
				<Image
					src="/icons/arrowDownFill.svg"
					alt=""
					width={6}
					height={3}
					aria-hidden
					className={cn("shrink-0 transition-transform", isOpen && "rotate-180")}
				/>
			</div>

			{isOpen && !(creatable && filteredOptions.length === 0 && !actionLabel) && (
				<ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-stroke-lighter bg-bg-normal shadow-lg divide-y divide-stroke-lighter">
					{filteredOptions.length === 0 ? (
						<li className="px-3 py-2 text-body2 text-lightest">검색 결과가 없어요.</li>
					) : (
						filteredOptions.map((option) => (
							<li key={option.value}>
								<button
									type="button"
									onClick={() => handleSelect(option)}
									className="w-full px-3 py-2 text-left text-body2 text-strong"
								>
									{option.label}
								</button>
							</li>
						))
					)}

					{actionLabel && (
						<li>
							<button
								type="button"
								onClick={() => {
									onActionClick?.();
									setIsOpen(false);
									setQuery("");
								}}
								className="flex w-full items-center justify-between px-3 py-2 text-left text-body2 text-lighter"
							>
								{actionLabel}
								<span aria-hidden>+</span>
							</button>
						</li>
					)}
				</ul>
			)}
		</div>
	);
};
