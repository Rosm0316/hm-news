<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="goBack">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconsearch"></span>
        <input type="text"
         placeholder="请输入搜索关键字"
         v-model="key"
         @keyup.enter="search"
         @input="recommend"
        >
      </div>
      <div class="right" @click="search">
        搜索
      </div>
    </div>
    <div class="recommend" v-if="recommendList.length">
      <div class="item one-txt-cut" v-for="item in recommendList" :key="item.id" @click="goSearch(item.title)">{{item.title}}</div>
    </div>
    <div class="list" v-else-if="searchList.length">
      <hm-post v-for="item in searchList" :key="item.id" :post="item"></hm-post>
    </div>
    <div class="content" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <div class="list">
          <div class="item one-txt-cut" v-for="item in history" :key="item.id" @click="goSearch(item)">{{item}}</div>
        </div>
      </div>
      <div class="hot">
        <h3>热门搜索</h3>
        <div class="list">
          <div class="item">关晓彤</div>
          <div class="item">关晓彤</div>
          <div class="item">关晓彤</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash'
import debounce from '../../utils/tools_debounce'
export default {
  data () {
    return {
      key: '',
      searchList: [],
      history: [],
      recommendList: []
    }
  },
  watch: {
    key (value) {
      if (value === '') {
        this.searchList = ''
      }
    }
  },
  created () {
    // 如果没有数据,必须保证是一个空数组
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  methods: {
    async search () {
      if (!this.key) {
        return this.$toast.fail('请输入搜索关键字')
      }
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200 && data.length > 0) {
        this.searchList = data
      } else {
        this.$toast.fail('未查询到关键词内容')
      }
      console.log(this.searchList)
      // 把key添加到缓存中
      // 1.如果原来有这个历史记录,删除即可
      // 2.添加到数组前面
      this.history = this.history.filter(item => item !== this.key)
      this.history.unshift(this.key)
      localStorage.setItem('history', JSON.stringify(this.history))
      // 清空实时搜索
      this.recommendList = ''
    },
    goBack () {
      if (this.key) {
        this.key = ''
      } else {
        this.$router.back()
      }
    },
    goSearch (item) {
      this.key = item
      this.search()
    },
    // recommend: _.debounce(async function () {
    //   if (!this.key) {
    //     return
    //   }
    //   const res = await this.$axios.get('/post_search_recommend', {
    //     params: {
    //       keyword: this.key
    //     }
    //   })
    //   console.log(res)
    // }, 1000)
    recommend: debounce(async function () {
      if (!this.key) {
        return
      }
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.key
        }
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
      }
    }, 1000)
  }
}
</script>

<style lang="less" scoped>
.search {
  .header {
    display: flex;
    height: 50px;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    .left {
      .iconfont {
        font-size: 20px;
      }
    }
    .center {
      flex: 1;
      padding: 0 10px;
      position: relative;
      input {
        width: 100%;
        height: 34px;
        border-radius: 17px;
        border: 1px solid #ccc;
        font-size: 14px;
        padding: 0 30px;
      }
      .iconfont {
        position: absolute;
        left: 22px;
        top: 8px;
      }
    }
    .right {
        font-size: 16px;
      }
  }
  .content {
    padding: 10px;
    .history {
      margin-bottom: 10px;
    }
  }
   .list {
    overflow: hidden;
    .item {
      float: left;
      width: 60px;
      height: 30px;
      border: 1px solid #ccc;
      background-color: #ddd;
      font-size: 12px;
      line-height: 30px;
      text-align: center;
      margin: 5px;
    }
  }
  .recommend {
    padding: 10px;
    font-size: 16px;
    /deep/ .item {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
