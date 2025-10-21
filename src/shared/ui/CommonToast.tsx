"use client";
import React, { useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import Image from "next/image";

export default function CommonToast({
  content,
  status,
}: {
  content: string;
  status: string;
}) {
  const [open, setOpen] = useState<boolean>(true);

  function judgingStatus() {
    if (status.substring(0, 1) === "2") {
      return "✅";
    } else if (
      status.substring(0, 1) === "4" ||
      status.substring(0, 1) === "5"
    ) {
      {
        return (
          <Image
            src={"/images/common/warn.png"}
            alt="warn"
            width={27}
            height={27}
          />
        );
      }
    }
  }

  return (
    <Toast.Provider swipeDirection="up">
      <Toast.Root open={open} onOpenChange={setOpen} duration={2500}>
        <Toast.Description className="flex w-auto flex-row items-center px-5 py-2 font-[Pretendard]">
          {judgingStatus()} <span className="ml-2 text-nowrap">{content}</span>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}
