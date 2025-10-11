"use client";
import { LoginSuccessType, LoginErrorType } from "@/entities/auth/type";
import { CSSLoader, useCustomRouter } from "@/shared";
import instance from "@/shared/api/apiInstance";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Provider() {
  const params = useSearchParams();

  const { navigate } = useCustomRouter();

  const Login = useMutation<LoginSuccessType, LoginErrorType>({
    mutationKey: ["KakaoLogin"],
    mutationFn: async () => {
      const [code, state] = ["code", "state"].map((d) => params.get(`${d}`));

      const response = await instance.post("/auth/oauth2/login", {
        provider: "KAKAO",
        code,
        state,
      });

      console.log("access Token 발급: ", response);

      return response.data;
    },
    onSuccess: (data: { new: boolean; redirectPath: string }) => {
      // navigate({ path: `${data.redirectPath}`, type: "push" });
      const loginTimer = setTimeout(() => {
        navigate({ path: `${data.redirectPath}`, type: "push" });
      }, 1500);
      return () => clearTimeout(loginTimer);
    },
    onError: (e) => {
      console.log(
        "에러 상태: ",
        e.response.data.errorCode,
        e.response.data.message,
      );
      if (e.response.data.errorCode === "ATH-002") {
        const termsTimer = setTimeout(() => {
          navigate({ path: "/auth/termsAgreement", type: "push" });
        }, 2500);
        return () => clearTimeout(termsTimer);
      }
    },
  });

  useEffect(() => {
    Login.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CSSLoader />;
}
