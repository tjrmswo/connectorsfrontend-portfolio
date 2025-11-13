"use client";
import { useTimeout } from "@/shared";
import React from "react";
import { TermHeader, TermList, useHandleTerms } from "@/features/termAgree";
import { TermTitle } from "@/entities/term";
import dynamic from "next/dynamic";

const TermToast = dynamic(
  () => import("@/features/termAgree").then((m) => m.TermToast),
  { ssr: false },
);

export default function TermsAgreement() {
  const { isReady } = useTimeout();
  const { shouldRender } = useHandleTerms();

  return (
    <div
      className={`flex size-full flex-col justify-start gap-8 p-[6px] transition-opacity duration-300 ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      <TermHeader />
      <TermTitle />
      <TermList />
      {shouldRender && <TermToast />}
    </div>
  );
}
