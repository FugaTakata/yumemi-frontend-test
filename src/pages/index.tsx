import {
  getPrefectures,
  getPrefecturesApiEndpoint,
} from "@src/features/prefectures/api/getPrefectures";
import { usePrefectureCheckbox } from "@src/features/prefectures/hooks/usePrefectureCheckbox";
import { useFetch } from "@src/hooks/useFetch";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data } = useFetch({
    key: getPrefecturesApiEndpoint,
    fetcher: getPrefectures,
  });

  const { renderCheckboxList } = usePrefectureCheckbox({
    prefectures: data,
  });

  return <div>{renderCheckboxList()}</div>;
};

export default Home;
