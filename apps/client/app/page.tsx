"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect } from "react";

export default function MainPage() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");

    const html = document.documentElement;
    html.classList.remove("dark");
    html.classList.add("light");
    html.style.colorScheme = "light";
  }, [setTheme]);

  return (
    <div className="flex flex-col items-center bg-normal text-strong min-h-dvh px-4 py-20">
      <h1 className="text-head1">두록(DoLog): 대학 전시 통합 플랫폼</h1>

      <div className="grid grid-cols-2 gap-6">
        <Link
          href="/dgu"
          className="p-6 fg-light stroke-lighter rounded-2xl hover:scale-105 transition-transform"
        >
          <h2 className="text-head3 text-custom1">동국대학교</h2>
          <p className="text-light">동국대 졸업 전시회</p>
        </Link>

        <Link
          href="/snu"
          className="p-6 fg-light stroke-lighter rounded-2xl hover:scale-105 transition-transform"
        >
          <h2 className="text-head3 text-custom1">서울대학교</h2>
          <p className="text-light">서울대 졸업 전시회</p>
        </Link>
      </div>
    </div>
  );
}
