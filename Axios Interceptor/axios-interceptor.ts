import axios, { AxiosResponse } from "axios";

export const appClient = axios.create({
  baseURL: "import.meta.env.VITE_API_BASE_URL",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
}

async function refreshToken(): Promise<string> {
  const res = await axios.post(
    `https://api.example.com/v1/auth/refresh`,
    {
      refreshToken: sessionStorage.getItem("refresh_token"),
    },
    {
      withCredentials: true,
    },
  );

  const { access_token, refresh_token } = res.data;
  sessionStorage.setItem("access_token", access_token);
  if (refresh_token) sessionStorage.setItem("refresh_token", refresh_token);
  return access_token;
}

appClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
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
