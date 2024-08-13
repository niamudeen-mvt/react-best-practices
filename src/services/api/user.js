import api from "../../utils/axios";
import { LOGIN_USER, REFRESH_TOKEN, REGISTER_USER, USER_DETAILS } from "../url";

export const registerUser = async (body) => {
  try {
    const response = await api.post(REGISTER_USER, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (body) => {
  try {
    const response = await api.post(LOGIN_USER, body);
    return response;
  } catch (error) {
    return error;
  }
};
export const userById = async () => {
  try {
    const response = await api.get(USER_DETAILS);
    return response;
  } catch (error) {
    return error;
  }
};

export const refreshToken = async (body) => {
  try {
    const response = await api.post(REFRESH_TOKEN, body);
    return response;
  } catch (error) {
    return error;
  }
};
