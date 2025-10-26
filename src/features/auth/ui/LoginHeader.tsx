import { useCustomRouter } from "@/shared";
import { ChevronLeft } from "lucide-react";
import React from "react";

export default function LoginHeader() {
  const { navigate } = useCustomRouter();
  return (
    <header className="relative left-6 top-1 mt-7 w-full text-start">
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
