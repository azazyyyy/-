<template>
  <div class="Blogcomment-contaier">
    <MessageArea title="评论列表" :subTitle="`(${data.total})`" :list="data.rows" :isListLoading="isLoading" @submit="handlesubmit" />
  </div>
</template>

<script>
import MessageArea from '@/components/MessageArea'
import fetchData from '@/mixins/fetchData.js'
import { getcomment, Postcomment } from '@/api/Blog'
export default {
  mixins: [fetchData({ total: 0, row: [] })],
  components: {
    MessageArea
  },
  data() {
    return {
      page: 1,
      limit: 10
    }
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total
    }
  },
  created() {
    this.$bus.$on('mainScroll', this.handleScroll)
  },
  destroyed() {
    this.$bus.$off('mainScroll', this.handleScroll)
  },
  methods: {
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        return
      }
      const range = 100
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight)

      if (dec <= range) {

        this.fetchMore()
      }
    },
    async fetchData() {

      return await getcomment(this.page, this.limit, this.$route.params.id);
    },
    async fetchMore() {
      if (!this.hasMore) {
        return
      }
      this.isLoding = true
      this.page++
      const resp = await this.fetchData()
      this.data.rows = this.data.rows.concat(resp.rows)
      this.isLoding = false
    },
    async handlesubmit(formData, callback) {
      const resp = await Postcomment({ Blogid: this.$route.params.id, ...formData })
      this.data.rows.unshift(resp)
      this.data.total++
      callback('评论成功')
    }
  }
}
</script>

<style lang="less" scoped>
.Blogcomment-contaier {
  margin-top: 30px;
}
</style>