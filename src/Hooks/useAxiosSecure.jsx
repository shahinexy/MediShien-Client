import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

const useAxiosSecure = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  // interceptor request
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
    //   console.log("request stop by interceptor", token);
      config.headers.authoraization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // interceptor responce
  axiosSecure.interceptors.response.use(
    (responce) => {
      return responce;
    },
    async (error) => {
      const status = error.response.status;
      console.log("status error in interseptor", error);
      if (status === 401 || status === 403) {
        await logoutUser();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
