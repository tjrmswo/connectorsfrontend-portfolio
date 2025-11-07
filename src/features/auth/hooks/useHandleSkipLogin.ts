import { useCustomRouter } from "@/shared";
import { useCallback } from "react";

export default function useHandleSkipLogin() {
  const { navigate } = useCustomRouter();
  const handleSkipLogin = useCallback(() => {
    navigate({ path: "/home", type: "push" });
  }, [navigate]);
  return { handleSkipLogin };
}
