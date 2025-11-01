import React from "react";
import { ProfileCard, ProfileGoal, profileItems } from "@/entities/profile";

export default function Career() {
  return (
    <div className="flex w-full min-w-[28rem] flex-col items-center gap-4 pb-[3rem] font-[Pretendard]">
      <ProfileGoal
        title="내 커리어 목표"
        content="목표 설정하기"
        href="./career/mycareer"
      />
      <ProfileGoal
        title="기본 정보"
        content="기본 정보 입력"
        href="/home/profile/myprofile"
      />

      <div className="mb-20 flex w-full max-w-[22rem] flex-col gap-3">
        {profileItems.map((item) => (
          <ProfileCard
            key={item.id}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
