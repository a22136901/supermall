<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.sort" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    imgLoad () {
      this.$bus.$emit('imgLoad')
    }
    // imgLoad(){
    //   if(++this.count === this.imagesLemgth){
    //     this.$emit('imageLoad')
    //   }
    // }
  },
  // watch: {
  //   detailInfo(){
  //   this.imagesLength = this.detailInfo.detaileImage[0].list.length

  //   }
  // }

}
</script>

<style>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>