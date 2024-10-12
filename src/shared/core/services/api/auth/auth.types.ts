export type RegisterDataType = {
  email: string;
  full_name?: string;
  password?: string;
  code_confirm?: string;
};

export type logInData = {
  email: string;
  password: string;
};

export type LoginByGoogleType = {
  id_token: string;
  email: string;
  full_name: string;
}

export type checkVerificationCodeType = {
  email: string;
  code: string;
}

export type ResetPasswordType = {
  email: string;
  password: string;
  password_1: string;
  code_confirm: string;
}

