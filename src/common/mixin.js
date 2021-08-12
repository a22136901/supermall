// 混入mixin.js
import BackTop from "components/content/backTop/BackTop.vue";

export const mixinName = {
  data() {
    return {};
  },
  components: {},
  mounted() {
    // 对相似的代码进行封装
    // vue2在组件中导入并 mixin:[名称] 调用
    // 可以在混入中编写防抖函数，再混入到组件中，组件直接调用相关data
  }
};

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    };
  },
  components: { BackTop },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
};
