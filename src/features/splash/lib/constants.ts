export const ANIMATION_TIMING = {
  INTRO_FADE_OUT: 1700,
  INTRO_TOTAL: 3200,
} as const;

export const SLIDER_CONFIG = {
  TOTAL_SLIDES: 5,
  LAST_SLIDE_INDEX: 4,
} as const;

export const QUERY_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5분
  CACHE_TIME: 1000 * 60 * 30, // 30분
} as const;
