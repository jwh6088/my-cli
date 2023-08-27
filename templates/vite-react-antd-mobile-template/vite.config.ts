/*
 * @Description:
 * @Author: zhengting
 * @Date: 2023-07-28 15:16:11
 * @LastEditors: jiangwh
 * @LastEditTime: 2023-08-01 18:18:55
 */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [react()],

    // 开发服务器配置
    server: {
      host: "0.0.0.0",
      open: "/",
      proxy: {
        "/gateway": {
          target: loadEnv(mode, process.cwd()).VITE_SERVER_NAME,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/gateway/, ""),
        },
      },
    },

    // 路径变量
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },

    // css 预处理器
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },

    // TODO 配置 antd-mobile 兼容
  });
