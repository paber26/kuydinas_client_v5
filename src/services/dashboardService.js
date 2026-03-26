import api from "./api";
import { DASHBOARD_ENDPOINTS } from "./endpoints";

export const getDashboardSummary = () => {
  return api.get(DASHBOARD_ENDPOINTS.summary);
};
