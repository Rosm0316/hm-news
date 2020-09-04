<template>
  <div class="follow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$url + item.head_img" alt="">
        </div>
        <div class="center">
          <p>{{item.nickname}}</p>
          <p>{{item.create_date | time}}</p>
        </div>
        <div class="right">
          <van-button type="primary" round size="small" @click="unfollow(item.id)">取消关注</van-button>
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
    this.updateFollow()
  },
  methods: {
    async updateFollow () {
      const res = await this.$axios.get('/user_follows')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async unfollow (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定取消关注吗?'
        })
      } catch (error) {
        this.$toast('退出取消关注')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log(res)
      if (res.data.statusCode === 200) {
        this.updateFollow()
        this.$toast('取消关注成功')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  width: 100%;
  height: 80px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .center {
    flex: 1;
    font-size: 16px;
    padding-left: 15px;
  }
}
</style>
