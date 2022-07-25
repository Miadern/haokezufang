<template>
  <div class="main">
    <!-- 头部 -->
    <van-nav-bar
      class="navBar"
      :title="houseInfo.community"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in houseImg" :key="item"
        ><img :src="`http://liufusong.top:8080${item}`" alt=""
      /></van-swipe-item>
    </van-swipe>
    <!-- 信息card -->
    <div class="infoCard">
      <div class="tit">
        {{ houseInfo.title }}
      </div>
      <van-tag
        type="primary"
        v-for="(item, index) in houseInfo.tags"
        :key="index"
        >{{ item }}</van-tag
      >
      <div class="price">
        <div class="item">
          <span>{{ houseInfo.price }}/月</span>
          <p>租金</p>
        </div>
        <div>
          <span>{{ houseInfo.roomType }}</span>
          <p>房型</p>
        </div>
        <div>
          <span>{{ houseInfo.size }}平米</span>
          <p>面积</p>
        </div>
      </div>
      <!-- row -->
      <div class="row">
        <van-row>
          <van-col span="12"><span>装修:</span>精装</van-col>
          <van-col span="12"><span>朝向:</span>{{ houseOriented }}</van-col>
        </van-row>
        <van-row>
          <van-col span="12"><span>楼层:</span>{{ houseInfo.floor }}</van-col>
          <van-col span="12"><span>类型:</span>普通住宅</van-col>
        </van-row>
      </div>
    </div>

    <div class="houseMap">
      <p>小区：{{ houseInfo.community }}</p>

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
        <bm-marker
          :style="{ width: '10px', height: '10px' }"
          :position="centerNow"
          :dragging="false"
        >
          <bm-label
            :content="houseInfo.community"
            :labelStyle="{
              color: 'red',
              backgroundColor: 'rgb(238, 93, 91)',
              border: '1px solid rgb(255, 0, 0)',
              padding: '5px 10px',
              font: '12px arial, sans-serif',
              color: 'rgb(255, 255, 255)'
            }"
            :offset="{ width: -35, height: 30 }"
          />
        </bm-marker>
      </baidu-map>
    </div>
    <div class="iconbox">
      <div class="header">
        <h4>房屋配套</h4>
      </div>
      <van-grid
        :border="false"
        :column-num="
          houseInfo.supporting.length >= 5 ? 5 : houseInfo.supporting.length
        "
      >
        <van-grid-item
          v-for="(item, index) in houseInfo.supporting"
          :key="index"
          :text="item"
        >
          <template #icon> <span :class="houseGoods[item]"></span> </template
        ></van-grid-item>
      </van-grid>
    </div>
    <!-- 房屋概况 -->
    <div class="info">
      <div class="header"><h4>房源概况</h4></div>
      <div class="content">
        <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
        <div style="display: flex; flex-direction: column">
          王女士<span class="red"><van-icon name="shield-o" />已认证房主</span>
        </div>
        <van-button plain type="primary" class="msgbtn">发消息</van-button>
      </div>
      <div class="txt">
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </div>
    </div>

    <!-- 猜你喜欢 -->
    <div class="uLike">
      <div class="header">
        <h4>猜你喜欢</h4>
      </div>
      <cardVue
        :List="item"
        v-for="(item, index) in ulike"
        :key="index"
      ></cardVue>
    </div>
    <!-- 底部 -->
    <van-tabbar class="tabbar">
      <van-tabbar-item @click="editFavorite">
        <template #icon>
          <van-icon
            name="star"
            v-if="isFavor"
            :key="1"
            color="rgb(255,79,0)"
          /><van-icon v-else name="star-o" />收藏
        </template>
      </van-tabbar-item>
      <van-tabbar-item>在线咨询</van-tabbar-item>
      <van-tabbar-item class="green">电话预约</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import cardVue from '@/components/card.vue'
import {
  getHouseInfo,
  doYouFavorites,
  doYouFavoritesAdd,
  doYouFavoritesDel
} from '@/api/houseinfo'

export default {
  components: {
    cardVue
  },
  /*  computed: {
    isFavorite() {
      return this.isFavor
    }
  }, */
  data() {
    return {
      width: 20,
      id: this.$route.query.houseId,
      isFavor: false,
      houseInfo: {},
      houseOriented: '',
      houseGoods: {
        电视: 'iconfont icon-lcd',
        冰箱: 'iconfont icon-bingxiang',
        洗衣机: 'iconfont icon-xiyiji',
        空调: 'iconfont icon-kongtiao',
        热水器: 'iconfont icon-reshuiqi',
        沙发: 'iconfont icon-shafa',
        暖气: 'iconfont icon-nuanqi',
        宽带: 'iconfont icon-kuandai',
        衣柜: 'iconfont icon-yigui',
        天然气: 'iconfont icon-tianranqi-01'
      },
      houseImg: [],
      ulike: [
        {
          houseImg: '/uploads/upload_f8dcc1093561a0af245e91b111c21730.jpg',
          title: '修猫小区',
          tags: ['近地铁'],
          price: 3000,
          desc: '四室/60/北/亮马水晶',
          houseCode: '5a260236-1e9c-d284'
        },
        {
          houseImg: '/uploads/upload_2ea57ac079baaf77debaa1090aaa6555.jpg',
          title: '修狗之家',
          tags: ['近地铁'],
          price: 10000,
          desc: '四室/200/北/亮马水晶',
          houseCode: 'f69fc55d-82f8-01c1'
        },
        {
          houseImg: '/uploads/upload_7709164c2c67af109182949143336914.jpeg',
          title: '小王小胡妙妙屋',
          tags: ['近地铁'],
          price: 1000000,
          desc: '三室/100/东/南京路14号大院',
          houseCode: '8c492765-b478-fe23'
        }
      ],
      // 地图
      center: { lng: 116.404, lat: 39.915 },
      zoom: 18,
      centerNow: { lng: 116.404, lat: 39.915 }
    }
  },
  created() {
    this.getHouseInfo()
    this.doYouFavorites()
  },
  methods: {
    // 让地图位置为小区位置

    // 双向绑定地图
    syncCenterAndZoom(e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    async doYouFavoritesAdd() {
      try {
        await doYouFavoritesAdd(this.id)
        this.$toast.success('收藏成功')
        this.doYouFavorites()
      } catch (error) {
        this.$toast.fail('请重试')
        console.log(error)
      }
    },
    async doYouFavoritesDel() {
      try {
        await doYouFavoritesDel(this.id)
        this.$toast.success('取消收藏成功')
        this.doYouFavorites()
      } catch (error) {
        this.$toast.fail('请重试')
        console.log(error)
      }
    },

    onClickLeft() {
      this.$router.back()
    },
    async getHouseInfo() {
      try {
        const res = await getHouseInfo(this.$route.query.houseId)
        console.log(res)
        this.houseInfo = res.data.body
        this.houseOriented = res.data.body.oriented[0]
        this.houseImg = res.data.body.houseImg
        this.center.lng = res.data.body.coord.longitude
        this.center.lat = res.data.body.coord.latitude
        this.centerNow.lng = res.data.body.coord.longitude
        this.centerNow.lat = res.data.body.coord.latitude
      } catch (error) {
        console.log(error)
      }
    },
    // 查看房屋是否收藏
    async doYouFavorites() {
      const res = await doYouFavorites(this.$route.query.houseId)
      this.isFavor = res.data.body.isFavorite
    },
    editFavorite() {
      if (this.isFavor) {
        this.doYouFavoritesDel()
      } else {
        this.doYouFavoritesAdd()
      }
    }
  }
}
</script>

<style scoped lang="less">
.main {
  background-color: #f6f5f6;
  padding-bottom: 50px;
}
.navBar {
  background-color: #21b97a;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
//轮播图
.my-swipe .van-swipe-item {
  background-color: #fff;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  height: 250px;
  img {
    height: 100%;
  }
}
.tabbar {
  :deep(.van-tabbar-item__icon) {
    display: flex;
  }
  :deep(.van-tabbar-item__text) {
    font-size: 17px;
  }
  .van-tabbar-item {
    border-right: 1px solid #e8e8e9;
    border-top: 1px solid #cecece;
  }
  .green {
    background-color: #21b97a;
    color: #fff;
  }
  .van-tabbar-item--active {
    color: #999;
  }
}

//卡片
.infoCard {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  .tit {
    margin: 15px 0;
    font-size: 16px;
  }
  //tags
  .van-tag--primary {
    color: #39becd;
    background: #e1f5f8;
    display: inline-block;
    font-size: 12px;
    border-radius: 3px;
    padding: 4px 5px;
    margin-right: 5px;
    line-height: 12px;
  }
  //价格区块
  .price {
    padding: 15px 0;
    margin: 15px 0;
    display: flex;
    justify-content: space-evenly;
    font-size: 18px;
    border-top: 1.5px solid #cecece;
    border-bottom: 1.5px solid #cecece;
    span {
      color: #fa5741;
      font-size: 18px;
      font-weight: bolder;
    }
    p {
      margin: 0;
      height: 26px;
      line-height: 26px;
      color: #999;
      font-size: 14px;
      text-align: center;
    }
  }
  //row
  .row {
    font-size: 14px;
    span {
      color: #999;
      margin-right: 10px;
      margin-left: 10px;
    }
  }
}
// 地图区域
.houseMap {
  :deep(.BMapLabel) {
    font: 12px arial, sans-serif !important;
  }
  padding: 4px 0 40px;
  .bm-view {
    width: 100%;
    height: 100%;
    /*  :deep(.marker) {
    :deep(img) {
      display: none !important;
    }
  } */
  }
  background-color: #fff;
  font-size: 14px;
  height: 145px;
}
//房屋配套
.iconbox {
  padding: 0 10px;
  background-color: #fff;
  .header {
    background-color: #fff;
    h4 {
      margin: 0;
      padding: 15px 0;
      font-size: 15px;
      border-bottom: 1.5px solid #cecece;
    }
  }
}
//房屋概况
.info {
  margin: 10px 0;
  padding: 0 10px;
  background-color: #fff;
  font-size: 15px;
  .header {
    background-color: #fff;
    h4 {
      margin: 0;
      padding: 15px 0;
      font-size: 15px;
      border-bottom: 1.5px solid #cecece;
    }
  }
  .txt {
    padding: 10px 0;
    font-size: 14px;
    color: #333;
  }
  .content {
    margin: 10px 0;
    display: flex;
    align-items: center;
    background-color: #fff;
    img {
      width: 52px;
      margin-right: 30px;
    }
    .msgbtn {
      position: absolute;
      right: 30px;
      width: 74px;
      height: 30px;
      border: 1px solid #33be85;
    }
    .red {
      color: #fa5741;
      font-size: 12px;
    }
  }
}

//猜你喜欢
.uLike {
  margin: 10px 0;
  padding: 0 10px;
  background-color: #fff;
  font-size: 15px;
  .header {
    background-color: #fff;
    h4 {
      margin: 0;
      padding: 15px 0;
      font-size: 15px;
      border-bottom: 1.5px solid #cecece;
    }
  }
}
</style>
