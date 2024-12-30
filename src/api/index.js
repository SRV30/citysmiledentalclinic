import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://citysmiledentalclinic-server.vercel.app/api/cs",
  withCredentials: true, 
});

export default axiosInstance;
