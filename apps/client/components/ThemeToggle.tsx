"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "components";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!mounted) return <div className="w-25 h-10" />;

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "DARK MODE" : "LIGHT MODE"}
    </Button>
  );
};
