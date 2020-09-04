<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-box">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-tabs v-model="active" sticky animated swipeable>
    <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
      <hm-post :post="item" v-for="item in catagoryList" :key="item.id"></hm-post>
    </van-tab>
  </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      tabList: [],
      pageIndex: 1,
      pageSize: 20,
      catagoryList: []
    }
  },
  created () {
    this.getTabList()
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        console.log(this.tabList)
        // 发送请求获取第一个tab栏数据
        this.getCatagoryList(this.tabList[0].id)
      }
    },
    async getCatagoryList (id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.catagoryList = data
      }
      console.log(this.catagoryList)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  background-color: #f00;
  line-height: 50px;
  text-align: center;
  color: #fff;
  .logo {
    width: 70px;
    .iconnew {
      font-size: 50px;
    }
  }
  .user {
    width: 70px;
    .iconwode {
      font-size: 24px;
    }
  }
  .search {
    flex: 1;
    .search-box {
      height: 34px;
      background-color: rgba(255, 255, 255, .5);
      border-radius: 17px;
      margin-top: 8px;
      line-height: 34px;
      font-size: 14px;
    }
  }
}
</style>
