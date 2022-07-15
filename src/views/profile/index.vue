<template>
  <div>
    <!-- 定位盒子部分 -->
    <div
      class="img"
      :style="{
        background: info.avatar
          ? `url('http://liufusong.top:8080${info.avatar}') no-repeat center/contain`
          : ''
      }"
    >
      <van-image
        fit="contain"
        :src="require('@/assets/bg.png')"
        v-show="!info.id"
      />
      <div class="box">
        <van-image
          round
          width="70"
          height="70"
          :src="require('@/assets/avatar.png')"
        />
        <p>{{ info.nickname || '游客' }}</p>
        <van-button
          color="#21b97a"
          size="small"
          @click="loginFn"
          v-if="!info.id"
          >去登陆</van-button
        >
        <div v-else>
          <van-button
            round
            color="#21b97a"
            size="mini"
            @click="exitFn"
            style="padding: 0 20px"
            >退出</van-button
          >
          <div class="efitInfo">编辑个人资料<van-icon name="play" /></div>
        </div>
      </div>
    </div>
    <!-- 宫格 -->
    <van-grid class="vangrid" :column-num="3" clickable border>
      <van-grid-item icon="star-o" text="我的收藏" to="/collection" />
      <van-grid-item
        icon="wap-home-o"
        text="我的出租"
        to="/sell"
      /><van-grid-item icon="clock-o" text="看房记录" @click="errFn" />
      <van-grid-item
        icon="vip-card-o"
        text="成为房主"
        @click="errFn"
      /><van-grid-item icon="user-o" text="个人资料" @click="errFn" />
      <van-grid-item icon="service-o" text="联系我们" @click="errFn" />
    </van-grid>
    <div class="joinImg">
      <img src="@/assets/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/profile'
export default {
  async created() {
    const token = JSON.parse(localStorage.getItem('token'))
    const res = await getInfo(token)
    if (res.data.status !== 200) return
    this.info = res.data.body
  },
  data() {
    return {
      info: {}
    }
  },

  methods: {
    // 施工中的提示函数
    errFn() {
      this.$toast('施工中暂时无法使用~')
    },
    // 登录按钮
    loginFn() {
      this.$router.push({
        path: '/login'
      })
    },
    // 退出按钮
    exitFn() {
      this.$dialog
        .confirm({
          title: '注意',
          message: '你确定要退出吗？'
        })
        .then(() => {
          // on confirm
          localStorage.removeItem('token')
          this.info = {}
          this.$router.push({
            path: '/profile'
          })
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.box {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 85%;
  height: 180px;
  z-index: 99;
  box-shadow: 0 0 10px 3px #ddd;
  text-align: center;
  font-size: 13px;
  p {
    margin-top: 60px;
  }
  .van-button--small {
    padding: 0 15px;
    border-radius: 5px;
  }
  .efitInfo {
    color: #999;
    font-size: 12px;
    margin-top: 15px;
  }
}
.img {
  position: relative;
  height: 300px;
  // background: url('http://liufusong.top:8080/img/avatar.png') no-repeat center;
  background-size: contain;
}
:deep(.van-image--round) {
  border: 5px solid #f5f5f5;
  position: absolute;
  top: -25%;
  left: 50%;
  margin-left: -35px;
  box-shadow: 0 2px 2px #bdbdbd;
}
.vangrid {
  :deep([class*='van-hairline']::after) {
    border: 0;
  }
}
:deep(.van-hairline--top::after) {
  border: 0;
}
.joinImg {
  margin-top: 20px;
  text-align: center;
  img {
    width: 90%;
  }
}
</style>
