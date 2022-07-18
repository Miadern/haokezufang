<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      class="navBar"
      title="发布房源"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 主体 -->
    <van-cell-group>
      <van-cell title="房源信息" class="title" />
      <van-cell title="小区名称" is-link :value="val" @click="goSearch" />
      <van-field v-model="price" label="租金" placeholder="请输入租赁/月">
        <template #extra> <span class="small">￥/月</span> </template>
      </van-field>
      <van-field v-model="size" label="建筑形状" placeholder="请输入建筑结构">
        <template #extra> <span class="small">㎡</span> </template>
      </van-field>
      <!-- 户型 -->
      <van-field
        readonly
        clickable
        label="户型"
        :value="roomType"
        placeholder="请选择"
        @click="showPicker1 = true"
      />
      <van-popup v-model="showPicker1" round position="bottom">
        <van-picker
          show-toolbar
          :columns="roomTypeList"
          @cancel="showPicker1 = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <!-- 楼层 -->
      <van-field
        readonly
        clickable
        label="楼层"
        :value="floor"
        placeholder="请选择"
        @click="showPicker2 = true"
      />
      <van-popup v-model="showPicker2" round position="bottom">
        <van-picker
          show-toolbar
          :columns="floorList"
          @cancel="showPicker2 = false"
          @confirm="onConfirm2"
        />
      </van-popup>
      <!-- 朝向 -->
      <van-field
        readonly
        clickable
        label="朝向"
        :value="oriented"
        placeholder="请选择"
        @click="showPicker3 = true"
      />
      <van-popup v-model="showPicker3" round position="bottom">
        <van-picker
          show-toolbar
          :columns="orientedList"
          @cancel="showPicker3 = false"
          @confirm="onConfirm3"
        />
      </van-popup>
      <van-cell title="朝向" is-link :value="oriented" @click="orientedFn" />
    </van-cell-group>

    <!-- 底部 -->
    <van-row class="footer">
      <van-col span="12" class="backCol" @click="backHome">取消</van-col>
      <van-col span="12">提交</van-col>
    </van-row>
    <!-- 弹出框 -->
  </div>
</template>

<script>
export default {
  created() {},

  data() {
    return {
      // 地区ID
      id: this.$route.query.id,
      // 小区名称的变量
      val: this.$route.query.val || '请输入小区名称',
      price: '',
      size: '',
      roomType: '请选择',
      floor: '请选择',
      oriented: '请选择',
      roomTypeList: ['一室', '两室', '三室', '四室', '四室+'],
      floorList: ['高楼', '中楼', '低楼'],
      orientedList: [
        '东',
        '南',
        '西',
        '北',
        '东南',
        '西北',
        '西南',
        '西北',
        '东北'
      ],

      showPicker1: false,
      showPicker2: false,
      showPicker3: false
    }
  },
  methods: {
    // 选择成功函数
    onConfirm(value) {
      this.roomType = value
      this.showPicker1 = false
    },
    onConfirm2(value) {
      this.floor = value
      this.showPicker2 = false
    },
    onConfirm3(value) {
      this.oriented = value
      this.showPicker3 = false
    },

    onClickLeft() {
      this.$router.back()
    },
    // 去搜索栏页面
    goSearch() {
      this.$router.push({
        path: '/search',
        query: {
          id: this.id
        }
      })
    },
    // 点击取消回到home
    backHome() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '发布房源？',
          confirmButtonText: '继续编辑',
          confirmButtonColor: '#108ee9',
          cancelButtonText: '放弃',
          width: '280px'
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
          this.$router.push('/home')
        })
    },
    roomTypeFn() {},
    floorFn() {},
    orientedFn() {}
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
//主体部分标题
.title {
  color: #21b97a;
  background-color: #fff;
  font-size: 15px;
}
.small {
  font-size: 14px;
  color: #888;
}
//底部栏
.footer {
  position: fixed;
  bottom: 0;
  height: 45px;
  line-height: 45px;
  background-color: #21b97a;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 15px;
  .backCol {
    background-color: #fff;
    color: #21b97a;
  }
}
</style>
