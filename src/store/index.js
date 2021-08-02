import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    vuexScroll: null
  },
  mutations: {
    initScroll(state, value) {
      state.vuexScroll = value;
    },

    updateScroll(state) {
      state.vuexScroll && state.vuexScroll.refresh();
      console.log("----------------------");
    }
  },
  actions: {},
  modules: {}
});
