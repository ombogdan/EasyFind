import { apiInstance } from "../apiInstance";
import {
  checkVerificationCodeType,
  LoginByGoogleType,
  logInData,
  RegisterDataType,
  ResetPasswordType
} from "./auth.types";


export const sendCode = (data: { email: string }) =>
  apiInstance.post("/api/v1/user/generate/code/", data);

export const register = (data: RegisterDataType) =>
  apiInstance.post("/api/v1/user/register/", data);

export const checkUser = (data: { email?: string, username?: string }) =>
  apiInstance.get("/api/v1/user/check/user/", {
    params: data
  });

export const logIn = (data: logInData) =>
  apiInstance.post("/api/v1/user/token/", data);

export const setUsername = (data: { username: string }) =>
  apiInstance.patch("/api/v1/user/me/", data);

export const loginByGoogle = (data: LoginByGoogleType) =>
  apiInstance.post("/api/v1/user/oauth/", data);

export const loginByApple = (authorization_code: string) =>
  apiInstance.post("/api/v1/user/oauth/apple/", {authorization_code});

export const getMe = () =>
  apiInstance.get("/api/v1/user/me/");

export const checkVerificationCode = (data: checkVerificationCodeType) =>
  apiInstance.post("/api/v1/user/check/code/", data);

export const resetPassword = (data: ResetPasswordType) =>
  apiInstance.patch("/api/v1/user/change/password/", data);

export const getPolicy = () =>
  apiInstance.get("/api/v1/user/policies/");

export const getTerms = () =>
  apiInstance.get("/api/v1/user/conditions/");
