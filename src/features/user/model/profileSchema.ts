import { z } from "zod";

// 허용된 이메일 도메인 목록
const ALLOWED_EMAIL_DOMAINS = [
  "naver.com",
  "gmail.com",
  "daum.net",
  "kakao.com",
  "nate.com",
  "hanmail.net",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
];

// 파일 검증을 위한 커스텀 스키마
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "이름을 입력해 주세요.")
    .min(2, "이름은 최소 2자 이상 입력해 주세요.")
    .max(20, "이름은 최대 20자까지 입력할 수 있습니다."),
  phone: z
    .string()
    .min(1, "전화번호를 입력해주세요")
    .max(30, "휴대전화 번호는 최대 30자까지 입력할 수 있습니다.")
    .regex(/^[0-9-]+$/, "숫자만 입력 가능합니다.")
    .optional(),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .max(100, "이메일은 최대 100자까지 입력할 수 있습니다.")
    .email("올바른 이메일 주소를 입력해주세요.")
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return ALLOWED_EMAIL_DOMAINS.includes(domain);
      },
      {
        message:
          "허용된 이메일 도메인이 아닙니다 (naver.com, gmail.com 등만 가능)",
      },
    )
    .optional(),
  gender: z.string().min(1, "성별은 필수입니다").optional(),
  address: z
    .object({
      roadAddress: z.string().optional(),
      detailAddress: z
        .string()
        .min(1, "상세주소를 입력해 주세요.")
        .max(100, "상세 주소는 최대 100자까지 입력할 수 있습니다.")
        .optional(),
      zipCode: z.string().min(1, "우편번호를 입력해 주세요").optional(),
    })
    .optional(),
  birthDay: z.string().optional(),
  image: z
    .any()
    .refine(
      (val) => {
        // 서버에서는 통과
        if (typeof window === "undefined") return true;
        // 클라이언트에서만 검증
        if (typeof FileList === "undefined") return true;
        return val instanceof FileList && val.length > 0;
      },
      {
        message: "이미지를 선택해주세요",
      },
    )
    .refine(
      (val) => {
        if (typeof window === "undefined") return true;
        if (typeof FileList === "undefined") return true;
        if (!(val instanceof FileList) || val.length === 0) return false;
        return val[0].size <= MAX_FILE_SIZE;
      },
      {
        message: "파일 크기는 5MB 이하여야 합니다",
      },
    )
    .refine(
      (val) => {
        if (typeof window === "undefined") return true;
        if (typeof FileList === "undefined") return true;
        if (!(val instanceof FileList) || val.length === 0) return false;
        return ACCEPTED_IMAGE_TYPES.includes(val[0].type);
      },
      {
        message: "jpg, png, webp 형식의 이미지만 업로드 가능합니다",
      },
    ),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// 도메인 목록도 export
export { ALLOWED_EMAIL_DOMAINS };
