"use client";

import * as React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

function ClerkProviderWithTheme({ children }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch: defer theme-aware Clerk appearance until mounted
  const baseTheme = mounted && resolvedTheme === "dark" ? dark : undefined;

  return (
    <ClerkProvider
      appearance={{
        baseTheme,
        variables: {
          colorPrimary: "#6366f1",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export function Providers({ children }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProviderWithTheme>{children}</ClerkProviderWithTheme>
    </NextThemesProvider>
  );
}
