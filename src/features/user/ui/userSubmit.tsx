import { Button } from "@/shared";
import React from "react";
import { Control, useFormState } from "react-hook-form";
import { ProfileFormData } from "../model/profileSchema";

export default function UserSubmit({
  control,
}: {
  control: Control<ProfileFormData>;
}) {
  // 이 컴포넌트만 formState 구독
  const { isValid, isDirty, errors } = useFormState({ control });

  console.log("에러 체킹: ", errors);
  return (
    <div className="px-9">
      <Button
        type="submit"
        variant={"outline"}
        size={"lg"}
        disabled={!isValid || !isDirty}
        className={`h-12 w-full bg-black font-[Pretendard] text-lg font-medium leading-[23px] text-[#fff] hover:bg-black hover:text-[#fff] ${
          isValid && isDirty
            ? "bg-[#6E4DDC] hover:bg-[#5a3db8]"
            : "cursor-not-allowed bg-[#E0E0E0]"
        }`}
      >
        작성완료
      </Button>
    </div>
  );
}
