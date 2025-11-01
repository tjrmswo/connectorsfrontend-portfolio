// input error 분류 함수
export const handleInputError = (title: string | undefined) => {
  if (!title || title.length === 0) {
    // 👈 undefined 체크
    return "제목을 입력해 주세요";
  } else if (title.length > 50) {
    return "최대 50자까지 입력할 수 있습니다.";
  }
  return "";
};

// Textarea error 분류 함수
export const handleTextareaError = (content: string | undefined) => {
  if (!content || content.length === 0) {
    return "계획 내용을 작성해 주세요";
  } else if (content.length > 200) {
    return "최대 200자까지 입력할 수 있습니다.";
  }
  return "";
};

// 글자수 체크 함수
export const checkContentsLength = (content: string) => {
  return content?.length || 0;
};

// 기간 설정 헬퍼 함수
export function computePlans(goal: string) {
  switch (goal) {
    case "단기 1주":
      return {
        title: "",
        plan: [{ id: 1, planTitle: "1주차 계획", content: "" }],
        date: "",
      };
    case "중기 2주":
      return {
        title: "",
        plan: [
          { id: 1, planTitle: "1주차 계획", content: "" },
          { id: 2, planTitle: "2주차 계획", content: "" },
        ],
        date: "",
      };
    case "장기 3주":
      return {
        title: "",
        plan: [
          { id: 1, planTitle: "1주차 계획", content: "" },
          { id: 2, planTitle: "2주차 계획", content: "" },
          { id: 3, planTitle: "3주차 계획", content: "" },
        ],
        date: "",
      };
    default:
      return {
        title: "",
        plan: [{ id: 1, planTitle: "1주차 계획", content: "" }],
        date: "",
      };
  }
}
