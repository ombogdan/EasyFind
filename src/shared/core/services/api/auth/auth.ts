import { apiInstance } from "../apiInstance";

export const loginByGoogle = (idToken: string) =>
  apiInstance.post(`api/login/google/`, {idToken});

export const loginByApple = (authorization_code: string) =>
  apiInstance.post("/api/", {authorization_code});
