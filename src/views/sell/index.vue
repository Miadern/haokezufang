<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      class="navBar"
      title="房屋管理"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 内容 -->
    <van-empty description="你还没有房源去发布房源吧！" v-if="loading" />
    <card
      :List="item"
      v-for="(item, index) in houseList"
      :key="index"
      v-else
    ></card>
  </div>
</template>

<script>
import { getSell } from '@/api/sell'
import card from '@/components/card'
export default {
  components: {
    card
  },
  data() {
    return {
      houseList: [],
      loading: true
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: 'profile'
      })
    }
  },
  async created() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token)
      return this.$router.push({
        path: '/login',
        query: {
          path: 'sell'
        }
      })
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })

    try {
      const res = await getSell(token)
      if (res.data.status !== 200) return this.$toast(res.data.description)
      this.houseList = res.data.body
      this.$toast.clear()
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped lang="less">
.navBar {
  background-color: #21b97a;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
