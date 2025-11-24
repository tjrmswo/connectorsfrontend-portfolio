import { Button } from "@/shared";
import React from "react";

export default function ProfileButton({
  isFormValid,
}: {
  isFormValid: boolean;
}) {
  return (
    <div className="p-5">
      <Button
        variant={"outline"}
        size={"lg"}
        disabled={!isFormValid}
        className={`h-12 w-full border-2 bg-black font-[Pretendard] text-lg font-medium leading-[23px] text-[#fff] hover:border-[#6E4DDC] hover:text-[#6E4DDC] ${isFormValid ? "bg-[#6E4DDC]" : "bg-[#9199A4]"}`}
      >
        작성완료
      </Button>
    </div>
  );
}
