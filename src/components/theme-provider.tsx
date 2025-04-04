"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = useState(false);
  // Fix hydration issue (ensures the theme is loaded on the client)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Prevents mismatch between server & client rendering
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
