import axios from 'axios';
import store from './store/index';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com',
});

// 请求拦截
instance.interceptors.request.use((config) => {
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.user.appkey,
    },
  };
}, (err) => Promise.reject(err));

// 相应拦截
instance.interceptors.response.use((rep) => {
  if (rep.data.status === 'fail') {
    return Promise.reject(rep.data.msg);
  }
  return rep.data.data;
}, (err) => Promise.reject(err));

// 请求导出
export default {
  // 用户请求
  login(params) {
    return instance.post('/passport/login', params);
  },
  // 产品请求
  // 获取类目
  getCategory(params) {
    return instance.get('/category/all', { params });
  },
  // 获取列表
  getProductList(params) {
    return instance.get('/products/all', { params });
  },
  addProduct(params) {
    return instance.post('/products/add', params);
  },
  // 删除产品
  deleteProduct(params) {
    return instance.delete(`/products/${params.id}`);
  },
  // 获取产品详情
  getProductDetail(id) {
    return instance.get(`/products/${id}`);
  },
  // 修改产品
  editProduct(params) {
    return instance.put('/category/edit', params);
  },
};
