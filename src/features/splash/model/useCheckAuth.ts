import { useQuery } from "@tanstack/react-query";
import { QUERY_CONFIG, apiInstance, useCustomRouter } from "@/shared";
import { useEffect } from "react";
import { CheckAuthErrorType, CheckAuthType, UseCheckAuthProps } from "./type";

export default function useCheckAuth({ showToast }: UseCheckAuthProps) {
  const { navigate } = useCustomRouter();

  const {
    data: checkAuth,
    isSuccess: checkAuthSuccess,
    isError: authIsError,
    isLoading,
    isPending,
  } = useQuery<CheckAuthType, CheckAuthErrorType>({
    queryKey: ["checkAuthLayer"],
    queryFn: async () => {
      const response = await apiInstance.post("/auth/token/refresh");
      console.log(response);
      return response.data; // 데이터만 반환
    },
    staleTime: QUERY_CONFIG.STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 0,
  });

  // 컴포넌트에서 사용
  useEffect(() => {
    if (checkAuthSuccess) {
      console.log("권한 체크 성공!");

      if (checkAuth.status === "BLOCKED_TERMS_REQUIRED") {
        showToast("권한체크가 필요한 사용자입니다.", String(403));
        const timer = setTimeout(() => {
          navigate({ path: "/auth/termsAgreement", type: "push" });
        }, 2200);

        return () => clearTimeout(timer);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAuthSuccess, authIsError, checkAuth]);
  return {
    isLoading: isLoading || isPending,
    isSuccess: checkAuthSuccess,
    isError: authIsError,
    data: checkAuth,
  };
}
