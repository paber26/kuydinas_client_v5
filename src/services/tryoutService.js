import api from "./api";

export const registerTryout = (id) => {
  return api.post(`/tryouts/${id}/register`);
};

export const startTryout = (id) => {
  return api.post(`/tryouts/${id}/start`);
};

export const autosaveTryout = (id, answers) => {
  return api.post(`/tryouts/${id}/autosave`, {
    answers,
  });
};

export const submitTryout = (id) => {
  return api.post(`/tryouts/${id}/submit`);
};

export const getRemainingTime = async (id) => {
  try {
    return await api.get(`/tryouts/${id}/remaining-time`);
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
  return api.get(`/tryouts/${id}/result`);
};

export const getHistory = () => {
  return api.get(`/history`);
};

export const getRanking = (id) => {
  return api.get(`/tryouts/${id}/ranking`);
};

export const getMyRank = (id) => {
  return api.get(`/tryouts/${id}/my-rank`);
};
