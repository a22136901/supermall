import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

// 购物车可以使用vuex管理,比较方便
export default new Vuex.Store({
  state: {
    vuexScroll: null,
    // 使用vuex来管理购物车数据
    cartList: []
  },
  mutations,
  actions,
  getters,
  modules: {}
});
