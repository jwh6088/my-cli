/*
 * @Description: layout 组件
 * @Author: jiangwh
 * @Date: 2023-01-16 14:06:04
 * @LastEditors: jiangwh
 * @LastEditTime: 2023-08-15 17:41:41
 */
import { memo, ReactNode } from "react";
import styles from "./layout.module.less";

interface iProps {
  extra?: ReactNode;
  children: ReactNode;
}

const ComponentLayout: React.FC<iProps> = memo(({ extra, children }: iProps) => {
  return (
    <div className={styles.container}>
      {extra}
      <div className={styles["main-page"]}>{children}</div>
    </div>
  );
});

ComponentLayout.displayName = "ComponentLayout";

export default ComponentLayout;
