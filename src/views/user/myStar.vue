<template>
 <div class="my-star">
    <hm-header>我的收藏</hm-header>
  <div class="list">
    <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
  </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getMyStarList()
  },
  methods: {
    async getMyStarList () {
      const res = await this.$axios.get('/user_star')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        this.list.filter(item => {
          item.comment_length = item.comments.length
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
