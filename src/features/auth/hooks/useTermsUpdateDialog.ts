import { useCustomRouter } from "@/shared";
import { useCallback, useState } from "react";

export const useTermsUpdateDialog = () => {
  const { navigate } = useCustomRouter();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const handleConfirm = useCallback(() => {
    setIsUpdated(false);
    navigate({ path: "/auth/termsAgreement", type: "push" });
  }, [navigate]);

  return {
    isUpdated,
    setIsUpdated,
    handleConfirm,
  };
};
