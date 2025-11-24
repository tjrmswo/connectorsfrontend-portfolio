export const ANIMATION_TIMING = {
  INTRO_FADE_OUT: 1500,
  INTRO_TOTAL: 2700,
} as const;

export const SLIDER_CONFIG = {
  TOTAL_SLIDES: 5,
  LAST_SLIDE_INDEX: 4,
} as const;

export const QUERY_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5분
  CACHE_TIME: 1000 * 60 * 30, // 30분
} as const;

export const tabIcons = [
  {
    name: "콘텐츠",
    content: "content",
    index: 0,
    path: "/home/content",
    src: "/images/home/content.png",
  },
  {
    name: "탐색",
    content: "search",
    index: 1,
    path: "/home/search",
    src: "/images/home/search.png",
  },
  {
    name: "로드맵",
    content: "roadMap",
    index: 2,
    path: "/home/roadMap",
    src: "/images/home/roadMap.png",
  },
  {
    name: "프로필",
    content: "profile",
    index: 3,
    path: "/home/profile/default",
    src: "/images/home/profile.png",
  },
];
