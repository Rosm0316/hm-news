<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      <van-uploader :after-read="afterRead" />
    </div>
    <hm-navitem @click="showNickname">
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </hm-navitem>
    <hm-navitem @click="showPassword">
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem @click="showGender">
      <template>性别</template>
      <template #content>{{user.gender === 1 ? '男':'女'}}</template>
    </hm-navitem>
    <van-dialog v-model="isShowNickname" title="编辑昵称" show-cancel-button @confirm="updateNickname" >
      <van-field v-model="nickname" ref="nickname" />
    </van-dialog>
    <van-dialog v-model="isShowPassword" title="编辑密码" show-cancel-button @confirm="updatePassword">
      <van-field v-model="password" ref="password" />
    </van-dialog>
    <van-dialog v-model="isShowGender" title="编辑性别" show-cancel-button @confirm="updateGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
         <van-cell title="男" clickable @click="gender = 1">
           <template #right-icon>
              <van-radio :name="1" />
           </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!-- 裁剪的模态框 -->
    <div class="mask" v-show="isShowMask">
      <van-button type="danger" class="cancel" @click="cancel">取消</van-button>
      <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
      <VueCropper
      ref="aa"
      :img="img"
      autoCrop
      autoCropWidth="100"
      autoCropHeight="100"
      fixed
      ></VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  components: {
    VueCropper
  },
  data () {
    return {
      user: '',
      isShowNickname: false,
      isShowPassword: false,
      isShowGender: false,
      nickname: '',
      password: '',
      gender: 1,
      isShowMask: false,
      img: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async updateUser (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      // console.log(res)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
      }
    },
    async showNickname () {
      // console.log(123)
      this.isShowNickname = true
      this.nickname = this.user.nickname
      // 等待DOM更新
      await this.$nextTick()
      // 自动获取焦点
      this.$refs.nickname.focus()
    },
    async showPassword () {
      this.isShowPassword = true
      this.password = this.user.password
      // 等待DOM更新
      await this.$nextTick()
      // 自动获取焦点
      this.$refs.password.focus()
    },
    showGender () {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    async updateNickname () {
      this.updateUser({ nickname: this.nickname })
    },
    async updatePassword () {
      this.updateUser({ password: this.password })
    },
    async updateGender () {
      this.updateUser({ gender: this.gender })
    },
    isImg (name) {
      if (name.endsWith('.gif') || name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png')) {
        return true
      } else {
        return false
      }
    },
    async afterRead (file) {
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('请上传图片!!!')
      }
      if (file.file.size >= 200 * 1024) {
        return this.$toast.fail('图片上传过大')
      }
      // 显示图片裁剪
      this.isShowMask = true
      this.img = file.content
      // 此时可以自行将文件上传至服务器
      // console.log('文件读取完毕', file)
    },
    cancel () {
      this.isShowMask = false
    },
    crop () {
      this.$refs.aa.getCropBlob(async blob => {
        // console.log(data)
        // 发送请求,上传文件
        // 如果是通过ajax上传文件,请求体不能直接是一个普通对象,必须是一个formData对象
        // 创建一个空的formData对象
        const fd = new FormData()
        // 给formData对象添加上传对象
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        // console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          // console.log(data.url)
          this.updateUser({
            head_img: data.url
          })
        }
        this.isShowMask = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  position: relative;
  text-align: center;
  padding: 40px 0;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    left: 50%;
    height: 40px;
    transform: translate(-50%);
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
/deep/.van-dialog__content {
  padding: 15px;
 .van-field {
   border: 1px solid #ccc;
 }
}
.mask {
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  .cancel,.crop {
    position: fixed;
    z-index: 1;
  }
  .crop {
    right: 0;
  }
}

</style>
