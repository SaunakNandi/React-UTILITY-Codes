import axios from "axios";

const MAX_RETRY=3
const project_api = axios.create({
  baseURL: "https://mydomain.com",
  timeout: 5000,
  withCredentials: true,
});

project_api.interceptors.response.use(
  (response) => response.data,
  async(error) => {
    const {config}=error

    // retry only for network/timeout error(i.e no response from server)
    if(!error.response || config)
    {
      config.__retry=config?.__retry || 0
      if(config.__retry<MAX_RETRY){
        config.__retry+=1
        await new Promise((resolve)=>setTimeout(resolve,3000))
        return project_api(config)
      }
    }

    // if retry fail
    const serverMessage =
      error.response?.data?.message || "Network error. Please try again.";

    const custom_error = new Error(serverMessage);

    custom_error.name = "Api Error";
    (custom_error as any).status = error.status;
    (custom_error as any).originalError = error;
    return Promise.reject(custom_error);
  },
);
