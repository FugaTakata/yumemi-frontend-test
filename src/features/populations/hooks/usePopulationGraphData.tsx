import { useCallback, useMemo } from "react";

import type { Populations } from "@src/features/populations/types";
import type { Prefecture } from "@src/features/prefectures/types";

interface UsePopulationGraphDataProps {
  populations: Populations;
  prefectures: Prefecture[] | undefined;
}

export const usePopulationGraphData = ({
  populations,
  prefectures,
}: UsePopulationGraphDataProps) => {
  const convertData = useCallback(
    (populations: Populations) => {
      const prefectureIdNameMap: {
        [key: Prefecture["id"]]: Prefecture["name"];
      } = {};
      if (prefectures !== undefined) {
        prefectures.forEach((prefecture) => {
          prefectureIdNameMap[prefecture.id] = prefecture.name;
        });
      }
      const convertedData = Object.keys(populations).map((prefectureId) => {
        const currentYear = new Date().getFullYear();

        // 今年以前のデータのみを用いる
        const data = populations[prefectureId]
          .filter((population) => population.year <= currentYear)
          .map((population) => {
            return {
              x: population.year,
              y: population.value,
            };
          });

        return {
          id: prefectureIdNameMap[prefectureId],
          data,
        };
      });

      return convertedData;
    },
    [prefectures]
  );

  const graphData = useMemo(() => {
    if (prefectures === undefined || Object.keys(populations).length === 0) {
      return undefined;
    }

    return convertData(populations);
  }, [populations, convertData, prefectures]);

  return {
    graphData,
  };
};
