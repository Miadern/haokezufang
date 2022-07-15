<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navbar"
      title="账号登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{}]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{}]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="vanbtn"
          >登 录</van-button
        >
      </div>
      <div class="aMargin">
        <a href="">还没有账号，去注册~</a>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/Login'

export default {
  data() {
    return {
      username: 'hzhmqd',
      password: '123456'
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: 'profile'
      })
    },
    async onSubmit(values) {
      // 验证登录的正则
      if (
        this.username.trim().length === 0 ||
        this.password.trim().length === 0
      ) {
        this.$toast('用户名和密码不能为空')
      } else if (!/[a-zA-Z0-9]{5,8}/.test(this.username)) {
        this.$toast('用户名格式5-8位的字母和数字')
      } else if (!/[a-zA-Z0-9]{5,12}/.test(this.password)) {
        this.$toast('密码格式5-12位的字母和数字')
      } else {
        // 成功进入服务器判断
        const res = await login(this.username, this.password)
        if (res.data.status !== 200) {
          return this.$toast(res.data.description)
        } else {
          // 成功后进行操作
          localStorage.setItem('token', JSON.stringify(res.data.body.token))
          this.$toast({
            message: '登录成功！',
            icon: 'passed'
          })
          // 跳出页面
          setTimeout(() => {
            this.$router.push({
              path: this.$route.query.path || '/profile'
            })
          }, 1000)
        }
      }
    }
  }
}
</script>

<style soped lang="less">
.navbar {
  margin-bottom: 21px;
  background-color: #21b97a;
  .van-icon {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
    font-size: 18px;
  }
}
.van-cell {
  height: 60px;
  font-size: 17px;
  line-height: 40px;
}
.vanbtn {
  color: #fff;
  background-color: #1cb676;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
}
.aMargin {
  margin-top: 30px;

  text-align: center;
  font-size: 14px;
  a {
    color: #666;
  }
}
.van-cell::after {
  background-color: #ddd;
}
</style>
