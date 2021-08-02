<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
      <ul id="ul">
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
        <li>aaaaa</li>
      </ul>
    </scroll>

    <!-- 监听组件的点击 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop.vue';
import debounce from 'common/debounce'

import HomeSwiper from './chidrenComps/HomeSwiper'
import RecommendView from './chidrenComps/RecommendView.vue';
import FeatureView from './chidrenComps/FeatureView.vue';


import { getHomeMultidata, getHomeGoods } from 'network/home';

export default {
  name: 'Home',
  components: { NavBar, TabControl, HomeSwiper, RecommendView, FeatureView, GoodsList, Scroll, BackTop },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: 'pop',
      isShowBackTop: false,
      isTabFixed: false,
      tabOffsetTop: 0,
      saveY: 0

    }
  },
  mounted () {
    // this.$nextTick(()=>{
    //   const _this = this
    //   setTimeout(() => {
    //     _this.$refs.scroll.scroll.refresh()
    //   }, 500);

    // })

    //1.图片加载完成的事件监听（事件总线）
    this.$store.commit('initScroll', this.$refs.scroll)
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('imgLoad', () => {
      refresh()

      //2.获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    })
  },
  created () {
    // 1.获取多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated () {
    // 回来时滚动并刷新保持位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.scroll.refresh()
  },
  deactivated () {
    // 离开时记录滚到的位置
    this.saveY = this.$refs.scroll.scroll.y
  },
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    },

  },


  methods: {

    /**
     * 事件监听相关方法
     */
    backClick () {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    tabClick (index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll (position) {
      // 1.是否显示回到顶部
      this.isShowBackTop = -position.y > 500
      // 2.TabControl吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore () {
      console.log('上拉加载更多');
      document.getElementById('ul').insertAdjacentHTML('beforeEnd', '<li>这是新增的标签</li>')
      // this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
      this.$refs.scroll.refresh()
    },

    /**
     * 网络相关的请求方法
     */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        console.log(res);
      })
    },

    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        //更新数据
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>


<style scoped>
/* scope限制css作用域在本组件 */
#home {
  position: relative;
  padding-top: 44px;
  /* 视口高度 */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  /* 原生滚动时使用的脱标防止滚动 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.tab-control {
  /* 没达到44px之前都是sticky，达到后变成flex */
  /* position: sticky; */
  /* top: 44px; */

  /* 导入bs之后sticky会失效 */
  position: relative;
  z-index: 10;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content{
    height: calc(100%-93px);
    margin-top: 44px;
    overflow: hidden;
  } */
</style>