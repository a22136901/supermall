<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props:{
    probeType:{
      type:Number,
      default: 0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
        scroll:null
    }
  },
  mounted(){
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
        movable: true,
        zoom: true,
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
    })

    // 2.滚动监听位置事件
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position)
    })
    console.log(this.scroll);
    // 3.上拉加载更多
    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp')
    })
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      console.log('-------------------');

      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  
</style>