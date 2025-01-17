import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { cache } from "react";

const apiWithoutCache = axios.create();

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
