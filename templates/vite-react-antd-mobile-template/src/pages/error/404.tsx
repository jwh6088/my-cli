/*
 * @Description: 404 页面
 * @Author: jiangwh
 * @Date: 2023-01-16 16:42:44
 * @LastEditors: jiangwh
 * @LastEditTime: 2023-01-31 12:50:43
 */
import React from "react";
import { ErrorBlock } from "antd-mobile";
import styles from "./error.module.less";

const Page404: React.FC = () => {
  return (
    <div className={styles.error}>
      <ErrorBlock
        status="empty"
        style={{
          "--image-height": "150px",
        }}
      />
    </div>
  );
};

export default Page404;
