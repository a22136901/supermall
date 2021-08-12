export default {
  // 因为有判断，可以再actions中来使用，调用this.$store.dispatch('',)
  // 添加到购物车
  addCart(context, payload) {
    // payload为新添加的商品
    let oldProduct = context.state.cartList.find(
      item => item.iid === payload.iid
    );

    if (oldProduct) {
      context.commit("addCount", oldProduct);
    } else {
      payload.count = 1;
      context.commit("addToCart", payload);
    }
  }
};
