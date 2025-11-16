import React, { memo } from "react";

export const RecentLoginBadge = memo(() => (
  <span className="absolute -top-5 right-3 inline-block whitespace-nowrap rounded-md border-2 border-[#BDBDBD] bg-white px-4 py-1 font-[Pretendard] text-xs text-[#616161] before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-[6px] before:border-transparent before:border-t-[#BDBDBD] before:content-[''] after:absolute after:left-1/2 after:top-full after:-mt-[2px] after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-t-white after:content-['']">
    최근 로그인
  </span>
));

RecentLoginBadge.displayName = "RecentLoginBadge";

export default RecentLoginBadge;
