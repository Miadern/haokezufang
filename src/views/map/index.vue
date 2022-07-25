<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navBar"
      title="地图找房"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 地图 -->
    <baidu-map
      class="bm-view"
      :center="center"
      :zoom="zoom"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
      :scroll-wheel-zoom="true"
    >
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
      <!--   <bm-marker
        :position="{ lng: 116.404, lat: 39.915 }"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
      >
        <bm-label
          content="我爱北京天安门"
          :labelStyle="{ color: 'red', fontSize: '24px' }"
          :offset="{ width: -35, height: 30 }"
        />
      </bm-marker> -->

      <bm-marker
        class="marker"
        v-for="(item, index) in mapList"
        :key="index"
        :position="{ lng: item.coord.longitude, lat: item.coord.latitude }"
        :dragging="false"
        :icon="{ url: '@/assets/点.svg' }"
      >
        <bm-label
          :offset="{ width: -40, height: -40 }"
          :content="`${item.label}\r\n${item.count}套`"
          @click="markerFn(item)"
          :labelStyle="{
            width: '70px',
            height: '70px',
            lineHeight: '1',
            display: 'inline-block',
            position: 'absolute',
            borderRadius: '100%',
            background: 'rgba(12,181,106,.9)',
            color: '#fff',
            border: '2px solid hsla(0,0%,100%,.8)',
            textAlign: 'center',
            cursor: 'pointer',
            lineHeight: '31px',
            whiteSpace: 'break-spaces'
          }"
        >
        </bm-label>
      </bm-marker>

      <!-- 最后的列表 -->
      <bm-marker
        class="marker"
        v-for="(item, index) in mapListRes"
        :key="index"
        :position="{ lng: item.coord.longitude, lat: item.coord.latitude }"
        :dragging="false"
        :icon="{ url: '@/assets/点.svg' }"
      >
        <bm-label
          :offset="{ width: -40, height: -40 }"
          :content="`${item.label}\r\n${item.count}套`"
          @click="markerFn(item)"
          :labelStyle="{
            height: '20px',
            lineHeight: '19px',
            width: '100px',
            padding: '0 3px',
            borderRadius: '3px',
            position: 'absolute',
            background: 'rgba(12,181,106,.9)',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }"
        >
        </bm-label>
      </bm-marker>
    </baidu-map>
    <!-- 弹出层 -->

    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-cell title="房屋清单" value="更多房源" />
    </van-popup>
  </div>
</template>
<!-- :offset="{ width: -35, height: 30 }" -->
<script>
import { getMapID } from '@/api/home'
import { getMap, getFilerRes } from '@/api/map.js'

export default {
  async created() {
    await this.getMapID()
    this.getMap()
  },
  data() {
    return {
      id: '',
      center: { lng: 116.404, lat: 39.915 },
      zoom: 3,
      // 获取城市的列表
      mapList: [],
      // 最后的列表
      mapListRes: [],
      // 房源列表
      houseList: [],
      // 弹出层
      show: false,
      // 步骤编码，初始为1，每次点击标签会+1进入下一个阶段
      flag: 1
    }
  },
  methods: {
    // 双向绑定地图
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    // 点击图标
    async markerFn(item) {
      // 将获取的坐标和视图更新

      // 如果视角为11，13，16时的操作
      if (this.flag === 1) {
        this.flag++
        this.center.lng = item.coord.longitude
        this.center.lat = item.coord.latitude
        this.zoom = 13
        // 将原来的坐标覆盖
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          message: '加载中...',
          forbidClick: true
        })
        try {
          const res = await getMap(item.value)
          console.log(res)
          this.mapList = res.data.body
          this.center.lng = res.data.body[0].coord.longitude
          this.center.lat = res.data.body[0].coord.latitude
          this.$toast.success('加载成功')
        } catch (error) {
          this.$toast.fail('加载失败')
        }
      } else if (this.flag === 2) {
        this.flag++
        this.center.lng = item.coord.longitude
        this.center.lat = item.coord.latitude
        this.zoom = 16
        // 将原来的坐标覆盖
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          message: '加载中...',
          forbidClick: true
        })
        try {
          const res = await getMap(item.value)
          console.log(res)
          this.mapList = []
          this.mapListRes = res.data.body
          this.center.lng = res.data.body[0].coord.longitude
          this.center.lat = res.data.body[0].coord.latitude
          this.$toast.success('加载成功')
        } catch (error) {
          this.$toast.fail('加载失败')
        }
      } else if (this.flag === 3) {
        this.show = true
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          message: '加载中...',
          forbidClick: true
        })
        try {
          const res = await getFilerRes(item.value, 1, 10)
          console.log(res)
          /*  this.houseList = res.body.list */
          this.$toast.success('加载成功')
        } catch (error) {
          this.$toast.fail('加载失败')
        }
      }
    },

    // 获取城市ID
    async getMapID() {
      const getMapIDres = await getMapID(
        JSON.parse(localStorage.getItem('cityAction'))
      )
      this.id = getMapIDres.data.body.value
    },
    // 获取地图资料
    async getMap() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await getMap(this.id)
        console.log(res)
        this.mapList = res.data.body
        this.center.lng = res.data.body[0].coord.longitude
        this.center.lat = res.data.body[0].coord.latitude
        this.zoom = 11
        this.$toast.success('加载成功')
      } catch (error) {
        this.$toast.fail('加载失败')
      }
    },
    // 导航栏返回
    onClickLeft() {
      this.$router.back()
    }
    // 地图组件
    /*  handler({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 11
    } */
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
.bm-view {
  width: 100%;
  height: calc(93vh);
  /*  :deep(.marker) {
    :deep(img) {
      display: none !important;
    }
  } */
}
</style>
