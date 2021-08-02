<template>
  <div>
    <tab-bar>
      <div id="tab-bar">
        <tab-bar-item link="/home" activeColor="skyblue">
          <!-- 可以在webpack配置中为路径起别名'@':resolve('src')，这样路径就不会因为文件位置改变 -->
          <img slot="item-icon" src="~assets/img/tabbar/main.png" alt="" />
          <img
            slot="item-icon-active"
            src="~assets/img/tabbar/main_active.png"
            alt=""
          />
          <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item link="/category" activeColor="skyblue">
          <img slot="item-icon" src="~assets/img/tabbar/sort.png" alt="" />
          <img
            slot="item-icon-active"
            src="~assets/img/tabbar/sort_active.png"
            alt=""
          />
          <div slot="item-text">分类</div>
        </tab-bar-item>
        <tab-bar-item link="/cart" activeColor="skyblue">
          <img slot="item-icon" src="~assets/img/tabbar/cart.png" alt="" />
          <img
            slot="item-icon-active"
            src="~assets/img/tabbar/cart_active.png"
            alt=""
          />
          <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item link="/profile" activeColor="skyblue">
          <img slot="item-icon" src="~assets/img/tabbar/mine.png" alt="" />
          <img
            slot="item-icon-active"
            src="~assets/img/tabbar/mine_active.png"
            alt=""
          />
          <div slot="item-text">我的</div>
        </tab-bar-item>
      </div>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
  components: { TabBar, TabBarItem },
  name: 'MainTabbar'
}
</script>

<style scoped>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  z-index: 10;
}
</style>