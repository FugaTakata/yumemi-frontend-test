import { useEffect, useState } from "react";

import { getPrefectures } from "@src/features/prefectures/api/internal/getPrefectures";
import type { Prefecture } from "@src/features/prefectures/types";
import { useErrorToast } from "@src/hooks/useErrorToast";

export const usePrefectureData = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[] | undefined>(
    undefined
  );
  const { showErrorToast } = useErrorToast();

  useEffect(() => {
    const fetching = async () => {
      const prefecturesData = await getPrefectures();

      if (ignore) {
        return;
      }

      setPrefectures(prefecturesData);
    };

    let ignore: boolean = false;
    fetching().catch((error) => {
      console.error(error);
      showErrorToast();
    });

    return () => {
      ignore = true;
    };
  }, [showErrorToast]);

  return { prefectures };
};
