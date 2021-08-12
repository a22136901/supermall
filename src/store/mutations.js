import { ADD_COUNT, ADD_TO_CART } from "./mutations-type";

export default {
  initScroll(state, value) {
    state.vuexScroll = value;
  },

  updateScroll(state) {
    state.vuexScroll && state.vuexScroll.refresh();
    console.log("----------------------");
  },
  [ADD_COUNT](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload);
  }
};
