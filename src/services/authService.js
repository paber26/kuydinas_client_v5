import api from "./api";
import { AUTH_ENDPOINTS } from "./endpoints";

export const registerUser = (payload) => {
  return api.post(AUTH_ENDPOINTS.user.register, payload);
};

export const loginUser = (payload) => {
  return api.post(AUTH_ENDPOINTS.user.login, payload);
};

export const forgotPassword = (payload) => {
  return api.post(AUTH_ENDPOINTS.user.forgotPassword, payload);
};

export const resetPassword = (payload) => {
  return api.post(AUTH_ENDPOINTS.user.resetPassword, payload);
};

export const resendVerificationEmail = () => {
  return api.post(AUTH_ENDPOINTS.user.resendVerificationEmail);
};
