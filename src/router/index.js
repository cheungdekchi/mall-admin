import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import store from '../store';
import getRoleRoutes from '../utils/permission';

Vue.use(VueRouter);

// 根据角色动态匹配的路由总和
const asyncRouters = [
  {
    path: '/Product',
    name: 'Product',
    meta: {
      title: '商品',
      hidden: false,
      icon: 'inbox',
    },
    component: Home,
    children: [
      {
        path: 'List',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          hidden: false,
          icon: 'unordered-list',
        },
        component: () => import('../views/pages/ProductList.vue'),
      },
      {
        path: 'Add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          hidden: false,
          icon: 'file-add',
        },
        component: () => import('../views/pages/ProductAdd.vue'),
      },
      {
        path: 'Edit/:id',
        name: 'ProductEdit',
        meta: {
          title: '编辑商品',
          hidden: true,
          icon: 'file-add',
        },
        component: () => import('../views/pages/ProductAdd.vue'),
      },
      {
        path: 'Category',
        name: 'Category',
        meta: {
          title: '类目管理',
          hidden: false,
          icon: 'file',
        },
        component: () => import('../views/pages/Category.vue'),
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: 'Statistics',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    component: Home,
    children: [
      {
        path: 'Statistics',
        name: 'Statistics',
        meta: {
          title: '统计',
          hidden: false,
          icon: 'number',
        },
        component: () => import('../views/pages/Statistics.vue'),
      },
    ],
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: Login,
  },
];

const routerPush = VueRouter.prototype.push;

// 解决vue-router 3.x+ 下对于取消跳转至相同路径路由的错误,重写push方法
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
// 验证登录状态
router.beforeEach((to, from, next) => {
  const { user } = store.state;
  if (to.path !== '/Login') {
    if (user.appkey && user.email && user.username) {
      if (!isAddRoutes) {
        // 匹配动态路由
        const allowRouters = getRoleRoutes(user.role, asyncRouters);
        // 存储路由信息到仓库,用于渲染
        store.dispatch('addRoutes', routes.concat(allowRouters)).then(() => {
          // 添加动态路由
          // router.addRoutes(allowRouters);
          // addRoutes在当前版本被替换为addRoute,且只能传入单个路由对象,不能传入数组,所以做以下处理
          allowRouters.forEach((route) => router.addRoute(route));
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/Login');
  }
  return next();
});

export default router;
