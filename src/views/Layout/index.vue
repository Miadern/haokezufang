<template>
  <div class="main">
    <!-- 2级路由入口 -->
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/list" icon="search">找房</van-tabbar-item>
      <van-tabbar-item to="/news" icon="newspaper-o">资讯</van-tabbar-item>
      <van-tabbar-item to="/profile" icon="user-circle-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
.main {
  padding-bottom: 1.4rem;
}
</style>
