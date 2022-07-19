<template>
  <div>
    <!-- 搜索栏 -->
    <div :class="{ main: cssChange }">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
        @input="onSearch"
        @focus="cssChange = false"
        @blur="cssChange = true"
      />
    </div>

    <!-- 搜索内容 -->
    <div>
      <van-cell
        v-for="(item, index) in searchList"
        :key="index"
        :title="item.communityName"
        @click="backFn(item.communityName)"
      />
    </div>
  </div>
</template>

<script>
import { getCommunity } from '@/api/publish'

export default {
  data() {
    return {
      // css状态改变
      cssChange: true,
      // 搜索栏val
      value: '',
      // 地区ID
      id: this.$route.query.id,
      // 防抖的定时器
      timer: null,
      // 搜索列表
      searchList: []
    }
  },
  methods: {
    // 搜索栏触发的函数
    onSearch(val) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getCommunity()
      }, 1000)
    },
    // 获取搜索返回的可选项
    async getCommunity() {
      const {
        data: { body }
      } = await getCommunity(this.value, this.id)
      this.searchList = body
    },
    // 点击返回上一幕
    onCancel() {
      this.$router.back()
    },
    // 点击卡片后返回到上个页面
    backFn(val) {
      this.$router.push({
        path: '/publish',
        query: {
          val
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.main {
  :deep(.van-search__content) {
    padding-left: 100px;
    transition: all 0.1s linear 0s;
  }
}
:deep(.van-search__content) {
  padding-left: 10px;
  transition: all 0.1s linear 0s;
}
.change {
  padding-left: 100px;
}
</style>
