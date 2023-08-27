/*
 * @Description: 导航栏组件
 * @Author: jiangwh
 * @Date: 2023-08-15 15:36:50
 * @LastEditors: jiangwh
 * @LastEditTime: 2023-08-15 16:27:21
 */
import React, { ReactNode } from "react";
import { NavBar } from "antd-mobile";

interface iProps {
  isBack?: boolean | null;
  onBack?: () => any;
  pageTitle: string;
  right?: ReactNode;
}

const styleNavBar = {
  boxShadow: "0 0 5px 1px hsl(0deg 0% 67% / 20%)",
  zIndex: 999,
  background: "rgb(255, 255, 255)",
};

const ComponentNavBar: React.FC<iProps> = ({ isBack, onBack, pageTitle, right }) => {
  return (
    <NavBar back={isBack} onBack={onBack} style={styleNavBar} right={right}>
      {pageTitle}
    </NavBar>
  );
};

export default ComponentNavBar;
