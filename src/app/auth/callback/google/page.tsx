"use client";
import { CSSLoader } from "@/shared/ui";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useGoogleLogin } from "@/features/auth";

export default function Provider() {
  const params = useSearchParams();
  const loginMutation = useGoogleLogin(params);

  useEffect(() => {
    loginMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CSSLoader />;
}
