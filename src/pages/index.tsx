import { css } from "@emotion/react";

import { PopulationsLineChart } from "@src/features/populations/components/PopulationsLineChart";
import { usePopulationData } from "@src/features/populations/hooks/usePopulationData";
import { usePopulationGraphData } from "@src/features/populations/hooks/usePopulationGraphData";
import { usePrefectureCheckbox } from "@src/features/prefectures/hooks/usePrefectureCheckbox";
import { usePrefectureData } from "@src/features/prefectures/hooks/usePrefectureData";

import type { NextPage } from "next";

const graphWrapperStyle = css`
  height: 600px;
  overflow-x: scroll;
`;

const Home: NextPage = () => {
  const { prefectures } = usePrefectureData();

  const { checkedIds, renderCheckboxList } = usePrefectureCheckbox({
    prefectures,
  });

  const { populations } = usePopulationData({
    checkedPrefectureIds: checkedIds,
  });

  const { graphData } = usePopulationGraphData({
    populations,
    prefectures,
  });

  return (
    <div>
      {renderCheckboxList()}
      <div css={graphWrapperStyle}>
        <PopulationsLineChart graphData={graphData} />
      </div>
    </div>
  );
};

export default Home;
