import Vue from 'vue';
import Vuex from 'vuex';
import { setUserCookies, getUserCookies, removeUserCookies } from '@/utils/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMenuCollapsed: false,
    isLogin: false,
    user: getUserCookies(),
    routes: [],
  },
  mutations: {
    changeMenuCollapsed(state) {
      state.isMenuCollapsed = !state.isMenuCollapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
      state.user = {
        appkey: '',
        email: '',
        username: '',
        role: '',
      };
    },
    addRoutes(state, routes) {
      state.routes = routes;
    },
  },
  actions: {
    changeMenuCollapsed({ commit }) {
      commit('changeMenuCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      setUserCookies(userInfo);
      commit('setUserInfo', userInfo);
    },
    logout({ commit }) {
      removeUserCookies();
      commit('logout');
    },
    addRoutes({ commit }, routes) {
      commit('addRoutes', routes);
    },
  },
  modules: {
  },
});
