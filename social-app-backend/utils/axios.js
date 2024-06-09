import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.response.use((response) => response.data);
