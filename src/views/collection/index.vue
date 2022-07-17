<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      class="navBar"
      title="收藏列表"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 内容 -->
    <van-loading size="24px" vertical v-if="loading">加载中...</van-loading>

    <card
      :List="item"
      v-for="(item, index) in collectList"
      :key="index"
      v-else
    ></card>
  </div>
</template>

<script>
import { getCollection } from '@/api/collection'
import card from '@/components/card.vue'
export default {
  components: {
    card
  },
  data() {
    return {
      collectList: [],
      loading: true
    }
  },
  async created() {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token)
      return this.$router.push({
        path: '/login',
        query: {
          path: 'collection'
        }
      })
    try {
      const res = await getCollection(token)
      if (res.data.status !== 200) return this.$toast(res.data.description)
      this.collectList = res.data.body
      this.loading = false
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: 'profile'
      })
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
.card {
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  font-size: 15px;
  .img {
    width: 106px;
    height: 80px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .text {
    margin-left: 10px;
    h4 {
      margin: 15px 0 7px 0;
      color: #394043;
      line-height: 15px;
    }
    p {
      margin: 0 0 5px 0;
      font-size: 12px;
      color: #afb2b3;
    }
    span {
      color: #39becd;
      background: #e1f5f8;
      padding: 4px 5px;
      font-size: 12px;
      border-radius: 3px;
    }
    .price {
      font-size: 16px;
      font-weight: bolder;
      color: #fa5741;
      margin-bottom: 10px;
      margin-top: 5px;
      small {
        font-size: 12px;
        font-weight: 400;
        margin-left: 5px;
      }
    }
  }
}
</style>
