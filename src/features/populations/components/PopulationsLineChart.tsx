import { memo } from "react";

import { css } from "@emotion/react";
import { ResponsiveLine } from "@nivo/line";

import type { Serie } from "@nivo/line";

interface PopulationsLineChartProps {
  graphData: Serie[];
}

export const PopulationsLineChart = memo(function PopulationsLineChart({
  graphData,
}: PopulationsLineChartProps) {
  return (
    <div css={PopulationsLineChartWrapperStyle}>
      <ResponsiveLine
        axisBottom={{
          tickSize: 5,
          tickPadding: 4,
          tickRotation: 60,
          legend: "年度",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 4,
          tickRotation: 0,
          legend: "count",
          legendOffset: -64,
          legendPosition: "middle",
        }}
        axisRight={null}
        axisTop={null}
        data={graphData}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
          },
        ]}
        margin={{ top: 64, right: 88, bottom: 64, left: 80 }}
        pointBorderColor={{ from: "serieColor" }}
        pointBorderWidth={2}
        pointColor={{ theme: "background" }}
        pointLabelYOffset={-12}
        pointSize={10}
        useMesh={true}
        xScale={{ type: "point" }}
        // 人口をカンマ区切りで表示
        yFormat={">-,.0f"}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          reverse: false,
          nice: true,
        }}
      />
    </div>
  );
});

const PopulationsLineChartWrapperStyle = css`
  height: 100%;
  min-width: 600px;
`;
