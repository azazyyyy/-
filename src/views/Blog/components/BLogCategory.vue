<template>
  <div class="LogCategory-container" v-loading="isLoading">
    <h2>文章分类</h2>
    <RightList :list="list" @select="handlechange" />
  </div>
</template>

<script>
import RightList from './RightList.vue';
import fetchData from '@/mixins/fetchData.js'
import { getBlogCategories } from "@/api/Blog.js"
export default {
  mixins: [fetchData([])],
  components: {
    RightList
  },
  computed: {
    categoryId() {
      return +this.$route.params.categoryId || -1
    },
    limit() {
      return +this.$route.params.limit || 10
    },
    list() {
      const totalArticleCount = this.data.reduce(
        (a, b) => a + b.articleCount,
        0
      );

      const result = [
        {
          name: "全部", id: -1, articleCount: totalArticleCount
        },
        ...this.data
      ]
      return result.map((it) => ({
        ...it,
        isSelect: it.id === this.categoryId,
        aside: `${it.articleCount}篇`,
      }))

    }
  },
  methods: {
    async fetchData() {
      return await getBlogCategories()
    },
    handlechange(item) {

      const query = {
        page: 1,
        limit: this.limit
      }
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query
        })
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: item.id,
          },
        });
      }
    }
  }
}
</script>

<style lang="less" scoped>
.LogCategory-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  font-size: 14px;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>