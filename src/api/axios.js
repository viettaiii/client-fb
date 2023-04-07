import axios from "axios";
import Cookies from "js-cookie";
const httpsRequest = axios.create({
    
  baseURL: "https://viettaiback-end-fb.herokuapp.com",
  withCredentials: true,
  timeout: 5000,
  // headers: {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${Cookies.get("accessToken")}`,
  // },
});

// httpsRequest.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     console.log(token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export default httpsRequest;
