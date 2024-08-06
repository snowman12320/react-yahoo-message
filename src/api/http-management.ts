import { KEY_TOKEN, storeInStorage, getFromStorage } from "./storage-management.ts";

/**
 * API 回應的格式
 */
export type APIResponseDTO<T> = {
  status: string;
  message: string;
  data: T;
};

/**
 * 包含 token 屬性的介面
 */
interface TokenResponse {
  token: string;
}

/**
 * HTTP 請求的方法
 */
export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * 發送 HTTP 請求
 * @param method HTTP 請求的方法
 * @param url 要發送的請求的路徑
 * @param params 要傳送的參數
 * @returns
 */
export const fetchData = async<T extends TokenResponse = TokenResponse> (
  method: HTTPMethod,
  url: string,
  params?: unknown,
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const token = getFromStorage(KEY_TOKEN, "SESSION");
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}${url}`, {
    method,
    headers,
    body: params ? JSON.stringify(params) : undefined,
  });

  const data = (await response.json()) as APIResponseDTO<T>;
  if (data.status !== "success") {
    throw new Error(data.message);
  }

  if (data.data.token) {
    storeInStorage(KEY_TOKEN, data.data.token, "SESSION");
  }

  return data 
};
