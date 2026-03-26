import api from "./api";
import { AUTH_ENDPOINTS } from "./endpoints";

export const getUserProfile = () => {
  return api.get(AUTH_ENDPOINTS.user.me);
};

export const updateUserProfile = (payload) => {
  return api.put(AUTH_ENDPOINTS.user.profile, payload);
};
