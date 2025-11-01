import { useCustomRouter } from "@/shared";
import { ChevronLeft } from "lucide-react";
import React from "react";

export default function LoginHeader() {
  const { navigate } = useCustomRouter();
  return (
    <header className="mt-7 flex w-full flex-row items-center">
      <ChevronLeft
        width={30}
        height={30}
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate({ type: "back" });
        }}
      />
    </header>
  );
}
