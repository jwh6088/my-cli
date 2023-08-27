/*
 * @Description: 403 页面
 * @Author: jiangwh
 * @Date: 2023-01-31 12:43:39
 * @LastEditors: jiangwh
 * @LastEditTime: 2023-01-31 12:50:52
 */
import React from "react";
import { ErrorBlock } from "antd-mobile";
import styles from "./error.module.less";

const Page403: React.FC = () => {
  return (
    <div className={styles.error}>
      <ErrorBlock
        title="无权访问"
        description="请先登录系统"
        style={{
          "--image-height": "150px",
        }}
      />
    </div>
  );
};

export default Page403;
