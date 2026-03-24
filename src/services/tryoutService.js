import api from "./api";
import { TRYOUT_ENDPOINTS } from "./endpoints";

export const registerTryout = (id) => {
  return api.post(TRYOUT_ENDPOINTS.register(id));
};

export const startTryout = (id) => {
  return api.post(TRYOUT_ENDPOINTS.start(id));
};

export const autosaveTryout = (id, answers) => {
  return api.post(TRYOUT_ENDPOINTS.autosave(id), {
    answers,
  });
};

export const submitTryout = (id) => {
  return api.post(TRYOUT_ENDPOINTS.submit(id));
};

export const getRemainingTime = async (id) => {
  try {
    return await api.get(TRYOUT_ENDPOINTS.remainingTime(id));
  } catch (error) {
    // Beberapa backend mungkin tidak menyediakan endpoint ini.
    // Jika tidak ditemukan, kembalikan nilai null agar frontend bisa fallback ke durasi tryout.
    if (error?.response?.status === 404) {
      return { data: { remaining_seconds: null } };
    }
    throw error;
  }
};

export const getResult = (id) => {
  return api.get(TRYOUT_ENDPOINTS.result(id));
};

export const getHistory = () => {
  return api.get(TRYOUT_ENDPOINTS.history);
};

export const getRanking = (id) => {
  return api.get(TRYOUT_ENDPOINTS.ranking(id));
};

export const getMyRank = (id) => {
  return api.get(TRYOUT_ENDPOINTS.myRank(id));
};
