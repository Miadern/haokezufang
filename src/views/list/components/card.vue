<template>
  <div>
    <p>
      <slot></slot>
    </p>
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in List"
        :key="index"
        @click="clickItem(item)"
        :class="{ active: activeList.indexOf(item.value) !== -1 }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    List: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      // 最后维护的数组
      activeList: []
    }
  },
  watch: {
    activeList() {
      // 如果activeList有值就触发父组件高亮
      if (this.activeList.length > 0) {
        this.$parent.$parent.isShowHightLight = true
        /*    this.$parent.isShowHightLight = true */
      } else {
        this.$parent.$parent.isShowHightLight = false
      }
    }
  },
  methods: {
    clickItem(item) {
      if (this.activeList.indexOf(item.value) !== -1) {
        this.activeList = this.activeList.filter(
          (items) => items !== item.value
        )
      } else {
        this.activeList.push(item.value)
      }
    },
    // 发送数据给父组件的方法
    sendList() {
      this.$emit('sendAllList', this.activeList)
    },
    // 清除按钮
    ResetList() {
      this.activeList = []
    }
  }
}
</script>

<style scoped lang="less">
p {
  margin: 20px 0;
  font-size: 15px;
}
.content {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 14px;
  margin-left: 40px;
  border-bottom: 1px solid #e5e5e5;
  .item {
    height: 32px;
    width: 30%;
    margin: 0 18px 15px 0;
    border: 1px solid #ddd;
    border-radius: 3px;
    line-height: 32px;
    text-align: center;
    font-size: 12px;
    color: #888;
  }
  .active {
    border: 1px solid #21b97a;
    color: #21b97a;
    background-color: #defaef;
  }
}
</style>
