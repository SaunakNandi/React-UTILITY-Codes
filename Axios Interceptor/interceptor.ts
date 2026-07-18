import axios from "axios";

const project_api = axios.create({
  baseURL: "https://mydomain.com",
  timeout: 5000,
  withCredentials: true,
});

project_api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const serverMessage =
      error.response?.data?.message || "Network error. Please try again.";
    const custom_error = new Error(serverMessage);
    // Pass just the clean string message to the component's catch block!

    custom_error.name = "Api Error";
    (custom_error as any).status = error.status;
    (custom_error as any).originalError = error;
    return Promise.reject(custom_error);
  },
);
