"use client";

import { NextIntlClientProvider, useMessages } from "next-intl";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const messages = useMessages();

  return (
    <SessionProvider>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
