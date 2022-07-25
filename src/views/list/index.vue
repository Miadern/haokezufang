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

    <!-- 下拉栏 -->
    <van-dropdown-menu class="down" ref="down_1">
      <van-dropdown-item>
        <template>
          <!-- 滚轮选择 -->
          <van-picker
            class="areaId"
            toolbar-position="bottom"
            show-toolbar
            title=""
            value-key="obj"
            :columns="columns_1"
            @confirm="onConfirm_1"
            @cancel="onCancel_1"
          >
            <template #option="option">
              {{ option.text }}
            </template>
          </van-picker>
        </template>
        <template #title>
          <span :class="{ green: areaId || subway }">区域</span>
        </template>
      </van-dropdown-item>
      <van-dropdown-item>
        <template>
          <!-- 滚轮选择 -->
          <van-picker
            toolbar-position="bottom"
            show-toolbar
            title=""
            :columns="rentTypeCom"
            @confirm="onConfirm_rentType"
            @cancel="onCancel_rentType"
          >
          </van-picker>
        </template>
        <template #title>
          <span :class="{ green: rentTypeRes }">方式</span>
        </template>
      </van-dropdown-item>
      <van-dropdown-item>
        <template>
          <!-- 滚轮选择 -->
          <van-picker
            toolbar-position="bottom"
            value-key="label"
            show-toolbar
            title=""
            :columns="priceList"
            @confirm="onConfirm_price"
            @cancel="onCancel_price"
          >
          </van-picker>
        </template>
        <template #title>
          <span :class="{ green: priceRes }">租赁</span>
        </template>
      </van-dropdown-item>
      <div class="dropdownBox">
        <van-dropdown-item :disabled="true">
          <template #title>
            <span
              :class="{ green: isShowHightLight }"
              @click="filterDown"
              ref="filterDown"
              >筛选</span
            >
          </template>
        </van-dropdown-item>
      </div>
    </van-dropdown-menu>
    <!-- 主体列表部分 -->
    <van-list
      :immediate-check="false"
      offset="100"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="mainBox">
        <cardList
          :List="item"
          v-for="(item, index) in mainBoxList"
          :key="index"
        ></cardList>
      </div>
    </van-list>
    <!-- 底部按钮 -->
    <div class="footBar" v-show="isShowfootBar">
      <div class="resetBtn" @click="onReset_filter">清除</div>
      <div class="confirmBtn" @click="onConfirm_filter">确定</div>
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="filterPop"
      @opened="isShowfootBar = true"
      @close="close"
      position="right"
      :style="{ height: '100%' }"
    >
      <div class="filterPopBox">
        <div class="mainBar">
          <cardVue
            ref="moreRes1"
            @sendAllList="sendAllListFn1"
            :List="roomTypeList"
            >户型</cardVue
          >
          <cardVue
            ref="moreRes2"
            @sendAllList="sendAllListFn2"
            :List="orientedList"
            >朝向</cardVue
          >
          <cardVue
            ref="moreRes3"
            @sendAllList="sendAllListFn3"
            :List="floorList"
            >楼型</cardVue
          >
          <cardVue
            ref="moreRes4"
            @sendAllList="sendAllListFn4"
            :List="characteristicList"
            >房屋亮点</cardVue
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getMapID } from '@/api/home'
import { getCondition, getFilerRes } from '@/api/list'
import cardVue from '@/views/list/components/card.vue'
import cardList from '@/components/card.vue'
export default {
  components: {
    cardVue,
    cardList
  },
  watch: {},
  computed: {
    // 计算合租不合租
    rentTypeCom() {
      return this.rentTypeList.map((item) => item.label)
    },
    // 将more去重一次计算属性**
    moreRes() {
      const res = [...new Set(this.more)].join(',')
      return res
    }
  },
  async created() {
    // 如果跳转过来的query为home页面附带回来的，将执行此函数
    this.init()

    // 获取城市id
    await this.getMapID()
    // 获取房屋查询条件
    this.getCondition()
    // 刷新房屋列表
    this.getFilerRes()
  },

  data() {
    return {
      // 筛选按钮是否高亮
      isShowHightLight: false,
      value: '',
      // 当前城市
      cityAction: JSON.parse(localStorage.getItem('cityAction')),
      // 区域数组
      columns_1: [],
      findResult: '',
      bbq: [],
      // 地铁ID
      subwayId: '',
      // 方式的数组
      rentTypeList: [],
      // 价格的数组
      priceList: [],
      // 筛选栏的弹出层状态
      filterPop: false,
      roomTypeList: [],
      orientedList: [],
      floorList: [],
      characteristicList: [],
      isShowfootBar: false,
      // 最终渲染的列表
      mainBoxList: [],
      // 数据需要的index
      start: 1,
      end: 20,
      // 下拉加载栏参数
      loading: false,
      finished: false,

      // 维护要使用的结果
      // 城市ID**
      id: '',
      // 方式的结果**
      rentTypeRes: '' || undefined,
      // 选择了地区的ID**
      areaId: '' || undefined,
      subway: '' || undefined,
      // 选择了价位的结果**
      priceRes: '' || undefined,
      // 复合搜索的结果,现已转为计算属性moreRes
      more: [] || undefined
    }
  },
  methods: {
    // 下拉触发下一页
    async onLoad() {
      this.start += 20
      this.end += 20
      // 刷新页面
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await getFilerRes(
          this.id,
          this.areaId,
          this.subway,
          this.rentTypeRes,
          this.priceRes,
          this.moreRes,
          this.start,
          this.end
        )
        if (res.data.body.list.length === 0) {
          this.finished = true
          this.$toast.success()
          return
        }
        console.log(res)
        this.mainBoxList = [...this.mainBoxList, ...res.data.body.list]
        this.$toast.success()
      } catch (error) {
        this.$toast.fail('加载失败，请重试')
      } finally {
        this.loading = false
      }
    },

    // 如果跳转过来的query为home页面附带回来的，将执行此函数
    init() {
      this.rentTypeRes = this.$route.query.rentType
    },

    // 按清除按钮清除组件
    onReset_filter() {
      this.$refs.moreRes1.ResetList()
      this.$refs.moreRes2.ResetList()
      this.$refs.moreRes3.ResetList()
      this.$refs.moreRes4.ResetList()
    },
    // 将子组件维护的数组集合
    sendAllListFn1(arr) {
      this.more = [...this.more, ...arr]
    },
    sendAllListFn2(arr) {
      this.more = [...this.more, ...arr]
    },
    sendAllListFn3(arr) {
      this.more = [...this.more, ...arr]
    },
    sendAllListFn4(arr) {
      this.more = [...this.more, ...arr]
    },

    // 关闭筛选的时候关闭高亮
    close() {
      this.isShowfootBar = false
      this.$refs.filterDown.classList.remove('van-dropdown-menu__title--active')
    },
    // 点击筛选界面中的确认
    onConfirm_filter() {
      this.start = 1
      this.end = 20
      // 关闭弹出层
      this.filterPop = false
      // 删除类名不显示高亮
      this.$refs.filterDown.classList.remove('van-dropdown-menu__title--active')
      // 获取子组件卡片维护的数组
      this.$refs.moreRes1.sendList()
      this.$refs.moreRes2.sendList()
      this.$refs.moreRes3.sendList()
      this.$refs.moreRes4.sendList()
      this.getFilerRes()
    },
    // 点击筛选按钮
    filterDown() {
      // 如果筛选的弹出框未显示，则让他显示，则加类名显示高亮
      if (!this.filterPop) {
        this.filterPop = true
        this.$refs.filterDown.classList.add('van-dropdown-menu__title--active')
        // this.isShowfootBar = true
      } else {
        // 如果筛选的弹出框为显示状态，则让他关闭，删除类名不显示
        this.filterPop = false
        this.$refs.filterDown.classList.remove(
          'van-dropdown-menu__title--active'
        )
        // this.isShowfootBar = false
      }
    },

    // 多少价位的确认按钮
    onConfirm_price(val, index) {
      this.start = 1
      this.end = 20
      this.priceRes = val.value
      // this.rentTypeRes = this.rentTypeList[index].value
      this.$refs.down_1.toggleItem()
      this.getFilerRes()
    },
    onCancel_price() {
      this.$refs.down_1.toggleItem()
    },

    // 合租还是整租的确认按钮
    onConfirm_rentType(val, index) {
      this.start = 1
      this.end = 20
      this.rentTypeRes = this.rentTypeList[index].value
      this.$refs.down_1.toggleItem()
      this.getFilerRes()
    },
    onCancel_rentType() {
      this.$refs.down_1.toggleItem()
    },

    // 获取城市ID
    async getMapID() {
      const getMapIDres = await getMapID(
        JSON.parse(localStorage.getItem('cityAction'))
      )
      this.id = getMapIDres.data.body.value
    },
    onSearch() {
      // 跳转地图
      this.$router.push({
        path: '/map'
      })
    },
    // 搜索栏左边的跳转地图
    mapFn() {
      this.$router.push({
        path: '/city'
      })
    },
    // 第一个滚轮的确认和取消按钮
    onConfirm_1(value, index) {
      this.start = 1
      this.end = 20
      if (index[0] === 1) {
        this.subway = value[value.length - 1].value
      } else {
        this.areaId = value[value.length - 1].value
      }
      this.$refs.down_1.toggleItem()
      this.getFilerRes()
    },
    // 第一个滚轮的确认和取消按钮
    onCancel_1() {
      this.$refs.down_1.toggleItem()
    },
    // 获取房屋查询条件
    async getCondition() {
      const { data } = await getCondition(this.id)
      // 整租合租'
      this.priceList = data.body.price
      this.rentTypeList = data.body.rentType
      this.roomTypeList = data.body.roomType
      this.orientedList = data.body.oriented
      this.floorList = data.body.floor
      this.characteristicList = data.body.characteristic

      // 处理替换文字
      let area = this.addChildrenField(data.body.area)
      let subway = this.addChildrenField(data.body.subway)
      area = JSON.parse(JSON.stringify(area).replace(/label/g, 'text'))
      subway = JSON.parse(JSON.stringify(subway).replace(/label/g, 'text'))
      // 处理嵌套
      this.columns_1.push(area, subway)
    },
    addChildrenField(obj) {
      // 递归修改children字段
      const isHaveChildren = Object.prototype.hasOwnProperty.call(
        obj,
        'children'
      )
      if (!isHaveChildren) {
        obj.children = [{ label: '不限', value: 'null' }]
      } else {
        for (const key in obj.children) {
          this.addChildrenField(obj.children[key])
        }
      }
      obj.obj = {
        text: obj.text,
        value: obj.value
      }
      return obj
    },
    // 获取筛选后的数据
    async getFilerRes() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await getFilerRes(
          this.id,
          this.areaId,
          this.subway,
          this.rentTypeRes,
          this.priceRes,
          this.moreRes,
          this.start,
          this.end
        )
        console.log(res)
        this.mainBoxList = res.data.body.list
        this.$toast.success()
      } catch (error) {
        this.$toast.fail('加载失败，请重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.down {
  :deep(.van-dropdown-menu__item--disabled .van-dropdown-menu__title) {
    color: #323233;
  }

  .green {
    color: #21b97a;
  }
  :deep(.van-dropdown-menu__title--active) {
    color: #21b97a;
  }
  :deep(.van-picker__toolbar) {
    justify-content: unset;

    .van-picker__cancel {
      flex: 1;
      color: #21b97a;
      font-size: 18px;
    }
    .van-picker__confirm {
      flex: 2;
      color: #fff;
      background-color: #21b97a;
      font-size: 18px;
    }
  }
}
.van-popup--right {
  width: 300px;
}
.filterPopBox {
  padding-bottom: 50px;
  .mainBar {
    padding: 0 15px;
  }
}
.footBar {
  width: 8rem;
  z-index: 2030;
  right: 0;
  // width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  .resetBtn {
    flex: 1 1;
    border-radius: 0;
    color: #21b97a;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    background-color: #fff;
  }
  .confirmBtn {
    border-radius: 0;
    flex: 2;
    color: #fff;
    background-color: #21b97a;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
  }
}
</style>
