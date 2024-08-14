import axios from "axios";
import { getDataFromLc, setDataIntoLc } from "./helper";

const BASE_URL = "http://localhost:7000/api/v1";
// const BASE_URL = "https://ecommerce-backend-jy6t.onrender.com/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async function (config) {
  const token = getDataFromLc("token");
  if (!["/auth/login", "/auth/register"].includes(config.url)) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let IS_REFRESHING = false;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !IS_REFRESHING) {
      IS_REFRESHING = true;
      try {
        const token = getDataFromLc("token");
        const userId = getDataFromLc("userId");

        const response = await axiosInstance.get(
          `/auth/refresh-token/${userId}`,
          {
            refresh_token: token,
          }
        );

        if (response?.status === "SUCCESS") {
          const token = response?.token;
          setDataIntoLc("token", token);
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
      } finally {
        IS_REFRESHING = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
