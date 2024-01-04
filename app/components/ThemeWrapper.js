"use client";
import { useTheme } from "@/contexts/themeContext";
import React from "react";

export default function ThemeWrapper({ children }) {
  const { theme, setTheme } = useTheme();
  return (
    <html lang="en" class={theme}>
      {children}
    </html>
  );
}
