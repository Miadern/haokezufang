<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navBar"
      title="城市列表"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 内容    :index-list="indexList"-->
    <van-index-bar :index-list="indexList" :sticky="false">
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell :title="cityNow" @click="sendCityFn(cityNow)" />
      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        :title="item.label"
        v-for="item in cityHot"
        :key="item.label"
        @click="sendCityFn(item.label)"
      />
      <div v-for="(item, index) in codeCity" :key="index">
        <van-index-anchor :index="indexList[index + 2]">
          {{ item.index }}</van-index-anchor
        >
        <van-cell title="文本" v-for="(item, index) in item.cname" :key="index">
          <template #title>{{ item }}</template>
        </van-cell>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCity, getCityhot } from '@/api/city'
export default {
  async created() {
    // 获取城市信息
    try {
      const res = await getCity(1)
      this.cityList = res.data.body
      for (let i = 0; i < 26; i++) {
        const item = this.cityList.filter((item) => {
          return item.short.substr(0, 1).toUpperCase() === this.indexListX[i]
        })
        const obj = {
          index: this.indexListX[i],
          cname: []
        }
        item.forEach((item) => {
          obj.cname.push(item.label)
        })
        this.codeCity.push(obj)
      }
      this.codeCity.forEach((item) => {
        if (item.cname.length === 0) {
          item.cname.push('暂无城市')
        }
      })

      // 获取热门
      const resHot = await getCityhot()
      this.cityHot = resHot.data.body
    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      cityNow: this.$route.query.cityAction || '北京',
      cityHot: [],
      cityList: [],
      indexList: [
        '#',
        '热',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      indexListX: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      codeCity: []
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    sendCityFn(val) {
      this.$router.push({
        path: '/home',
        query: {
          cityAction: val
        }
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
:deep(.van-index-bar__index--active) {
  color: #fff;
  background-color: #21b97a;
  border-radius: 100%;
  display: inline-block;
  font-size: 12px;
  // line-height: 15px;
  font-size: 14px;
}

:deep(.van-index-bar__index) {
  padding: 0;
  padding: 0;
  margin: 3px 0;
  font-size: 14px;
}
</style>
