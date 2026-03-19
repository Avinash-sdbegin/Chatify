import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatify-backend-4qij.onrender.com",
  withCredentials: true,
});
