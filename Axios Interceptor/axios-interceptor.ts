import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

let inMemoryAccessToken: string | null = null;

export const appClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// for typescript
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// The frontend's only job is passing withCredentials: true, while keeping the short-lived access_token strictly in-memory (in a module variable or Redux store) rather than in sessionStorage

interface QueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

let failedQueue: QueueItem[] = [];

function processQueue(err: unknown, token: string | null = null): void {
  failedQueue.forEach((prom) => {
    if (err) {
      prom.reject(err);
    } else prom.resolve(token);
  });
  failedQueue = [];
}

async function refreshToken(): Promise<string> {
  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/v1/auth/refresh`,
    {},
    {
      withCredentials: true, // 🔑 Sends the secure HttpOnly cookie to the backend
    },
  );

  const { access_token } = res.data;
  inMemoryAccessToken = access_token;
  return access_token;
}

appClient.interceptors.request.use((config) => {
  const token = inMemoryAccessToken;
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

let isRefreshing = false;
appClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Guard: Ignore if there's no request config (e.g., pre-flight network failure)
    if (!originalRequest) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest._retry = true;
            originalRequest.headers.set("Authorization", `Bearer ${token}`);
            return appClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        processQueue(null, newAccessToken);
        originalRequest.headers.set(
          "Authorization",
          `Bearer ${newAccessToken}`,
        );
        return appClient(originalRequest);
      } catch (refreshError) {
        // 🚨 Purge session on refresh failure
        processQueue(refreshError, null);
        inMemoryAccessToken = null;

        // Optional: Redirect to login or dispatch an auth event
        // window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // 🔓 Release lock
      }
    }
    return Promise.reject(error);
  },
);
