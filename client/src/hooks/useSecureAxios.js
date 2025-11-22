import React from "react";
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

const useSecureAxios = () => {
  return axiosSecure;
};

export default useSecureAxios;
