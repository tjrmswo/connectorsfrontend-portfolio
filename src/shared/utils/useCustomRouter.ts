"use client";
import { useRouter } from "next/navigation";

export function useCustomRouter() {
  const router = useRouter();

  const navigate = ({ path, type }: { path?: string; type: string }) => {
    if (type === "push" && path) {
      router.push(path);
    } else if (type === "back") {
      router.back();
    }
  };

  return { navigate };
}
