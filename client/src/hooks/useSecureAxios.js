import React from "react";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useSecureAxios = () => {
  return axiosSecure;
};

export default useSecureAxios;
