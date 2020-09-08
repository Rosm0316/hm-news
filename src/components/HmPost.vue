<template>
<div class="hm-post" @click="$router.push(`/post-detail/${post.id}`)">
  <div class="video-list" v-if="post.type === 2">
    <div class="title">{{post.title}}</div>
    <div class="img">
      <span class="iconfont iconshipin"></span>
      <img :src="$url(post.cover[0].url)" alt="">
    </div>
    <div class="user">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </div>
  </div>
  <div class="singal-img-list" v-else-if="post.cover.length > 0 && post.cover.length < 3">
    <div class="info">
      <div class="title">{{post.title}}</div>
      <div class="user">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <div class="img">
      <img :src="$url(post.cover[0].url)" alt="">
    </div>
  </div>
  <div class="mutiple-imgs-list" v-else-if="post.cover.length>=3">
    <div class="title">{{post.title}}</div>
    <div class="imgs">
      <img :src="$url(post.cover[0].url)" alt="">
      <img :src="$url(post.cover[1].url)" alt="">
      <img :src="$url(post.cover[2].url)" alt="">
    </div>
    <div class="user">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang="less" scoped>
.singal-img-list{
border-bottom: 1px solid #ccc;
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
.mutiple-imgs-list {
border-bottom: 1px solid #ccc;
padding: 15px;
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
.imgs {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  img {
    flex: 1;
    width: 112px;
    height: 74px;
    padding-right: 4px;
    object-fit: cover;
  }
}
}
.video-list {
  border-bottom: 1px solid #ccc;
  padding: 15px;
  .title {
    font-size: 16px;
  }
  .img {
    position: relative;
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, .5);
      color: white;
      font-size: 24px;
      text-align: center;
      line-height: 50px;
    }
    img {
      width: 100%;
      height: 170px;
      object-fit: cover;
      padding: 10px 0;
    }
  }
  .user {
    font-size: 14px;
    color: #ccc;
    span:first-child {
      margin-right: 8px;
    }
  }
}
</style>
