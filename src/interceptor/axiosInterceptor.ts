import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "https://41a6867a08e37e5e.mokky.dev";

const getAccessToken = (): string | null => localStorage.getItem("accessToken");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const useAuthInterceptor = () => {
  const auth = useContext(AuthContext);

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error: AxiosError): Promise<never> => {
      if (error.response?.status === 401 && auth) {
        console.error("Unathorized! Redirected to login...");
        localStorage.removeItem("accessToken");
        auth.setAuth(false);
      }
      return Promise.reject(error);
    }
  );
};

export { api, useAuthInterceptor };
