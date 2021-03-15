import Vue from 'vue';
import VCharts from 'v-charts';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './axios';

import './plugins/ant-design-vue';
// 重置css
import './assets/resets.css';

Vue.use(VCharts);
Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
