<template>
  <div class="cart">
    <nav-bar
      ><div slot="center">购物车({{ cartLength }})</div></nav-bar
    >
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";
export default {
  name: 'Cart',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters([
      'cartLength'
    ])
  }
}
</script >

  <style>
</style>