import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MyCareerDataType,
  computePlans,
  handleInputError,
  handleTextareaError,
} from "@/features/career";

export default function useAddGoalForm() {
  const [goal, setGoal] = useState<string>("단기 1주");
  const [data, setData] = useState<MyCareerDataType>(computePlans(goal));

  // Title 관련 상태
  const [titleError, setTitleError] = useState("");
  const [_titleTouched, setTitleTouched] = useState(false);

  // Plan 관련 상태
  const [planErrors, setPlanErrors] = useState<{ [key: number]: string }>({});
  const [planTouched, setPlanTouched] = useState<{ [key: number]: boolean }>(
    {},
  );

  // goal 변경 시 data 업데이트
  useEffect(() => {
    const plans = computePlans(goal);
    setData(plans);
  }, [goal]);

  // Title 핸들러
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setData((prev) => ({ ...prev, title: value }));

      setTitleTouched((prev) => {
        if (prev) {
          setTitleError(handleInputError(value));
        }

        return prev;
      });
    },
    [], // 의존성
  );

  // Plan 핸들러 - 함수형 업데이트 사용
  const handlePlanContentChange = useCallback((id: number, content: string) => {
    setData((prev) => ({
      ...prev,
      plan: prev.plan.map((p) => (p.id === id ? { ...p, content } : p)),
    }));

    // planTouched 체크 후 에러 설정
    setPlanTouched((prev) => {
      if (prev[id]) {
        setPlanErrors((prevErrors) => ({
          ...prevErrors,
          [id]: handleTextareaError(content),
        }));
      }
      return prev;
    });
  }, []);

  const handleTitleBlur = () => {
    setTitleTouched(true);
    setTitleError(handleInputError(data.title));
  };

  const handlePlanBlur = (id: number, content: string) => {
    setPlanTouched({ ...planTouched, [id]: true });
    setPlanErrors({ ...planErrors, [id]: handleTextareaError(content) });
  };

  // Goal 변경
  const handleGoalChange = (newGoal: string) => {
    setGoal(newGoal);
    // 에러 상태 초기화
    setTitleError("");
    setTitleTouched(false);
    setPlanErrors({});
    setPlanTouched({});
  };

  // 전체 검증
  const isFormValid = useMemo(() => {
    const titleValid = data.title.length > 0 ? true : false;
    const plansValid = Object.values(data.plan).every(
      (item) => item.content.length > 0,
    );
    const dateValid = data.date.length > 0 ? true : false;

    const check = [titleValid, plansValid, dateValid].every((item) => item);

    return check;
  }, [data]);

  // 제출
  const handleSubmit = async () => {};

  const handleDateChange = useCallback((date: Date | undefined) => {
    const currentDate = date?.toLocaleDateString("ko-KR", {
      weekday: "short",
      month: "numeric",
      day: "numeric",
    });

    setData((prev) => {
      return { ...prev, date: String(currentDate) };
    });
  }, []);

  return {
    // 상태
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

    // 기타
    isFormValid,
    handleSubmit,
  };
}
