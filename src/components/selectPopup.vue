<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="list"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    list: { type: Array }
  },
  data() {
    return {}
  },
  methods: {
    // 确定时
    onConfirm(value, index) {},
    // 改变时
    onChange(picker, value, index) {},
    // 取消时
    onCancel() {}
  }
}
</script>

<style></style>
