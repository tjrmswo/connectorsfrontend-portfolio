import { SetStateAction } from "react";

export interface LoginType {
  redirectPath: string | null;
  setShowToast: React.Dispatch<
    SetStateAction<{
      comment: string;
      status: string;
      state: boolean;
    }>
  >;
}

interface Response {
  data: {
    errorCode: string;
    message: string;
    timeStamp: string;
  };
}

interface Config {
  baseURL: string | undefined;
  data: string;
  method: string;
}

export interface LoginErrorType {
  config: Config;
  code: string;
  message: string;
  status: number;
  response: Response;
}

export interface LoginSuccessType {
  config: Config;
  data: { redirectPath: string; new: boolean };
  status: number;
}

export interface TermAgreementType {
  content: string;
  effectiveAt: string;
  required: boolean;
  termsId: number;
  title: string;
  version: string;
  state?: boolean;
}

export interface TermsDataType {
  termsId: number;
  state: boolean;
}
