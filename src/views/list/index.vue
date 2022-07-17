<template>
  <div>
    <!-- 搜索栏 -->
    <van-search
      v-model="value"
      show-action
      placeholder="请输入小区或地址"
      background="#21b97a"
      ><template #label>
        <div @click="mapFn">{{ cityAction }}<van-icon name="arrow-down" /></div
      ></template>
      <template #action>
        <div @click="onSearch"><van-icon name="expand-o" /></div>
      </template>
    </van-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      cityAction: this.$route.query.cityAction || '北京'
    }
  },
  methods: {
    onSearch() {
      // 跳转地图
    },
    // 搜索栏左边的跳转地图
    mapFn() {
      this.$router.push({
        path: '/city'
      })
    }
  }
}
</script>

<style></style>
