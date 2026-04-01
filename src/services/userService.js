import api from "./api";
import { AUTH_ENDPOINTS, REGION_ENDPOINTS } from "./endpoints";

export const getUserProfile = () => {
  return api.get(AUTH_ENDPOINTS.user.me);
};

export const updateUserProfile = (payload) => {
  return api.put(AUTH_ENDPOINTS.user.profile, payload);
};

export const getProvinces = () => {
  return api.get(REGION_ENDPOINTS.provinces);
};

export const getRegencies = (provinceCode) => {
  return api.get(REGION_ENDPOINTS.regencies(provinceCode));
};

export const getDistricts = (regencyCode) => {
  return api.get(REGION_ENDPOINTS.districts(regencyCode));
};
