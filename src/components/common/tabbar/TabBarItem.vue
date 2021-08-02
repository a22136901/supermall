<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 因为插槽会被替换，所以尽量都包装一层div，属性写在div上 -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{ active: isActive }"><slot name="item-text"></slot></div> -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    link: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      // isActive: true

    }
  },
  computed: {
    isActive () {
      // /home/others -> true
      return this.$route.path.indexOf(this.link) !== -1
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      // console.log(this.link);
      this.$router.replace(this.link)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px; /* tabbar一般是49px */
  font-size: 14px;
}
.tab-bar-item img {
  width: 32px;
  height: 32px;
  margin-top: 0px;
  vertical-align: middle;
}
/*
 .active {
  color: skyblue;
  /*动态决定颜色
}
*/
</style>