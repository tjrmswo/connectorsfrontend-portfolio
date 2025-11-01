"use client";
import React from "react";
import { ProfileHeader } from "@/widgets";
import {
  ProfileButton,
  ProfileDate,
  MyProfileGoals,
  ProfileTitle,
  useAddGoalForm,
} from "@/features/career";

export default function MyCareer() {
  const {
    goal,
    data,
    titleError,
    planErrors,
    handleTitleChange,
    handleTitleBlur,
    handlePlanContentChange,
    handlePlanBlur,
    handleGoalChange,
    handleDateChange,
    isFormValid,
  } = useAddGoalForm();

  return (
    <div className="flex h-full w-[28rem] flex-col">
      <ProfileHeader path="/home/profile/career" headerTitle="내 커리어 목표" />

      <main className="flex-1 p-5">
        <div className="flex flex-col gap-6">
          {/* 제목 */}
          <ProfileTitle
            title={data.title}
            titleError={titleError}
            handleTitleChange={handleTitleChange}
            handleTitleBlur={handleTitleBlur}
          />
          {/* 목표설정 */}
          <MyProfileGoals
            goal={goal}
            data={data}
            handlePlanContentChange={handlePlanContentChange}
            handlePlanBlur={handlePlanBlur}
            planErrors={planErrors}
            handleGoalChange={handleGoalChange}
          />
          {/* 시작일 */}
          <ProfileDate handleDateChange={handleDateChange} />
        </div>
      </main>

      {/* 하단 고정 버튼 */}
      <ProfileButton isFormValid={isFormValid} />
    </div>
  );
}
