import axios from "axios";

export const appClient = axios.create({
  baseURL: "import.meta.env.VITE_API_BASE_URL",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let failedQueue = [];
function processQueue(err, token = null) {
  failedQueue.forEach((prom) => {
    if (err) {
      prom.reject(err);
    } else prom.resolve(err);
  });
}

async function refreshToken() {
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
  if (access_token) sessionStorage.setItem("refresh_token", refresh_token);
  return access_token;
}

appClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

let isRefetching = false;
appClient.interceptors.response.use(
  (response) => response,
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
  },
);
