import { useCallback } from "react";

import { useRecoilState } from "recoil";

import { Toast } from "@src/components/Notifications/Toast";
import { toastState } from "@src/globalStates/toast";

export const useErrorToast = () => {
  const [toast, setToast] = useRecoilState(toastState);

  const showErrorToast = useCallback(() => {
    setToast({ isOpen: true, message: "エラーが発生しました" });
  }, [setToast]);

  const hideErrorToast = useCallback(() => {
    location.assign("/");
  }, []);

  const renderToast = useCallback((): JSX.Element | null => {
    if (toast.message === undefined) {
      return null;
    }

    return (
      <Toast
        dismissText={"リセットする"}
        isOpen={toast.isOpen}
        message={toast.message}
        onDismiss={hideErrorToast}
      />
    );
  }, [toast, hideErrorToast]);

  return {
    showErrorToast,
    renderToast,
  };
};
