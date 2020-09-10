<template>
  <div class="post-detail">
    <div class="header">
      <div class="back">
        <span class="iconfont iconjiantou2" @click="$router.go(-1)"></span>
      </div>
      <div class="new">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="follow">
        <div class="followed" v-if="contentList.has_follow" @click="unfollow(contentList.user.id)">已关注</div>
        <div class="unfollow" v-else @click="follow(contentList.user.id)">关注</div>
      </div>
    </div>
    <div class="content">
      <div class="title">{{contentList.title}}</div>
      <div class="user">
        <span class="nickname">{{contentList.user.nickname}}</span>
        <span class="time">{{contentList.create_date | time}}</span>
      </div>
      <div class="info" v-if="contentList.type === 1" v-html="contentList.content"></div>
      <video v-else :src="getUrl(contentList.content)" controls autoplay muted></video>
    </div>
    <div class="button">
      <div class="like" @click="like(contentList.id)">
        <span class="iconfont icondianzan" :class="{active:contentList.has_like}"></span>
        {{contentList.like_length || 0}}
      </div>
      <div class="share">
        <span class="iconfont iconweixin"></span>
        分享
      </div>
    </div>
    <!-- 评论组件 -->
    <div class="hm-commennt">
      <h3>精彩跟帖</h3>
      <hm-comment
       :comment="comment"
       v-for="comment in commentList"
        :key="comment.id"
        ></hm-comment>
    </div>
    <!-- textarea -->
    <div class="footer-textarea" v-if="isShowTextarea">
      <textarea
      :placeholder="'回复:' + nickname"
       ref="textarea"
       v-model="content"
       @blur="onBlur"
       ></textarea>
      <van-button type="primary" @click="publish">发送</van-button>
    </div>
    <!-- input -->
    <div class="footer-input" v-else>
      <div class="search">
        <input type="text" placeholder="回复" @focus="onFocus" >
      </div>
      <span class="iconfont iconpinglun-">
        <i>{{contentList.comment_length}}</i>
      </span>
      <span class="iconfont iconshoucang" :class="{new:contentList.has_star}" @click="star(contentList.id)"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      contentList: {
        user: {} // 防止contentList没有数据的时候,访问contentList.user.name会报错
      },
      commentList: [],
      isShowTextarea: false,
      content: '', // 发布评论的内容
      replyId: '',
      nickname: ''
    }
  },
  created () {
    this.getInfo()
    this.getCommonList()
    this.$bus.$on('reply', this.onReply)
  },
  destroyed () {
    this.$bus.$off('reply', this.onReply)
  },
  methods: {
    isLogin () {
      // 判断是否登录
      const token = localStorage.getItem('token')
      if (!token) {
        this.$toast.fail('请先登录')
        // 跳转到登录去
        this.$router.push({
          path: '/login',
          query: {
            back: true // 携带参数,这样可以从登录页跳回来
          }
        })
        return false
      } else {
        return true
      }
    },
    async getInfo () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.contentList = data
      }
      // console.log(this.contentList)
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    async follow (id) {
      if (!this.isLogin()) {
        return
      }
      // 说明已经登录了,发送ajax请求,关注
      const res = await this.$axios.get(`/user_follows/${id}`)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    // 取消关注
    async unfollow (id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async like (id) {
      if (!this.isLogin()) {
        return
      }
      const res = await this.$axios.get(`/post_like/${id}`)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async star (id) {
      if (!this.isLogin()) {
        return
      }
      const res = await this.$axios.get(`/post_star/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async getCommonList () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
      }
      // console.log(this.commentList)
    },
    async onFocus () {
      this.isShowTextarea = true
      // 等待DOM元素的更新
      await this.$nextTick()
      this.$refs.textarea.focus()
    },

    async publish () {
      // console.log('发送请求了')
      const res = await this.$axios.post(`/post_comment/${this.contentList.id}`, {
        content: this.content,
        parent_id: this.replyId
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.isShowTextarea = false
        this.content = ''
        this.$toast.success(message)
        this.getInfo()
        this.getCommonList()
      }
    },
    onBlur () {
      if (!this.content) {
        this.isShowTextarea = false
      }
      // console.log('失去焦点了')
    },
    onReply (id, nickname) {
      // console.log('父组件', id, nickname)
      this.onFocus()
      this.nickname = '@' + nickname
      this.replyId = id
    }
    // back () {
    //   return this.$router.go(-1)
    // }
  }
}
</script>

<style lang="less" scoped>
.post-detail {
  padding-bottom: 50px;
}
.header {
  display: flex;
  padding: 0 10px;
  border-bottom: 1px solid #cccccc;
  height: 50px;
  align-items: center;
  .new {
    flex: 1;
    span {
      font-size: 50px;
      padding-left: 10px;
    }
  }
  .followed,
  .unfollow {
    width: 60px;
    height: 30px;
    border: 1px solid #cccccc;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
  }
  .unfollow {
    background-color: rgb(255, 0, 0);
    color: #fff;
  }
}
.content {
  padding: 10px;
  .title {
    font-size: 18px;
    font-weight: 700;
  }
  .user {
    font-size: 14px;
    color: #666;
    margin: 10px 0;
    .time {
      margin-left: 6px;
    }
  }
  .info {
    font-size: 16px;
    /deep/ img {
      width: 100%;
    }
  }
  video {
      width: 100%;
    }

}
.button {
  border-bottom: 4px solid #ccc;
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  .like,
  .share {
    width: 120px;
    height: 40px;
    border: 1px solid #666;
    line-height: 40px;
    text-align: center;
    border-radius: 20px;
    font-size: 18px;
    .iconfont {
      font-size: 20px;
      margin-right: 4px;
    }
    .iconweixin {
      color: green;
    }
  }
  .active {
  // background-color: rgba(255, 0, 0, .5);
  color: red;
  }
}
.hm-commennt {
  h3 {
    text-align: center;
    margin: 10px 0;
  }
}
.footer-input {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-around;
  border-top: 2px solid #ccc;
  padding: 0 10px;
  background-color: #fff;
  .iconfont {
    font-size: 24px;
  }
  .search {
    width: 180px;
    padding-right: 10px;
    input {
      height: 30px;
      width: 100%;
      border: none;
      background-color: #dddddd;
      border-radius: 15px;
      font-size: 14px;
      padding-left: 20px;
    }
  }
  .new {
    color: red;
  }
  .iconpinglun- {
    position: relative;
    i {
      position: absolute;
      right: -5px;
      top: 0;
      background-color: red;
      padding: 0 3px;
      font-size: 10px;
      color: #ffffff;
      border-radius: 5px;
      font-style: normal;
    }
  }
}
.footer-textarea {
  height: 100px;
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: space-around;
  align-items: flex-end;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  textarea {
    width: 260px;
    height: 80px;
    background-color: #ccc;
    border-radius: 10px;
    border: none;
    padding: 8px;
    font-size: 14px;
  }
}

</style>
