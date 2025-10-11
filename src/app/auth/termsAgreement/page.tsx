"use client";
import { TermAgreementType } from "@/entities/auth/type";
import { useCustomRouter } from "@/shared";
import apiInstance from "@/shared/api/apiInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import React, { useState } from "react";

export default function TermsAgreement() {
  const [termState, setTermState] = useState<TermAgreementType[]>([]);
  const { navigate } = useCustomRouter();

  const { data: _termAgreementData } = useQuery<TermAgreementType[]>({
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
  });

  const terms = useMutation({
    mutationKey: ["termAgree"],
    mutationFn: async ({
      termsIdList,
      checked,
    }: {
      termsIdList: number;
      checked: boolean;
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
    terms.mutate({ termsIdList: termId, checked: e.target.checked });
  };

  const totalAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;
    const stateEntireChange = termState.map((data) => {
      terms.mutate({
        termsIdList: data.termsId,
        checked: checked ? true : false,
      });
      return { ...data, termsId: data.termsId, state: checked ? true : false };
    });

    // console.log(checked ? `전체 동의` : `전체 거절`, stateEntireChange);
    setTermState(stateEntireChange);
  };

  const moveNextStep = termState.every((item) => item.state);

  const handleNextClick = () => {
    if (moveNextStep) {
      navigate({ path: "/auth/signupFinish", type: "push" });
    }
  };
  // useEffect(() => {
  //   console.log(moveNextStep());
  // }, [termState]);

  return (
    <div className="flex size-full flex-col justify-start gap-[2rem] p-[6px]">
      <header className="flex h-[2rem] w-full flex-row justify-between border-b border-b-[#E9E9E9] px-[6px] py-[0.5rem] text-start">
        <ChevronLeft
          width={30}
          height={30}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate({ path: "/auth/login", type: "push" });
          }}
        />
        <span className="text-[1rem] font-[600] leading-[26px]">회원가입</span>
        <div />
      </header>
      <h2 className="mb-[1rem] px-[6px] text-[1.5rem]">
        더 나은 서비스 사용을 위해 <br /> 이용약관에 동의해주세요.
      </h2>

      <main className="px-[6px] font-[Pretendard]">
        <div className="mb-[1.5rem] w-full px-[5px] py-[1rem]">
          <input
            className="mr-[0.5rem]"
            type="checkbox"
            onChange={(e) => totalAgree(e)}
            checked={moveNextStep}
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
                <span className="ml-auto cursor-pointer border-b-2 border-b-transparent px-2 py-1 text-[#B8BEC2] transition duration-300 hover:border-b-[#B8BEC2]">
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
    </div>
  );
}
