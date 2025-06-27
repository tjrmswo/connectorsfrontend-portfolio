interface InterestItem {
  id: number; // 관심사 고유 ID
  name: string; // 관심사 이름
}

export interface profileType {
  memberInfo: {
    id: number;
    nickname: string;
    email: string;
    type: string; // 예: 'NORMAL'
  };
  interestIn: InterestItem[]; // 관심사 배열
}
