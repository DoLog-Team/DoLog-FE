"use client";
import { createContext, useContext } from "react";

interface ExhibitionContextValue {
    slug: string;
    logoImg: string;
}

const ExhibitionContext = createContext<ExhibitionContextValue | null>(null);

export function ExhibitionProvider({ 
    slug, 
    logoImg, 
    children 
}: ExhibitionContextValue & { children: React.ReactNode }) {
    return (
        <ExhibitionContext.Provider value={{ slug, logoImg }}>
            {children}
        </ExhibitionContext.Provider>
    );
}

export function useExhibition() {
    const ctx = useContext(ExhibitionContext);
    if (!ctx) throw new Error("ExhibitionProvider 밖에서 사용됨");
    return ctx;
}