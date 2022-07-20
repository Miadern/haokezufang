<template>
  <div class="main">
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
      <van-cell title="房屋标题" class="borderBottomCCC" />
      <van-field
        v-model="title"
        placeholder="请输入标题（如：整租小区名2室5000元）"
      />
      <van-cell
        title="房屋图像"
        class="borderBottomCCC"
        style="margin-bottom: 0.5em"
      />
      <van-uploader :after-read="afterRead" v-model="fileList" multiple />
    </van-cell-group>

    <!-- 房屋配置 -->
    <van-cell title="房屋配置" class="borderBottomCCC" />
    <div class="housePZ">
      <van-grid :column-num="5">
        <van-grid-item
          v-for="(item, key) in houseGoods"
          :key="key"
          :text="key"
          @click="houseGoodFn(key)"
          :class="{ goodsActive: supporting.indexOf(key) !== -1 }"
        >
          <template #icon>
            <i :class="item"></i>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 房屋描述 -->
    <van-cell title="房屋描述" class="borderBottomCCC" />
    <van-field
      class="textarea"
      v-model="description"
      type="textarea"
      placeholder="请输入房屋描述信息"
    />
    <!-- 底部 -->
    <van-row class="footer">
      <van-col span="12" class="backCol" @click="backHome">取消</van-col>
      <van-col span="12" @click="publishHouseNow">提交</van-col>
    </van-row>
  </div>
</template>

<script>
import { publishHouse, sendImg } from '@/api/publish'
import { getMapID } from '@/api/home'
export default {
  created() {
    this.getMapID()
  },
  computed: {
    floorRes() {
      if (this.floor === '低楼') {
        return 'FLOOR|3'
      }
      if (this.floor === '中楼') {
        return 'FLOOR|2'
      }
      return 'FLOOR|1'
    },
    roomTypeRes() {
      if (this.roomType === '一室') return 'ROOM|d4a692e4-a177-37fd'
      if (this.roomType === '二室') return 'ROOM|d1a00384-5801-d5cd'
      if (this.roomType === '三室') return 'ROOM|20903ae0-c7bc-f2e2'
      if (this.roomType === '四室') return 'ROOM|ce2a5daa-811d-2f49'
      return 'ROOM|2731c38c-5b19-ff7f'
    },
    orientedRes() {
      if (this.oriented === '东') return 'ORIEN|141b98bf-1ad0-11e3'
      if (this.oriented === '西') return 'ORIEN|103fb3aa-e8b4-de0e'
      if (this.oriented === '南') return 'ORIEN|61e99445-e95e-7f37'
      if (this.oriented === '北') return 'ORIEN|caa6f80b-b764-c2df'
      if (this.oriented === '东南') return 'ORIEN|dfb1b36b-e0d1-0977'
      if (this.oriented === '东北') return 'ORIEN|67ac2205-7e0f-c057'
      if (this.oriented === '西南') return 'ORIEN|2354e89e-3918-9cef'
      return 'ORIEN|80795f1a-e32f-feb9'
    }
  },
  data() {
    return {
      // 地区ID
      id: '',
      community: this.$route.query.community,
      // 小区名称的变量
      val: this.$route.query.val || '请输入小区名称',
      // 房屋价钱
      price: '',
      // 房屋大小
      size: '',
      // 房屋标题
      title: '',
      // textarea框
      description: '',
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
      showPicker3: false,
      // 图片
      fileList: [],

      // 图片文件储存点
      houseImg: '',
      // 房屋配置
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
      supporting: []
    }
  },
  methods: {
    // 获取城市ID
    async getMapID() {
      const getMapIDres = await getMapID(
        JSON.parse(localStorage.getItem('cityAction'))
      )
      this.id = getMapIDres.data.body.value
    },
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
    // 图片上传函数
    async afterRead(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      this.fileList.forEach((item) => formData.append('file', item.file))
      // 此时可以自行将文件上传至服务器
      try {
        const { data } = await sendImg(formData)
        file.status = 'done'
        console.log(data.body)
        data.body.forEach(
          (item) => (this.houseImg = this.houseImg + item + '|')
        )
      } catch (error) {
        file.status = 'failed'
      }
    },
    roomTypeFn() {},
    floorFn() {},
    orientedFn() {},
    // 点击配置栏,并且高亮
    houseGoodFn(key) {
      if (this.supporting.indexOf(key) !== -1) {
        this.supporting = this.supporting.filter((item) => item !== key)
      } else {
        this.supporting.push(key)
      }
    },
    // 发布房屋！！！！
    async publishHouse() {
      if (this.title === '') return this.$toast.fail('请写标题，哥们')
      if (this.description === '') return this.$toast.fail('请写写内容，哥们')
      if (this.houseImg === '') return this.$toast.fail('或许你需要上点图片？')
      if (this.supporting[0] === '') return this.$toast.fail('选点配置？')
      if (this.price === '') return this.$toast.fail('要写价格')
      if (this.size === '')
        return this.$toast.fail('是不是忘了写你房子多少平？')
      if (this.floorRes === '') return this.$toast.fail('要选择楼型！')
      if (this.oriented === '') return this.$toast.fail('要选择朝向！')
      if (this.roomType === '') return this.$toast.fail('要选择户型！')
      // 过滤成功执行下面
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '发布中请稍后~'
      })
      try {
        await publishHouse(
          this.title,
          this.description,
          this.houseImg,
          this.orientedRes,
          this.supporting.join('|'),
          this.price,
          this.roomTypeRes,
          this.size,
          this.floorRes,
          this.community
        )
        toast.clear()
        this.$dialog
          .confirm({
            title: '提示',
            message: '发布房源成功！',
            confirmButtonText: '继续发布',
            confirmButtonColor: '#108ee9',
            cancelButtonText: '去查看',
            width: '280px'
          })
          .then(() => {
            // on confirm
            // 刷新这个页面！
            this.$router.go(0)
          })
          .catch(() => {
            // on cancel
            // 去查看跳转到筛选界面
          })
      } catch (error) {
        this.$toast.fail('请重新登录')
      }
    },
    publishHouseNow() {
      this.publishHouse()
    }
  }
}
</script>

<style scoped lang="less">
.main {
  padding-bottom: 50px;
  background-color: #f5f5f9;
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
//主体部分标题
.title {
  color: #21b97a;
  background-color: #fff;
  font-size: 15px;
  border-bottom: 1px solid #ccc;
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
.borderBottomCCC {
  border-bottom: 1px solid #ccc;
}
:deep([class*='van-hairline']::after) {
  border: unset;
}

//房屋配置

.housePZ {
  margin-bottom: 20px;
  :deep(.goodsActive) {
    color: #21b97a;
    .van-grid-item__text {
      color: #21b97a;
    }
  }
}
//房屋描述
.textarea {
  height: 120px;
  margin-bottom: 20px;
}
</style>
