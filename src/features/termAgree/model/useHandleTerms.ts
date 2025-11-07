import { TermAgreementErrorType, TermAgreementType } from "@/features/auth";
import {
  QUERY_CONFIG,
  apiInstance,
  useAnimatedToast,
  useCustomRouter,
} from "@/shared";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function useHandleTerms() {
  const [termState, setTermState] = useState<TermAgreementType[]>([]);
  const { navigate } = useCustomRouter();
  const { toast, shouldRender, showToast } = useAnimatedToast(1000);

  const termAgreementData = useQuery<
    TermAgreementType[],
    TermAgreementErrorType
  >({
    queryKey: ["termAgreement"],
    queryFn: async () => {
      const response =
        await apiInstance.get<TermAgreementType[]>("/terms/info");

      console.log("약관 동의 정보 조회: ", response.data);

      const mappingData = response.data.map((data) => ({
        ...data,
        state: false,
      }));
      setTermState(mappingData);
      return response.data;
    },
    staleTime: QUERY_CONFIG.STALE_TIME,
    retry: 0,
  });

  useEffect(() => {
    if (termAgreementData.isError && termAgreementData.error) {
      const { message } = termAgreementData.error.response.data;
      const { status } = termAgreementData.error;

      showToast(message, String(status));
      const login = setTimeout(
        () => navigate({ path: "/auth/login", type: "push" }),
        2000,
      );
      return () => clearTimeout(login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termAgreementData.error]);

  const terms = useMutation({
    mutationKey: ["termAgree"],
    mutationFn: async ({
      termsIdList,
      checked,
    }: {
      termsIdList: number;
      checked: boolean | undefined;
    }) => {
      const response = await apiInstance.get(
        checked ? "/terms/agree" : "/terms/withdraw",
        {
          params: {
            termsIdList,
          },
        },
      );

      // console.log(checked ? "요청 사항 수락" : "요청 사항 거절", response);

      return response.data;
    },
  });

  const handleTerms = (
    e: React.ChangeEvent<HTMLInputElement>,
    termId: number,
  ) => {
    console.log(e.target.checked, termId);
    const findElement = termState.map((data) => {
      if (termId === data.termsId) {
        return { ...data, state: e.target.checked };
      } else {
        return data;
      }
    });

    setTermState(findElement);
  };

  const totalAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    const stateEntireChange = termState.map((data) => {
      return { ...data, termsId: data.termsId, state: checked ? true : false };
    });

    // console.log(checked ? `전체 동의` : `전체 거절`, stateEntireChange);
    setTermState(stateEntireChange);
  };

  const allAgree = termState.every((item) => item.state);

  const moveNextStep = termState.every((item) => {
    if (item.required) {
      return item.state === true;
    }
    return true;
  });

  const handleNextClick = async () => {
    if (moveNextStep) {
      try {
        const promises = termState.map((term) =>
          terms.mutateAsync({
            termsIdList: term.termsId,
            checked: term.state,
          }),
        );

        await Promise.all(promises);

        navigate({ path: "/auth/signupFinish", type: "push" });
      } catch (error) {
        console.error("약관 동의 중 오류 발생:", error);
        // 에러 처리
      }
    }
  };

  return {
    termState,
    toast,
    shouldRender,
    handleTerms,
    totalAgree,
    allAgree,
    moveNextStep,
    handleNextClick,
  };
}
