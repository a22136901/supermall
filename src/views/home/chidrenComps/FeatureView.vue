<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" alt="" @load="imgLoad">
    </a>
  </div>
</template>

<script>
export default {
  name: 'FeatureView',
   methods:{
      imgLoad(){
        /* 用vuex */
        this.$store.state.vuexScroll.scroll.refresh()
      }
    }
}
</script>

<style>
  .feature img{
    width: 100%;
  }
</style>