import { getPrefectures } from "@src/features/prefectures/api/getPrefectures";
import type { Prefecture } from "@src/features/prefectures/types";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prefecturesData = await getPrefectures();

  const responseData: Prefecture[] = prefecturesData.result.map(
    (prefectureData) => {
      return {
        id: prefectureData.prefCode,
        name: prefectureData.prefName,
      };
    }
  );

  res.status(200).json(responseData);
}
