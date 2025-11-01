import { useCustomRouter } from "@/shared";
import { ChevronLeft } from "lucide-react";
import React from "react";

export default function ProfileHeader({
  path,
  headerTitle,
}: {
  path: string;
  headerTitle: string;
}) {
  const { navigate } = useCustomRouter();
  const handleBack = () => navigate({ type: "push", path: path });

  return (
    <header className="mt-5 flex w-full flex-row items-center justify-between px-5">
      <ChevronLeft
        className="cursor-pointer"
        width={30}
        height={30}
        onClick={handleBack}
      />
      <span className="font-[Pretendard] text-lg font-semibold leading-[26px]">
        {headerTitle}
      </span>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </header>
  );
}
