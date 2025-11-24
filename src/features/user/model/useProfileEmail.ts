import React, { useEffect, useRef } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ALLOWED_EMAIL_DOMAINS, ProfileFormData } from "./profileSchema";

export default function useProfileEmail({
  register,
  setValue,
}: {
  register: UseFormRegister<ProfileFormData>;
  setValue: UseFormSetValue<ProfileFormData>;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const localPartRef = useRef("");

  const { ref, onChange, ...rest } = register("email");

  // 드롭다운 표시/숨김을 DOM 조작으로 처리
  const showDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.style.display = "block";
    }
  };

  const hideDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.style.display = "none";
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        hideDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(e);

    if (!value.includes("@")) {
      localPartRef.current = value;
      if (value.length > 0) {
        // 드롭다운 내용 업데이트
        updateDropdownContent();
        showDropdown();
      } else {
        hideDropdown();
      }
    } else {
      hideDropdown();
    }
  };

  const updateDropdownContent = () => {
    if (dropdownRef.current) {
      dropdownRef.current.innerHTML = ALLOWED_EMAIL_DOMAINS.map(
        (domain) =>
          `<div class="cursor-pointer px-4 py-3 font-[Pretendard] text-sm transition-colors hover:bg-[#F5F5F5]" data-domain="${domain}">
            <span class="text-[#666]">${localPartRef.current}</span>
            <span class="font-medium text-[#000]">@${domain}</span>
          </div>`,
      ).join("");

      // 클릭 이벤트 추가
      const items = dropdownRef.current.querySelectorAll("[data-domain]");
      items.forEach((item) => {
        item.addEventListener("click", () => {
          const domain = item.getAttribute("data-domain");
          if (domain) {
            const fullEmail = `${localPartRef.current}@${domain}`;
            setValue("email", fullEmail, { shouldValidate: true });
            if (inputRef.current) {
              inputRef.current.value = fullEmail;
            }
            hideDropdown();
          }
        });
      });
    }
  };

  return {
    rest,
    ref,
    inputRef,
    localPartRef,
    updateDropdownContent,
    showDropdown,
    dropdownRef,
    handleInputChange,
  };
}
