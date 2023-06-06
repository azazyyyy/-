<template>
  <Layout>
    <BlogList></BlogList>
    <template #right>
      <BLogCategory />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout"
import BlogList from "./components/BlogList.vue"
import BLogCategory from "./components/BLogCategory.vue"
export default {
  components: {
    Layout,
    BlogList,
    BLogCategory
  }
}
</script>

<style>
</style>