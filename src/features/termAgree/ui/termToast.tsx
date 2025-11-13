import { CommonToast, useAnimatedToast } from "@/shared";
import React from "react";

export default function TermToast() {
  const { toast } = useAnimatedToast(1500);
  return (
    <div
      className={`fixed left-1/2 top-[2rem] -translate-x-1/2 rounded-lg border border-[#f4f4f4] bg-[#212121cc] bg-white shadow-xl transition-all duration-300 ease-in-out ${
        toast.state
          ? "translate-y-[0px] opacity-100"
          : "-translate-y-[-20px] opacity-0"
      }`}
    >
      <CommonToast content={toast.comment} status={String(toast.status)} />
    </div>
  );
}
