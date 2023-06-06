<template>
  <div v-show="isShow" class="ToTop-container" @click="handleTop">
    <span>top</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  created() {
    this.$bus.$on('mainScroll', this.goTop)
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.goTop)
  },
  methods: {
    goTop(dom) {
      if (!dom) {
        this.isShow = false
        return
      }
      this.isShow = dom.scrollTop >= 500
    },
    handleTop() {
      this.$bus.$emit('handleTop', 0)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/var';
.ToTop-container {
  width: 50px;
  height: 50px;
  background: @primary;
  border-radius: 50%;
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 20;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  color: #fff;
}
</style>