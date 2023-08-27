import axios from "axios";

import {
  handleRequestHeader,
  handleAuth,
  handleAuthError,
  handleGeneralError,
  handleNetworkError,
} from "./tools";

interface FcResponse<T> {
  code: number;
  message: string;
  data: T;
}

interface IAnyObj {
  [index: string]: unknown;
}

// 请求拦截
axios.interceptors.request.use((config) => {
  config = handleRequestHeader(config);
  config = handleAuth(config);
  return config;
});

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);
    handleAuthError(response.data.code);
    handleGeneralError(response.data.code, response.data.message);
    return response;
  },
  (err) => {
    handleNetworkError(err?.response?.status);
    Promise.reject(err.response);
  },
);

export const Get = <T>(
  url: string,
  params: IAnyObj = {},
  config?: any,
): Promise<[any, FcResponse<T> | undefined]> =>
  new Promise((resolve) => {
    axios
      .get(url, { params, ...config })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });

export const Post = <T>(
  url: string,
  data: IAnyObj = {},
  params: IAnyObj = {},
  config?: any,
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    axios
      .post(url, data, { params, ...config })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });
};

export const Put = <T>(
  url: string,
  data: IAnyObj = {},
  params: IAnyObj = {},
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    axios
      .put(url, data, { params })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });
};

export const Delete = <T>(
  url: string,
  params: IAnyObj = {},
  config?: any,
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    axios
      .delete(url, { params, ...config })
      .then((result) => {
        resolve([null, result.data as FcResponse<T>]);
      })
      .catch((err) => {
        resolve([err, undefined]);
      });
  });
};
