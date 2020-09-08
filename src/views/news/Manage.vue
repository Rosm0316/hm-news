<template>
  <div class="manage">
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="active">
        <p>点击删除以下频道(至少保留四项)</p>
        <div class="list">
          <div class="item" v-for="item in activeList" :key="item.id" @click="delItem(item.id)">{{item.name}}</div>
        </div>
      </div>
      <div class="deactive">
        <p>点击添加以下频道</p>
        <div class="list">
          <div class="item" v-for="item in deactiveList" :key="item.id" @click="addItem(item.id)">{{item.name}}</div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  async created () {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
    if (activeList) {
      this.activeList = activeList
      this.deactiveList = deactiveList
      return
    }
    const res = await this.$axios.get('/category')
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activeList = data
      // console.log(this.activeList)
    }
  },
  methods: {
    delItem (id) {
      if (this.activeList.length <= 4) {
        return
      }
      const index = this.activeList.findIndex(item => item.id === id)
      this.deactiveList.push(this.activeList[index])
      this.activeList.splice(index, 1)
    },
    addItem (id) {
      const index = this.deactiveList.findIndex(item => item.id === id)
      this.activeList.push(this.deactiveList[index])
      this.deactiveList.splice(index, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler (value) {
        // console.log(value) // value是最新变化后的active数组
        localStorage.setItem('activeList', JSON.stringify(value))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 10px;
  .active,
  .deactive {
    p {
      font-size: 14px;
      margin: 10px 0;
    }
    .list {
      overflow: hidden;
      .item {
        float: left;
        width: 60px;
        height: 30px;
        border: 1px solid #ccc;
        background-color: #eeeeee;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        margin: 5px;
      }
    }
  }
}
</style>
