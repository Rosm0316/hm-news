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
  async created () {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
      // console.log(this.user)
    } else if (statusCode === 401) {
      this.$toast('用户验证失败')
      this.$router.push('/login')
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
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
