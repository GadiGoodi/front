import axios, { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  //백엔드 설정 될때까지 false 유지
  withCredentials: false
});