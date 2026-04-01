import api from "./api";
import { TRYOUT_ENDPOINTS } from "./endpoints";

export const registerTryout = (id) => {
  return api.post(TRYOUT_ENDPOINTS.register(id));
};

export const getTryoutList = () => {
  return api.get(TRYOUT_ENDPOINTS.list);
};

export const getTryoutDetail = (id) => {
  return api.get(TRYOUT_ENDPOINTS.detail(id));
};

export const startTryout = (id) => {
  return api.post(TRYOUT_ENDPOINTS.start(id));
};

export const autosaveTryout = (id, answers = {}, sessionState = {}) => {
  return api.post(TRYOUT_ENDPOINTS.autosave(id), {
    answers,
    session_state: sessionState,
  });
};

export const submitTryout = (id, answers = {}, sessionState = {}) => {
  return api.post(TRYOUT_ENDPOINTS.submit(id), {
    answers,
    session_state: sessionState,
  });
};

export const getRemainingTime = async (id) => {
  try {
    return await api.get(TRYOUT_ENDPOINTS.remainingTime(id));
  } catch (error) {
    if (error?.response?.status === 404) {
      return { data: { remaining_seconds: null } };
    }
    throw error;
  }
};

export const getResult = (id, params = {}) => {
  return api.get(TRYOUT_ENDPOINTS.result(id), { params });
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
