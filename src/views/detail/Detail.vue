<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <div ref="params">offsetTop联动菜单</div>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'

import { debounce } from 'common/debounce'
import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop } from 'network/detail'
export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo
  },
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      themeTop: [],
      currentIndex: 0
    }
  },
  create () {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播图数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.创建店铺信息
      this.shop = new Shop(data.shopInfo)

      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo
    })
  },
  methods: {
    imageLoad () {
      this.$refs.scroll.refresh()

      // 1.图片加载完成后，获取顶部距离，实现菜单跳转 
      debounce(() => {
        this.themeTop = []
        this.themeTop.push(0)
        this.themeTop.push(this.$refs.params.$el.offsetTop)
        // hack做法
        this.themeTop.push(Number.MAX_VALUE)
      }, 200)

    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTop[index], 200)
    },
    contentScroll (position) {
      // 1.获取y值
      const positionY = -position.y

      // 2.不同区间之间对应不同的index
      // 复杂的判断，可以优化
      let length = this.themeTop.length
      for (let i = 0; i < length; i++) {
        // 普通做法
        if ((this.currentIndex !== i) && (i < length - 1 && positionY >= this.themeTop[i] && positionY < this.themeTop[i + 1])
          || (i === length - 1 && positionY >= this.themeTop[i])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }

        // hack做法(从0遍历到length-1,便利到length会越界,基本思想就是在数组中加入一个最大值)
        // 空间换时间
        // if((this.currentIndex !== i) && (positionY >= this.themeTop[i]) && positionY < this.themeTop[i + 1]){
        //   this.currentIndex = i
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
      }
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>