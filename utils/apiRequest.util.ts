import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { LocalStorage } from "@/utils/localStorage.util";
import { cache } from "react";

const apiWithoutCache = axios.create();

const handleUnauthorized = () => {
  try {
    LocalStorage.remove("token");
    LocalStorage.remove("user");
    if (window.location.pathname.startsWith("/user")) {
      // console.log("redirection to login from ApiRequest");
      window.location.href = "/auth/login";
    } else if (window.location.pathname.startsWith("/admin")) {
      window.location.href = "/auth/admin/login";
    }
    return;
  } catch (error) {
    console.error("Error handling unauthorized state:", error);
  }
};

const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      // console.log("error from apiRequest", error);
      if (error.response?.status === 401) {
        handleUnauthorized();
      }
      if (window.location.pathname.startsWith("/user")) {
        if (error.response?.status === 403) {
          window.location.href = "user/dashboard";
        }
      }
      return Promise.reject(error);
    }
  );
};

setupInterceptors(apiWithoutCache);

const cachedAxiosGet = cache(
  async (url: string, headers?: AxiosRequestConfig["headers"]) => {
    const response = await apiWithoutCache.get(url, { headers });
    return response.data;
  }
);

export class ApiRequest {
  public static async get(
    url: string,
    headers?: AxiosRequestConfig["headers"],
    { useCache }: { useCache?: boolean } = { useCache: false }
  ) {
    try {
      if (useCache) {
        const data = await cachedAxiosGet(url, headers);
        return { data };
      } else {
        const response = await apiWithoutCache.get(url, { headers });
        return response;
      }
    } catch (error: any) {
      throw error;
    }
  }

  public static async post(
    url: string,
    body: object,
    headers?: AxiosRequestConfig["headers"]
  ) {
    try {
      const response = await axios.post(url, body, { headers });
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async patch(
    url: string,
    body: object,
    headers?: AxiosRequestConfig["headers"]
  ) {
    try {
      const response = await axios.patch(url, body, { headers });
      return response;
    } catch (error: any) {
      throw error;
    }
  }

  public static async delete(
    url: string,
    headers?: AxiosRequestConfig["headers"]
  ) {
    try {
      const response = await axios.delete(url, { headers });
      return response;
    } catch (error: any) {
      throw error;
    }
  }
}
