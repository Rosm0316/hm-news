<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="账号"
        placeholder="请输入你的账号"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
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
  </div>
</template>
<script>
import axios from 'axios'
export default {
  methods: {
    async onSubmit () {
      // console.log('登录')
      const res = await axios.post('http://127.0.0.1:3000/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push('/register')
      } else {
        this.$toast.fail('登录失败')
      }
    }
  },
  data () {
    return {
      username: '',
      password: '',
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

<style lang="less">

</style>
