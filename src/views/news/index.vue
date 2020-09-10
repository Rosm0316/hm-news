<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-box" @click="$router.push('/search')">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-sticky class="more-sticky">
      <div class="more" @click="$router.push('/manage')">
        <span class="iconfont iconlianjie"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active" sticky animated swipeable>
    <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <hm-post :post="item" v-for="item in catagoryList" :key="item.id"></hm-post>
      </van-list>
    </van-pull-refresh>
    </van-tab>
  </van-tabs>

  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      tabList: [],
      pageIndex: 1,
      pageSize: 5,
      catagoryList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created () {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    if (activeList) {
      this.tabList = activeList
      // 发送请求获取第一个tab栏数据
      this.getCatagoryList(this.tabList[0].id)
      return
    }
    this.getTabList()
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // console.log(this.tabList)
        // 发送请求获取第一个tab栏数据
        this.getCatagoryList(this.tabList[0].id)
        // console.log(this.tabList[0].id)
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
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        if (this.pageIndex === 1) { // 防止切换栏目过快导致报错
          this.catagoryList = []
        }
        this.catagoryList = [...this.catagoryList, ...data]
      }
      // console.log(this.catagoryList)
      this.loading = false
      this.refreshing = false
      if (data.length < this.pageSize) {
        this.finished = true
      }
    },
    onLoad () {
      this.pageIndex++
      setTimeout(() => {
        // console.log('文章刷新了')
        this.getCatagoryList(this.tabList[this.active].id)
        // console.log(this.categoryList)
      }, 1000)
    },
    onRefresh () {
      this.catagoryList = []
      this.pageIndex = 1
      this.loading = true
      this.finished = false
      this.getCatagoryList(this.tabList[this.active].id)
    }
  },
  watch: {
    active (value) {
      // console.log(value)
      this.catagoryList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true // 重点！！！！如果不设的话，切换每页请求会请求两遍
      setTimeout(() => {
        this.getCatagoryList(this.tabList[value].id)
      }, 1000)
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

/deep/ .van-tabs__wrap {
  width: 85%;
}
.more {
  position: absolute;
  right: 0;
  width: 15%;
  height: 44px;
  background-color: #fff;
  z-index: 999;
  line-height: 44px;
  text-align: center;
}
.more-sticky {
  /deep/ .van-sticky--fixed {
    z-index: 100;
  }
}
</style>
