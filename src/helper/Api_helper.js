import axios from "axios";
import config from "./config";

export const axiosApi = axios.create();

axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function get(baseURL, url, requestConfig) {
  axiosApi.defaults.baseURL =
    baseURL || config[process.env.REACT_APP_ENV].baseURL;
  return await axiosApi
    .get(url, { ...requestConfig })
    .then((response) => response.data);
}

export async function post(baseURL, url, data, requestConfig) {
  axiosApi.defaults.baseURL =
    baseURL || config[process.env.REACT_APP_ENV].baseURL;
  return await axiosApi
    .post(url, data, { ...requestConfig })
    .then((response) => response.data);
}

export async function deleteRequest(baseURL, url, requestConfig) {
  axiosApi.defaults.baseURL =
    baseURL || config[process.env.REACT_APP_ENV].baseURL;
  return await axiosApi
    .delete(url, { ...requestConfig })
    .then((response) => response.data);
}

export async function put(baseURL, url, data, requestConfig) {
  axiosApi.defaults.baseURL =
    baseURL || config[process.env.REACT_APP_ENV].baseURL;
  return await axiosApi
    .put(url, data, { ...requestConfig })
    .then((response) => response.data);
}
