import { apiInstance } from '../apiInstance';

export const deleteAccount = () => apiInstance.delete(`/api/`);

export const getMe = () =>
  apiInstance.get("/api/");
