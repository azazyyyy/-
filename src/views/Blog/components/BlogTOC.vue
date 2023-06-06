<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocwithselect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
import { debunce } from "@/utils"
export default {
  components: {
    RightList,
  },
  props: {
    toc: {
      type: Array,
    },
  },
  data() {
    return {
      activeAnchor: ''
    }
  },
  created() {
    this.setSelecteDebunce = debunce(this.setSelecte, 50)
    this.$bus.$on('mainScroll', this.setSelecteDebunce)
  },
  destroyed() {
    this.$bus.$off('mainScollt', this.setSelecteDebunce)
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor
    },
    setSelecte(dom) {
      if (!dom) {
        return
      }
      this.activeAnchor = ""

      const rang = 200
      for (const dom of this.doms) {

        if (!dom) {
          continue
        }
        const top = dom.getBoundingClientRect().top
        if (top >= 0 && top <= rang) {
          this.activeAnchor = dom.id
          return
        } else if (top > rang) {
          return
        } else {
          this.activeAnchor = dom.id
        }
      }
    }
  },
  computed: {
    tocwithselect() {
      const gettoc = (top = []) => {
        return top.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: gettoc(t.children)
        }))

      }
      return gettoc(this.toc)
    },
    doms() {
      const doms = []
      const getdoms = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor))
          if (t.children && t.children.length) {
            getdoms(t.children)
          }
        }
      }
      getdoms(this.toc)
      return doms
    }
  }
}
</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>