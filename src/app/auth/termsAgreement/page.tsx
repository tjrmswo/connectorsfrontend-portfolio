"use client";
import { TermAgreementType } from "@/entities/auth";
import { CommonToast, useCustomRouter, apiInstance } from "@/shared";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { TermAgreementErrorType, useAnimatedToast } from "@/features/auth";
import { QUERY_CONFIG } from "@/shared";

export default function TermsAgreement() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [termState, setTermState] = useState<TermAgreementType[]>([]);
  const { navigate } = useCustomRouter();
  const { toast, shouldRender, showToast } = useAnimatedToast(1000);

  useEffect(() => {
    // CSS 로드를 위한 약간의 딜레이
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
    refetchOnWindowFocus: true,
    retry: 0,
  });

  useEffect(() => {
    if (termAgreementData.isError && termAgreementData.error) {
      const { message } = termAgreementData.error.response.data;
      const { status } = termAgreementData.error;
      console.log(message, status);
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
          terms.mutateAsync({ termsIdList: term.termsId, checked: term.state }),
        );

        await Promise.all(promises);

        navigate({ path: "/auth/signupFinish", type: "push" });
      } catch (error) {
        console.error("약관 동의 중 오류 발생:", error);
        // 에러 처리
      }
    }
  };
  useEffect(() => {
    console.log(termState);
  }, [termState]);

  return (
    <div
      className={`flex size-full flex-col justify-start gap-6 p-[6px] transition-opacity duration-300 ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      <header
        // className="relative bottom-[2.3rem] w-full text-start"
        className="mt-7 flex h-[2.1rem] w-full flex-row justify-between border-b border-b-[#E9E9E9] px-6 pb-10 text-start"
      >
        <ChevronLeft
          width={30}
          height={30}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate({ path: "/auth/login", type: "push" });
          }}
        />
        <span className="text-[1rem] font-[600]">회원가입</span>
        <div />
      </header>
      <h2 className="mb-1 px-[6px] font-[Inter] text-[1.5rem] font-[700] text-[#222]">
        더 나은 서비스 사용을 위해 <br /> 이용약관에 동의해주세요.
      </h2>

      <main className="px-[6px] font-[Pretendard]">
        <div className="mb-[1.5rem] w-full px-[5px] py-[1rem]">
          <input
            className="mr-[0.5rem]"
            type="checkbox"
            onChange={(e) => totalAgree(e)}
            checked={allAgree}
          />
          <span>네, 모두 동의합니다.</span>
        </div>

        <div className="flex flex-col gap-[10px]">
          {termState.length > 0 &&
            termState.map((data) => (
              <div
                key={data.termsId}
                className="flex w-full items-center p-[5px]"
              >
                <input
                  className="mr-[0.5rem]"
                  type="checkbox"
                  checked={data.state}
                  onChange={(e) => handleTerms(e, data.termsId)}
                />
                <span className="inline">
                  {data.required ? "(필수)" : "(선택)"} {data.title}
                </span>
                <span className="ml-auto cursor-pointer border-b-2 border-b-transparent px-2 text-[#B8BEC2] transition duration-300 hover:border-b-[#B8BEC2]">
                  보기
                </span>
              </div>
            ))}
        </div>
        <div className="mt-[3rem]">
          <button
            className={`w-full cursor-pointer rounded-[1.5rem] border-none p-[1rem] text-[1rem] text-[600] transition-colors duration-500 ease-in-out ${moveNextStep ? "bg-[#222] text-[#fff]" : "bg-[#F7F7F7] text-[#B3BABD]"}`}
            disabled={!moveNextStep}
            onClick={handleNextClick}
          >
            다음
          </button>
        </div>
      </main>
      <footer>
        <p className="w-full text-center text-[0.8rem] text-[#B8BEC2]">
          &lsquo;선택&rsquo;항목에 동의하지 않아도 서비스 이용이 가능합니다.{" "}
          <br /> 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며&sbquo;
          동의 거부시 회원체
          <br /> 서비스 시용이 제한됩니다.
        </p>
      </footer>
      {shouldRender && (
        <div
          className={`fixed left-1/2 top-[2rem] -translate-x-1/2 rounded-lg border border-[#f4f4f4] bg-white shadow-xl transition-all duration-300 ease-in-out ${
            toast.state
              ? "translate-y-[0px] opacity-100"
              : "-translate-y-[-20px] opacity-0"
          }`}
        >
          <CommonToast content={toast.comment} status={String(toast.status)} />
        </div>
      )}
    </div>
  );
}
