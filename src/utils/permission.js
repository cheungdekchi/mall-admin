// 根据角色,动态配置路由

// 角色对应可以访问路由的名字
const roleToRoutes = {
  coustomer: ['Product', 'ProductList', 'ProductAdd', 'ProductEdit'],
  admin: ['Product', 'ProductList', 'ProductAdd', 'Category', 'ProductEdit'],
};

// 根据角色,过滤并返回动态路由列表
export default function getRoleRoutes(role, routes) {
  const allowRoutesName = roleToRoutes[role];
  return routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(obj.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
}
