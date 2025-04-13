import axios from "axios";
import { authThunks } from "store/thunks";
import { store } from "store/index";
import { asyncStorageService } from "../async-storage-service";

const TOKEN_TYPE = "Bearer";
const BASE_URL = "https://easyfindbackend.onrender.com/";

export const apiInstance = axios.create({
  baseURL: BASE_URL
});

apiInstance.interceptors.request.use(async (config) => {
  const accessToken = await asyncStorageService.getAccessToken();
  config.headers.Authorization = accessToken ? `${TOKEN_TYPE} ${accessToken}` : "";
  return config;
});

apiInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 403 && error.response.data.code === "token_not_valid" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await asyncStorageService.getRefreshToken();
        const { data } = await axios.post(`${BASE_URL}/api/token/refresh/`, {
          refresh: refreshToken
        });
        await asyncStorageService.setAccessToken(data.access);
        apiInstance.defaults.headers.common.Authorization = `${TOKEN_TYPE} ${data.access}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        // @ts-ignore
        store.dispatch(authThunks.userLogout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
