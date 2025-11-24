import { useCallback, useRef, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ProfileFormData } from "./profileSchema";

export default function useProfileName({
  register,
  setValue,
}: {
  register: UseFormRegister<ProfileFormData>;
  setValue: UseFormSetValue<ProfileFormData>;
}) {
  const [selectedGender, setSelectedGender] = useState<
    "male" | "female" | undefined
  >();
  const genderInputRef = useRef<HTMLInputElement | null>(null);

  const { ref, ...registerProps } = register("gender");

  const handleGenderSelect = useCallback(
    (gender: "male" | "female") => {
      setSelectedGender(gender);

      // ⭐ setValue 사용 - 가장 확실한 방법
      setValue("gender", gender, {
        shouldValidate: true, // 검증 실행
        shouldDirty: true, // dirty 상태 변경
        shouldTouch: true, // touched 상태 변경
      });
    },
    [setValue],
  );

  return {
    registerProps,
    genderInputRef,
    ref,
    handleGenderSelect,
    selectedGender,
  };
}
