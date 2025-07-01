import axios from "axios";

const axiosInstance = axios.create({

  baseURL: "https://glossbeauty-ecommerce.onrender.com",
  withCredentials: true,
});
export default axiosInstance;

