// features/auth/ui/LoginToast.tsx
import { memo } from "react";
import { CommonToast } from "@/shared";
import type { LoginToastProps } from "@/features/auth";

export const LoginToast = memo(({ toast, shouldRender }: LoginToastProps) => {
  if (!shouldRender) return null;

  return (
    <div
      className={`fixed top-[2rem] z-50 rounded-lg border border-[#f4f4f4] shadow-xl transition-all duration-300 ease-in-out ${
        toast.state ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
      }`}
    >
      <CommonToast content={toast.comment} status={String(toast.status)} />
    </div>
  );
});

LoginToast.displayName = "LoginToast";
