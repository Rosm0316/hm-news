<template>
  <div class="my-comment">
    <hm-header>我的评论</hm-header>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      :offset="5"
      @load="onLoad"
      >
        <div class="item" v-for="item in commentList" :key="item.id">
          <div class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</div>
          <div class="comment" v-if="item.parent">
            <div class="name">
              回复: {{item.parent.user.nickname}}
            </div>
            <div class="comment_content">
              {{item.parent.content}}
            </div>
          </div>
          <div class="content">
            {{item.content}}
          </div>
          <div class="origin">
            <span class="one-txt-cut">原文:{{item.post.title}}</span>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: [],
      // 当前页
      pageIndex: 1,
      // 每页的条数
      pageSize: 6,
      // 代表加载状态,如果loading为true的时候,代表list组件正在加载数据,onload就不再触发
      // 当滚动到底部,触发onLoad的时候,自动会把loading改成true
      loading: false,
      // 是否已完成全部列表加载
      finished: false,
      refreshing: false

    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    async getCommentList () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        // this.commentList.push(data)

        // 修改loading状态
        this.loading = false
        // 修改refreshing状态
        this.refreshing = false
        // 判断评论列表是否到最后一页了
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
      // console.log(this.commentList)
    },
    onLoad () {
      setTimeout(() => {
        // console.log('需要加载更多数据了')
        this.pageIndex++
        this.getCommentList()
      }, 1000)
      // 定时器可以去除,设定时器是为了方便理解拉取数据
    },
    onRefresh () {
      setTimeout(() => {
        this.pageIndex = 1
        this.loading = true
        this.finished = false
        this.commentList = []
        this.getCommentList()
      }, 1000)
      // 定时器可以去除,设定时器是为了方便理解拉取数据
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 15px 15px;
  .time {
    font-size: 14px;
    color: #666;
  }
  .comment {
    background-color: #ddd;
    padding: 10px;
    .name {
      color: #666;
      font-size: 14px;
    }
    .comment_content {
      font-size: 16px;
      // margin: 10px 0;
      margin-top: 10px;
    }
  }
  .content {
    font-size: 16px;
    margin: 10px 0;
  }
  .origin {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
  }
}
</style>
