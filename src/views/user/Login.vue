<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        name="用户名"
        label="账号"
        placeholder="请输入你的账号"
        :rules="rules.username"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入你的密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button  block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <p class="tips">没有账号？去<router-link to="/register">注册</router-link></p>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  // create () {
  // },
  methods: {
    async onSubmit () {
      // console.log('登录')
      const res = await this.$axios.post('/login', this.user)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // console.log(res)
        // 把token存起来
        localStorage.setItem('token', data.token)
        // 把userId存起来
        localStorage.setItem('userId', data.user.id)
        // this.$router.push('/user')
        // 判断地址栏里有没有back,有back就往回跳,没有就跳到user
        if (this.$route.query.back) {
          this.$router.back()
        } else {
          this.$router.push('/user')
        }
      } else {
        this.$toast.fail('登录失败')
      }
    }
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度为5-11位', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '用户名密码是3-9位数字', trigger: 'onChange' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  font-size: 16px;
  text-align: right;
  margin-right: 16px;
  a {
    color:orange;
  }
}
</style>
