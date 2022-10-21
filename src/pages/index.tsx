import { usePrefectureCheckbox } from "@src/features/prefectures/hooks/usePrefectureCheckbox";
import { usePrefectureData } from "@src/features/prefectures/hooks/usePrefectureData";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const { prefectures } = usePrefectureData();

  const { renderCheckboxList } = usePrefectureCheckbox({
    prefectures,
  });

  return <div>{renderCheckboxList()}</div>;
};

export default Home;
