import axios from "axios";
import { defaultAxiosOptions } from "../config";

export const axiosClient = axios.create(defaultAxiosOptions);

axiosClient.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.data.statusCode === 401) {
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);

export function setAuthToken(token) {
  if (token) {
    axiosClient.defaults.headers.common.Authorization = `${token}`;
  }
}
