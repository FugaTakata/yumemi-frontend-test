import { useEffect, useState } from "react";

import { getPrefectures } from "@src/features/prefectures/api/getPrefectures";
import type { Prefecture } from "@src/features/prefectures/types";

export const usePrefectureData = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetching = async () => {
      const prefecturesData = await getPrefectures();

      if (ignore) {
        return;
      }

      setPrefectures(prefecturesData);
    };

    let ignore: boolean = false;
    fetching();

    return () => {
      ignore = true;
    };
  }, []);

  return { prefectures };
};
