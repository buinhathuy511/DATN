import { axiosInstance } from "../utils/axios.js";

export const getPrediction = (content) => {
  return axiosInstance.post("/prediction", { content });
};
