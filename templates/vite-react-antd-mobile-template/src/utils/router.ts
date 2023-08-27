/*
 * @Description: 路由业务处理
 * @Author: jiangwh
 * @Date: 2023-01-16 15:22:14
 * @LastEditors: jiangwh
 * @LastEditTime: 2023-01-16 15:22:14
 */

// 获取导航路由信息
export const getNavRouter = (routes: any[]): any[] => {
  return routes.map((route: any) => ({
    path: route.path,
    meta: route.meta,
    children: route.children && getNavRouter(route.children),
  }));
};

// 获取菜单树扁平化 path
export const flatMenusPath = (menusTree: any[], result: string[] = []): string[] => {
  menusTree.forEach((item) => {
    if (item.children && item.children.length > 0) {
      flatMenusPath(item.children, result);
    }
    result.push(item.path);
  });
  return result;
};

// 获取权限菜单 path
export const getPermissionPath = (menusTree: any[], result: string[] = []): string[] => {
  menusTree.forEach((item) => {
    if (item.meta.isPermission) {
      result.push(item.path);
    }
    if (item.children && item.children.length > 0) {
      getPermissionPath(item.children, result);
    }
  });
  return result;
};
