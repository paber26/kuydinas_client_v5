import api from "./api";
import { WALLET_ENDPOINTS } from "./endpoints";

const ensureArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (Array.isArray(value?.data)) {
    return value.data;
  }

  return [];
};

export const getWallet = () => api.get(WALLET_ENDPOINTS.wallet);

export const getRedeemableTryouts = () =>
  api.get(WALLET_ENDPOINTS.redeemableTryouts);

export const createWalletTopup = (payload) =>
  api.post(WALLET_ENDPOINTS.createTopup, payload);

export const redeemWalletTryout = (tryoutId) =>
  api.post(WALLET_ENDPOINTS.redeemTryout(tryoutId));

export const getWalletTopupPackages = async () => {
  const response = await api.get(WALLET_ENDPOINTS.topupPackages);
  return ensureArray(response.data);
};

export const getWalletTopupDetail = (id) =>
  api.get(WALLET_ENDPOINTS.topupDetail(id));
