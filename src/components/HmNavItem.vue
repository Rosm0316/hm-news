<template>
  <div class="nav-item" @click="turnTo">
    <div class="title">
      <slot ></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    to: String
  },
  methods: {
    turnTo () {
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  }
}
</script>

<style lang="less">
.nav-item {
height: 50px;
display: flex;
align-items: center;
border-bottom: 1px solid #ddd;
font-size: 16px;
margin-left: 20px;
margin-right: 20px;
.content {
  flex: 1;
  text-align: right;
  margin-right: 10px;
  color: #666;
}
}
</style>
