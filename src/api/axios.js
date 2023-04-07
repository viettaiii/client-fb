import axios from "axios";

const httpsRequest = axios.create({
  baseURL: "https://viettaiback-end-fb.herokuapp.com",
});

httpsRequest.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
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
