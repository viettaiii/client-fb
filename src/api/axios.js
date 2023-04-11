import axios from "axios";

const httpsRequest = axios.create({
  baseURL: "http://localhost:5500",
});
httpsRequest.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default httpsRequest;
