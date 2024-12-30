import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://citysmiledentalclinic-server.onrender.com/api/cs",
  withCredentials: true, 
});

export default axiosInstance;
