<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navBar"
      title="城市列表"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 内容 -->
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="1">标题1</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="2">标题2</van-index-anchor>
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</template>

<script>
import { getCity } from '@/api/city'
export default {
  async created() {
    const res = await getCity(1)
    console.log(res)
  },
  data() {
    return {
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
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
