<template>
 <div class="my-star">
    <hm-header>我的收藏</hm-header>
  <div class="list">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="info">
        <div class="title">{{item.title}}</div>
        <div class="user">
          <span>{{item.user.nickname}}</span>
          <span>{{item.comments.length}}跟帖</span>
        </div>
      </div>
      <div class="img">
        <img :src="$url(item.cover[0].url)" alt="">
      </div>
    </div>
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
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #666;
  display: flex;
  padding: 15px;
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
    }
    .user {
      font-size: 14px;
      color: #ccc;
      span:first-child {
        margin-right: 8px;
      }
    }
  }
  img {
    width: 120px;
    height: 74px;
    object-fit: cover;
  }
}
</style>
