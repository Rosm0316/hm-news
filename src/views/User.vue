<template>
  <div class="user">
    <div class="header">
      <div class="avatar">
        <img :src="base + user.head_img" alt="">
      </div>
      <div class="info">
        <div class="name">
          <span v-if="user.gender===1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{user.nickname}}</span>
        </div>
        <div class="time">{{user.create_date | time}}</div>
      </div>
      <div class="arraw">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navitem to="/follow">
      <template>我的关注</template>
      <template #content>关注的用户</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的收藏</template>
      <template #content>文章/视频</template>
    </hm-navitem>
    <hm-navitem>
      <template>设置</template>
    </hm-navitem>
    <div style="margin: 30px;">
      <van-button type="primary" block @click="logout">退出</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  computed: {
    base () {
      return this.$axios.defaults.baseURL
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出吗?'
        })
      } catch (error) {
        return this.$toast('取消退出')
      }
      // 说明点了确定

      this.$router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$toast.success('退出成功')
    }
  },
  async created () {
    const userId = localStorage.getItem('userId')
    // const token = localStorage.getItem('token')
    const res = await this.$axios.get(`/user/${userId}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
      // console.log(this.user)
    }
  }
}
</script>
<style lang="less">
.header {
  display: flex;
  align-items: center; //次轴垂直居中
  // height: 100px;
  border-bottom: 3px solid #ddd;
  padding: 20px;
  .avatar {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    padding-left: 15px;
    font-size: 14px;
    .iconxingbienan {
      color: #7bbcec;
    }
    .iconxingbienv {
      color:pink;
    }
    .time {
      margin-top: 10px;
      color: #666;
    }
  }
}
</style>
