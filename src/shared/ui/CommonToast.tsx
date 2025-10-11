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
  const [open, setOpen] = useState(true);

  function judgingStatus() {
    console.log(status.substring(0, 1));
    if (status.substring(0, 1) === "2") {
      return "✅";
    } else if (status.substring(0, 1) === "4") {
      return (
        <Image
          src={"/images/common/warn.png"}
          alt="warn"
          width={25}
          height={25}
        />
      );
    }
  }

  return (
    <Toast.Provider swipeDirection="up">
      <Toast.Root open={open} onOpenChange={setOpen} duration={2000}>
        {/* <Toast.Title></Toast.Title> */}
        <Toast.Description className="flex w-auto flex-row items-center px-3 py-1 font-[Pretendard]">
          {judgingStatus()} <span className="ml-2">{content}</span>
        </Toast.Description>
        {/* <Toast.Action altText="닫기" asChild>
          <button onClick={handleToast}>닫기</button>
        </Toast.Action> */}
      </Toast.Root>
      <Toast.Viewport />
    </Toast.Provider>
  );
}
