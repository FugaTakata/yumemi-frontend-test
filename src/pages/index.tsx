import { css } from "@emotion/react";
import Head from "next/head";

import { PopulationsLineChart } from "@src/features/populations/components/PopulationsLineChart";
import { usePopulationData } from "@src/features/populations/hooks/usePopulationData";
import { usePopulationGraphData } from "@src/features/populations/hooks/usePopulationGraphData";
import { usePrefectureCheckbox } from "@src/features/prefectures/hooks/usePrefectureCheckbox";
import { usePrefectureData } from "@src/features/prefectures/hooks/usePrefectureData";
import { useErrorToast } from "@src/hooks/useErrorToast";
import { pageContainerStyle } from "@src/styles/global";

import type { NextPage } from "next";

const graphWrapperStyle = css`
  height: 600px;
  overflow-x: scroll;
`;

const sectionStyle = css`
  padding-bottom: 16px;
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

  const { renderToast } = useErrorToast();

  return (
    <div css={pageContainerStyle}>
      <Head>
        <title>都道府県の人口推移</title>
        <meta
          content="都道府県の総人口推移を図で確認できるアプリ"
          name="description"
        />
      </Head>
      {renderToast()}
      <section css={sectionStyle}>
        <h1>都道府県別総人口の推移</h1>
        <p>
          このアプリケーションでは各都道府県の総人口の推移を折れ線図で確認することができます。
        </p>
      </section>
      <section css={sectionStyle}>
        <h2>都道府県一覧</h2>
        <p>興味のある都道府県を選択して人口の推移を確認ましょう。</p>
        {renderCheckboxList()}
      </section>
      <section>
        <h2>人口の推移</h2>
        {graphData === undefined ? (
          <div>
            <p>都道府県を選択すると折れ線図が表示されます</p>
          </div>
        ) : (
          <div css={graphWrapperStyle}>
            <PopulationsLineChart graphData={graphData} />
          </div>
        )}
        <p>出典：RESAS（地域経済分析システム）</p>
        <p>RESAS（地域経済分析システム）APIから取得したデータを加工して作成</p>
      </section>
    </div>
  );
};

export default Home;
