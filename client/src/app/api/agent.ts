import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify"; // then this
import { router } from "../router/Routes";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        console.log(data);
        if (data.errors) {
          const modelStateErrors: String[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat;
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      case 404:
        toast.error(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

// const responseBodyfn = (response: AxiosResponse) => {
//   return response.data;
// };

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const TestErrors = {
  get404Error: () => requests.get("buggy/not-found"),
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  getvalidationerror: () => requests.get("buggy/validation-error"),
  get500Error: () => requests.get("buggy/server-error"),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
