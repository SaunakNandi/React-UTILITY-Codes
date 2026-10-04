import axios, { AxiosResponse } from "axios";

let inMemoryAccessToken: string | null = null;

export const appClient = axios.create({
  baseURL: "import.meta.env.VITE_API_BASE_URL",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// The frontend's only job is passing withCredentials: true, while keeping the short-lived access_token strictly in-memory (in a module variable or Redux store) rather than in sessionStorage

interface QueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

let failedQueue: QueueItem[] = [];

function setAccessToken(token: string | null) {
  inMemoryAccessToken = token;
}

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
    `https://api.example.com/v1/auth/refresh`,
    {},
    {
      withCredentials: true, // 🔑 Tells the browser: "Include the HttpOnly cookie!"
    },
  );

  const { access_token } = res.data;
  setAccessToken(access_token);
  return access_token;
}

appClient.interceptors.request.use((config) => {
  const token = inMemoryAccessToken;
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

let isRefetching = false;
appClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefetching) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.set("Authorization", `Bearer ${token}`);
            return appClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      isRefetching = true;
      originalRequest._retry = true;

      return new Promise((resolve, reject) => {
        refreshToken()
          .then((token) => {
            processQueue(null, token);
            originalRequest.headers.set("Authorization", `Bearer ${token}`);
            return resolve(appClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefetching = false;
          });
      });
    }
    return Promise.reject(error);
  },
);
