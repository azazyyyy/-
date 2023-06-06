<template>
  <Layout>
    <div ref="mainContainer" class="main-container">
      <BlogDetail :blog="data" v-if="data"></BlogDetail>
      <Blogcomment v-if="! isLoading" />
    </div>
    <template #right>
      <BlogTOC :toc="data.toc" v-if="data" class="right-container "></BlogTOC>
    </template>
  </Layout>
</template>

<script>
import Blogcomment from './components/Blogcomment.vue'
import fetchData from '@/mixins/fetchData.js'
import Layout from '@/components/Layout'
import { getBlog } from '@/api/Blog'
import BlogTOC from './components/BlogTOC.vue'
import BlogDetail from './components/BlogDetaile.vue'
import { setTitle } from '@/utils'
export default {
  mixins: [fetchData(null)],
  methods: {
    async fetchData() {
      const resp = await getBlog(this.$route.params.id)
      setTitle.setRouterTitle(resp.title)
      return resp
    },
    handleScroll() {
      this.$bus.$emit("mainScroll", this.$refs.mainContainer);

    },
    handleTop(tall) {
      this.$refs.mainContainer.scrollTop = tall
    }
  },
  created() {
    this.$bus.$on('handleTop', this.handleTop)
  },
  components: {
    Layout,
    BlogTOC,
    BlogDetail,
    Blogcomment
  },
  updated() {

    const hash = location.hash
    location.hash = ""
    setTimeout(() => {
      location.hash = hash
    }, 100);
  },
  mounted() {
    this.$refs.mainContainer.addEventListener("scroll", this.handleScroll);

  },
  beforeDestroy() {
    this.$bus.$emit("mainScroll")
    this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off('handleTop', this.handleTop)
  },
}
</script>
<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>
