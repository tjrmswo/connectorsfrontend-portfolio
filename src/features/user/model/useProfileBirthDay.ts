import React, { useState } from "react";
import { UseFormGetValues, UseFormRegister } from "react-hook-form";
import { ProfileFormData } from "./profileSchema";

export default function UseProfileBirthDay({
  register,
  getValues,
}: {
  register: UseFormRegister<ProfileFormData>;
  getValues: UseFormGetValues<ProfileFormData>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { ref, ...registerProps } = register("birthDay");

  const [pickerValue, setPickerValue] = useState({
    year: "2006",
    month: "01",
    day: "01",
  });
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // 년도 배열 생성 (1900~현재)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
    String(currentYear - i),
  );

  // 월 배열
  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0"),
  );

  // 일 배열
  const getDaysInMonth = (year: string, month: string) => {
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) =>
      String(i + 1).padStart(2, "0"),
    );
  };

  const days = getDaysInMonth(pickerValue.year, pickerValue.month);

  // Picker onChange 핸들러
  const handlePickerChange = (value: {
    year: string;
    month: string;
    day: string;
  }) => {
    setPickerValue(value);
  };
  // 확인 버튼 클릭 시
  const handleConfirm = () => {
    // 날짜 형식으로 변환 (YYYY.MM.DD)
    const formattedDate = `${pickerValue.year}.${pickerValue.month}.${pickerValue.day}`;

    // hidden input에 값 설정
    if (inputRef.current) {
      inputRef.current.value = formattedDate;

      // react-hook-form의 onChange 이벤트 트리거
      const event = {
        target: inputRef.current,
        type: "change",
      } as React.ChangeEvent<HTMLInputElement>;
      registerProps.onChange(event);
    }

    setOpen(false);
  };

  // Drawer 열릴 때 현재 값으로 초기화
  const handleDrawerOpen = (isOpen: boolean) => {
    if (isOpen) {
      const currentValue = getValues("birthDay");
      if (currentValue) {
        // YYYY.MM.DD 형식을 파싱
        const [year, month, day] = currentValue.split(".");
        if (year && month && day) {
          setPickerValue({ year, month, day });
        }
      }
    }
    setOpen(isOpen);
  };

  const openDrawer = () => setOpen(true);

  return {
    registerProps,
    inputRef,
    handleDrawerOpen,
    pickerValue,
    years,
    ref,
    openDrawer,
    open,
    handlePickerChange,
    handleConfirm,
    days,
    months,
  };
}
