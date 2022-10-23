import { atom } from "recoil";

interface ToastState {
  isOpen: boolean;
  message: string | undefined;
}

export const toastState = atom<ToastState>({
  key: "toastState",
  default: { isOpen: false, message: undefined },
});
