"use client";
import { Button, Input, QUERY_CONFIG, apiInstance } from "@/shared";
import { ProfileHeader } from "@/widgets";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Gender = "male" | "female" | "";

interface MyprofileDataType {
  name: string;
  date: string;
  gender: Gender;
  phoneNumber: string;
  email: string;
  address: {
    basic: string;
    detail: string;
  };
}

interface UserInfoType {
  email: string;
  imagePath: string;
  memberId: number;
  nickname: string;
}

export default function MyProfile() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [errorMessage, setErrorMessage] = useState<{ [key: string]: string }>(
    {},
  );
  const [data, setData] = useState<MyprofileDataType>({
    name: "",
    date: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: {
      basic: "",
      detail: "",
    },
  });

  useEffect(() => {
    // CSS 로드를 위한 약간의 딜레이
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const userInfo = useQuery<UserInfoType>({
    queryKey: ["getUserInfo"],
    queryFn: async () => {
      const response = await apiInstance.get("/member/me/info");

      console.log("user Info: ", response);

      return response.data;
    },
    staleTime: QUERY_CONFIG.STALE_TIME,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (userInfo.isSuccess) {
      setData({ ...data, email: userInfo.data.email });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.isSuccess]);

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, "");

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleData = (sort: string, inputValue: string) => {
    switch (sort) {
      case "phoneNumber":
        const resetType = formatPhoneNumber(inputValue);
        setData({ ...data, phoneNumber: resetType });
        break;
      case "email":
        setData({ ...data, email: inputValue });
        break;
      default:
        setData({ ...data, [sort]: inputValue });
        break;
    }
  };

  const handleNameBlur = (value: string) => {
    if (value === "") {
      setErrorMessage({ ...errorMessage, name: "이름을 입력해 주세요." });
      setErrors({ ...errors, name: true });
    } else if (value.length < 3) {
      setErrorMessage({
        ...errorMessage,
        name: "이름을 최소 2자 이상 입력해 주세요.",
      });
      setErrors({ ...errors, name: true });
    } else if (value.length > 20) {
      setErrorMessage({
        ...errorMessage,
        name: "이름은 최대 20자까지 입력할 수 있습니다.",
      });
      setErrors({ ...errors, name: true });
    } else {
      setErrors({ ...errors, name: false });
      setErrorMessage({ ...errorMessage, name: "" });
    }
  };

  const handlePhoneNumberBlur = (inputValue: string) => {
    const regex = /^[0-9]*$/;
    if (regex.test(inputValue)) {
      setErrorMessage({
        ...errorMessage,
        phoneNumber: "숫자만 입력 가능합니다.",
      });
      setErrors({ ...errors, phoneNumber: true });
    } else if (inputValue.length > 30) {
      setErrorMessage({
        ...errorMessage,
        phoneNumber: "이름은 최대 30자까지 입력할 수 있습니다.",
      });
      setErrors({ ...errors, phoneNumber: true });
    } else {
      setErrors({ ...errors, phoneNumber: false });
    }
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;

    if (!email) {
      return "이메일을 입력해 주세요.";
    }
    if (!emailRegex.test(email)) {
      return "올바른 이메일 주소를 입력해 주세요.";
    }
    if (email.length > 100) {
      return "이메일은 최대 100자까지 입력할 수 있습니다.";
    }
    return "";
  };

  const handleEmailBlur = (inputValue: string) => {
    const error = validateEmail(inputValue);

    if (error) {
      setErrorMessage({ ...errorMessage, email: error });
      setErrors({ ...errors, email: true });
    } else {
      setErrors({ ...errors, email: false });
      setErrorMessage({ ...errorMessage, email: "" });
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div
      className={`flex h-full min-h-full w-[28rem] flex-col transition-opacity duration-300 ${isReady ? "opacity-100" : "opacity-0"} `}
    >
      <ProfileHeader path="/home/profile/career" headerTitle="기본 정보" />

      <main className="flex flex-1 flex-col items-center gap-5 p-9">
        {userInfo.isSuccess ? (
          <div className="flex h-28 w-20 flex-col items-center justify-center rounded-lg">
            <Image
              className="w-full rounded-lg object-contain"
              src={`https://${process.env.NEXT_PUBLIC_IMG_DOMAIN}${userInfo.data.imagePath}`}
              alt="유저 이미지"
              width={15}
              height={15}
            />
          </div>
        ) : (
          <div className="flex h-28 w-20 flex-col items-center justify-center rounded-lg bg-[#d9d9d9]">
            <Image
              className="mt-4"
              src={"/images/profile/myprofileBasicImg.png"}
              alt="기본이미지"
              width={33}
              height={33}
            />
            <Image
              className="relative left-10 top-8"
              src={"/images/profile/myprofileCameraIcon.png"}
              alt="기본이미지"
              width={20}
              height={20}
            />
          </div>
        )}

        {/* 이름 */}
        <div className="flex w-full flex-col gap-3">
          <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
            <span className="mr-1 text-[#000]">이름</span>
            <span className="text-[#F5514B]">*</span>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              value={data?.name}
              onBlur={() => handleNameBlur(data?.name)}
              className={`rounded-sm border-2 font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] ${
                errors["name"]
                  ? "border-[#E25C6E]"
                  : "border-[#d9d9d9] focus:border-[#6E4DDC]"
              }`}
              placeholder="이름을 입력해 주세요"
              maxLength={21}
              onChange={(e) => handleData("name", e.target.value)}
              required
            />
            {errors["name"] && (
              <span className="pl-1 font-[Pretendard] text-sm font-normal leading-[20px] text-[#E25C6E]">
                {errorMessage["name"]}
              </span>
            )}
          </div>
        </div>
        {/* 생년월일 */}
        <div className="flex w-full flex-col gap-3">
          <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
            <span className="mr-1 text-[#000]">생년월일</span>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              // value={data?.title}
              // onChange={handleTitleChange}
              // onBlur={handleBlur}
              // className={`rounded-sm border-2 font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] ${
              //   titleError
              //     ? "border-[#E25C6E]"
              //     : "border-[#d9d9d9] focus:border-[#6E4DDC]"
              // }`}
              className={`w-full rounded-sm border-2 border-[#d9d9d9] font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] focus:border-[#6E4DDC]`}
              placeholder="생년월일을 입력해 주세요"
              maxLength={51}
            />
            {/* {titleError && (
              <span className="pl-1 font-[Pretendard] text-sm font-normal leading-[20px] text-[#E25C6E]">
                {titleError}
              </span>
            )} */}
          </div>
        </div>
        {/* 성별 */}
        <div className="flex w-full flex-col gap-3">
          <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
            <span className="mr-1 text-[#000]">성별</span>
          </div>
          <div className="flex flex-row gap-2 border-[#d9d9d9] font-[Pretendard] font-normal leading-[12px] text-[#d9d9d9]">
            <Button
              className={`${data.gender === "male" && "border-[#000] text-[#000]"} w-1/2 border-2 hover:border-[#000] hover:text-[#000]`}
              variant={"outline"}
              onClick={() => handleData("gender", "male")}
            >
              남자
            </Button>
            <Button
              className={`${data.gender === "female" && "border-[#000] text-[#000]"} w-1/2 border-2 hover:border-[#000] hover:text-[#000]`}
              variant={"outline"}
              onClick={() => handleData("gender", "female")}
            >
              여자
            </Button>
            {/* {titleError && (
              <span className="pl-1 font-[Pretendard] text-sm font-normal leading-[20px] text-[#E25C6E]">
                {titleError}
              </span>
            )} */}
          </div>
        </div>
        {/* 휴대전화 */}
        <div className="flex w-full flex-col gap-3">
          <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
            <span className="mr-1 text-[#000]">휴대전화</span>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              onBlur={() => handlePhoneNumberBlur(data?.phoneNumber)}
              className={`rounded-sm border-2 font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] ${
                errors["phoneNumber"]
                  ? "border-[#E25C6E]"
                  : "border-[#d9d9d9] focus:border-[#6E4DDC]"
              }`}
              value={data.phoneNumber}
              maxLength={31}
              onChange={(e) => handleData("phoneNumber", e.target.value)}
            />
            {errors["phoneNumber"] && (
              <span className="pl-1 font-[Pretendard] text-sm font-normal leading-[20px] text-[#E25C6E]">
                {errorMessage["phoneNumber"]}
              </span>
            )}
          </div>
        </div>
        {/* 이메일  */}
        <div className="flex w-full flex-col gap-3">
          <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
            <span className="mr-1 text-[#000]">이메일</span>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              value={data.email}
              onBlur={() => handleEmailBlur(data.email)}
              className={`rounded-sm border-2 font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] ${
                errors["email"]
                  ? "border-[#E25C6E]"
                  : "border-[#d9d9d9] focus:border-[#6E4DDC]"
              }`}
              maxLength={101}
              onChange={(e) => handleData("email", e.target.value)}
            />
            {errors["email"] && (
              <span className="pl-1 font-[Pretendard] text-sm font-normal leading-[20px] text-[#E25C6E]">
                {errorMessage["email"]}
              </span>
            )}
          </div>
        </div>
        {/* 주소  카카오맵 api로 구현하기*/}
        <div className="flex w-full flex-col gap-3">
          <div className="font-sm flex flex-row items-center font-[Pretendard] font-medium leading-[12px]">
            <span className="mr-1 text-[#000]">주소</span>
          </div>
          <div className="flex flex-col gap-2">
            <Input
              // value={data?.title}
              // onChange={handleTitleChange}
              // onBlur={handleBlur}
              // className={`rounded-sm border-2 font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] ${
              //   titleError
              //     ? "border-[#E25C6E]"
              //     : "border-[#d9d9d9] focus:border-[#6E4DDC]"
              // }`}
              className={`w-full rounded-sm border-2 border-[#d9d9d9] font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] focus:border-[#6E4DDC]`}
              placeholder="주소를 입력해 주세요"
              maxLength={101}
            />
            <Input
              // value={data?.title}
              // onChange={handleTitleChange}
              // onBlur={handleBlur}
              // className={`rounded-sm border-2 font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] ${
              //   titleError
              //     ? "border-[#E25C6E]"
              //     : "border-[#d9d9d9] focus:border-[#6E4DDC]"
              // }`}
              className={`w-full rounded-sm border-2 border-[#d9d9d9] font-[Pretendard] font-normal leading-[12px] transition-colors placeholder:text-[#9199A4] focus:border-[#6E4DDC]`}
              placeholder=""
              maxLength={51}
            />
            {/* {titleError && (
              <span className="pl-1 font-[Pretendard] text-sm font-normal leading-[20px] text-[#E25C6E]">
                {titleError}
              </span>
            )} */}
          </div>
        </div>
      </main>

      <div className="p-5">
        <Button
          variant={"outline"}
          size={"lg"}
          className="h-12 w-full bg-black font-[Pretendard] text-lg font-medium leading-[23px] text-[#fff] hover:bg-black hover:text-[#fff]"
        >
          작성완료
        </Button>
      </div>
    </div>
  );
}
