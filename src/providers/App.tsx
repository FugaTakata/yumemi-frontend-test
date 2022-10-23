import React from "react";

import createEmotionCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { RecoilRoot } from "recoil";

interface AppProviderProps {
  children: React.ReactNode;
}

const emotionCache = createEmotionCache({ key: "next" });

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <CacheProvider value={emotionCache}>
        <RecoilRoot>{children}</RecoilRoot>
      </CacheProvider>
    </>
  );
};
