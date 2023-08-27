/*
 * @Description:
 * @Author: zhengting
 * @Date: 2023-07-28 16:42:32
 * @LastEditors: jiangwh
 * @LastEditTime: 2023-08-01 18:25:27
 */
// import Cookies from "js-cookie";
import { ReactElement } from "react";
// import { Navigate, useLocation } from "react-router-dom";

interface iProps {
  children: ReactElement;
}

const ComponentAuth: React.FC<iProps> = ({ children }: iProps) => {
  // const token = Cookies.get("token");
  // const { pathname } = useLocation();

  // // 登录状态
  // if (token) {
  //   if (pathname == "/") return <Navigate to="personnel/list" replace />;
  //   return children;
  // }

  // // 未登录状态
  // if (pathname != "/403") {
  //   return <Navigate to="/403" replace />;
  // } else {
  //   return children;
  // }

  // TODO 暂不拦截
  return children;
};
export default ComponentAuth;
