import React from "react";
import { UseFormRegister } from "react-hook-form";
import { ProfileFormData } from "./profileSchema";

export default function useProfilePhoneNumber({
  register,
}: {
  register: UseFormRegister<ProfileFormData>;
}) {
  const { onChange } = register("phone");
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = formatPhoneNumber(e.target.value);
    onChange(e);
  };
  return { handleChange };
}
