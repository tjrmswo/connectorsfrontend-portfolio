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
              <AlertDialog>
                <AlertDialogTrigger className="ml-auto cursor-pointer border-b-2 border-b-transparent px-2 text-[#B8BEC2] transition duration-300 hover:border-b-[#B8BEC2]">
                  보기
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-[Pretendard]">
                      {data.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="font-[Pretendard]">
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
  );
}
