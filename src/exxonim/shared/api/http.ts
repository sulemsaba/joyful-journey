import axios, { type AxiosInstance } from "axios";

export function createHttpClient(baseURL: string, timeout = 4000): AxiosInstance {
  return axios.create({
    baseURL,
    timeout,
  });
}
