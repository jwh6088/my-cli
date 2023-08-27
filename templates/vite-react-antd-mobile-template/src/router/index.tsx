/*
 * @Description:
 * @Author: zhengting
 * @Date: 2023-07-28 15:54:07
 * @LastEditors: jiangwh
 * @LastEditTime: 2023-08-27 16:18:09
 */
import ComponentNprogress from "@/components/Nprogress";
import { PageNotFound403, PageNotFound404 } from "@/pages";
import { ReactNode, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ComponentAuth from "@/components/Auth";

// 懒加载组件
const lazyLoad = (children: ReactNode) => <Suspense fallback={<ComponentNprogress />}>{children}</Suspense>;

// 导航路由
// TODO 从 config 获取
const navRoutes = [

];

// 容错路由
const notFoundAndNoPower = [
  {
    path: "*",
    element: <ComponentAuth>{lazyLoad(<PageNotFound404 />)}</ComponentAuth>,
  },
  {
    path: "/403",
    element: <ComponentAuth>{lazyLoad(<PageNotFound403 />)}</ComponentAuth>,
  },
];

// 全部路由
const AppRouter = createBrowserRouter([...navRoutes, ...notFoundAndNoPower]);

export default AppRouter;
