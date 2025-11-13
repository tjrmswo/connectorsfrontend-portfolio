import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared";
import React from "react";
import useHandleTerms from "../model/useHandleTerms";
import Image from "next/image";

export default function TermList() {
  const {
    termState,
    handleTerms,
    totalAgree,
    allAgree,
    moveNextStep,
    handleNextClick,
  } = useHandleTerms();

  return (
    <main className="px-[6px] font-[Pretendard]">
      <div
        className={`mb-[1.5rem] flex w-full flex-row items-center justify-start rounded-lg border px-[16px] px-[5px] py-[18px] py-[1rem]${allAgree ? "border-[#6E4DDC] bg-[#E5DFFF] text-[#6E4DDC]" : "border-[#e0e0e0] bg-[#f5f5f5]"} `}
      >
        <label className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            onChange={(e) => totalAgree(e)}
            checked={allAgree}
            className="sr-only" // 또는 hidden
          />
          <Image
            className="mr-4"
            src={
              allAgree
                ? "/images/term/checked.png"
                : "/images/term/notChecked.png"
            }
            alt="체크박스"
            width={20}
            height={20}
          />
          {/* 필요시 라벨 텍스트 */}
        </label>
        <span>네, 모두 동의합니다.</span>
      </div>

      <div className="flex flex-col gap-[10px]">
        {termState.length > 0 &&
          termState.map((data) => (
            <div
              key={data.termsId}
              className="flex w-full items-center p-[5px]"
            >
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  onChange={(e) => handleTerms(e, data.termsId)}
                  checked={data.state}
                  className="sr-only"
                />
                <Image
                  className="mr-4"
                  src={
                    data.state
                      ? "/images/term/checkedIndividual.png"
                      : "/images/term/notChecked.png"
                  }
                  alt="체크박스"
                  width={20}
                  height={20}
                />
                {/* 필요시 라벨 텍스트 */}
              </label>
              <span className="inline">
                {data.required ? "(필수)" : "(선택)"} {data.title}
              </span>
              <AlertDialog>
                <AlertDialogTrigger className="ml-auto cursor-pointer border-b-2 border-b-transparent px-2 text-[#B8BEC2] transition duration-300 hover:border-b-[#B8BEC2]">
                  보기
                </AlertDialogTrigger>
                <AlertDialogContent className="font-[Pretendard]">
                  <AlertDialogHeader>
                    <AlertDialogTitle>{data.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {data.content}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <p className="w-full text-center text-[0.8rem] text-[#B8BEC2]">
          &lsquo;선택&rsquo;항목에 동의하지 않아도 서비스 이용이 가능합니다.{" "}
          <br /> 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며&sbquo;
          동의 거부시 회원체
          <br /> 서비스 시용이 제한됩니다.
        </p>
        <button
          className={`w-full cursor-pointer rounded-[1.5rem] border-none p-[1rem] text-[1rem] text-[600] transition-colors duration-500 ease-in-out ${moveNextStep ? "bg-[#6E4DDC] text-[#fff]" : "bg-[#F7F7F7] text-[#B3BABD]"}`}
          disabled={!moveNextStep}
          onClick={handleNextClick}
        >
          다음
        </button>
      </div>
    </main>
  );
}
