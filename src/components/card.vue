<template>
  <div class="card" @click="houseGo(List.houseCode)">
    <div class="img">
      <img :src="`http://liufusong.top:8080${List.houseImg}`" alt="" />
    </div>
    <div class="text">
      <h4>{{ List.title }}</h4>
      <p>{{ List.desc }}</p>
      <span v-for="(List, index) in List.tags" :key="index">{{ List }}</span>
      <div class="price">{{ List.price }}<small>元/月</small></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    List: Object
  },
  methods: {
    houseGo(houseId) {
      this.$router.push({
        path: 'houseInfo',
        query: {
          houseId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.card {
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  font-size: 15px;
  .img {
    width: 106px;
    height: 80px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .text {
    margin-left: 10px;
    h4 {
      margin: 15px 0 7px 0;
      color: #394043;
      line-height: 15px;
    }
    p {
      margin: 0 0 5px 0;
      font-size: 12px;
      color: #afb2b3;
    }
    span {
      color: #39becd;
      background: #e1f5f8;
      padding: 4px 5px;
      font-size: 12px;
      border-radius: 3px;
    }
    .price {
      font-size: 16px;
      font-weight: bolder;
      color: #fa5741;
      margin-bottom: 10px;
      margin-top: 5px;
      small {
        font-size: 12px;
        font-weight: 400;
        margin-left: 5px;
      }
    }
  }
}
</style>
