/*
 * @Description: api 业务处理函数
 * @Author: jiangwh
 * @Date: 2023-01-16 13:00:35
 * @LastEditors: jiangwh
 * @LastEditTime: 2023-01-29 10:29:20
 */
import { Toast } from "antd-mobile";
import { Local } from "@/utils/storage";

export const handleRequestHeader = (config: any) => {
  config["baseURL"] = import.meta.env.VITE_API_URL as any;
  config["timeout"] = "20000";
  return config;
};

export const handleAuth = (config: any) => {
  if (Local.get("token")) {
    config.headers["token"] = Local.get("token") || "";
  }
  return config;
};

export const handleAuthError = (errno: any) => {
  const authErrMap: any = {
    5000: "登录失效，需要重新登录", // token 失效
  };
  if (Object.prototype.hasOwnProperty.call(authErrMap, errno)) {
    return false;
  }
  return true;
};

export const handleNetworkError = (errStatus: number) => {
  let errMessage = "未知错误";
  const errMsgMap: any = {
    400: "错误的请求",
    401: "未授权，请重新登录",
    403: "拒绝访问",
    404: "请求错误,未找到该资源",
    405: "请求方法未允许",
    408: "请求超时",
    500: "服务器端出错",
    501: "网络未实现",
    502: "网络错误",
    503: "服务不可用",
    504: "网络超时",
    505: "http版本不支持该请求",
  };
  if (errStatus) {
    errMessage = errMsgMap[errStatus] || `其他连接错误 --${errStatus}`;
  } else {
    errMessage = `无法连接到服务器！`;
  }
  Toast.show({
    icon: "fail",
    content: errMessage,
  });
};

export const handleGeneralError = (errno: any, errmsg: any) => {
  if (errno && errno !== 200) {
    Toast.show({
      icon: "fail",
      content: errmsg ?? "未知错误",
    });
    return false;
  }
  return true;
};
