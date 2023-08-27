/*
 * @Description: app
 * @Author: jiangwh
 * @Date: 2023-01-13 10:58:31
 * @LastEditors: zhengting
 * @LastEditTime: 2023-07-31 12:23:22
 */
import { RouterProvider } from "react-router-dom";
import { SafeArea } from "antd-mobile";
// import ComponentAuth from "@/components/Auth";
import "./App.less";
import AppRouter from "@/router";
function App() {
  return (
    <>
      <RouterProvider router={AppRouter}></RouterProvider>
      {/* 安全区 */}
      <SafeArea position="bottom" />
    </>
  );
}

export default App;
