import React, { memo } from "react";

export const RecentLoginBadge = memo(() => (
  <span className="absolute -right-11 whitespace-nowrap rounded-2xl bg-black px-3 py-1 font-[Pretendard] text-sm text-white">
    최근 로그인
  </span>
));

RecentLoginBadge.displayName = "RecentLoginBadge";

export default RecentLoginBadge;
