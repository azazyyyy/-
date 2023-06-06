<template>
  <div class="nimiHome-item-container" ref="container" @mousemove="handleMouse" @mouseleave="handleleave">
    <div class="nimiHome-image" ref="image" :style="imagePosition">
      <ImageLoader :src="itemImg.bigImg" :placeholder="itemImg.midImg"></ImageLoader>
    </div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader"
export default {
  data() {
    return {
      containerSize: null,
      innerSize: null,
      mouseX: 0,
      mouseY: 0
    }
  },
  props: {
    itemImg: {
      type: Object,
      required: true,
    }

  },
  components: {
    ImageLoader
  },
  mounted() {
    this.setSize()
    this.mouseX = this.center.x
    this.mouseY = this.center.y
    window.addEventListener("resize", this.setSize)

  },
  destroyed() {
    window.removeEventListener("resize", this.setSize)
  },
  computed: {
    imagePosition() {
      if (!this.innerSize || !this.containerSize) {
        return
      }
      const Maxextrawidth = this.innerSize.width - this.containerSize.width
      const MaxextraHigth = this.innerSize.heigth - this.containerSize.heigth
      const left = (-Maxextrawidth / this.containerSize.width) * this.mouseX
      const top = (-MaxextraHigth / this.containerSize.heigth) * this.mouseY
      return {
        transform: `translate(${left}px , ${top}px)`

      }
    },
    center() {
      return {
        x: this.containerSize.width / 2,
        y: this.containerSize.heigth / 2
      }
    }
  },
  methods: {
    setSize() {
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        heigth: this.$refs.container.clientHeight
      }
      this.innerSize = {
        width: this.$refs.image.clientWidth,
        heigth: this.$refs.image.clientHeight
      }

    },
    handleMouse(e) {
      const rect = this.$refs.container.getBoundingClientRect()
      this.mouseX = e.clientX - rect.left
      this.mouseY = e.clientY - rect.top

    },
    handleleave() {
      this.mouseX = this.center.x
      this.mouseY = this.center.y
    }
  }
}
</script>

<style lang="less" scoped>
.nimiHome-item-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .nimiHome-image {
    width: 110%;
    height: 110%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    transition: 0.3s;
  }
}
</style>