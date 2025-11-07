import { ChevronLeft } from "lucide-react";
import React from "react";
import useHandleBack from "../hooks/useHandleBack";

export default function TermHeader() {
  const { backLogin } = useHandleBack();
  return (
    <header className="mt-7 flex h-[2.1rem] w-full flex-row justify-between border-b border-b-[#E9E9E9] px-6 pb-10 text-start">
      <ChevronLeft
        width={30}
        height={30}
        style={{ cursor: "pointer" }}
        onClick={backLogin}
      />
      <span className="text-[1rem] font-[600]">회원가입</span>
      <div />
    </header>
  );
}
