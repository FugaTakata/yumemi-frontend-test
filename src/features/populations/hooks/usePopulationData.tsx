import { useEffect, useState } from "react";

import { getPopulations } from "@src/features/populations/api/getPopulations";
import type { Population } from "@src/features/populations/types";
import type { Prefecture } from "@src/features/prefectures/types";

interface UsePopulationDataProps {
  checkedPrefectureIds: Prefecture["id"][];
}

interface PopulationsState {
  [key: Prefecture["id"]]: Population[];
}

const prefecturePopulationDataMap = new Map<Prefecture["id"], Population[]>();

export const usePopulationData = ({
  checkedPrefectureIds,
}: UsePopulationDataProps) => {
  const [populations, setPopulations] = useState<PopulationsState>({});

  useEffect(() => {
    const fetching = async () => {
      // 新しく追加されたprefectureIdの配列を作成
      const newCheckedPrefectureIds = checkedPrefectureIds.filter(
        (prefectureId) => !prefecturePopulationDataMap.has(prefectureId)
      );

      // 新しく追加されたidをもとに、追加されたidで人口情報を取得
      const newPopulationData = await Promise.all(
        newCheckedPrefectureIds.map((prefectureId) => {
          return getPopulations({ prefectureId }).then((data) => ({
            prefectureId,
            populations: data,
          }));
        })
      );

      // cacheに追加
      newPopulationData.forEach((data, _index) => {
        prefecturePopulationDataMap.set(data.prefectureId, data.populations);
      });

      const newPopulations: PopulationsState = {};
      for (const prefectureId of checkedPrefectureIds) {
        const data = prefecturePopulationDataMap.get(prefectureId);
        if (data === undefined) {
          continue;
        }

        newPopulations[prefectureId] = data;
      }

      if (ignore) {
        return;
      }

      setPopulations(newPopulations);
    };

    let ignore: boolean = false;
    fetching();

    return () => {
      ignore = true;
    };
  }, [checkedPrefectureIds]);

  return { populations };
};
