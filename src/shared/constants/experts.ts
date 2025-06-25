interface expertsType {
  id: number;
  src: string;
  expertName: string;
  field: string;
}
export const experts: expertsType[] = [
  {
    id: 1,
    src: 'https://connecting-road-image-bucket.s3.ap-northeast-2.amazonaws.com/%EB%82%A8%EB%8B%A4%ED%9D%AC%EC%A0%84%EB%AC%B8%EA%B0%80.png',
    expertName: '남다희',
    field: '마케팅',
  },
  {
    id: 2,
    src: 'https://connecting-road-image-bucket.s3.ap-northeast-2.amazonaws.com/%EC%84%9C%EB%8F%99%EC%9E%AC%EC%A0%84%EB%AC%B8%EA%B0%80.png',
    expertName: '서동재',
    field: 'HR',
  },
  {
    id: 3,
    src: 'https://connecting-road-image-bucket.s3.ap-northeast-2.amazonaws.com/%EC%9D%B4%ED%98%9C%EB%82%98%EC%A0%84%EB%AC%B8%EA%B0%80.png',
    expertName: '혜나',
    field: '전략/기획',
  },
  {
    id: 4,
    src: 'https://connecting-road-image-bucket.s3.ap-northeast-2.amazonaws.com/%EC%A0%95%EB%B3%B5%EC%97%B0%EC%A0%84%EB%AC%B8%EA%B0%80.png',
    expertName: '정복연',
    field: '창업/N잡',
  },
];
