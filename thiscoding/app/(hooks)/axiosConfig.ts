import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
});