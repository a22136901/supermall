<template>
  <div></div>
</template>

<script>
Object.keys(obj).length === 0 //这样表示一个空对象
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
</style>