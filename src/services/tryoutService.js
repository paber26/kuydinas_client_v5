import api from "./api";

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

export const getRemainingTime = (id) => {
  return api.get(`/tryouts/${id}/remaining-time`);
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
