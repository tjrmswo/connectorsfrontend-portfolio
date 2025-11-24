export type Gender = "male" | "female" | "";

export interface MyprofileDataType {
  name: string;
  birthDay: string;
  gender: Gender;
  phone: string;
  email: string;
  address: {
    basic: string;
    detail: string;
  };
}
