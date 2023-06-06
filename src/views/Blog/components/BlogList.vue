<template>
  <div class="blog-list-container" ref="blog" v-loading="isLoading">
    <ul>
      <li v-for="item in data.rows" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink :to="{
            name:'BlogDetail',
            params:{
              id:item.id
            }
          }">
            <img v-layze="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink :to="{
            name:'BlogDetail',
            params:{
              id:item.id
            }
          }">
            <h2>{{item.title}}</h2>
          </RouterLink>
          <div class="aside">
            <span>{{formatDate(item.createDate)}}</span>
            <span>{{ item.commentNumber }}</span>
            <span>评论78</span>
            <RouterLink :to="{
                name: 'CategoryBlog',
                params: {
                  categoryId: item.category.id,
                },
              }">
              {{ item.category.name }}
            </RouterLink>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页放到这里 -->
    <Pager v-if="data.total" :current="routeInfo.page" :total="data.total" :limit="routeInfo.limit" :visibleNumber="10" @pageChange="handlePageChange" />
  </div>
</template>

<script>
import Pager from "@/components/Pager";
import fetchData from '@/mixins/fetchData.js'
import * as blogapi from '@/api/Blog'
import { formatDate } from "@/utils"
// import formatdata from '@/utils/formatDate.js'
export default {

  mixins: [fetchData({})],
  created() {
    this.$bus.$emit('mainScroll', this.$refs.blog)
    this.$bus.$on('handleTop', this.handleTop)
  },
  computed: {
    routeInfo() {
      const categoryId = +this.$route.params.CategoryId || -1
      const page = +this.$route.query.page || 1
      const limit = +this.$route.query.limi || 10
      return {
        categoryId,
        page,
        limit
      }
    }

  },
  components: {
    Pager
  },
  watch: {
    async $route() {
      this.isLoading = true
      this.$refs.blog.scrollTop = 0
      this.data = await this.fetchData();
      this.isLoading = false
    }
  },
  mounted() {
    this.$refs.blog.addEventListener("scroll", this.handleScroll);

  },
  methods: {
    formatDate,
    async fetchData() {

      return await blogapi.getBlogs(this.routeInfo.page, this.routeInfo.limit, this.routeInfo.categoryId)
    },
    handlePageChange(newPage) {

      const query = {
        page: newPage,
        limit: this.$route.limit
      }
      if (this.routeInfo.categoryId === -1) {
        this.$router.push({
          name: "Blog",
          query
        })
      } else {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            categoryId: this.$route.categoryId
          }
        })
      }
    },
    handleScroll() {
      this.$bus.$emit("mainScroll", this.$refs.blog);

    },
    handleTop(tall) {
      this.$refs.blog.scrollTop = tall
    }
  },
  beforeDestroy() {
    this.$bus.$off('handleTop', this.handleTop)
  }
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scroll-behavior: smooth;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;
  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;
    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }
  .main {
    flex: 1 1 auto;
    h2 {
      margin: 0;
    }
  }
  .aside {
    font-size: 12px;
    color: @gray;
    span {
      margin-right: 15px;
    }
  }
  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
