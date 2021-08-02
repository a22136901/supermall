<template>
  <div>
    <swiper class="detail-swiper">
      <swiper-item class="swiper-item" v-for="item in topImages" :key="item">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  components: { Swiper, SwiperItem },
  name: 'DetailSwiper',
  props: {
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
}
</style>