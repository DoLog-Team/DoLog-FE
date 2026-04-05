"use client";
import { searchBarStyles } from "./SearchBar.styles";
import Image from "next/image";

export interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}


export const SearchBar = ({ placeholder, value, onChange, className }: SearchBarProps) => {
    return (
        <div className={`${searchBarStyles.wrapper} ${className ?? ""}`}>
            <Image
                src="/icons/search.svg"
                alt="search"
                width={20}
                height={20}
            />
            <input
                className={searchBarStyles.input}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </div>
    );
};