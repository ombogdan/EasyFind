import { nearbyTypes } from "services/api/user/user.types";
import { apiInstance } from "../apiInstance";

export const deleteAccount = () => apiInstance.delete(`/api/`);

export const getMe = () =>
  apiInstance.get("/api/");

export const getNearbyOrganizations = (data: nearbyTypes) =>
  apiInstance.post("/api/organizations/nearby/", data);

export const getNearbyServices = ({ latitude, longitude, page, page_size }: nearbyTypes) =>
  apiInstance.get(`/api/nearby-services/?latitude=${latitude}&longitude=${longitude}&page=${page || 1}&page_size=${page_size || 20}`);
