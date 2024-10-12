import { apiInstance } from "../apiInstance";
import { LoginByGoogleType, } from "./auth.types";


export const loginByGoogle = (data: LoginByGoogleType) =>
  apiInstance.post("/api/v1/user/oauth/", data);

export const loginByApple = (authorization_code: string) =>
  apiInstance.post("/api/v1/user/oauth/apple/", {authorization_code});

export const getMe = () =>
  apiInstance.get("/api/v1/user/me/");
