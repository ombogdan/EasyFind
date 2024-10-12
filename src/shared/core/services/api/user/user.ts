import { apiInstance } from '../apiInstance';

export const deleteAccount = () => apiInstance.delete(`/api/v1/user/me/`);
