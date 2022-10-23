import React from "react";

import { css } from "@emotion/react";

interface ToastProps {
  isOpen: boolean;
  message: string;
  onDismiss: () => void;
  dismissText: string;
}

const toastStyle = css`
  position: fixed;
  top: 10px;
  right: 10px;
  max-width: 200px;
  padding: 10px;
  background-color: #bfddff;
`;

export const Toast = ({
  isOpen,
  message,
  onDismiss,
  dismissText,
}: ToastProps) => {
  return isOpen ? (
    <div css={toastStyle}>
      <p>{message}</p>
      <button onClick={onDismiss}>{dismissText}</button>
    </div>
  ) : null;
};
