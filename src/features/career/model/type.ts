export interface ProfileTitleType {
  title: string;
  titleError: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleBlur: () => void;
}

interface PlanType {
  id: number;
  planTitle: string;
  content: string;
}

export interface MyCareerDataType {
  title: string;
  plan: PlanType[];
  date: string;
}

export interface ProfileGoalsType {
  goal: string;
  data: MyCareerDataType;
  handlePlanContentChange: (id: number, content: string) => void;
  handlePlanBlur: (id: number, content: string) => void;
  planErrors: {
    [key: number]: string;
  };
  handleGoalChange: (newGoal: string) => void;
}

export interface ProfileTitleType {
  title: string;
  titleError: string;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleBlur: () => void;
}

interface PlanType {
  id: number;
  planTitle: string;
  content: string;
}

export interface MyCareerDataType {
  title: string;
  plan: PlanType[];
  date: string;
}
