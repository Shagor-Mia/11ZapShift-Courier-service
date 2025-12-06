import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://zapshift-brown.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
