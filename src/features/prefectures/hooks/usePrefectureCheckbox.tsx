import type { ChangeEventHandler } from "react";
import { memo, useCallback, useState } from "react";

import { css } from "@emotion/react";

import { Checkbox } from "@src/components/Elements/Checkbox";
import type { Prefecture } from "@src/features/prefectures/types";

const listStyle = css`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`;

const listItemStyle = css`
  min-width: 6rem;
`;

interface PrefectureCheckboxListItemProps {
  prefecture: Prefecture;
  isChecked: boolean;
  onCheckToggle: (prefectureId: Prefecture["id"]) => void;
}

const PrefectureCheckboxListItem = memo(
  function PrefectureCheckboxListItemMemo({
    prefecture,
    isChecked,
    onCheckToggle,
  }: PrefectureCheckboxListItemProps) {
    const handleCheckToggle: ChangeEventHandler<HTMLInputElement> = useCallback(
      (_e) => {
        onCheckToggle(prefecture.id);
      },
      [prefecture, onCheckToggle]
    );

    return (
      <li css={listItemStyle} key={prefecture.id}>
        <Checkbox
          checked={isChecked}
          label={prefecture.name}
          onCheckToggle={handleCheckToggle}
        />
      </li>
    );
  }
);

interface UsePrefectureCheckboxProps {
  prefectures: Prefecture[] | undefined;
}

export const usePrefectureCheckbox = ({
  prefectures,
}: UsePrefectureCheckboxProps) => {
  const [checkedIds, setCheckedIds] = useState<Prefecture["id"][]>([]);

  const handleCheckToggle = useCallback(
    (prefectureId: Prefecture["id"]): void => {
      setCheckedIds((prevCheckedIds) => {
        if (prevCheckedIds.includes(prefectureId)) {
          return prevCheckedIds.filter(
            (prevCheckedId) => prevCheckedId !== prefectureId
          );
        }

        return [...prevCheckedIds, prefectureId];
      });
    },
    []
  );

  const renderCheckboxList = useCallback((): JSX.Element => {
    if (prefectures === undefined) {
      return <p>都道府県情報をロード中です</p>;
    }

    return (
      <ul css={listStyle}>
        {prefectures.map((prefecture) => {
          const isChecked = checkedIds.includes(prefecture.id);

          return (
            <PrefectureCheckboxListItem
              isChecked={isChecked}
              key={prefecture.id}
              prefecture={prefecture}
              onCheckToggle={handleCheckToggle}
            />
          );
        })}
      </ul>
    );
  }, [prefectures, checkedIds, handleCheckToggle]);

  return {
    checkedIds,
    renderCheckboxList,
  };
};
