import axios from "axios";

const axiosInstance = axios.create({

  baseURL: "https://glossbeauty-ecommerce.onrender.com",
  withCredentials: true,
});
console.log("AxiosInstance Base URL:", axiosInstance.defaults.baseURL);

export default axiosInstance;
