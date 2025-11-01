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
        className={`h-12 w-full bg-black font-[Pretendard] text-lg font-medium leading-[23px] text-[#fff] ${isFormValid ? "bg-black" : "bg-[#9199A4]"}`}
      >
        작성완료
      </Button>
    </div>
  );
}
