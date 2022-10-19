import { memo } from "react";

interface CheckboxProps {
  checked: boolean;
  onCheckToggle: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}

export const Checkbox = memo(function CheckboxMemo({
  checked,
  onCheckToggle,
  label,
}: CheckboxProps) {
  return (
    <label>
      <input checked={checked} type={"checkbox"} onChange={onCheckToggle} />
      {label}
    </label>
  );
});
