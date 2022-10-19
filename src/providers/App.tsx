import React from "react";

import createEmotionCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

interface AppProviderProps {
  children: React.ReactNode;
}

const emotionCache = createEmotionCache({ key: "next" });

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <CacheProvider value={emotionCache}>{children}</CacheProvider>
    </>
  );
};
