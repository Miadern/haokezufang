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
      <van-dropdown-item title="区域">
        <template>
          <!-- 滚轮选择 -->
          <van-picker
            toolbar-position="bottom"
            show-toolbar
            title=""
            :columns="columns_1"
            @confirm="onConfirm_1"
            @cancel="onCancel_1"
          >
          </van-picker> </template
      ></van-dropdown-item>
      <van-dropdown-item title="方式"> <template> </template></van-dropdown-item
      ><van-dropdown-item title="租赁">
        <template> </template></van-dropdown-item
      ><van-dropdown-item title="筛选">
        <template> </template
      ></van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
import { getMapID } from '@/api/home'
import { getCondition } from '@/api/list'

export default {
  computed: {
    /* columns_1() {
      return [this.area, this.subway]
    } */
  },
  async created() {
    // 获取城市id
    await this.getMapID()
    await this.getCondition()
  },
  data() {
    return {
      value: '',
      cityAction: JSON.parse(localStorage.getItem('cityAction')),
      id: '',
      //
      columns_1: [],

      findResult: '',
      // bbq测试
      bbq: [
        {
          text: '区域',
          value: 'area',
          children: [
            {
              text: '不限',
              value: 'null'
            },
            {
              text: '朝阳',
              value: 'AREA|69cc5f6d-4f29-a77c',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '朝阳公园',
                  value: 'AREA|73aa1890-64c7-51d9',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '亮马水晶',
                      value: 'AREA|93cbbe43-741d-de54'
                    },
                    {
                      text: '棕榈泉国际公寓',
                      value: 'AREA|6735bb24-b7ca-40a1'
                    },
                    {
                      text: '丽水嘉园',
                      value: 'AREA|5682088e-a7ae-47ae'
                    },
                    {
                      text: '瞰都国际',
                      value: 'AREA|4e17c417-2bd1-c819'
                    },
                    {
                      text: '公园大道',
                      value: 'AREA|aff93282-b970-63b0'
                    },
                    {
                      text: '东润枫景二期',
                      value: 'AREA|29735d9b-9b0c-f77d'
                    },
                    {
                      text: '观湖国际',
                      value: 'AREA|ae91b970-25bc-4f6d'
                    }
                  ]
                },
                {
                  text: '建国门外',
                  value: 'AREA|4cc05548-7edb-9228',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '地杰长安驿',
                      value: 'AREA|9977ec09-3d57-440f'
                    },
                    {
                      text: '砖厂胡同',
                      value: 'AREA|1e6da781-f777-1822'
                    },
                    {
                      text: '东方瑞景',
                      value: 'AREA|56d9794a-88bc-bf2c'
                    },
                    {
                      text: '长安6号',
                      value: 'AREA|53186d18-1572-b26b'
                    },
                    {
                      text: '万豪国际公寓',
                      value: 'AREA|5703f2ff-f15b-39c0'
                    },
                    {
                      text: '中海枫丹公馆',
                      value: 'AREA|c00ab759-7254-5090'
                    },
                    {
                      text: '丽舍公寓',
                      value: 'AREA|8fdebeba-140e-aa6f'
                    },
                    {
                      text: '建国门南大街',
                      value: 'AREA|58f1681c-f17c-4305'
                    },
                    {
                      text: '美华世纪',
                      value: 'AREA|42da7e24-d308-ca35'
                    }
                  ]
                },
                {
                  text: '大望路',
                  value: 'AREA|a21ffae6-c059-0fe4',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '易构空间',
                      value: 'AREA|162de9f9-d359-0e5a'
                    },
                    {
                      text: '后现代城B区',
                      value: 'AREA|10465129-8482-f4f7'
                    },
                    {
                      text: 'CBD传奇',
                      value: 'AREA|29683831-fe23-0379'
                    },
                    {
                      text: '后现代城C区',
                      value: 'AREA|b2eda9dd-72ca-2fb6'
                    },
                    {
                      text: '风度柏林',
                      value: 'AREA|af404681-8a5b-5e9d'
                    },
                    {
                      text: '后现代城A区',
                      value: 'AREA|efb6e47e-a269-250b'
                    },
                    {
                      text: '后现代城D区',
                      value: 'AREA|7bfd1aae-c644-eb93'
                    },
                    {
                      text: '乐成豪丽',
                      value: 'AREA|ea3114c0-7483-37f1'
                    },
                    {
                      text: '金茂府南区',
                      value: 'AREA|f88150c7-e841-0eff'
                    },
                    {
                      text: '金港国际',
                      value: 'AREA|28f4da27-e8e2-0e75'
                    },
                    {
                      text: '珠江帝景博悦',
                      value: 'AREA|b186383f-d36b-3853'
                    },
                    {
                      text: '珠江帝景新博悦',
                      value: 'AREA|8f364701-75e1-a683'
                    },
                    {
                      text: '珠江帝景伯爵山',
                      value: 'AREA|f1c9fb6a-7eed-0ec9'
                    },
                    {
                      text: '珠江帝景',
                      value: 'AREA|5231e140-c5b1-7ad3'
                    }
                  ]
                },
                {
                  text: '酒仙桥',
                  value: 'AREA|cef41633-b0d9-c3f2',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '晶都国际',
                      value: 'AREA|a535c215-39da-4242'
                    },
                    {
                      text: '飘HOME',
                      value: 'AREA|885042a5-e1f0-7893'
                    },
                    {
                      text: '芳园南里西区',
                      value: 'AREA|e7a68fdd-2d38-89d8'
                    },
                    {
                      text: '高家园二区',
                      value: 'AREA|0050138d-eb42-8278'
                    },
                    {
                      text: '芳园里',
                      value: 'AREA|b9f9457f-ea5d-a36a'
                    },
                    {
                      text: '高家园四区',
                      value: 'AREA|02ab97c9-ed40-47f3'
                    },
                    {
                      text: '梵谷水郡',
                      value: 'AREA|8f80b591-1f7c-890f'
                    },
                    {
                      text: '丽都水岸',
                      value: 'AREA|efa12805-0e5f-2620'
                    },
                    {
                      text: '丽都职工宿舍',
                      value: 'AREA|ffbaead9-6786-be9c'
                    },
                    {
                      text: '星城国际',
                      value: 'AREA|5d176bc7-92c1-13f0'
                    }
                  ]
                },
                {
                  text: '双井',
                  value: 'AREA|464bcd3e-84ef-b061',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '九龙花园',
                      value: 'AREA|9b4a974d-ee12-6eff'
                    },
                    {
                      text: '首城国际A区',
                      value: 'AREA|7aec1820-79f2-6b20'
                    },
                    {
                      text: '首城国际D区',
                      value: 'AREA|74f9e019-e0fe-196e'
                    },
                    {
                      text: '苹果社区南区',
                      value: 'AREA|6d02dda8-9d8f-9f98'
                    },
                    {
                      text: '广渠门外大街',
                      value: 'AREA|e5156950-9d2e-9cfc'
                    },
                    {
                      text: '首城国际C区',
                      value: 'AREA|4ab71fdc-9104-7b58'
                    },
                    {
                      text: '时代国际嘉园',
                      value: 'AREA|a1cf3edc-40a4-18e6'
                    },
                    {
                      text: 'A派公寓',
                      value: 'AREA|2d01d875-25bb-5762'
                    },
                    {
                      text: '双花园南里二区',
                      value: 'AREA|80109302-613b-e11b'
                    },
                    {
                      text: '首城国际B区',
                      value: 'AREA|317c9ca1-4047-e3af'
                    },
                    {
                      text: '非常生活',
                      value: 'AREA|7153e487-0c28-4e6b'
                    },
                    {
                      text: '双花园西里',
                      value: 'AREA|c8a4b757-ed02-d6d1'
                    },
                    {
                      text: 'CBD总部公寓二期',
                      value: 'AREA|6398c5a2-268e-bd11'
                    },
                    {
                      text: '广馨居',
                      value: 'AREA|a35aaa04-c1ba-80ed'
                    },
                    {
                      text: '富力城B区',
                      value: 'AREA|fe19c00b-a11d-9945'
                    },
                    {
                      text: '百环家园',
                      value: 'AREA|59412b2a-4fd9-12ea'
                    },
                    {
                      text: '怡馨园',
                      value: 'AREA|d380f575-18ad-6dd4'
                    },
                    {
                      text: '双井北里',
                      value: 'AREA|ceade0c2-7352-d328'
                    },
                    {
                      text: '世桥国贸',
                      value: 'AREA|029045e0-2dca-ef5a'
                    },
                    {
                      text: 'CBD总部公寓一期',
                      value: 'AREA|70c4ae50-33df-ef89'
                    },
                    {
                      text: '乐成国际',
                      value: 'AREA|82175d9f-97ed-2803'
                    },
                    {
                      text: '合生国际花园',
                      value: 'AREA|fc3ef6e7-04ac-fce4'
                    },
                    {
                      text: '苹果社区北区',
                      value: 'AREA|1e56acc6-e530-f5f8'
                    }
                  ]
                },
                {
                  text: '团结湖',
                  value: 'AREA|6e042cb2-118f-4336',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '水碓子社区',
                      value: 'AREA|b1c593e3-e396-a4b1'
                    },
                    {
                      text: '团结湖北里',
                      value: 'AREA|1dbecaf1-89e3-f2a1'
                    },
                    {
                      text: '团结湖公寓',
                      value: 'AREA|6b205920-5bad-5980'
                    },
                    {
                      text: '团结湖东里',
                      value: 'AREA|9cb4b2f1-34f6-db85'
                    },
                    {
                      text: '团结湖北三条',
                      value: 'AREA|98c9b652-0481-248c'
                    },
                    {
                      text: '团结湖北头条',
                      value: 'AREA|3aa67523-d4cb-3d0f'
                    },
                    {
                      text: '团结湖北五条',
                      value: 'AREA|dc77a7d4-7a34-5cdb'
                    },
                    {
                      text: '团结湖中路南三条',
                      value: 'AREA|80a1ad85-9092-7991'
                    },
                    {
                      text: '锦湖园公寓',
                      value: 'AREA|0925fc2a-a0bb-8951'
                    }
                  ]
                },
                {
                  text: '方庄',
                  value: 'AREA|42bd459c-2694-d36b',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '10AM新坐标',
                      value: 'AREA|6c647f2b-7a28-cec8'
                    },
                    {
                      text: '芳古园一区',
                      value: 'AREA|5e0d97b6-dcff-2b12'
                    },
                    {
                      text: '时代芳群',
                      value: 'AREA|10c38cd2-64b3-7e24'
                    },
                    {
                      text: '芳古园二区',
                      value: 'AREA|7fa4d24a-d7f0-bf46'
                    },
                    {
                      text: '芳群公寓',
                      value: 'AREA|cc6d5d12-5e01-e82f'
                    },
                    {
                      text: '芳城园一区',
                      value: 'AREA|486b58d1-b29a-3f43'
                    },
                    {
                      text: 'gogo新世代',
                      value: 'AREA|9f218701-ee42-3249'
                    },
                    {
                      text: '芳群园三区',
                      value: 'AREA|c00da9c7-2bca-d5dd'
                    },
                    {
                      text: '方庄6号',
                      value: 'AREA|a34bdf37-4962-aeaf'
                    },
                    {
                      text: '紫芳园三区',
                      value: 'AREA|359b9abe-156a-36e8'
                    },
                    {
                      text: '芳星园一区',
                      value: 'AREA|1e80186f-a159-9621'
                    }
                  ]
                },
                {
                  text: '华威桥',
                  value: 'AREA|d12f1d28-c10d-433e',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '双龙南里',
                      value: 'AREA|886d4546-b93d-0259'
                    },
                    {
                      text: '山水文园一期',
                      value: 'AREA|0d18716b-9385-51c6'
                    },
                    {
                      text: '南新园',
                      value: 'AREA|264e42b4-9df4-f4b7'
                    },
                    {
                      text: '山水文园二期',
                      value: 'AREA|7520ffa8-9085-7aa5'
                    }
                  ]
                },
                {
                  text: '劲松',
                  value: 'AREA|10f96c4e-aff3-194b',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '农光里',
                      value: 'AREA|58a8ee14-2848-4508'
                    },
                    {
                      text: '劲松三区',
                      value: 'AREA|72a4abe4-aa99-0e72'
                    },
                    {
                      text: '农光南路',
                      value: 'AREA|2bbfe130-2f03-1e57'
                    },
                    {
                      text: '广渠门外大街6号院',
                      value: 'AREA|e47c7d05-acaa-2c28'
                    },
                    {
                      text: '富顿',
                      value: 'AREA|927a178b-e56b-8b57'
                    },
                    {
                      text: '劲松二区',
                      value: 'AREA|653681b1-2096-4214'
                    },
                    {
                      text: '农光东里',
                      value: 'AREA|b57ad68c-1519-da66'
                    },
                    {
                      text: '劲松九区',
                      value: 'AREA|0d7fd899-b477-0f1f'
                    },
                    {
                      text: '广和南里二条',
                      value: 'AREA|c4e26217-ce84-6ded'
                    },
                    {
                      text: '劲松五区',
                      value: 'AREA|55904279-4d5d-fad4'
                    },
                    {
                      text: '武圣东里',
                      value: 'AREA|2a229f3e-9770-8b9f'
                    },
                    {
                      text: '劲松一区',
                      value: 'AREA|ada9447a-4d69-7ddc'
                    }
                  ]
                },
                {
                  text: '望京',
                  value: 'AREA|aaa638e8-8a5e-e9ce',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '南湖东园二区',
                      value: 'AREA|7d0aab5d-ce86-73a3'
                    },
                    {
                      text: '北京香颂',
                      value: 'AREA|14786479-ddb5-1bf2'
                    },
                    {
                      text: '博雅国际',
                      value: 'AREA|5b19224e-da1e-7600'
                    },
                    {
                      text: '首开知语城',
                      value: 'AREA|38b96225-0240-5765'
                    },
                    {
                      text: '望京新城',
                      value: 'AREA|5c490571-1b72-c9bb'
                    },
                    {
                      text: '融科橄榄城三期',
                      value: 'AREA|780fde32-9138-f1e8'
                    },
                    {
                      text: '利泽西园',
                      value: 'AREA|421df316-8a68-1394'
                    },
                    {
                      text: '北纬40度一期',
                      value: 'AREA|6b96ed07-57f7-855a'
                    },
                    {
                      text: '东湖湾二期',
                      value: 'AREA|93f4aa2f-d70c-2f61'
                    },
                    {
                      text: '南湖渠西里',
                      value: 'AREA|0688efac-a2a3-5eff'
                    },
                    {
                      text: '南湖中园一区',
                      value: 'AREA|da942178-28d1-a2c6'
                    },
                    {
                      text: '望京明苑',
                      value: 'AREA|ba424c55-6530-b89a'
                    },
                    {
                      text: '季景沁园',
                      value: 'AREA|0c256765-f8f7-65f1'
                    },
                    {
                      text: '宝星国际二期',
                      value: 'AREA|7a910787-fe15-a002'
                    },
                    {
                      text: '慧谷阳光',
                      value: 'AREA|bb2e961d-0c17-80a7'
                    },
                    {
                      text: '融科橄榄城一期',
                      value: 'AREA|7a0ba36b-951b-7700'
                    },
                    {
                      text: '东湖湾三期',
                      value: 'AREA|2f4ce4fd-9651-2460'
                    },
                    {
                      text: '澳洲康都',
                      value: 'AREA|0004d108-3d48-f6bc'
                    },
                    {
                      text: '圣馨大地',
                      value: 'AREA|f9731a00-f131-0ef7'
                    },
                    {
                      text: '花家地北里',
                      value: 'AREA|b119fa0d-fbb2-3449'
                    },
                    {
                      text: '点击未来',
                      value: 'AREA|1aae68c5-37bb-7375'
                    },
                    {
                      text: '炫彩嘉轩',
                      value: 'AREA|77effe1d-5a36-3afe'
                    },
                    {
                      text: '北纬40度二期',
                      value: 'AREA|39e14578-f30e-0c26'
                    },
                    {
                      text: '上京新航线',
                      value: 'AREA|8767c0bc-da60-2acc'
                    },
                    {
                      text: '宝星园一区',
                      value: 'AREA|9dcb237a-1535-7aa3'
                    },
                    {
                      text: '望京花园东区',
                      value: 'AREA|b3ae6699-831b-7ed5'
                    },
                    {
                      text: '望京路3号院',
                      value: 'AREA|a6b98412-b157-704f'
                    },
                    {
                      text: '融科橄榄城二期',
                      value: 'AREA|2ae23891-3603-03b8'
                    },
                    {
                      text: '望京西园三区',
                      value: 'AREA|8c32704c-37dd-a95d'
                    },
                    {
                      text: '华鼎世家二期',
                      value: 'AREA|d461a0bd-bda3-3e04'
                    },
                    {
                      text: '朝庭公寓',
                      value: 'AREA|5f2f79cb-16ec-fd3a'
                    },
                    {
                      text: '大西洋新城D区',
                      value: 'AREA|d2fba642-e76f-120b'
                    },
                    {
                      text: '国风上观',
                      value: 'AREA|bec38dc4-f2f2-7051'
                    },
                    {
                      text: '花家地西里一区',
                      value: 'AREA|f98d8888-5ecd-8ace'
                    },
                    {
                      text: '大西洋新城E区',
                      value: 'AREA|c77a9637-74e2-939e'
                    },
                    {
                      text: '国风北京一期',
                      value: 'AREA|856e9f84-c982-ff34'
                    }
                  ]
                },
                {
                  text: '甜水园',
                  value: 'AREA|8ff24538-ae93-f6df',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '甜水园东里',
                      value: 'AREA|845b0962-28fa-8b44'
                    },
                    {
                      text: '水碓子东路',
                      value: 'AREA|f3d9ae3e-485f-ff09'
                    },
                    {
                      text: '六里屯东里',
                      value: 'AREA|b3c3ccd2-6e07-5877'
                    },
                    {
                      text: '延静里',
                      value: 'AREA|e9efd9ad-42d4-2637'
                    },
                    {
                      text: '道家园',
                      value: 'AREA|d77996d8-5bb0-390d'
                    },
                    {
                      text: '六里屯北里',
                      value: 'AREA|afeeba08-50b3-adfe'
                    }
                  ]
                },
                {
                  text: '欢乐谷',
                  value: 'AREA|3bf66732-f4ee-2f63',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '紫南家园',
                      value: 'AREA|0ab2d92e-fd57-02ec'
                    },
                    {
                      text: '北京华侨城2号院',
                      value: 'AREA|17fec28f-f78a-319e'
                    },
                    {
                      text: '世纪东方城',
                      value: 'AREA|8388a26f-572c-ea36'
                    },
                    {
                      text: '北京华侨城1号院',
                      value: 'AREA|2d308eca-d391-db71'
                    }
                  ]
                },
                {
                  text: '南沙滩',
                  value: 'AREA|ff778b9e-541a-4906',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '科学园南里六区',
                      value: 'AREA|a3deabc8-9b79-1626'
                    },
                    {
                      text: '南沙滩小区',
                      value: 'AREA|3c907cdd-975a-b9c9'
                    },
                    {
                      text: '名苑雅居',
                      value: 'AREA|6dd96622-468c-3bda'
                    },
                    {
                      text: '天和人家',
                      value: 'AREA|c5f8a43b-6e7a-9bc6'
                    },
                    {
                      text: '懿品阁',
                      value: 'AREA|2789795f-778e-f4b8'
                    },
                    {
                      text: '龙欣苑小区',
                      value: 'AREA|2cc9df86-4f91-2255'
                    },
                    {
                      text: '风林绿洲',
                      value: 'AREA|42433293-d393-29db'
                    }
                  ]
                },
                {
                  text: '红庙',
                  value: 'AREA|5d47f395-dfd3-2421',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '呼家楼新街大院',
                      value: 'AREA|b98c95c2-9271-a2d2'
                    },
                    {
                      text: '红庙北里',
                      value: 'AREA|e4651b66-250e-608e'
                    },
                    {
                      text: '纽约豪园',
                      value: 'AREA|9626ea88-5210-ee34'
                    },
                    {
                      text: '柴家湾',
                      value: 'AREA|e89f8e07-3f46-7f22'
                    },
                    {
                      text: '慈云寺',
                      value: 'AREA|d6d4f299-5d5a-8a45'
                    },
                    {
                      text: '华贸国际公寓',
                      value: 'AREA|6dc36965-2ea0-8345'
                    },
                    {
                      text: '人民日报社家属区',
                      value: 'AREA|bc4c4094-40b2-7d1c'
                    },
                    {
                      text: '红庙西里',
                      value: 'AREA|b2ae6815-ece0-221f'
                    },
                    {
                      text: '金台北街',
                      value: 'AREA|b3b7e628-04d4-b0f8'
                    },
                    {
                      text: '呼家楼北里',
                      value: 'AREA|e59dec93-4987-2de1'
                    },
                    {
                      text: '禧瑞都',
                      value: 'AREA|4800f790-7c4f-18b5'
                    }
                  ]
                },
                {
                  text: '西坝河',
                  value: 'AREA|a1c6355d-dba9-776f',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '西坝河南里',
                      value: 'AREA|66acb51d-f6f1-80ba'
                    },
                    {
                      text: '西坝河中里',
                      value: 'AREA|3d88ec98-a878-4e4f'
                    },
                    {
                      text: '光熙家园二期',
                      value: 'AREA|91d9c366-f6c0-84f3'
                    },
                    {
                      text: '西坝河东里',
                      value: 'AREA|6f415f68-c101-2125'
                    },
                    {
                      text: '光熙门北里',
                      value: 'AREA|4332e9f4-4894-e16b'
                    },
                    {
                      text: '西坝河西里',
                      value: 'AREA|cef9440d-f6dc-4aff'
                    },
                    {
                      text: '西坝河北里',
                      value: 'AREA|50db5df5-5fe2-d07d'
                    },
                    {
                      text: '光熙家园一期',
                      value: 'AREA|cc54177a-fda3-cad4'
                    }
                  ]
                },
                {
                  text: '工体',
                  value: 'AREA|a047dfba-aac2-47f6',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '东直门外大街(朝阳）',
                      value: 'AREA|27a7ccfd-d5c8-22d9'
                    },
                    {
                      text: '十字坡东里',
                      value: 'AREA|c6b2275d-899c-2f55'
                    },
                    {
                      text: '阳光都市',
                      value: 'AREA|10b269fd-574d-ac20'
                    },
                    {
                      text: '屯三里',
                      value: 'AREA|d379fa20-9750-d5a4'
                    },
                    {
                      text: '海晟名苑北区',
                      value: 'AREA|e8046871-6f6e-87ef'
                    },
                    {
                      text: '海晟名苑南区',
                      value: 'AREA|fcf54a67-7894-e85b'
                    },
                    {
                      text: '幸福一村西里',
                      value: 'AREA|68795621-0103-3ba0'
                    },
                    {
                      text: '幸福公寓',
                      value: 'AREA|d3bc7e9b-fe55-cda1'
                    },
                    {
                      text: '工体西里',
                      value: 'AREA|e5c24284-196f-1553'
                    },
                    {
                      text: '幸福二村',
                      value: 'AREA|1c93fa62-eca1-c7f8'
                    }
                  ]
                },
                {
                  text: '东大桥',
                  value: 'AREA|55e3c72c-e3be-8cce',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '新城国际',
                      value: 'AREA|023c8ed6-a872-88e9'
                    },
                    {
                      text: '北京财富中心',
                      value: 'AREA|1e6be537-e855-32bd'
                    },
                    {
                      text: '圣世一品',
                      value: 'AREA|f98f12ac-9643-e299'
                    },
                    {
                      text: '旺座中心',
                      value: 'AREA|010e0663-db08-c3ee'
                    }
                  ]
                },
                {
                  text: '高碑店',
                  value: 'AREA|317f43a7-43eb-5d1a',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '富华家园',
                      value: 'AREA|bbd24d13-f0f0-a744'
                    }
                  ]
                },
                {
                  text: '石佛营',
                  value: 'AREA|f9940a17-104a-d6b0',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '东岸',
                      value: 'AREA|38986105-dc6b-c744'
                    },
                    {
                      text: '炫特嘉园一期',
                      value: 'AREA|aea4f7d8-b86c-e5ff'
                    },
                    {
                      text: '炫特嘉园二期',
                      value: 'AREA|44dd8737-f5fe-9618'
                    },
                    {
                      text: '环卫家园',
                      value: 'AREA|31476c2e-c58d-c629'
                    },
                    {
                      text: '公园1872',
                      value: 'AREA|51810904-6bd8-5a76'
                    },
                    {
                      text: '晨光家园',
                      value: 'AREA|f0681d60-5b4a-ca9a'
                    },
                    {
                      text: '八里庄北里小区',
                      value: 'AREA|d9150840-106c-75de'
                    }
                  ]
                },
                {
                  text: '四惠',
                  value: 'AREA|4222ae5e-6524-8b5f',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '金地名京',
                      value: 'AREA|01f01413-2049-8b43'
                    },
                    {
                      text: '远洋天地二期',
                      value: 'AREA|8e62ade5-3ac2-6349'
                    },
                    {
                      text: '通惠家园',
                      value: 'AREA|2d9fc408-fc7d-69eb'
                    },
                    {
                      text: '远洋天地一期',
                      value: 'AREA|b0d07fc4-f702-52e2'
                    },
                    {
                      text: '东恒时代二期',
                      value: 'AREA|d1a15f89-7577-c352'
                    },
                    {
                      text: '远洋天地三期',
                      value: 'AREA|9d87e1d3-6874-05b4'
                    },
                    {
                      text: '东恒时代一期',
                      value: 'AREA|4d1678a1-c860-aa52'
                    },
                    {
                      text: '壹线国际',
                      value: 'AREA|2c12c3f4-b5bb-c177'
                    },
                    {
                      text: '京棉新城二厂',
                      value: 'AREA|bce5d128-987f-7a40'
                    }
                  ]
                },
                {
                  text: '朝青',
                  value: 'AREA|177fe095-3f1a-7ac4',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '珠江罗马嘉园东区',
                      value: 'AREA|a8ea53f3-51ae-02c7'
                    },
                    {
                      text: '珠江罗马嘉园西区',
                      value: 'AREA|3f67a843-4a2e-dbd8'
                    },
                    {
                      text: '天鹅湾北区',
                      value: 'AREA|1dd90d51-3700-ba93'
                    },
                    {
                      text: '青年汇佳园',
                      value: 'AREA|4226d669-5285-f8e2'
                    },
                    {
                      text: '天鹅湾南区',
                      value: 'AREA|a3b5dc4f-8604-ec37'
                    },
                    {
                      text: '国美第一城3号院',
                      value: 'AREA|48e411ec-df85-1001'
                    },
                    {
                      text: '润枫水尚',
                      value: 'AREA|51205279-4955-03fd'
                    },
                    {
                      text: '华纺易城',
                      value: 'AREA|1939cac4-10d7-4c68'
                    }
                  ]
                },
                {
                  text: '垡头',
                  value: 'AREA|9399ca5d-c7a6-17ba',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '翠成馨园',
                      value: 'AREA|136ca442-e2bd-7635'
                    },
                    {
                      text: '垡头西里',
                      value: 'AREA|a9443880-7c4c-653f'
                    },
                    {
                      text: '垡头西里三区',
                      value: 'AREA|ff3686f4-2b39-42de'
                    },
                    {
                      text: '双合家园',
                      value: 'AREA|655834cf-734e-8b69'
                    },
                    {
                      text: '金蝉里',
                      value: 'AREA|c32a3ea3-3e80-7ded'
                    },
                    {
                      text: '格林莱雅',
                      value: 'AREA|2c7d981b-8219-c389'
                    }
                  ]
                },
                {
                  text: '北工大',
                  value: 'AREA|2af36685-e4c5-541e',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '磨房南里',
                      value: 'AREA|93e08e2e-b346-7658'
                    },
                    {
                      text: '禧福汇',
                      value: 'AREA|bb2372fd-fe03-d2f1'
                    },
                    {
                      text: '平乐园小区',
                      value: 'AREA|84c0d79d-e997-0690'
                    },
                    {
                      text: '磨房北里',
                      value: 'AREA|8baf52bc-aaea-dc06'
                    },
                    {
                      text: '潘道庙',
                      value: 'AREA|f4af4672-4e01-7742'
                    }
                  ]
                },
                {
                  text: '国展',
                  value: 'AREA|d82532e6-f195-50b3',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '静安东里',
                      value: 'AREA|4b1e375e-af5d-9ecf'
                    },
                    {
                      text: '柳芳南里',
                      value: 'AREA|cf009ec8-06d0-2a39'
                    },
                    {
                      text: '左家庄东里',
                      value: 'AREA|427fe1b3-9875-c8ef'
                    },
                    {
                      text: '柳芳北里',
                      value: 'AREA|3d374dae-bdb4-bd0e'
                    },
                    {
                      text: '浩鸿园',
                      value: 'AREA|cb82be21-8212-f8b4'
                    },
                    {
                      text: '新天第',
                      value: 'AREA|db949b08-8bca-be76'
                    }
                  ]
                },
                {
                  text: '潘家园',
                  value: 'AREA|b0492680-7509-368b',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '东架松',
                      value: 'AREA|2589f0cd-6621-fe96'
                    },
                    {
                      text: '华威北里',
                      value: 'AREA|3a3c79c9-9c1c-464f'
                    },
                    {
                      text: '华威西里',
                      value: 'AREA|3938f23e-2470-3e34'
                    },
                    {
                      text: '松榆西里',
                      value: 'AREA|0634288e-cfdb-8f33'
                    },
                    {
                      text: '弘善家园',
                      value: 'AREA|167a1da4-0b0f-b0c8'
                    },
                    {
                      text: '松榆里',
                      value: 'AREA|9ff7cd39-1737-fca9'
                    },
                    {
                      text: '潘家园东里',
                      value: 'AREA|0af3c6c8-5ee1-d45d'
                    },
                    {
                      text: '潘家园小区',
                      value: 'AREA|77fec116-87ed-c908'
                    }
                  ]
                },
                {
                  text: '亚运村小营',
                  value: 'AREA|bb785ec4-2ffb-4c9b',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '育慧里二区',
                      value: 'AREA|0f7b9f98-8b71-cd8a'
                    },
                    {
                      text: '远洋万和城A区',
                      value: 'AREA|7f94d032-748d-6d25'
                    },
                    {
                      text: '嘉铭桐城A区',
                      value: 'AREA|eb072170-43d4-0cc1'
                    },
                    {
                      text: '风格派',
                      value: 'AREA|4a184357-2cef-b370'
                    },
                    {
                      text: '主场',
                      value: 'AREA|48104e0f-647a-f228'
                    },
                    {
                      text: '紫薇天悦',
                      value: 'AREA|726e50ca-57aa-45d2'
                    },
                    {
                      text: '嘉铭桐城E区',
                      value: 'AREA|007bf693-9c4f-2255'
                    }
                  ]
                },
                {
                  text: '百子湾',
                  value: 'AREA|99ff7159-9b4c-d474',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '沿海赛洛城',
                      value: 'AREA|df7e6014-167d-401c'
                    },
                    {
                      text: '大成国际',
                      value: 'AREA|ad8ced9e-c095-4fe2'
                    },
                    {
                      text: '美利山',
                      value: 'AREA|57cf27a1-6584-cb85'
                    },
                    {
                      text: '金泰先锋北区',
                      value: 'AREA|776b49b5-e2e5-35ac'
                    },
                    {
                      text: '金海国际北区',
                      value: 'AREA|82ce7e2d-6e64-bce4'
                    },
                    {
                      text: '金泰先锋南区',
                      value: 'AREA|4d143c5b-379d-7308'
                    },
                    {
                      text: '沿海赛洛城一期',
                      value: 'AREA|a4514d7f-88a0-86a9'
                    },
                    {
                      text: '沿海赛洛城二期',
                      value: 'AREA|0e657ad7-bd45-c0fb'
                    },
                    {
                      text: '沿海赛洛城七期',
                      value: 'AREA|695eb736-472e-da80'
                    },
                    {
                      text: '金海国际南区',
                      value: 'AREA|cfa2417b-eafe-5beb'
                    },
                    {
                      text: '沿海赛洛城三期',
                      value: 'AREA|381fe308-6ccc-4619'
                    }
                  ]
                },
                {
                  text: '惠新西街',
                  value: 'AREA|0abfeac3-f82e-c261',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '惠新西街小区',
                      value: 'AREA|2dfe0cc6-fecc-462d'
                    },
                    {
                      text: '城市出品',
                      value: 'AREA|fd26da66-cd20-df21'
                    },
                    {
                      text: '胜古南里',
                      value: 'AREA|436816f6-d78d-86e3'
                    },
                    {
                      text: '蓝珏苑',
                      value: 'AREA|4b8a1d88-8e9d-f779'
                    },
                    {
                      text: '惠新里小区',
                      value: 'AREA|c133603f-282c-5efb'
                    },
                    {
                      text: '安苑东里三区',
                      value: 'AREA|08efbe81-a568-c70c'
                    },
                    {
                      text: '惠新北里',
                      value: 'AREA|eee308ca-2cec-702b'
                    },
                    {
                      text: '小关东里10号院',
                      value: 'AREA|7bcf1184-0332-e9a7'
                    },
                    {
                      text: '千鹤家园',
                      value: 'AREA|958de4bb-a414-46e8'
                    },
                    {
                      text: '胜古家园',
                      value: 'AREA|0e79787e-9366-a309'
                    }
                  ]
                },
                {
                  text: '奥林匹克公园',
                  value: 'AREA|eb7d4966-519f-e52c',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '万科星园',
                      value: 'AREA|16248827-0024-ab42'
                    },
                    {
                      text: '天畅园',
                      value: 'AREA|7e06dfff-1d77-e34f'
                    },
                    {
                      text: '景龙国际',
                      value: 'AREA|52e17c40-3c37-1baa'
                    },
                    {
                      text: '天居园',
                      value: 'AREA|b8821a41-e05f-97b5'
                    },
                    {
                      text: '上林世家',
                      value: 'AREA|8860a598-dcb4-4f48'
                    },
                    {
                      text: '京师园',
                      value: 'AREA|155b563e-f1a6-6b26'
                    },
                    {
                      text: '上元君庭',
                      value: 'AREA|98aa6c2a-fdbc-322a'
                    },
                    {
                      text: '天翠园',
                      value: 'AREA|bf21efb3-47cf-c3af'
                    },
                    {
                      text: '天乐园',
                      value: 'AREA|d3ed0280-5bed-e320'
                    }
                  ]
                },
                {
                  text: '亚运村',
                  value: 'AREA|3a7b4238-1911-2cea',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '安慧里二区',
                      value: 'AREA|07fab0f3-5934-6120'
                    },
                    {
                      text: '保利金泉',
                      value: 'AREA|61e4393b-aa57-6e55'
                    },
                    {
                      text: '安立花园',
                      value: 'AREA|9748546a-4564-bef8'
                    },
                    {
                      text: '亚奥观典',
                      value: 'AREA|37fdb42a-15b2-673e'
                    },
                    {
                      text: '安慧里一区',
                      value: 'AREA|3c2116c1-c7b1-d618'
                    },
                    {
                      text: '慧忠北里第四社区',
                      value: 'AREA|68589670-10eb-4fab'
                    },
                    {
                      text: '润枫德尚苑',
                      value: 'AREA|f0cd3a29-486c-944f'
                    },
                    {
                      text: '卧龙小区',
                      value: 'AREA|6c93988a-d2f4-3297'
                    },
                    {
                      text: '慧忠北里第三社区',
                      value: 'AREA|134ce058-0857-e971'
                    },
                    {
                      text: '大屯里小区',
                      value: 'AREA|a91c5ff5-82d4-f8a0'
                    },
                    {
                      text: '慧忠里',
                      value: 'AREA|43dc4d44-9613-9221'
                    },
                    {
                      text: '天创世缘',
                      value: 'AREA|954b0bcf-f65e-bd3d'
                    },
                    {
                      text: '安慧北里逸园',
                      value: 'AREA|277971c3-b256-521f'
                    },
                    {
                      text: '慧忠北里',
                      value: 'AREA|de4849fa-1829-7f56'
                    },
                    {
                      text: '荣尊堡国际俱乐部公寓',
                      value: 'AREA|41dcd2c4-607f-0287'
                    }
                  ]
                },
                {
                  text: '农展馆',
                  value: 'AREA|4d2868ac-872a-1925',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '博雅园',
                      value: 'AREA|a1d27ad2-0b42-37fc'
                    },
                    {
                      text: '三全公寓',
                      value: 'AREA|c23995f2-ffe8-047f'
                    },
                    {
                      text: '碧湖居',
                      value: 'AREA|a4d85a67-a88d-1e25'
                    },
                    {
                      text: '成苑公寓',
                      value: 'AREA|faa90440-1df4-deea'
                    },
                    {
                      text: '麦子店街',
                      value: 'AREA|4bc3f683-b60f-4b32'
                    },
                    {
                      text: '农展南里',
                      value: 'AREA|17184df2-1ca0-8f91'
                    },
                    {
                      text: '朝阳公园西里北区',
                      value: 'AREA|9ceb4477-7f86-cd47'
                    },
                    {
                      text: '九号公寓',
                      value: 'AREA|d1ee7515-5957-f221'
                    },
                    {
                      text: '枣营北里',
                      value: 'AREA|46f5bce9-328c-a93a'
                    },
                    {
                      text: '京达国际公寓',
                      value: 'AREA|6bdecef3-b4f3-a624'
                    }
                  ]
                },
                {
                  text: '安贞',
                  value: 'AREA|73e00bd4-6cc1-b2b5',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '安贞西里',
                      value: 'AREA|9ba39dcd-6ed3-7a82'
                    },
                    {
                      text: '国典华园',
                      value: 'AREA|3a31cb72-cedc-f97c'
                    },
                    {
                      text: '西青年沟',
                      value: 'AREA|96deb064-23d6-69b1'
                    },
                    {
                      text: '安定路',
                      value: 'AREA|666f279c-3729-aa3d'
                    },
                    {
                      text: '安华西里社区',
                      value: 'AREA|93253ed5-8fc7-1c01'
                    },
                    {
                      text: '安贞里',
                      value: 'AREA|8081570f-d1ac-0121'
                    },
                    {
                      text: '安华里社区',
                      value: 'AREA|dba50a8d-ae95-42ce'
                    },
                    {
                      text: '富仁名苑',
                      value: 'AREA|5a13d569-a944-e378'
                    },
                    {
                      text: '小黄庄前街2号院',
                      value: 'AREA|ad9d711a-06e7-7694'
                    }
                  ]
                },
                {
                  text: '朝阳门外',
                  value: 'AREA|efd41094-8977-0635',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '怡景园',
                      value: 'AREA|6948839c-21a1-df08'
                    },
                    {
                      text: '日坛国际公寓',
                      value: 'AREA|383f4340-cb6c-8230'
                    },
                    {
                      text: '朝外MEN',
                      value: 'AREA|0321bb55-b9e1-b8e5'
                    },
                    {
                      text: '唐缘私家别墅',
                      value: 'AREA|10dedb35-b66f-5d80'
                    },
                    {
                      text: '朝阳门南大街',
                      value: 'AREA|60b9257d-3714-74cf'
                    },
                    {
                      text: '东大桥路',
                      value: 'AREA|a01f2e7c-918c-1397'
                    },
                    {
                      text: '昆泰国际公寓',
                      value: 'AREA|7d21feba-17af-be10'
                    },
                    {
                      text: '三丰里小区',
                      value: 'AREA|a49a5e77-bb94-6d3a'
                    },
                    {
                      text: '迪阳公寓',
                      value: 'AREA|6620484e-4e4c-2107'
                    },
                    {
                      text: '蓝筹名座',
                      value: 'AREA|d84f76a8-7fa4-de21'
                    },
                    {
                      text: '天福园',
                      value: 'AREA|25f56505-ab04-e6b6'
                    },
                    {
                      text: '新中西街',
                      value: 'AREA|2c81cf99-8cf3-7ea5'
                    },
                    {
                      text: '吉庆里小区',
                      value: 'AREA|7526d52c-ff3a-b809'
                    }
                  ]
                },
                {
                  text: '太阳宫',
                  value: 'AREA|767150da-9a5f-dbb5',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '冠城大通澜石',
                      value: 'AREA|785a060d-bc73-d446'
                    },
                    {
                      text: '火星园',
                      value: 'AREA|d09b749c-d9bb-4956'
                    },
                    {
                      text: '太阳国际公馆',
                      value: 'AREA|d00ede47-72b1-409c'
                    },
                    {
                      text: '新纪家园',
                      value: 'AREA|95770dfa-77fd-b4a7'
                    },
                    {
                      text: '红玺台',
                      value: 'AREA|fbc4467b-6a39-e7f8'
                    },
                    {
                      text: '太阳公元',
                      value: 'AREA|410ef59c-5389-1215'
                    },
                    {
                      text: '水星园',
                      value: 'AREA|8541512f-3eb3-6244'
                    }
                  ]
                },
                {
                  text: '健翔桥',
                  value: 'AREA|87a809d5-35e9-fe63',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '华严北里中科院',
                      value: 'AREA|f15d1ed2-e674-350c'
                    },
                    {
                      text: '华严北里小区',
                      value: 'AREA|8630073f-c6f8-90a1'
                    },
                    {
                      text: '安翔里小区',
                      value: 'AREA|d8f6bd92-d236-bda2'
                    }
                  ]
                },
                {
                  text: '常营',
                  value: 'AREA|e04ab58c-e8a4-9508',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '柏林爱乐三期',
                      value: 'AREA|36e1c741-58c9-073c'
                    },
                    {
                      text: '万象新天一区',
                      value: 'AREA|fb84c6b2-3ef3-65ae'
                    },
                    {
                      text: '富力阳光美园',
                      value: 'AREA|b37d6fcd-bcd1-d57e'
                    },
                    {
                      text: '北京新天地一期',
                      value: 'AREA|f90ed879-debc-855d'
                    },
                    {
                      text: '北辰福第二号院',
                      value: 'AREA|5a8db80f-cda6-a133'
                    },
                    {
                      text: '万象新天二区',
                      value: 'AREA|942f0fd4-33f5-604b'
                    },
                    {
                      text: '柏林爱乐四期',
                      value: 'AREA|1585d30d-f3be-4fd9'
                    },
                    {
                      text: '柏林爱乐二期',
                      value: 'AREA|cb56f0cb-0f8f-7bf8'
                    },
                    {
                      text: '北京新天地二期',
                      value: 'AREA|e68b2bee-9744-5e8e'
                    },
                    {
                      text: '苹果派',
                      value: 'AREA|85ba218a-5f96-086a'
                    },
                    {
                      text: '长楹天街',
                      value: 'AREA|3d934299-8c57-0622'
                    },
                    {
                      text: '保利嘉园三号院',
                      value: 'AREA|5f1ef918-8ba8-ae6d'
                    },
                    {
                      text: '万象新天四区',
                      value: 'AREA|c1e82b82-a018-5aac'
                    }
                  ]
                },
                {
                  text: '燕莎',
                  value: 'AREA|e5f8aee3-f37c-901f',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '霞光里35号院',
                      value: 'AREA|bd395661-2dda-7b0f'
                    },
                    {
                      text: '国际港',
                      value: 'AREA|6a1e0553-d010-e506'
                    },
                    {
                      text: 'US联邦公寓',
                      value: 'AREA|9f8aba30-0e7a-36c2'
                    },
                    {
                      text: '远洋新干线',
                      value: 'AREA|2216efa9-645a-18e4'
                    },
                    {
                      text: '福景苑',
                      value: 'AREA|c491f5bd-3226-3c6d'
                    },
                    {
                      text: '四季世家公寓',
                      value: 'AREA|85ed2230-9264-c24b'
                    }
                  ]
                },
                {
                  text: '双桥',
                  value: 'AREA|0a95a132-3d29-9712',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '远洋一方花语苑',
                      value: 'AREA|436ef7fd-88f0-8380'
                    },
                    {
                      text: '水郡长安',
                      value: 'AREA|37fdc5b9-7d9b-1694'
                    },
                    {
                      text: '珠江绿洲',
                      value: 'AREA|f9e1bdb5-e17f-9e45'
                    },
                    {
                      text: '朝阳旺角',
                      value: 'AREA|c2d9c3c4-6d3a-7fcd'
                    },
                    {
                      text: '双桥东路6号院',
                      value: 'AREA|196052ae-6de0-0ed9'
                    },
                    {
                      text: '北花园小区',
                      value: 'AREA|9d4deedb-caec-92fe'
                    },
                    {
                      text: '东柳西里',
                      value: 'AREA|dca05ef4-9767-b69a'
                    }
                  ]
                },
                {
                  text: '三元桥',
                  value: 'AREA|5d530393-c402-315c',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '三源里街',
                      value: 'AREA|c2398273-bfb5-a573'
                    },
                    {
                      text: '时间国际',
                      value: 'AREA|6ba39332-b14b-7374'
                    },
                    {
                      text: '三源里北小街',
                      value: 'AREA|6ac1021a-1f46-38f0'
                    },
                    {
                      text: '凤凰城三期',
                      value: 'AREA|6202e908-884d-ed9a'
                    },
                    {
                      text: '新源街',
                      value: 'AREA|33e959b6-ca62-16d7'
                    },
                    {
                      text: '新源南路',
                      value: 'AREA|e2d387aa-22f5-016c'
                    },
                    {
                      text: 'SOHO北京公馆',
                      value: 'AREA|4729e895-1447-67f7'
                    },
                    {
                      text: '三源里南小街',
                      value: 'AREA|b0d169f0-b80e-84b4'
                    },
                    {
                      text: '金星园',
                      value: 'AREA|04091d37-6c43-7f60'
                    },
                    {
                      text: 'UHN国际村',
                      value: 'AREA|5acf77af-e5ce-9916'
                    },
                    {
                      text: '星源汇',
                      value: 'AREA|41905783-1e1e-c138'
                    },
                    {
                      text: '凤凰城二期',
                      value: 'AREA|7fafcf5e-60ff-b56f'
                    }
                  ]
                },
                {
                  text: '定福庄',
                  value: 'AREA|4a64edc7-c621-8ac5',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '电建南院',
                      value: 'AREA|7dc37977-4238-d003'
                    },
                    {
                      text: '五建小区',
                      value: 'AREA|172228cf-cd61-9a7e'
                    },
                    {
                      text: '定福庄西街',
                      value: 'AREA|c7bd055b-bb01-4dc8'
                    },
                    {
                      text: '美然动力A3区',
                      value: 'AREA|19bb478b-a81b-9bfc'
                    },
                    {
                      text: '美然动力A2区',
                      value: 'AREA|09cd1fca-bcbf-5501'
                    },
                    {
                      text: '金星小区',
                      value: 'AREA|7f3f32ff-5b74-3dd3'
                    },
                    {
                      text: '鲁班大厦',
                      value: 'AREA|7abda49f-b7f7-ac23'
                    }
                  ]
                },
                {
                  text: '甘露园',
                  value: 'AREA|18cab21d-24a3-f5fb',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '康家园',
                      value: 'AREA|41fb97e6-fb0e-a0e2'
                    },
                    {
                      text: '朝阳园',
                      value: 'AREA|7bbc82c5-9418-7554'
                    },
                    {
                      text: '甘露园南里',
                      value: 'AREA|efa1cad1-1872-2d58'
                    }
                  ]
                },
                {
                  text: '三里屯',
                  value: 'AREA|e474af1d-4b77-4b8b',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '三里屯南',
                      value: 'AREA|bbdc1dd9-8b71-044b'
                    },
                    {
                      text: '中纺里',
                      value: 'AREA|96c5ae89-fdea-11ad'
                    },
                    {
                      text: '泰悦豪庭',
                      value: 'AREA|344b7670-07fc-a752'
                    },
                    {
                      text: '三里屯SOHO',
                      value: 'AREA|010ab8da-4527-ef61'
                    },
                    {
                      text: '富力爱丁堡公馆',
                      value: 'AREA|1e48ac35-e380-9f8a'
                    }
                  ]
                },
                {
                  text: '芍药居',
                  value: 'AREA|baa3b94d-c8b7-cece',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '芍药居',
                      value: 'AREA|6429ce43-0af2-4364'
                    },
                    {
                      text: '芍药居北里',
                      value: 'AREA|1e33b185-9abb-a5b6'
                    },
                    {
                      text: '育慧街2号院',
                      value: 'AREA|ba1ea622-e51e-be03'
                    },
                    {
                      text: '高原街',
                      value: 'AREA|ef948768-cf21-1c83'
                    },
                    {
                      text: '芍药居14号院',
                      value: 'AREA|3fa3fc1d-e820-a88f'
                    },
                    {
                      text: '芍药居甲2号院',
                      value: 'AREA|29c1d158-4407-7eab'
                    }
                  ]
                },
                {
                  text: '管庄',
                  value: 'AREA|97f87d84-2d2e-46cc',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '京通苑',
                      value: 'AREA|f7043b9c-de61-34b3'
                    },
                    {
                      text: '华龙美树',
                      value: 'AREA|6196cecf-f138-ddf3'
                    }
                  ]
                },
                {
                  text: '豆各庄',
                  value: 'AREA|6d6bbdc7-11c1-33a1',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '富力又一城C区',
                      value: 'AREA|ebe3025b-15c4-e940'
                    },
                    {
                      text: '富力又一城B区',
                      value: 'AREA|fb18c25c-7222-f9d3'
                    }
                  ]
                },
                {
                  text: '首都机场',
                  value: 'AREA|47d2f66c-a963-1bf1',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '机场南路东里',
                      value: 'AREA|942af5dc-df18-00da'
                    },
                    {
                      text: '首都机场南路西里',
                      value: 'AREA|ef32c7d3-6a20-4d5b'
                    },
                    {
                      text: '南平东里',
                      value: 'AREA|ce3c2f42-3229-d49e'
                    }
                  ]
                },
                {
                  text: '东坝',
                  value: 'AREA|d62ccf0d-cd87-6264',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '金隅景和园',
                      value: 'AREA|e9fb2120-81fa-3e4e'
                    }
                  ]
                }
              ]
            },
            {
              text: '丰台',
              value: 'AREA|0dd58113-90ab-4d85',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '宋家庄',
                  value: 'AREA|017a6304-d22d-d001',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '政馨园二区',
                      value: 'AREA|fabf0e33-20c1-1d5e'
                    },
                    {
                      text: '世纪星',
                      value: 'AREA|d1c6603f-ef0f-7e87'
                    }
                  ]
                },
                {
                  text: '玉泉营',
                  value: 'AREA|f4ae139e-b425-1996',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '宝丰大厦',
                      value: 'AREA|a456867c-8304-dde3'
                    },
                    {
                      text: '三环新城6号院',
                      value: 'AREA|a1355404-2e41-34eb'
                    },
                    {
                      text: '万年花城五期',
                      value: 'AREA|08dfe6fe-3bc3-f57a'
                    },
                    {
                      text: '万年花城四期',
                      value: 'AREA|aad00c64-5277-f5ee'
                    },
                    {
                      text: '新村三里',
                      value: 'AREA|95be021c-b4aa-2e33'
                    },
                    {
                      text: '三环新城7号院',
                      value: 'AREA|b81feecf-ca2b-1705'
                    },
                    {
                      text: '中景理想家',
                      value: 'AREA|201cb86d-f93b-6e6d'
                    },
                    {
                      text: '万年花城二期',
                      value: 'AREA|cd3182fe-44d6-a19a'
                    },
                    {
                      text: '万年花城三期',
                      value: 'AREA|ccdae4b1-93f4-9f10'
                    },
                    {
                      text: '新村二里',
                      value: 'AREA|b4f37f2a-0452-df77'
                    },
                    {
                      text: '新村一里',
                      value: 'AREA|7fbbee74-6ebc-2a06'
                    },
                    {
                      text: '万年花城回迁',
                      value: 'AREA|2de94113-16a0-628f'
                    },
                    {
                      text: '金丰园',
                      value: 'AREA|5b4092ef-59a5-0afc'
                    },
                    {
                      text: '鸿业兴园二区',
                      value: 'AREA|07918a79-a4d9-bd48'
                    }
                  ]
                },
                {
                  text: '科技园区',
                  value: 'AREA|5c31bfc1-4e5d-5063',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '中海御鑫阁',
                      value: 'AREA|4b1eacdb-e920-5f97'
                    },
                    {
                      text: '怡海花园富泽园',
                      value: 'AREA|675d1a00-cea1-3485'
                    },
                    {
                      text: '北京方向',
                      value: 'AREA|dd651099-0960-66a4'
                    },
                    {
                      text: '怡海花园富润园',
                      value: 'AREA|673082a6-f29e-d957'
                    },
                    {
                      text: '怡海花园恒泰园',
                      value: 'AREA|d06b3907-1288-ede3'
                    },
                    {
                      text: '天下儒寓',
                      value: 'AREA|1b05449e-8841-6e8c'
                    },
                    {
                      text: '天龙华鹤',
                      value: 'AREA|c92b44d2-28e4-2d13'
                    },
                    {
                      text: '设计师广场',
                      value: 'AREA|b166658b-bbeb-8b4b'
                    },
                    {
                      text: '御景春天',
                      value: 'AREA|8dd86648-f783-cc9b'
                    },
                    {
                      text: '阳光四季',
                      value: 'AREA|ae9b1b66-d7ce-f420'
                    }
                  ]
                },
                {
                  text: '太平桥',
                  value: 'AREA|2fa8f758-451a-fcd9',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '糖人街',
                      value: 'AREA|f6441ebb-a6b8-ed40'
                    },
                    {
                      text: '威尔夏大道',
                      value: 'AREA|d1bbc27d-43d9-54b7'
                    },
                    {
                      text: '太平桥西里',
                      value: 'AREA|b567cf77-5083-43aa'
                    },
                    {
                      text: '太平桥东里',
                      value: 'AREA|629d36c1-29cf-5db8'
                    },
                    {
                      text: '湾子街社区',
                      value: 'AREA|aab33062-bd23-e1cb'
                    },
                    {
                      text: '首科花园',
                      value: 'AREA|53c7afa4-e082-622b'
                    }
                  ]
                },
                {
                  text: '刘家窑',
                  value: 'AREA|259924db-1412-aaf9',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '贾家花园小区',
                      value: 'AREA|2cdd2a97-9992-ccab'
                    },
                    {
                      text: '嘉业大厦',
                      value: 'AREA|022eb24b-c8a9-fa32'
                    },
                    {
                      text: '顺四条37号院',
                      value: 'AREA|b3b4b22f-243c-152a'
                    },
                    {
                      text: '一栋苑',
                      value: 'AREA|97a05856-268d-143e'
                    },
                    {
                      text: '石榴园北里小区',
                      value: 'AREA|0318a253-e067-ae82'
                    },
                    {
                      text: '南三环中路',
                      value: 'AREA|7bf013f7-8304-e7ed'
                    },
                    {
                      text: '方南家园二期',
                      value: 'AREA|75e745ae-e8bb-d921'
                    },
                    {
                      text: '建邦华府',
                      value: 'AREA|e08f3e73-30d3-032d'
                    },
                    {
                      text: '鑫兆雅园北区',
                      value: 'AREA|7162709b-1c5f-4874'
                    }
                  ]
                },
                {
                  text: '北京南站',
                  value: 'AREA|c8e3adb0-87c8-cf55',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '世纪金色嘉园',
                      value: 'AREA|093feabf-0e4f-1a58'
                    },
                    {
                      text: '翠林二里',
                      value: 'AREA|db607d92-3769-6bdd'
                    },
                    {
                      text: '右外东庄',
                      value: 'AREA|4a5d0f45-476b-39ef'
                    }
                  ]
                },
                {
                  text: '木樨园',
                  value: 'AREA|b71fa3b2-ca03-08fe',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '南三环中路57号',
                      value: 'AREA|bbed924d-df73-ba93'
                    },
                    {
                      text: '南木樨园',
                      value: 'AREA|8c689718-ca5b-b8ff'
                    },
                    {
                      text: '慧时欣园',
                      value: 'AREA|b5a91f73-f616-b9b1'
                    },
                    {
                      text: '马公庄',
                      value: 'AREA|69fdf5f8-3099-6a4f'
                    },
                    {
                      text: '自然美',
                      value: 'AREA|314180db-a050-d27c'
                    },
                    {
                      text: '南曦大厦',
                      value: 'AREA|4adb4ce2-9ac6-a05b'
                    }
                  ]
                },
                {
                  text: '大红门',
                  value: 'AREA|15e60aad-5913-07cc',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '远洋自然',
                      value: 'AREA|49c84d7b-4fa0-243f'
                    },
                    {
                      text: '大红门东门里',
                      value: 'AREA|e9bd46f1-aafd-5ce6'
                    },
                    {
                      text: '建欣苑五里',
                      value: 'AREA|20995331-9609-d246'
                    },
                    {
                      text: '临泓路6号院',
                      value: 'AREA|89d132b9-a81a-ccc5'
                    }
                  ]
                },
                {
                  text: '西罗园',
                  value: 'AREA|29cb6328-c48e-8df4',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '西罗园南里',
                      value: 'AREA|7c4a65ce-b173-688e'
                    },
                    {
                      text: '珠江骏景北区',
                      value: 'AREA|03d78f49-94c7-b18c'
                    },
                    {
                      text: '华润小区',
                      value: 'AREA|a0903606-7e36-0afb'
                    },
                    {
                      text: '珠江骏景南区',
                      value: 'AREA|ad003950-872a-2d92'
                    },
                    {
                      text: '珠江骏景中区',
                      value: 'AREA|9dcfea18-bbbd-e93b'
                    },
                    {
                      text: '西罗园四区',
                      value: 'AREA|f3659a93-d050-e882'
                    },
                    {
                      text: '西罗园一区',
                      value: 'AREA|d67e83d6-10ba-43e4'
                    }
                  ]
                },
                {
                  text: '洋桥',
                  value: 'AREA|ad28160e-56e3-9634',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '马家堡33号院',
                      value: 'AREA|8c258310-6b6e-2076'
                    },
                    {
                      text: '首座绿洲',
                      value: 'AREA|f3e893cb-d0d0-0cc8'
                    },
                    {
                      text: '海户西里32号院',
                      value: 'AREA|bf55feea-22d9-df10'
                    },
                    {
                      text: '洋桥北里',
                      value: 'AREA|6c3dbf02-47b4-6423'
                    },
                    {
                      text: '海户西里33号院',
                      value: 'AREA|1b5ab90a-3508-85e4'
                    },
                    {
                      text: '四路通17号院',
                      value: 'AREA|d2e3cd15-7520-540c'
                    }
                  ]
                },
                {
                  text: '旧宫',
                  value: 'AREA|34c8829a-c9cf-dd89',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '六营门小区',
                      value: 'AREA|d0394e55-5c5a-6c1e'
                    },
                    {
                      text: '菊源南里',
                      value: 'AREA|ad6355c2-dfa9-784a'
                    },
                    {
                      text: '灵秀山庄',
                      value: 'AREA|53ab185b-1954-8569'
                    },
                    {
                      text: '大城小镇',
                      value: 'AREA|142252e5-c9e0-a103'
                    },
                    {
                      text: '芳源里',
                      value: 'AREA|26123818-0c36-bc67'
                    },
                    {
                      text: '朗润园二期',
                      value: 'AREA|bbdb110f-fb92-6110'
                    },
                    {
                      text: '菊源里',
                      value: 'AREA|cfda6c7d-4302-7c53'
                    },
                    {
                      text: '朗润园一期',
                      value: 'AREA|e696b486-6472-7d60'
                    },
                    {
                      text: '亦庄北岸',
                      value: 'AREA|715853eb-c372-10bd'
                    },
                    {
                      text: '梅源里小区',
                      value: 'AREA|8aa9328d-24fb-704f'
                    },
                    {
                      text: '桃源里',
                      value: 'AREA|de1a4418-7cd1-ac66'
                    },
                    {
                      text: '万源南里',
                      value: 'AREA|33191bf2-1726-8d75'
                    },
                    {
                      text: '润枫锦尚',
                      value: 'AREA|eac8af67-2175-b403'
                    }
                  ]
                },
                {
                  text: '马家堡',
                  value: 'AREA|88f94515-801c-754e',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '富卓苑',
                      value: 'AREA|70e05e87-e321-18f5'
                    },
                    {
                      text: '益城园',
                      value: 'AREA|2f83ecb1-dc61-f51a'
                    },
                    {
                      text: '星河城西区',
                      value: 'AREA|4018f0e3-ed8a-b086'
                    },
                    {
                      text: '枫竹苑二区',
                      value: 'AREA|4a9c74b2-f683-803d'
                    },
                    {
                      text: '瑞丽江畔',
                      value: 'AREA|a9e9ed5a-c104-6ec3'
                    },
                    {
                      text: '明月嘉园',
                      value: 'AREA|1ac120e7-48dd-0c47'
                    },
                    {
                      text: '明日嘉园',
                      value: 'AREA|c1921e00-1507-bb1e'
                    },
                    {
                      text: '益明园',
                      value: 'AREA|c4f2d7fe-4d1f-df4b'
                    },
                    {
                      text: '西马金润一区',
                      value: 'AREA|b7fe0587-3123-02a8'
                    },
                    {
                      text: '马家堡西里',
                      value: 'AREA|5f564083-2104-a7ea'
                    },
                    {
                      text: '星河城东区',
                      value: 'AREA|4a292ec8-9d7e-92e0'
                    },
                    {
                      text: '名都家苑',
                      value: 'AREA|973a04a2-1ca6-2a7f'
                    },
                    {
                      text: '建工北国',
                      value: 'AREA|db87f32f-4ed4-4c26'
                    },
                    {
                      text: '左右坊',
                      value: 'AREA|9be466a6-b435-1c89'
                    },
                    {
                      text: '角门15号院',
                      value: 'AREA|0c772caa-723b-eb91'
                    }
                  ]
                },
                {
                  text: '六里桥',
                  value: 'AREA|a34b47ee-a817-16f5',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '风荷曲苑',
                      value: 'AREA|4345e8a5-4f23-6336'
                    },
                    {
                      text: '莲香园',
                      value: 'AREA|705872ff-c0e5-6618'
                    },
                    {
                      text: '六里桥7号院',
                      value: 'AREA|952cbc47-b877-f12c'
                    },
                    {
                      text: '六里桥小区',
                      value: 'AREA|c2e2919b-71f1-a155'
                    },
                    {
                      text: '橙色年代',
                      value: 'AREA|1b396fa6-1b13-8a61'
                    }
                  ]
                },
                {
                  text: '草桥',
                  value: 'AREA|f60f1221-3fe0-d039',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '玺萌丽苑',
                      value: 'AREA|5db3c644-6fd1-15fb'
                    },
                    {
                      text: '玉安园',
                      value: 'AREA|fa2ffa64-b590-693a'
                    },
                    {
                      text: '风景club',
                      value: 'AREA|d0d8d75f-1bf5-c2dd'
                    },
                    {
                      text: '恋日花都',
                      value: 'AREA|3ddd49c4-1e66-af3b'
                    },
                    {
                      text: '未来上层',
                      value: 'AREA|84769ee7-41c1-57bd'
                    },
                    {
                      text: '恋日嘉园一期',
                      value: 'AREA|dec0c9a9-4f97-b2e0'
                    },
                    {
                      text: '草桥欣园四区',
                      value: 'AREA|906514fa-1b10-cfb2'
                    },
                    {
                      text: '草桥东路16号楼',
                      value: 'AREA|bab4b68c-d425-5444'
                    },
                    {
                      text: '玺萌鹏苑',
                      value: 'AREA|32580e77-b85e-f9b9'
                    },
                    {
                      text: '草桥欣园三区',
                      value: 'AREA|ff048a3f-27fe-3c0f'
                    },
                    {
                      text: '冬季星空',
                      value: 'AREA|1a6efa45-7633-83a6'
                    },
                    {
                      text: '南珠苑',
                      value: 'AREA|3053a401-1810-94d3'
                    },
                    {
                      text: '草桥物业小区',
                      value: 'AREA|5c4dd0b0-f5f2-d731'
                    },
                    {
                      text: '玺萌公馆',
                      value: 'AREA|86beda50-eb62-7f76'
                    },
                    {
                      text: '春季星空',
                      value: 'AREA|af38d474-e823-c768'
                    }
                  ]
                },
                {
                  text: '蒲黄榆',
                  value: 'AREA|b161fa42-f8f5-e8cc',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '定安东里',
                      value: 'AREA|bf1712ba-ed02-16b4'
                    },
                    {
                      text: '蒲黄榆四里',
                      value: 'AREA|036bb043-3cb0-e2ea'
                    },
                    {
                      text: '安乐林路',
                      value: 'AREA|3cd21786-5117-f949'
                    },
                    {
                      text: '蒲黄榆路',
                      value: 'AREA|9971e4a5-78b2-3a41'
                    },
                    {
                      text: '蒲安北里',
                      value: 'AREA|284a9387-9a66-19ff'
                    },
                    {
                      text: '恒松园',
                      value: 'AREA|2284ecf9-43b8-c6d5'
                    }
                  ]
                },
                {
                  text: '和义',
                  value: 'AREA|3195bc7a-7ded-691f',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '南苑北里三区',
                      value: 'AREA|a0f51e04-f8ce-c300'
                    },
                    {
                      text: '和义东里三区',
                      value: 'AREA|4ebf53fa-5a22-23e7'
                    },
                    {
                      text: '和义东里五区',
                      value: 'AREA|bd541afd-c4dc-b020'
                    },
                    {
                      text: '和义东里一区',
                      value: 'AREA|20787bac-f0f0-7844'
                    },
                    {
                      text: '和义东里二区',
                      value: 'AREA|8bbf07f0-d528-c8a5'
                    },
                    {
                      text: '东高地',
                      value: 'AREA|8e371982-96b3-9e72'
                    },
                    {
                      text: '和义西里二区',
                      value: 'AREA|aeaf2f80-ccdb-32fa'
                    }
                  ]
                },
                {
                  text: '丽泽',
                  value: 'AREA|d826e7fa-9990-1f23',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '保利百合',
                      value: 'AREA|2119a812-493b-2ca8'
                    },
                    {
                      text: '益丰苑',
                      value: 'AREA|cf31fd8d-a01d-3c66'
                    },
                    {
                      text: '盛鑫嘉园',
                      value: 'AREA|c4504618-2a61-6785'
                    }
                  ]
                },
                {
                  text: '角门',
                  value: 'AREA|35454bb7-55da-cf52',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '角门甲4号院',
                      value: 'AREA|a3636ec7-b796-0bd7'
                    },
                    {
                      text: '角门东里',
                      value: 'AREA|668940fa-0b95-6189'
                    },
                    {
                      text: '怡然家园6号院',
                      value: 'AREA|2eb39735-8ade-70ec'
                    },
                    {
                      text: '司达小区',
                      value: 'AREA|662df812-f2c1-c034'
                    },
                    {
                      text: '福海小区',
                      value: 'AREA|ab87526c-ea8b-26d9'
                    },
                    {
                      text: '大红门35号院',
                      value: 'AREA|f424a0f4-98e4-e812'
                    }
                  ]
                },
                {
                  text: '青塔',
                  value: 'AREA|ec898500-7743-8349',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '万恒家园',
                      value: 'AREA|198cb82f-7aab-1277'
                    },
                    {
                      text: '建邦枫景',
                      value: 'AREA|501e33d0-5704-b9ec'
                    },
                    {
                      text: '万科中粮假日风景',
                      value: 'AREA|8b146903-a90d-9452'
                    },
                    {
                      text: '青塔秀园',
                      value: 'AREA|25a659b0-e264-8533'
                    }
                  ]
                },
                {
                  text: '看丹桥',
                  value: 'AREA|422dab4d-8209-0310',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '新华街一里',
                      value: 'AREA|af9cb576-c369-e4dc'
                    },
                    {
                      text: '韩庄子二里',
                      value: 'AREA|7d62a749-920f-f8d7'
                    },
                    {
                      text: '新华街六里',
                      value: 'AREA|c3c394f3-4dc4-8444'
                    },
                    {
                      text: '韩庄子西里',
                      value: 'AREA|cdada908-8390-5df6'
                    },
                    {
                      text: '新华街三里',
                      value: 'AREA|0c834904-4ad8-d4b4'
                    },
                    {
                      text: '造甲街',
                      value: 'AREA|db70fe35-093f-724d'
                    },
                    {
                      text: '韩庄子三里',
                      value: 'AREA|75c6a18e-8443-d727'
                    }
                  ]
                },
                {
                  text: '七里庄',
                  value: 'AREA|789d6d1a-6c5a-a949',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '望园西里',
                      value: 'AREA|4889fc7d-04aa-0dc2'
                    },
                    {
                      text: '东大街西里',
                      value: 'AREA|74dba715-fd06-2a45'
                    },
                    {
                      text: '庄维多摩市二期',
                      value: 'AREA|4e9b5a85-53c1-e659'
                    },
                    {
                      text: '中建一局南院',
                      value: 'AREA|a7a2e5e1-1fb9-0c2d'
                    },
                    {
                      text: '北大街北里',
                      value: 'AREA|c0dcac8f-52df-7087'
                    },
                    {
                      text: '鼎恒中心',
                      value: 'AREA|0aa05331-e30f-36eb'
                    },
                    {
                      text: '庄维花园',
                      value: 'AREA|ef0252d7-4458-08a3'
                    }
                  ]
                },
                {
                  text: '右安门外',
                  value: 'AREA|2d9a150c-4753-4582',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '玉林里小区',
                      value: 'AREA|79f3853e-abf4-f722'
                    },
                    {
                      text: '右安门外大街',
                      value: 'AREA|b59be609-e434-ad42'
                    }
                  ]
                },
                {
                  text: '岳各庄',
                  value: 'AREA|fa3a60d4-f54f-3a90',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '珠江峰景',
                      value: 'AREA|f9e31a80-7aef-6404'
                    },
                    {
                      text: '大井北里',
                      value: 'AREA|0bb394a4-3685-6428'
                    }
                  ]
                },
                {
                  text: '北大地',
                  value: 'AREA|f8bd3f9b-a8d9-d84d',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '东安街头条',
                      value: 'AREA|0928a214-03bd-98cb'
                    },
                    {
                      text: '东幸福街',
                      value: 'AREA|3fc80c92-9b8e-b43a'
                    },
                    {
                      text: '正阳小区',
                      value: 'AREA|d89525c9-f9ef-fa32'
                    }
                  ]
                },
                {
                  text: '卢沟桥',
                  value: 'AREA|5b1fb3c8-fc18-80b1',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '卢沟桥南里',
                      value: 'AREA|2710b5c0-f5ef-72c7'
                    },
                    {
                      text: '沸城',
                      value: 'AREA|a6522f67-0a5b-7d25'
                    }
                  ]
                },
                {
                  text: '赵公口',
                  value: 'AREA|02a94f2d-39fd-b99a',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '南顶村',
                      value: 'AREA|0c947862-17e7-3969'
                    },
                    {
                      text: '世华水岸F区',
                      value: 'AREA|4fe619d5-1d0b-68a1'
                    },
                    {
                      text: '世华水岸C区',
                      value: 'AREA|7fad4984-b0cc-e15a'
                    }
                  ]
                },
                {
                  text: '成寿寺',
                  value: 'AREA|6a39beba-4316-d2e0',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '晶城秀府',
                      value: 'AREA|17017132-8d04-6968'
                    },
                    {
                      text: '中海城香克林',
                      value: 'AREA|b0bbe128-3121-6a47'
                    },
                    {
                      text: '苇子坑22号院',
                      value: 'AREA|257d4b48-9378-002a'
                    },
                    {
                      text: '成寿寺路',
                      value: 'AREA|eff606f5-5256-e60f'
                    },
                    {
                      text: '华芳园',
                      value: 'AREA|9322dbde-5bdb-c202'
                    }
                  ]
                },
                {
                  text: '新宫',
                  value: 'AREA|08945392-e148-20fd',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '南庭新苑北区',
                      value: 'AREA|db738fd9-db96-b611'
                    }
                  ]
                },
                {
                  text: '菜户营',
                  value: 'AREA|ceb214b3-f333-0087',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '鹏润家园',
                      value: 'AREA|a14ec21c-4441-7165'
                    },
                    {
                      text: '乐城',
                      value: 'AREA|e18888e1-de7d-8e13'
                    },
                    {
                      text: '万泉寺南里',
                      value: 'AREA|4978463b-d5b3-5420'
                    }
                  ]
                },
                {
                  text: '花乡',
                  value: 'AREA|ba04e7f0-ecae-1aa3',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '天伦锦城',
                      value: 'AREA|75d5f115-c945-4c52'
                    }
                  ]
                }
              ]
            },
            {
              text: '西城',
              value: 'AREA|fdb2a2a2-519c-9cf7',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '白纸坊',
                  value: 'AREA|e4c00203-867d-b573',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '白广路东里1号院',
                      value: 'AREA|327dd794-02a8-a36d'
                    },
                    {
                      text: '建功北里',
                      value: 'AREA|a5d20d11-1e5b-3252'
                    }
                  ]
                },
                {
                  text: '金融街',
                  value: 'AREA|4e3d78ef-8ad2-575f',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '宏汇园小区',
                      value: 'AREA|837ff675-3e1d-7d19'
                    },
                    {
                      text: '金融服务中心',
                      value: 'AREA|b80cae29-1f7f-f312'
                    },
                    {
                      text: '阳光100城市广场',
                      value: 'AREA|e0851a4d-fe5c-324c'
                    },
                    {
                      text: '宝鼎花园',
                      value: 'AREA|92fdd2dc-278d-69d2'
                    },
                    {
                      text: '东方名苑',
                      value: 'AREA|9534f4d6-c9d1-73aa'
                    },
                    {
                      text: '张面河小区',
                      value: 'AREA|659100ac-8002-12b0'
                    },
                    {
                      text: '松鹤园技校小区',
                      value: 'AREA|39f2e9b5-8f58-d14e'
                    },
                    {
                      text: '佳利秀水花苑',
                      value: 'AREA|0e6717f8-04c5-8a4c'
                    },
                    {
                      text: '商检局宿舍',
                      value: 'AREA|22c8e1ea-8355-b7f1'
                    },
                    {
                      text: '宣武门西大街',
                      value: 'AREA|849c2ed9-bd6f-6610'
                    },
                    {
                      text: '丰侨公寓',
                      value: 'AREA|055d4e7a-b4ce-b054'
                    },
                    {
                      text: '新文化街',
                      value: 'AREA|6f947518-6b9f-e8a4'
                    },
                    {
                      text: '丰盛胡同',
                      value: 'AREA|ea220cb2-0734-a33d'
                    },
                    {
                      text: '西城晶华',
                      value: 'AREA|d6ea8f63-ba70-8431'
                    },
                    {
                      text: '中京几道',
                      value: 'AREA|4ccf1d8e-183f-52b3'
                    },
                    {
                      text: '丰汇园小区',
                      value: 'AREA|b66f0164-89e9-0882'
                    },
                    {
                      text: '西斜街',
                      value: 'AREA|03a7aba4-9786-2f6d'
                    },
                    {
                      text: '尚座大厦',
                      value: 'AREA|09a3dbee-d3e4-da88'
                    },
                    {
                      text: '粉子胡同30号院',
                      value: 'AREA|9cd1ac72-e7d0-5c81'
                    },
                    {
                      text: '长安兴融中心',
                      value: 'AREA|b1ff2baf-5ba1-4510'
                    },
                    {
                      text: '金宸国际公寓',
                      value: 'AREA|4f616293-2925-1129'
                    },
                    {
                      text: '26军宿舍',
                      value: 'AREA|2f133e1e-de99-ebb0'
                    },
                    {
                      text: '康桥水岸',
                      value: 'AREA|e1aea7e6-fc4e-8be7'
                    },
                    {
                      text: '潍京水岸公馆',
                      value: 'AREA|15b61005-0c5f-578f'
                    }
                  ]
                },
                {
                  text: '广安门',
                  value: 'AREA|d75e8d0c-ae54-fa54',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '远见名苑',
                      value: 'AREA|de4dd3ba-bba2-18fa'
                    },
                    {
                      text: '荣丰2008',
                      value: 'AREA|89c45ebc-6150-ebbf'
                    },
                    {
                      text: '朗琴园',
                      value: 'AREA|6da28c3c-5abd-6407'
                    },
                    {
                      text: '车站西街1号院',
                      value: 'AREA|983a7a37-3cfe-f702'
                    },
                    {
                      text: '丽水莲花',
                      value: 'AREA|879410d0-2d7e-724b'
                    },
                    {
                      text: '西豪逸景',
                      value: 'AREA|886aa2e3-6fae-2ef9'
                    },
                    {
                      text: '手帕口北街',
                      value: 'AREA|5a29aa6b-530f-2f13'
                    },
                    {
                      text: '远见国际公寓',
                      value: 'AREA|c641db57-e470-32ad'
                    },
                    {
                      text: '红山世家',
                      value: 'AREA|ff0e0ea2-6139-0964'
                    }
                  ]
                },
                {
                  text: '官园',
                  value: 'AREA|d6616728-05df-f64f',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '北礼士路',
                      value: 'AREA|4749372b-22b4-a547'
                    },
                    {
                      text: '西直门南小街',
                      value: 'AREA|c5c8660f-eb1c-631a'
                    },
                    {
                      text: '西直门南大街',
                      value: 'AREA|55e74622-6b58-01b8'
                    },
                    {
                      text: '东冠英胡同',
                      value: 'AREA|453aeb1f-d0c2-69fe'
                    },
                    {
                      text: '富国里小区',
                      value: 'AREA|5b3551b4-9add-d326'
                    },
                    {
                      text: '冠英园小区',
                      value: 'AREA|2adbd5fc-5f55-1fe5'
                    },
                    {
                      text: '国英绿景公寓',
                      value: 'AREA|019b82fd-4c23-9731'
                    },
                    {
                      text: '官苑8号',
                      value: 'AREA|cf81ba7a-1834-9348'
                    }
                  ]
                },
                {
                  text: '阜成门',
                  value: 'AREA|78b8eeaa-94f4-e6d8',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '北营房西里',
                      value: 'AREA|0600ec9b-d05e-8ea5'
                    },
                    {
                      text: '南露园',
                      value: 'AREA|dd38ee82-615e-14bf'
                    },
                    {
                      text: '百万庄大街甲21号院',
                      value: 'AREA|8bfce357-31d6-bb6b'
                    },
                    {
                      text: '阜成门北大街',
                      value: 'AREA|10a81811-4747-3fab'
                    },
                    {
                      text: '黄瓜园',
                      value: 'AREA|99b58ff6-b445-7821'
                    },
                    {
                      text: '百万庄未区',
                      value: 'AREA|4b0eeef5-82ea-29eb'
                    },
                    {
                      text: '阜成门外北街',
                      value: 'AREA|ee4d6d72-781c-24ad'
                    },
                    {
                      text: '百万庄子区',
                      value: 'AREA|d34e4b7c-9402-6b7a'
                    },
                    {
                      text: '百万庄13号院',
                      value: 'AREA|0ef0249f-a46c-c86d'
                    },
                    {
                      text: '北露园',
                      value: 'AREA|e3cf2c46-88c1-294d'
                    },
                    {
                      text: '扣钟北里',
                      value: 'AREA|0a558b8b-a625-5ca6'
                    },
                    {
                      text: '展览路',
                      value: 'AREA|cac60702-ca8e-1e52'
                    },
                    {
                      text: '百万庄大街乙21号院',
                      value: 'AREA|16b6c6f7-e22d-01dc'
                    }
                  ]
                },
                {
                  text: '月坛',
                  value: 'AREA|fcccebfa-7d56-0d49',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '二七剧场路',
                      value: 'AREA|95e6abfa-1bc3-ddd2'
                    },
                    {
                      text: '复兴门北大街',
                      value: 'AREA|e9a50106-eb4a-c63c'
                    },
                    {
                      text: '阜成门外大街甲40号',
                      value: 'AREA|d35bcab5-3953-c176'
                    },
                    {
                      text: '铁二区',
                      value: 'AREA|3fc10264-b5a0-25dd'
                    },
                    {
                      text: '月坛北街25号院',
                      value: 'AREA|3229be7d-0f6c-9e09'
                    },
                    {
                      text: '阜成门外大街乙40号',
                      value: 'AREA|cc00f55d-70a5-7a44'
                    },
                    {
                      text: '三里河东路甲10号院',
                      value: 'AREA|3cac6918-7f9c-e59b'
                    },
                    {
                      text: '月坛北小街甲7号院',
                      value: 'AREA|375b62cd-2002-b88f'
                    },
                    {
                      text: '月坛南街',
                      value: 'AREA|1a8af516-03a7-f65f'
                    },
                    {
                      text: '三里河北街5号院',
                      value: 'AREA|a686c6bd-fec4-aa17'
                    }
                  ]
                },
                {
                  text: '牛街',
                  value: 'AREA|ea0b4660-c474-7d80',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '门楼巷',
                      value: 'AREA|e297a4ba-5eb3-51f0'
                    },
                    {
                      text: '青春无限',
                      value: 'AREA|be3890e9-a4cc-2ecb'
                    },
                    {
                      text: '泰和嘉苑',
                      value: 'AREA|0636c4cd-42d6-13d5'
                    },
                    {
                      text: '平原里小区',
                      value: 'AREA|81a8ee8c-28f3-6cec'
                    },
                    {
                      text: '凯迪尚府',
                      value: 'AREA|4b753a2e-1320-05c3'
                    },
                    {
                      text: '西华经典',
                      value: 'AREA|11038f4e-0a54-c49b'
                    },
                    {
                      text: '牛街西里',
                      value: 'AREA|5ab81522-a419-86ef'
                    },
                    {
                      text: '牛街东里',
                      value: 'AREA|87773b9e-be7f-c4aa'
                    },
                    {
                      text: '南半截胡同26号院',
                      value: 'AREA|439cfeac-7f7e-f54b'
                    },
                    {
                      text: '南横西街94号院',
                      value: 'AREA|acddd447-8e23-96c1'
                    },
                    {
                      text: '似海怡家',
                      value: 'AREA|6e0dc0bf-1363-910e'
                    },
                    {
                      text: '祥和家苑',
                      value: 'AREA|93b07bb5-b5a2-b48c'
                    },
                    {
                      text: '双槐里',
                      value: 'AREA|6dc85647-5517-69a3'
                    },
                    {
                      text: '右安门内大街',
                      value: 'AREA|6dbed8b6-0947-0664'
                    }
                  ]
                },
                {
                  text: '六铺炕',
                  value: 'AREA|6a4ea598-6e85-123e',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '六铺炕二区',
                      value: 'AREA|5ab9e6a1-42fb-76c9'
                    },
                    {
                      text: '塔院胡同12号院',
                      value: 'AREA|187d07bd-e464-9964'
                    },
                    {
                      text: '六铺炕一区',
                      value: 'AREA|c968f681-88b0-d91a'
                    },
                    {
                      text: '大井胡同',
                      value: 'AREA|5b4868a2-8ea0-e067'
                    },
                    {
                      text: '教场口6号院',
                      value: 'AREA|e2ecf496-beda-fdb6'
                    }
                  ]
                },
                {
                  text: '木樨地',
                  value: 'AREA|8defd4f7-dd74-676e',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '温馨家园',
                      value: 'AREA|a4b8f50c-428b-e39a'
                    },
                    {
                      text: '西便门外大街',
                      value: 'AREA|72a02ab1-28d0-17be'
                    },
                    {
                      text: '复兴门外大街',
                      value: 'AREA|8a182e75-ec05-687c'
                    },
                    {
                      text: '汽南小区',
                      value: 'AREA|968d2d36-ae9e-4d83'
                    },
                    {
                      text: '真武庙四里',
                      value: 'AREA|baa3eabd-a2ef-d413'
                    },
                    {
                      text: '西便门东里',
                      value: 'AREA|5a513bf8-0a13-9b56'
                    },
                    {
                      text: '西便门西里',
                      value: 'AREA|55b0b28c-b5ae-3f49'
                    },
                    {
                      text: '复兴门南大街',
                      value: 'AREA|2701a18d-3997-9d0a'
                    },
                    {
                      text: '北滨河路2号院',
                      value: 'AREA|f9a2e423-c702-d6a0'
                    },
                    {
                      text: '白云观',
                      value: 'AREA|d0298ea9-e43a-bc4e'
                    },
                    {
                      text: '莲花池东路甲5号院',
                      value: 'AREA|355e672b-c4cb-aee8'
                    }
                  ]
                },
                {
                  text: '德胜门',
                  value: 'AREA|43b7c8e7-a1eb-62d5',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '新外大街28号院',
                      value: 'AREA|9dd52863-ba7f-09e5'
                    },
                    {
                      text: '德胜里一区',
                      value: 'AREA|8eb5af60-c0eb-7ebc'
                    }
                  ]
                },
                {
                  text: '车公庄',
                  value: 'AREA|231dc105-26dd-151e',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '朝阳庵',
                      value: 'AREA|c8920ece-bc2d-d736'
                    },
                    {
                      text: '文兴街3号院',
                      value: 'AREA|cf6e88d0-d1ef-74be'
                    },
                    {
                      text: '铁路巷',
                      value: 'AREA|016a75a1-7722-a946'
                    },
                    {
                      text: '车公庄北里',
                      value: 'AREA|5d101f7e-59c3-59a5'
                    },
                    {
                      text: '团结大院',
                      value: 'AREA|e7d7891f-6b8c-e123'
                    },
                    {
                      text: '榆树馆西里',
                      value: 'AREA|79bb0fb0-eed9-d8e2'
                    }
                  ]
                },
                {
                  text: '马连道',
                  value: 'AREA|7387176c-a441-ffeb',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '常青藤嘉园',
                      value: 'AREA|e2688f72-07f9-04c5'
                    },
                    {
                      text: '馨莲茗园',
                      value: 'AREA|020bd541-cbd5-70a1'
                    },
                    {
                      text: '红莲中里',
                      value: 'AREA|12ce0786-34f5-fd79'
                    },
                    {
                      text: '格调',
                      value: 'AREA|bf4b866f-fdf8-7366'
                    },
                    {
                      text: '马连道中里',
                      value: 'AREA|1a5b04d6-0eab-4bd1'
                    },
                    {
                      text: '太平里',
                      value: 'AREA|2f803f44-762b-895a'
                    },
                    {
                      text: '信和嘉园',
                      value: 'AREA|46f29a4e-4e28-4d20'
                    },
                    {
                      text: '马连道路5号院',
                      value: 'AREA|45840c92-420e-3a08'
                    }
                  ]
                },
                {
                  text: '长椿街',
                  value: 'AREA|d3f0790f-4409-c8da',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '广义街10号院',
                      value: 'AREA|434647cc-0021-8203'
                    },
                    {
                      text: '长椿街西里',
                      value: 'AREA|4521f066-ba60-4edd'
                    },
                    {
                      text: '槐柏树街南里',
                      value: 'AREA|a18e51ad-85f9-833e'
                    }
                  ]
                },
                {
                  text: '陶然亭',
                  value: 'AREA|2d48d8ca-994d-89c0',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '中信沁园',
                      value: 'AREA|242afd43-9f89-0ad7'
                    },
                    {
                      text: '里仁东街',
                      value: 'AREA|d2398ba9-5f3f-6462'
                    },
                    {
                      text: '黑窑厂西里',
                      value: 'AREA|4f0debea-6bd2-0faa'
                    },
                    {
                      text: '黑窑厂东街',
                      value: 'AREA|35a7b008-b6fc-71b3'
                    },
                    {
                      text: '龙爪槐胡同9号院',
                      value: 'AREA|2edf9d35-261b-5724'
                    },
                    {
                      text: '红土店南里',
                      value: 'AREA|f550e3c0-db10-b2ef'
                    },
                    {
                      text: '太平街甲乙18号院',
                      value: 'AREA|987d05ca-98d3-8037'
                    },
                    {
                      text: '天桥北里',
                      value: 'AREA|7897626e-6c74-05e2'
                    },
                    {
                      text: '中信锦园',
                      value: 'AREA|22100b08-b515-687d'
                    },
                    {
                      text: '姚家井二巷',
                      value: 'AREA|876564b3-32b5-910e'
                    },
                    {
                      text: '四平园',
                      value: 'AREA|72dffcc7-a7b5-ef16'
                    },
                    {
                      text: '高家寨',
                      value: 'AREA|e95363a1-8d4e-ce92'
                    },
                    {
                      text: '双柳树四条',
                      value: 'AREA|2d6673a1-90fb-bf88'
                    },
                    {
                      text: '永铁苑',
                      value: 'AREA|a6a12834-f2c8-e97d'
                    }
                  ]
                },
                {
                  text: '宣武门',
                  value: 'AREA|c98e4f40-5b15-ba52',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '四合上院',
                      value: 'AREA|6b6533ea-41fd-1bda'
                    },
                    {
                      text: '椿树园',
                      value: 'AREA|d6e3e67c-e170-f809'
                    },
                    {
                      text: '庄胜二期',
                      value: 'AREA|42b370f3-f6a4-4012'
                    },
                    {
                      text: '宣武门外东大街',
                      value: 'AREA|bcb3260e-3ba8-d5b4'
                    },
                    {
                      text: '前门西大街',
                      value: 'AREA|eddbe36f-cf60-642d'
                    }
                  ]
                },
                {
                  text: '右安门内',
                  value: 'AREA|16d3fa7a-2b54-eb0b',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '育人里小区',
                      value: 'AREA|a14c1a14-0c66-4491'
                    },
                    {
                      text: '里仁街3号院',
                      value: 'AREA|b3038054-d601-3572'
                    },
                    {
                      text: '右安门内西街甲10号院',
                      value: 'AREA|552b68aa-3e19-efae'
                    },
                    {
                      text: '未来花园',
                      value: 'AREA|c436f43f-a3b1-a7df'
                    },
                    {
                      text: '清芷园',
                      value: 'AREA|beb7f059-4c04-43c4'
                    },
                    {
                      text: '信建里小区',
                      value: 'AREA|5f2e8838-2050-9e85'
                    }
                  ]
                },
                {
                  text: '西单',
                  value: 'AREA|7ff830e0-4271-989b',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '新壁街',
                      value: 'AREA|35a52d32-ea7f-fd17'
                    },
                    {
                      text: '复地西绒线26号',
                      value: 'AREA|5980b61d-431d-7a59'
                    },
                    {
                      text: '大六部口',
                      value: 'AREA|69a87943-ead8-d274'
                    }
                  ]
                },
                {
                  text: '马甸',
                  value: 'AREA|d3993def-ae28-0eab',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '裕中东里',
                      value: 'AREA|e6153d5c-786d-4d24'
                    },
                    {
                      text: '裕中西里',
                      value: 'AREA|4c4b5aa1-beb4-4292'
                    },
                    {
                      text: '双旗杆东里',
                      value: 'AREA|358d42c5-99d8-6850'
                    },
                    {
                      text: '月季园',
                      value: 'AREA|17b723a6-2d39-1545'
                    },
                    {
                      text: '新风南里',
                      value: 'AREA|e233bf37-328a-c058'
                    },
                    {
                      text: '京师吉地',
                      value: 'AREA|8dc19f99-a275-2ca1'
                    },
                    {
                      text: '北太平庄路2号院',
                      value: 'AREA|f348f279-6c0e-5a8e'
                    },
                    {
                      text: '新外大街6号院',
                      value: 'AREA|b913f9c8-9474-41ba'
                    }
                  ]
                },
                {
                  text: '西四',
                  value: 'AREA|ce9f0565-e672-afb2',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '航空胡同40号院',
                      value: 'AREA|9dca70e3-fabb-c349'
                    },
                    {
                      text: '大拐棒胡同',
                      value: 'AREA|84a3653e-8459-6ff1'
                    }
                  ]
                },
                {
                  text: '天宁寺',
                  value: 'AREA|beb33566-83f5-9908',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '广安门外南街',
                      value: 'AREA|5e8ac21b-218b-5653'
                    },
                    {
                      text: '车站东街15号院',
                      value: 'AREA|87584fd7-4aca-b35c'
                    },
                    {
                      text: '天宁寺西里',
                      value: 'AREA|6a1cf870-88d1-4a6e'
                    }
                  ]
                },
                {
                  text: '西直门',
                  value: 'AREA|0ad5cd0d-4f06-a5dc',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '玉桃园二区',
                      value: 'AREA|8c0f82ad-57e5-0071'
                    },
                    {
                      text: '长河湾',
                      value: 'AREA|feb52d58-30f1-18f1'
                    },
                    {
                      text: '北顺城街11号院',
                      value: 'AREA|6faecad5-420f-a8c2'
                    },
                    {
                      text: '德宝新园',
                      value: 'AREA|4e61e0bc-fa25-a2c0'
                    },
                    {
                      text: '远洋风景',
                      value: 'AREA|6bef4ac0-c298-bed6'
                    },
                    {
                      text: '钻河公馆',
                      value: 'AREA|53f66c3f-d6e4-8f39'
                    }
                  ]
                }
              ]
            },
            {
              text: '海淀',
              value: 'AREA|6524c161-1f81-d73c',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '苏州桥',
                  value: 'AREA|100a6429-88be-7459',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '海淀大街44号',
                      value: 'AREA|d79c75ea-74d0-b450'
                    },
                    {
                      text: '小南庄甲26号院',
                      value: 'AREA|f6fcf54a-809b-892b'
                    },
                    {
                      text: '三义庙北',
                      value: 'AREA|2d7bc7cf-128f-ab4d'
                    },
                    {
                      text: '小南庄社区',
                      value: 'AREA|345d586b-c549-f44d'
                    },
                    {
                      text: '立方庭',
                      value: 'AREA|64fe9fb6-6737-02d5'
                    },
                    {
                      text: '大河庄苑',
                      value: 'AREA|7b9c9ba6-2985-a733'
                    },
                    {
                      text: '紫金庄园',
                      value: 'AREA|a92a6b20-7813-311e'
                    },
                    {
                      text: '远中悦莱',
                      value: 'AREA|d25304b7-6965-7e77'
                    },
                    {
                      text: '中关村公馆',
                      value: 'AREA|feb7a339-a73c-a4f8'
                    }
                  ]
                },
                {
                  text: '五棵松',
                  value: 'AREA|de401dd0-362e-47a9',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '永定路东街5号院',
                      value: 'AREA|9da287ab-d687-2294'
                    },
                    {
                      text: '复兴路79号院',
                      value: 'AREA|573ca8eb-73ee-99f7'
                    },
                    {
                      text: '太平路40号院',
                      value: 'AREA|7102ba9d-2df4-2a71'
                    },
                    {
                      text: '百朗园',
                      value: 'AREA|3818e44b-b32c-3e25'
                    },
                    {
                      text: '泽丰苑二期',
                      value: 'AREA|a9ce173a-76b2-965a'
                    },
                    {
                      text: '金沟河2号院',
                      value: 'AREA|a1d4cbde-d0e5-d456'
                    },
                    {
                      text: '永定路85号院',
                      value: 'AREA|6d7070f0-207f-ada8'
                    },
                    {
                      text: '永定路西里',
                      value: 'AREA|5d061ee0-0693-100f'
                    },
                    {
                      text: '万地名苑',
                      value: 'AREA|503a5d4f-072a-e6a4'
                    },
                    {
                      text: '太平路34号院',
                      value: 'AREA|46cdd3df-6c50-576c'
                    },
                    {
                      text: '永定路西里小区',
                      value: 'AREA|73ea1332-729a-5075'
                    }
                  ]
                },
                {
                  text: '西北旺',
                  value: 'AREA|2f332f11-f18f-7829',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '中海枫涟山庄',
                      value: 'AREA|76c54706-1db1-c2d5'
                    },
                    {
                      text: '秋露园',
                      value: 'AREA|94e1721a-8302-6ae3'
                    },
                    {
                      text: '夏霖园',
                      value: 'AREA|0dfb93d2-8d3c-6182'
                    }
                  ]
                },
                {
                  text: '公主坟',
                  value: 'AREA|09b412a4-ca62-0e97',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '翠微北里',
                      value: 'AREA|32a91d59-f9f3-68fc'
                    },
                    {
                      text: '万方苑',
                      value: 'AREA|3aeccb6c-a97b-7dbe'
                    },
                    {
                      text: '颐源居小区',
                      value: 'AREA|2244d595-66a3-b36c'
                    },
                    {
                      text: '水利新宿舍',
                      value: 'AREA|73cfb814-9611-7fd8'
                    },
                    {
                      text: '国海广场',
                      value: 'AREA|873058ed-e193-3fda'
                    },
                    {
                      text: '翠微路17号院',
                      value: 'AREA|80e29532-b612-ea6a'
                    },
                    {
                      text: '羊坊店路3号院',
                      value: 'AREA|8b4f214e-aa5c-58ee'
                    },
                    {
                      text: '翠微中里',
                      value: 'AREA|907509f6-c894-2779'
                    },
                    {
                      text: '翠微南里',
                      value: 'AREA|5783f030-545e-c86e'
                    },
                    {
                      text: '翠微路2号院',
                      value: 'AREA|f7da9e29-f091-acd2'
                    },
                    {
                      text: '翠微路22号院',
                      value: 'AREA|43d8c397-7760-d7d9'
                    },
                    {
                      text: '柳林馆',
                      value: 'AREA|2c9c59de-b561-c9cb'
                    },
                    {
                      text: '普惠南里',
                      value: 'AREA|6d94abe3-50d4-e10a'
                    },
                    {
                      text: '万寿路乙15号院',
                      value: 'AREA|798ca81f-8b89-f20b'
                    }
                  ]
                },
                {
                  text: '五道口',
                  value: 'AREA|1c8434fb-751d-e048',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '华清嘉园',
                      value: 'AREA|dc79614b-45a6-1996'
                    },
                    {
                      text: '科源小区',
                      value: 'AREA|648916a8-77f3-e2fc'
                    },
                    {
                      text: '中关村北一条',
                      value: 'AREA|912c96f5-d53f-d2b0'
                    },
                    {
                      text: '展春园',
                      value: 'AREA|110be7fc-94ab-de52'
                    },
                    {
                      text: '东升园',
                      value: 'AREA|0908ee43-931d-dad2'
                    },
                    {
                      text: '东王庄',
                      value: 'AREA|754f5c9c-85d1-613a'
                    },
                    {
                      text: '燕归园',
                      value: 'AREA|286bb461-37a1-888b'
                    },
                    {
                      text: '成府路20号院',
                      value: 'AREA|99b99369-e030-d5c7'
                    }
                  ]
                },
                {
                  text: '甘家口',
                  value: 'AREA|d4b1a28b-7b7a-d570',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '车公庄西路16号院',
                      value: 'AREA|8c8c6dd6-8917-48cc'
                    },
                    {
                      text: '甘家口小区',
                      value: 'AREA|9de4a5b7-a8bb-7a7d'
                    },
                    {
                      text: '增光佳苑',
                      value: 'AREA|bae11d89-cdcd-4887'
                    },
                    {
                      text: '阜光里小区',
                      value: 'AREA|cd718cef-3c80-ed60'
                    },
                    {
                      text: '工商大学',
                      value: 'AREA|30ea46aa-d0c9-364f'
                    },
                    {
                      text: '劳动关系学院',
                      value: 'AREA|32399c3c-c7a6-ca68'
                    },
                    {
                      text: '中纺宿舍',
                      value: 'AREA|501127dd-26de-56a4'
                    },
                    {
                      text: '增光路40号院',
                      value: 'AREA|00b700c1-94a6-cc3d'
                    }
                  ]
                },
                {
                  text: '北太平庄',
                  value: 'AREA|37370c9f-f1d5-3c64',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '北影小区',
                      value: 'AREA|0074dc03-7350-aa28'
                    },
                    {
                      text: '庚坊国际',
                      value: 'AREA|aa1d6337-5842-913e'
                    },
                    {
                      text: '北太平庄路',
                      value: 'AREA|20cdb082-22a5-64fd'
                    },
                    {
                      text: '黄亭子小区',
                      value: 'AREA|9262680f-721c-9f0b'
                    }
                  ]
                },
                {
                  text: '世纪城',
                  value: 'AREA|d4a43473-e99a-c873',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '远大园四区',
                      value: 'AREA|12d72550-5fe7-1483'
                    },
                    {
                      text: '垂虹园',
                      value: 'AREA|86dc7731-9710-3be5'
                    },
                    {
                      text: '时雨园',
                      value: 'AREA|5b7c7288-0e93-d1c2'
                    },
                    {
                      text: '鲁艺上河村二区',
                      value: 'AREA|4f4fd9b7-dfdf-5a21'
                    },
                    {
                      text: '远大园六区',
                      value: 'AREA|58b3025d-23a4-264d'
                    },
                    {
                      text: '晴雪园',
                      value: 'AREA|84499646-6d83-2216'
                    },
                    {
                      text: '龙晖苑',
                      value: 'AREA|93b37cfb-412d-f7bc'
                    },
                    {
                      text: '世纪城龙禧苑',
                      value: 'AREA|2b6cbdbe-c591-afb1'
                    },
                    {
                      text: '世纪城龙泉苑西区',
                      value: 'AREA|25c89bc5-b6cf-dd86'
                    },
                    {
                      text: '睿力上城',
                      value: 'AREA|981c204c-a260-5dab'
                    },
                    {
                      text: '龙宇苑',
                      value: 'AREA|462f151c-4d23-87be'
                    },
                    {
                      text: '世纪城龙祺苑',
                      value: 'AREA|6057836f-fc0c-8f46'
                    },
                    {
                      text: '世纪城龙吉苑',
                      value: 'AREA|ce3c2fe7-c615-5472'
                    },
                    {
                      text: '世纪城龙嘉苑',
                      value: 'AREA|bdcb025e-31e7-bdb0'
                    },
                    {
                      text: '龙福苑',
                      value: 'AREA|06119201-76f1-1cd4'
                    },
                    {
                      text: '龙锦苑',
                      value: 'AREA|a54ec1f8-a5c0-27b4'
                    },
                    {
                      text: '明诚 · 景怡苑',
                      value: 'AREA|025179e9-a2e1-4fd2'
                    },
                    {
                      text: '龙佑苑',
                      value: 'AREA|432c2e89-d686-118f'
                    },
                    {
                      text: '龙慧苑',
                      value: 'AREA|3c958082-12fa-ec16'
                    },
                    {
                      text: '龙耀苑',
                      value: 'AREA|209b1443-2c5a-6914'
                    },
                    {
                      text: '世纪城龙泉苑东区',
                      value: 'AREA|e5deec79-c081-5ef5'
                    },
                    {
                      text: '龙慈苑',
                      value: 'AREA|ae9e16da-2615-2657'
                    },
                    {
                      text: '龙凯苑',
                      value: 'AREA|5a6f617c-87e2-0813'
                    },
                    {
                      text: '龙贤苑北区',
                      value: 'AREA|69de128c-e737-5823'
                    },
                    {
                      text: '龙贤苑',
                      value: 'AREA|37ec0142-2219-4363'
                    },
                    {
                      text: '龙盛苑',
                      value: 'AREA|84c533b9-182d-a8e4'
                    },
                    {
                      text: '龙城壹號',
                      value: 'AREA|287d0fcd-c783-c9b5'
                    },
                    {
                      text: '世纪城龙祥苑',
                      value: 'AREA|b8f06861-0b11-b91d'
                    },
                    {
                      text: '观山小区',
                      value: 'AREA|eb6391ad-6a2b-8489'
                    },
                    {
                      text: '龙城庄园',
                      value: 'AREA|ac2bf44c-ee9a-988a'
                    },
                    {
                      text: '龙兴苑',
                      value: 'AREA|01321232-f1ab-67b9'
                    },
                    {
                      text: '世纪城龙泽苑',
                      value: 'AREA|371a5983-bb11-85d9'
                    },
                    {
                      text: '世纪城龙昌苑',
                      value: 'AREA|d0b9220f-85bf-891f'
                    },
                    {
                      text: '世纪城惜春苑',
                      value: 'AREA|54ef9ad2-e818-2fd5'
                    },
                    {
                      text: '世纪城元春苑',
                      value: 'AREA|04627ca9-077b-b720'
                    },
                    {
                      text: '世纪城傲春苑',
                      value: 'AREA|401d1b85-37e8-03e1'
                    },
                    {
                      text: '世纪城茗春苑',
                      value: 'AREA|37cdfb3f-ab5e-f683'
                    },
                    {
                      text: '世纪城沁春苑',
                      value: 'AREA|b6c9f2aa-cbf4-36ae'
                    },
                    {
                      text: '世纪城叠春苑',
                      value: 'AREA|20bc7fca-6d24-2885'
                    },
                    {
                      text: '世纪城岚春苑',
                      value: 'AREA|412b81ec-1c5e-43db'
                    },
                    {
                      text: '世纪城雅春苑',
                      value: 'AREA|f0c1cfd9-9261-e8fe'
                    },
                    {
                      text: '12棵橡树庄园',
                      value: 'AREA|f92a08d3-caf2-eca3'
                    },
                    {
                      text: '樱花语幸福里',
                      value: 'AREA|358ab3a7-1554-4e06'
                    },
                    {
                      text: '世纪城玉春苑',
                      value: 'AREA|f1ea958e-ce69-4a2d'
                    },
                    {
                      text: '碧海秋月',
                      value: 'AREA|230a7621-7813-5d13'
                    },
                    {
                      text: '世纪金源国际商务中心',
                      value: 'AREA|6aa1c940-6a88-79a6'
                    },
                    {
                      text: '世纪城望春苑',
                      value: 'AREA|127a1936-9a41-063d'
                    },
                    {
                      text: '世纪城华春苑',
                      value: 'AREA|0ef973db-7890-4b44'
                    },
                    {
                      text: '樱花语阳光里',
                      value: 'AREA|3f165da5-1bf7-717a'
                    },
                    {
                      text: '银海畅园西区',
                      value: 'AREA|d4b001a2-02f0-e996'
                    }
                  ]
                },
                {
                  text: '定慧寺',
                  value: 'AREA|8966abdc-0709-ae71',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '定慧北里',
                      value: 'AREA|38a47fb3-4ff4-bdd4'
                    },
                    {
                      text: '西三环北路105号院',
                      value: 'AREA|3eba632c-8f22-8fea'
                    },
                    {
                      text: '八里庄北里',
                      value: 'AREA|a303d86e-8fca-a88f'
                    },
                    {
                      text: '中塔园',
                      value: 'AREA|40a1ed9a-8d2c-9d5d'
                    },
                    {
                      text: '核二院',
                      value: 'AREA|ddb5849e-df57-5598'
                    },
                    {
                      text: '亮甲店小区',
                      value: 'AREA|a175aa86-8e08-4c75'
                    },
                    {
                      text: '永安东里',
                      value: 'AREA|0d0ff4c2-4807-5b2a'
                    },
                    {
                      text: '定慧福里',
                      value: 'AREA|d99bdde2-2837-6dbe'
                    },
                    {
                      text: '西钓鱼台嘉园',
                      value: 'AREA|e89d1009-a482-ae1d'
                    },
                    {
                      text: '定慧东里',
                      value: 'AREA|8f293095-335e-69bf'
                    },
                    {
                      text: '阜成路95号院',
                      value: 'AREA|77fbc5cb-328e-8b48'
                    }
                  ]
                },
                {
                  text: '马连洼',
                  value: 'AREA|c91f9282-650d-f45e',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '百旺家苑',
                      value: 'AREA|4356f537-673e-e11a'
                    },
                    {
                      text: '兰园',
                      value: 'AREA|becee34c-4637-95e9'
                    }
                  ]
                },
                {
                  text: '紫竹桥',
                  value: 'AREA|d247076d-07f1-4e24',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '紫竹院南路4号院',
                      value: 'AREA|a1905834-1ae5-44ed'
                    },
                    {
                      text: '车道沟南里',
                      value: 'AREA|c5b4a8bf-7199-a773'
                    },
                    {
                      text: '昌运宫',
                      value: 'AREA|1dafed28-6da4-bf06'
                    },
                    {
                      text: '万景公寓',
                      value: 'AREA|a1a39130-bb39-047b'
                    },
                    {
                      text: '财智公馆',
                      value: 'AREA|c7b58812-c678-5a8c'
                    },
                    {
                      text: '车道沟10号院',
                      value: 'AREA|6e8c60c0-138a-07ce'
                    },
                    {
                      text: '中海雅园',
                      value: 'AREA|1e7520bc-a34f-9d14'
                    },
                    {
                      text: '七贤村',
                      value: 'AREA|06e93cd6-1c69-4e52'
                    },
                    {
                      text: '紫竹院路62号院',
                      value: 'AREA|c7f0e50d-35c9-4897'
                    },
                    {
                      text: '紫竹院南路14号院',
                      value: 'AREA|e9e47b01-61d0-b1dc'
                    },
                    {
                      text: '10号名邸',
                      value: 'AREA|d3ff1824-a5b3-f49b'
                    },
                    {
                      text: '北洼西里',
                      value: 'AREA|0994e284-0690-e534'
                    }
                  ]
                },
                {
                  text: '知春路',
                  value: 'AREA|95e07ceb-3fa8-6adf',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '太月园',
                      value: 'AREA|2fd3d807-fe36-154d'
                    },
                    {
                      text: '蓟门北里',
                      value: 'AREA|3e4bfd54-4b13-b206'
                    },
                    {
                      text: '蓟门南里',
                      value: 'AREA|a7f5a9c8-9e0a-1e80'
                    },
                    {
                      text: '太阳园',
                      value: 'AREA|1935ff25-afd0-f2f3'
                    },
                    {
                      text: '知春路52号院',
                      value: 'AREA|269cec89-436b-aa39'
                    },
                    {
                      text: '首体家属院',
                      value: 'AREA|5c2f758b-5052-1270'
                    },
                    {
                      text: '罗庄西里',
                      value: 'AREA|538db7da-91b9-539e'
                    }
                  ]
                },
                {
                  text: '军博',
                  value: 'AREA|78bc8a75-44b7-47af',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '乔建里',
                      value: 'AREA|dbec579f-1870-9d53'
                    },
                    {
                      text: '电信小区',
                      value: 'AREA|c1a5ce44-b242-9311'
                    },
                    {
                      text: '北蜂窝中路甲8号院',
                      value: 'AREA|620b210c-bf68-4cd5'
                    },
                    {
                      text: '茂林居',
                      value: 'AREA|37d24b31-bf6e-274d'
                    },
                    {
                      text: '铁东小区',
                      value: 'AREA|7b250d83-cc78-8fb5'
                    },
                    {
                      text: '北蜂窝路5号院',
                      value: 'AREA|92cdd7e0-a275-df0b'
                    }
                  ]
                },
                {
                  text: '西三旗',
                  value: 'AREA|32eee3d1-ffb7-e281',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '育新花园',
                      value: 'AREA|b65924c4-11ff-d680'
                    },
                    {
                      text: '建材城西二里',
                      value: 'AREA|863620bf-6834-d20b'
                    },
                    {
                      text: '旗胜家园',
                      value: 'AREA|dbabde73-5936-4125'
                    }
                  ]
                },
                {
                  text: '中关村',
                  value: 'AREA|175ebc67-28b3-e386',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '科育小区',
                      value: 'AREA|1db2792b-5300-391d'
                    },
                    {
                      text: '科熙小区',
                      value: 'AREA|927707b8-67e8-127b'
                    },
                    {
                      text: '大泥湾',
                      value: 'AREA|bad8d9f7-50cd-e3d3'
                    }
                  ]
                },
                {
                  text: '清河',
                  value: 'AREA|b110f043-15f9-baff',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '永泰庄甲6号院',
                      value: 'AREA|90b75c8e-afeb-6c13'
                    },
                    {
                      text: '中央财经大学家属楼',
                      value: 'AREA|f393ab55-8cd8-e920'
                    },
                    {
                      text: '世华龙樾',
                      value: 'AREA|765431c8-dfab-ef03'
                    },
                    {
                      text: '莱圳家园',
                      value: 'AREA|e61124a1-76ce-59c5'
                    },
                    {
                      text: '怡清园',
                      value: 'AREA|763bc456-eaee-ec08'
                    },
                    {
                      text: '清润家园',
                      value: 'AREA|0a837876-6c2a-3269'
                    },
                    {
                      text: '永泰园',
                      value: 'AREA|71dfcfc1-e9cc-92a1'
                    },
                    {
                      text: '强佑清河新城',
                      value: 'AREA|d26eee0d-0da9-aa0e'
                    }
                  ]
                },
                {
                  text: '二里庄',
                  value: 'AREA|a0952445-4602-6e15',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '二里庄小区',
                      value: 'AREA|7b164c2b-3e41-5bef'
                    },
                    {
                      text: '志新村',
                      value: 'AREA|d4d27d4b-4d66-0415'
                    }
                  ]
                },
                {
                  text: '西二旗',
                  value: 'AREA|0b8d6370-9e66-af56',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '领秀新硅谷1号院',
                      value: 'AREA|b019cc52-61ab-c7f9'
                    },
                    {
                      text: '铭科苑',
                      value: 'AREA|bbfa90fc-d11e-fd2b'
                    },
                    {
                      text: '燕尚园',
                      value: 'AREA|f00e2d97-73cb-1cfe'
                    }
                  ]
                },
                {
                  text: '双榆树',
                  value: 'AREA|398d88fe-774f-8b7e',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '都市网景',
                      value: 'AREA|16ffe543-3156-619e'
                    },
                    {
                      text: '知春东里',
                      value: 'AREA|fd8537ab-7f26-4139'
                    },
                    {
                      text: '满庭芳园',
                      value: 'AREA|ddba3df7-e65e-721d'
                    },
                    {
                      text: '知春里',
                      value: 'AREA|acf408c5-b17e-7e4c'
                    },
                    {
                      text: '中关村东路',
                      value: 'AREA|486bb556-b244-7efc'
                    },
                    {
                      text: '双榆树东里',
                      value: 'AREA|8e1fa16b-7165-2a3c'
                    },
                    {
                      text: '豪景佳苑',
                      value: 'AREA|bd143689-1f23-9cdc'
                    }
                  ]
                },
                {
                  text: '四季青',
                  value: 'AREA|6c3c69cc-a8af-6517',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '曙光花园',
                      value: 'AREA|ae619fec-130e-6f13'
                    },
                    {
                      text: '农林科学院宿舍',
                      value: 'AREA|2aa2259b-a2bb-76cb'
                    },
                    {
                      text: '望河园',
                      value: 'AREA|5e2b0e2b-e9aa-cff6'
                    },
                    {
                      text: '夕照新村',
                      value: 'AREA|b9526b71-7386-085d'
                    },
                    {
                      text: '静安花苑',
                      value: 'AREA|9aacee62-9732-95be'
                    },
                    {
                      text: '莫邪塘东村',
                      value: 'AREA|af8c8e24-69ff-1fdb'
                    },
                    {
                      text: '甘王新村',
                      value: 'AREA|530cd923-e949-9231'
                    },
                    {
                      text: '近江新村',
                      value: 'AREA|2c90db0f-130c-3ef6'
                    }
                  ]
                },
                {
                  text: '万柳',
                  value: 'AREA|113f6a4b-6278-73ae',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '锋尚国际',
                      value: 'AREA|62014e1c-0fae-e84f'
                    },
                    {
                      text: '汇新家园',
                      value: 'AREA|c24f546c-9c2d-85d1'
                    }
                  ]
                },
                {
                  text: '田村',
                  value: 'AREA|c21163b5-354b-bbcd',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '乐府江南',
                      value: 'AREA|c84ce34f-5c60-6f93'
                    },
                    {
                      text: '半壁店六建宿舍',
                      value: 'AREA|957a06c6-9c9b-d728'
                    },
                    {
                      text: '田村40号院',
                      value: 'AREA|21de61e4-54b7-300a'
                    },
                    {
                      text: '王致和腐乳厂宿舍',
                      value: 'AREA|f76e199f-8ae8-a24d'
                    },
                    {
                      text: '永定路1号院',
                      value: 'AREA|bf5ea503-a5c9-f9f5'
                    }
                  ]
                },
                {
                  text: '学院路',
                  value: 'AREA|d1b5fe17-a8b5-fdd3',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '城华园',
                      value: 'AREA|3d4ec21a-742c-af9a'
                    },
                    {
                      text: '文成杰座',
                      value: 'AREA|870bfac6-58cb-d7bc'
                    },
                    {
                      text: '北京林业大学校内',
                      value: 'AREA|9be56ed4-a6c2-b84e'
                    },
                    {
                      text: '清华东路27号院',
                      value: 'AREA|36021797-864a-a357'
                    },
                    {
                      text: '静淑东里',
                      value: 'AREA|c6466381-4ca7-1d4f'
                    },
                    {
                      text: '华丽大厦',
                      value: 'AREA|13f94e74-dfc1-00da'
                    }
                  ]
                },
                {
                  text: '颐和园',
                  value: 'AREA|8bfffa01-9f7a-a60a',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '邮局宿舍',
                      value: 'AREA|22b5821d-4762-9ebb'
                    }
                  ]
                },
                {
                  text: '海淀北部新区',
                  value: 'AREA|a5c37eb0-f86a-6df9',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '北分厂',
                      value: 'AREA|2d4dce1f-4e8a-53a7'
                    }
                  ]
                },
                {
                  text: '万寿路',
                  value: 'AREA|fa343f16-8d19-2ad5',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '万寿路西街11号院',
                      value: 'AREA|e034cbfd-3af0-e6e8'
                    },
                    {
                      text: '万寿路甲6号院',
                      value: 'AREA|151cf64b-901b-621b'
                    },
                    {
                      text: '西翠路12号院',
                      value: 'AREA|79908c50-31eb-9d16'
                    },
                    {
                      text: '复兴路61号院',
                      value: 'AREA|b7b15a4e-a9fe-180b'
                    }
                  ]
                },
                {
                  text: '小西天',
                  value: 'AREA|c1b4936c-30b7-c598',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '文慧园路甲3号',
                      value: 'AREA|ca8e67d8-8048-e379'
                    },
                    {
                      text: '志强园',
                      value: 'AREA|ffa8db25-e0b5-5395'
                    },
                    {
                      text: '新外大街21号院',
                      value: 'AREA|ada39b01-820c-f912'
                    }
                  ]
                },
                {
                  text: '白石桥',
                  value: 'AREA|ef2eab22-0549-217a',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '大柳树3号院',
                      value: 'AREA|5699dd16-4232-b0d4'
                    }
                  ]
                },
                {
                  text: '皂君庙',
                  value: 'AREA|2f014569-9066-63c8',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '皂君东里',
                      value: 'AREA|f65861a4-2484-5811'
                    },
                    {
                      text: '文林大厦',
                      value: 'AREA|4d8f9d49-42d2-1ab0'
                    }
                  ]
                },
                {
                  text: '魏公村',
                  value: 'AREA|c964ea0d-515a-a694',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '韦伯时代中心',
                      value: 'AREA|5e7e22c7-63aa-4120'
                    },
                    {
                      text: '韦伯豪家园',
                      value: 'AREA|c836c922-1278-95ee'
                    }
                  ]
                },
                {
                  text: '厂洼',
                  value: 'AREA|a9414de8-77a5-61bb',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '厂洼西街1号院',
                      value: 'AREA|63d20eed-4229-e588'
                    }
                  ]
                }
              ]
            },
            {
              text: '昌平',
              value: 'AREA|6cf8e88f-1e1f-e395',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '西关环岛',
                  value: 'AREA|48e5738f-97f0-3cb0',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '蓝郡国际花园',
                      value: 'AREA|1484c6c3-8503-cc36'
                    }
                  ]
                },
                {
                  text: '回龙观',
                  value: 'AREA|0c8e2bd8-eb9b-3ff5',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '龙泽苑东区',
                      value: 'AREA|a6c74d33-2b84-eeae'
                    },
                    {
                      text: '新龙城',
                      value: 'AREA|64d8b57c-d611-06cf'
                    },
                    {
                      text: '慧华苑',
                      value: 'AREA|aa31e749-b6e0-df0c'
                    },
                    {
                      text: '首开国风美唐二期',
                      value: 'AREA|92ecb794-2e33-67c6'
                    },
                    {
                      text: '矩阵三期',
                      value: 'AREA|fcb8593f-292d-19b3'
                    },
                    {
                      text: '万龙社区',
                      value: 'AREA|8c87ff16-5f05-9e0b'
                    },
                    {
                      text: '领秀慧谷A区',
                      value: 'AREA|9efb160a-95d3-2143'
                    },
                    {
                      text: '流星花园三区',
                      value: 'AREA|1fdf8544-3acb-82ea'
                    },
                    {
                      text: '京投发展公园悦府',
                      value: 'AREA|87048523-d287-e62a'
                    },
                    {
                      text: '龙锦苑四区',
                      value: 'AREA|2af5406c-d45c-1a89'
                    },
                    {
                      text: '龙锦苑五区',
                      value: 'AREA|0932fb9e-c3a0-b1a1'
                    },
                    {
                      text: '首开智慧社',
                      value: 'AREA|0f2c88bd-2bc9-6ae9'
                    },
                    {
                      text: '领秀慧谷B区',
                      value: 'AREA|8a7b9ea9-209e-fc1e'
                    },
                    {
                      text: '龙城花园北二区',
                      value: 'AREA|592783e5-fd23-a6c3'
                    }
                  ]
                },
                {
                  text: '立水桥',
                  value: 'AREA|988e93c5-25cb-998a',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '顶秀青溪',
                      value: 'AREA|3f64c741-06e8-865a'
                    },
                    {
                      text: '北方明珠',
                      value: 'AREA|41f4607d-df33-98c7'
                    }
                  ]
                },
                {
                  text: '霍营',
                  value: 'AREA|ae1803c3-e40c-650d',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '华龙苑南里',
                      value: 'AREA|c3dfee19-1d67-778c'
                    },
                    {
                      text: '天鑫家园',
                      value: 'AREA|6aed9faf-b7d3-ec62'
                    },
                    {
                      text: '龙锦苑东三区',
                      value: 'AREA|bac58109-8f0b-5dc2'
                    }
                  ]
                },
                {
                  text: '鼓楼大街',
                  value: 'AREA|26e60db0-185e-6aab',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '北环里小区',
                      value: 'AREA|1747cc0b-5ecd-583b'
                    },
                    {
                      text: '和平街东里',
                      value: 'AREA|2e096b07-f9aa-a41d'
                    },
                    {
                      text: '新悦家园',
                      value: 'AREA|626e3468-1cf3-3e53'
                    },
                    {
                      text: '金隅万科城悦嘉公寓',
                      value: 'AREA|d9989edd-80a3-13eb'
                    }
                  ]
                },
                {
                  text: '东关',
                  value: 'AREA|cc684f42-805f-e759',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '清秀园北区',
                      value: 'AREA|47c75162-445a-3698'
                    },
                    {
                      text: '水关新村',
                      value: 'AREA|fa722b43-ea09-ee62'
                    }
                  ]
                },
                {
                  text: '天通苑',
                  value: 'AREA|506cdde5-0529-18e8',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '天通苑北一区',
                      value: 'AREA|4559c1e8-0c5f-c397'
                    }
                  ]
                },
                {
                  text: '北七家',
                  value: 'AREA|895f3878-b791-934f',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '美树假日嘉园',
                      value: 'AREA|98a0096d-0e1a-9e3b'
                    },
                    {
                      text: '名流花园',
                      value: 'AREA|8fbbe5f0-675a-2bb2'
                    }
                  ]
                }
              ]
            },
            {
              text: '通州',
              value: 'AREA|c3ec1269-459e-491c',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '果园',
                  value: 'AREA|58272a15-8b83-4f9b',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '新华联家园南区',
                      value: 'AREA|bffc90e1-6549-bc92'
                    },
                    {
                      text: '北机家属院',
                      value: 'AREA|94bd751e-06ef-ab9b'
                    },
                    {
                      text: '苏荷时代',
                      value: 'AREA|0a7fab66-3822-6279'
                    },
                    {
                      text: '葛布店东里',
                      value: 'AREA|dd500ff7-df10-627d'
                    },
                    {
                      text: '果园西小区',
                      value: 'AREA|e5314fc9-aa5f-5444'
                    },
                    {
                      text: '新华联家园北区',
                      value: 'AREA|bc5aa170-dfa0-bb65'
                    },
                    {
                      text: '运河西大街8号院',
                      value: 'AREA|f5987097-7527-00bc'
                    },
                    {
                      text: '葵花社',
                      value: 'AREA|bb7401d1-4735-8ee3'
                    },
                    {
                      text: '达富苑',
                      value: 'AREA|5c579d2c-07dc-3f3d'
                    },
                    {
                      text: '巴克寓所',
                      value: 'AREA|e646eeae-9e60-3e01'
                    },
                    {
                      text: '翠屏北里西区',
                      value: 'AREA|8f23434f-07fe-e51a'
                    },
                    {
                      text: '雅丽世居',
                      value: 'AREA|aaf1eb87-4945-aa61'
                    }
                  ]
                },
                {
                  text: '九棵树(家乐福)',
                  value: 'AREA|64f93451-0846-db9c',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '龙湖蔚澜香醍',
                      value: 'AREA|d1728d11-f52a-e0b7'
                    },
                    {
                      text: '瑞都国际南区',
                      value: 'AREA|08dbbd4b-2323-9826'
                    },
                    {
                      text: '瑞都国际北区',
                      value: 'AREA|f75dc11b-e020-3062'
                    },
                    {
                      text: '蓝调沙龙东区',
                      value: 'AREA|784386f6-356e-11f9'
                    },
                    {
                      text: '靓景明居',
                      value: 'AREA|eba79819-a124-8800'
                    },
                    {
                      text: '蓝调沙龙西区',
                      value: 'AREA|c9fbca4e-36b2-d605'
                    },
                    {
                      text: 'K2玉蘭湾',
                      value: 'AREA|5c234a2d-ebbf-f583'
                    },
                    {
                      text: '怡乐北街',
                      value: 'AREA|a41c95a3-b0a3-ebda'
                    }
                  ]
                },
                {
                  text: '临河里',
                  value: 'AREA|77052ca3-bfc2-6199',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '方恒东景',
                      value: 'AREA|bb7f4bd9-71ab-851b'
                    },
                    {
                      text: 'DBC加州小镇',
                      value: 'AREA|0d736733-6c31-a61c'
                    },
                    {
                      text: '华业东方玫瑰B区',
                      value: 'AREA|ee69a3eb-ed9d-c14f'
                    },
                    {
                      text: '华业东方玫瑰D区',
                      value: 'AREA|3477dfca-6f6f-7866'
                    },
                    {
                      text: '海棠湾三期',
                      value: 'AREA|bbc43811-ae70-24eb'
                    },
                    {
                      text: '海棠湾一期',
                      value: 'AREA|a6226def-a4dc-fd87'
                    }
                  ]
                },
                {
                  text: '新华大街',
                  value: 'AREA|a11a0b75-eef5-0b81',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '万方家园',
                      value: 'AREA|aa154d83-b2f6-0cd3'
                    },
                    {
                      text: '旅游新村',
                      value: 'AREA|d2970778-d5fe-5067'
                    },
                    {
                      text: '鼎晟国际',
                      value: 'AREA|6e165640-0e7d-e799'
                    },
                    {
                      text: '逸秀名园',
                      value: 'AREA|8f19003b-ecd0-365d'
                    },
                    {
                      text: '后南仓',
                      value: 'AREA|0c373ce8-7e7d-1604'
                    },
                    {
                      text: '通州区第二毛线厂宿舍',
                      value: 'AREA|3cd08653-5ed7-1bc9'
                    },
                    {
                      text: '如意园',
                      value: 'AREA|cf7d88da-4951-c5de'
                    }
                  ]
                },
                {
                  text: '通州北苑',
                  value: 'AREA|96d56428-6d94-0889',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '杨庄22号院',
                      value: 'AREA|28de274e-3854-fbfb'
                    },
                    {
                      text: '北苑135号院',
                      value: 'AREA|58efc985-849f-54e5'
                    },
                    {
                      text: '杨庄北街7号院',
                      value: 'AREA|8772a8ee-c3e5-a7cd'
                    },
                    {
                      text: '长城国际',
                      value: 'AREA|0b281fd0-773a-028b'
                    },
                    {
                      text: '杨庄北街3号院',
                      value: 'AREA|4c031024-5847-6b56'
                    },
                    {
                      text: '京贸国际公寓',
                      value: 'AREA|28aab7bc-8110-1a36'
                    },
                    {
                      text: '西马庄园',
                      value: 'AREA|0dd95660-7fd1-29d2'
                    },
                    {
                      text: '天时名苑',
                      value: 'AREA|33f86466-6c02-be20'
                    },
                    {
                      text: 'M5朗峰',
                      value: 'AREA|bed4093e-a080-c3e3'
                    },
                    {
                      text: '华兴园',
                      value: 'AREA|1236ca91-2bd0-eafb'
                    }
                  ]
                },
                {
                  text: '梨园',
                  value: 'AREA|e26b1a05-3519-5231',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '梨花园',
                      value: 'AREA|be2c099e-ca49-96dd'
                    },
                    {
                      text: '新通国际花园',
                      value: 'AREA|ab3bffe1-a306-fb7d'
                    },
                    {
                      text: '云景西里南区',
                      value: 'AREA|2c80ceff-9364-e9c9'
                    },
                    {
                      text: '时尚街区西区',
                      value: 'AREA|d0c87c9c-e792-6025'
                    },
                    {
                      text: '时尚街区东区',
                      value: 'AREA|bc43fa9c-8db3-3e5b'
                    },
                    {
                      text: '11站',
                      value: 'AREA|7c1b00c7-ce68-1b33'
                    },
                    {
                      text: '梨园小镇',
                      value: 'AREA|f8e215ff-9e08-5597'
                    }
                  ]
                },
                {
                  text: '乔庄',
                  value: 'AREA|083f2811-0299-a031',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '荞馨园',
                      value: 'AREA|f4a7132c-b2ff-7802'
                    },
                    {
                      text: '运乔嘉园',
                      value: 'AREA|e68b7fda-fb22-5e50'
                    }
                  ]
                },
                {
                  text: '北关',
                  value: 'AREA|069b07d2-af5c-d8da',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '天赐良园东三期',
                      value: 'AREA|27109fd3-cffe-3dfb'
                    },
                    {
                      text: '8哩岛',
                      value: 'AREA|8a1ca153-13e3-69c0'
                    },
                    {
                      text: '天赐良园二期半',
                      value: 'AREA|f1328f57-9364-48f4'
                    },
                    {
                      text: '天赐良园西三期',
                      value: 'AREA|e68c1f9d-29b5-4bea'
                    },
                    {
                      text: '天赐良园二期',
                      value: 'AREA|5f3869d7-02e8-1dee'
                    },
                    {
                      text: '馨通家园',
                      value: 'AREA|cd345957-abae-c114'
                    }
                  ]
                },
                {
                  text: '通州其它',
                  value: 'AREA|06b08db2-87d1-04a6',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '润枫领尚',
                      value: 'AREA|c537cad4-2eee-5cea'
                    }
                  ]
                },
                {
                  text: '玉桥',
                  value: 'AREA|ba2d0b63-0a2e-2c4a',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '合生滨江帝景',
                      value: 'AREA|b570fc60-b42d-c917'
                    },
                    {
                      text: '格兰晴天',
                      value: 'AREA|f5867692-0571-5ed1'
                    },
                    {
                      text: '玉桥南里',
                      value: 'AREA|e7a8fe63-7353-3f25'
                    }
                  ]
                },
                {
                  text: '潞苑',
                  value: 'AREA|24a272a5-bd13-9b45',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '新潮嘉园三期',
                      value: 'AREA|f326c93f-5f17-67d4'
                    },
                    {
                      text: '中建雅颂居',
                      value: 'AREA|90926ac5-4477-962e'
                    }
                  ]
                }
              ]
            },
            {
              text: '石景山',
              value: 'AREA|7253a8eb-dea5-a522',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '鲁谷',
                  value: 'AREA|6fb545d8-27e5-a076',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '远洋山水',
                      value: 'AREA|0c051f58-6d66-dd70'
                    },
                    {
                      text: '永乐东区',
                      value: 'AREA|716b9df9-4e37-f738'
                    },
                    {
                      text: '玉泉路65号院',
                      value: 'AREA|fdcef367-163a-bccd'
                    },
                    {
                      text: '永乐西区',
                      value: 'AREA|699c45c1-2743-34bd'
                    },
                    {
                      text: '远洋沁山水',
                      value: 'AREA|b83513a7-fa25-1f36'
                    },
                    {
                      text: '七星园',
                      value: 'AREA|a5153079-3df5-22f0'
                    },
                    {
                      text: '鲁谷74号院',
                      value: 'AREA|6dd7477b-0887-c250'
                    },
                    {
                      text: '五芳园',
                      value: 'AREA|c0baa3fa-3b55-e775'
                    }
                  ]
                },
                {
                  text: '老山',
                  value: 'AREA|b86fcaef-100a-bfaa',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '老山西里',
                      value: 'AREA|3dfa54a0-aa7c-3075'
                    },
                    {
                      text: '老山一号院',
                      value: 'AREA|977455af-5e2d-c0e1'
                    }
                  ]
                },
                {
                  text: '苹果园',
                  value: 'AREA|0ffaba1f-041f-86c1',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '雍景天成',
                      value: 'AREA|64ed4e26-6d5c-006a'
                    },
                    {
                      text: '赵山',
                      value: 'AREA|d6010435-8b92-fe4a'
                    },
                    {
                      text: '苹果园小区一区',
                      value: 'AREA|252d099f-c1aa-fa67'
                    },
                    {
                      text: '金顶街三区',
                      value: 'AREA|2d0834ae-f689-2d51'
                    },
                    {
                      text: '西井小区一区',
                      value: 'AREA|5794efc0-1ae6-77cd'
                    },
                    {
                      text: '赵山供电局宿舍',
                      value: 'AREA|1ea512ba-e638-83f3'
                    },
                    {
                      text: '雍景双庐',
                      value: 'AREA|3fae5c86-822a-aebc'
                    },
                    {
                      text: '雍景四季',
                      value: 'AREA|211e76e1-c15d-27d6'
                    }
                  ]
                },
                {
                  text: '古城',
                  value: 'AREA|f37eb157-3184-120a',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '曦景长安',
                      value: 'AREA|ef29859e-7824-bd8c'
                    }
                  ]
                },
                {
                  text: '杨庄',
                  value: 'AREA|d1a5b02f-85da-8adf',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '西现代城',
                      value: 'AREA|b1a58b5a-d923-d733'
                    },
                    {
                      text: '华信大厦宿舍',
                      value: 'AREA|cdae774a-5bcb-4dc0'
                    },
                    {
                      text: '杨庄北区',
                      value: 'AREA|688e43f7-1467-a070'
                    },
                    {
                      text: '杨庄小区',
                      value: 'AREA|1d676b54-5ec7-3f42'
                    }
                  ]
                },
                {
                  text: '八角',
                  value: 'AREA|ff9e41ec-4485-029f',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '西引力',
                      value: 'AREA|af30e3c6-1016-1d27'
                    },
                    {
                      text: '八角北里',
                      value: 'AREA|59812b66-24be-97d0'
                    }
                  ]
                }
              ]
            },
            {
              text: '顺义',
              value: 'AREA|509dc430-5a85-1a1a',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '顺义城',
                  value: 'AREA|9c14aead-bfd7-7b66',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '建新南区',
                      value: 'AREA|829640a5-eec9-377e'
                    },
                    {
                      text: '前进花园玉兰苑',
                      value: 'AREA|ba056e46-d747-09f5'
                    },
                    {
                      text: '西辛南区',
                      value: 'AREA|f83cad94-6aca-cc8c'
                    },
                    {
                      text: '义宾北区',
                      value: 'AREA|df322e7a-0e82-50ef'
                    },
                    {
                      text: '建新北区',
                      value: 'AREA|1a175123-0680-9e45'
                    },
                    {
                      text: '义宾南区',
                      value: 'AREA|c7bc345a-1831-f23e'
                    },
                    {
                      text: '幸福东区',
                      value: 'AREA|6de9d33b-6dcc-8a4e'
                    },
                    {
                      text: '双兴东区',
                      value: 'AREA|651b391d-4aae-fb65'
                    },
                    {
                      text: '前进花园石门苑',
                      value: 'AREA|e3e56bec-9262-ab04'
                    },
                    {
                      text: '东兴二区',
                      value: 'AREA|e66abc06-db24-4f18'
                    },
                    {
                      text: '东兴一区',
                      value: 'AREA|00dc578f-f8de-5702'
                    },
                    {
                      text: '金汉绿港四区',
                      value: 'AREA|b04de9ba-750b-2ffb'
                    },
                    {
                      text: '金汉绿港五区',
                      value: 'AREA|d7299c86-90f1-3a10'
                    },
                    {
                      text: '双兴南区',
                      value: 'AREA|c6ebc41e-2ee6-1e17'
                    },
                    {
                      text: '石园北区',
                      value: 'AREA|6250a307-9471-9ccd'
                    }
                  ]
                },
                {
                  text: '后沙峪',
                  value: 'AREA|3a559c3f-f92c-b5f5',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '蓝星花园',
                      value: 'AREA|a7fe9806-a276-906c'
                    },
                    {
                      text: '江山赋',
                      value: 'AREA|ac22093f-3339-11b7'
                    },
                    {
                      text: '空港吉祥花园',
                      value: 'AREA|107a7c5a-8b7e-4b19'
                    },
                    {
                      text: '双裕花园西区',
                      value: 'AREA|b51990ba-b98d-7891'
                    },
                    {
                      text: '双裕花园东区',
                      value: 'AREA|14437be9-5057-4dc2'
                    }
                  ]
                },
                {
                  text: '顺义其它',
                  value: 'AREA|443646c9-f12b-de26',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '华英园',
                      value: 'AREA|668931d6-4f7d-e8b9'
                    }
                  ]
                },
                {
                  text: '李桥',
                  value: 'AREA|943a9032-32c9-aebc',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '樱花园一区',
                      value: 'AREA|6886ce39-44f8-5345'
                    },
                    {
                      text: '樱花园三区',
                      value: 'AREA|bcfc111e-cd85-1ff5'
                    }
                  ]
                },
                {
                  text: '马坡',
                  value: 'AREA|7e504d2e-58aa-a5e6',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '佳和宜园',
                      value: 'AREA|3086f8d8-e4c0-cee5'
                    },
                    {
                      text: '香悦四季',
                      value: 'AREA|b45fef3c-3cad-8d88'
                    }
                  ]
                }
              ]
            },
            {
              text: '大兴',
              value: 'AREA|d4d85a7b-712f-fd9d',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '枣园',
                  value: 'AREA|fc78d989-bc5b-5f6e',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '滨河西里',
                      value: 'AREA|5b606f53-33da-fc10'
                    },
                    {
                      text: '彩虹新城',
                      value: 'AREA|847b02f5-55e0-80fd'
                    },
                    {
                      text: '红木林',
                      value: 'AREA|b505eb02-7907-e543'
                    },
                    {
                      text: '兴华园',
                      value: 'AREA|b0123923-7690-683f'
                    },
                    {
                      text: '清源西里',
                      value: 'AREA|d1b66290-cf18-c515'
                    },
                    {
                      text: '滨河西里北区',
                      value: 'AREA|4fce4b6d-5aee-b00d'
                    },
                    {
                      text: '枣园小区',
                      value: 'AREA|264283ae-7176-c12f'
                    },
                    {
                      text: '枣园尚城',
                      value: 'AREA|35d160b5-f5ab-7318'
                    },
                    {
                      text: '清源东里',
                      value: 'AREA|4d9a6554-8aa0-c126'
                    },
                    {
                      text: '首邑上城',
                      value: 'AREA|2e519127-048d-cac0'
                    },
                    {
                      text: '首开康乃馨城',
                      value: 'AREA|0ae2ba40-8958-a43d'
                    },
                    {
                      text: '滨河东里',
                      value: 'AREA|bcfd7ecc-ca6b-dda1'
                    },
                    {
                      text: '丽园B区',
                      value: 'AREA|b3bd6f67-0950-4400'
                    },
                    {
                      text: '枣园北里',
                      value: 'AREA|31712cbf-cee9-23a0'
                    }
                  ]
                },
                {
                  text: '黄村火车站',
                  value: 'AREA|c12c1f07-72d5-dfe9',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '车站北里',
                      value: 'AREA|275b8b3e-f2d2-8367'
                    },
                    {
                      text: '林校北里',
                      value: 'AREA|79cc427e-ef31-6ae4'
                    },
                    {
                      text: '车站中里',
                      value: 'AREA|f31eab35-887f-11d8'
                    }
                  ]
                },
                {
                  text: '西红门',
                  value: 'AREA|8fef41f1-ed21-2845',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '世嘉博苑',
                      value: 'AREA|8213dc9b-a57d-a430'
                    },
                    {
                      text: '瑞海家园三区',
                      value: 'AREA|a365edd7-b6d0-878f'
                    },
                    {
                      text: '宏大中园',
                      value: 'AREA|d48b7676-4452-f9ba'
                    },
                    {
                      text: '兴海家园星苑',
                      value: 'AREA|30cb97a6-5734-1857'
                    },
                    {
                      text: '兴海家园月苑',
                      value: 'AREA|0f57d569-2a33-c585'
                    },
                    {
                      text: '同兴园',
                      value: 'AREA|443c0b88-9e4d-c615'
                    }
                  ]
                },
                {
                  text: '黄村中',
                  value: 'AREA|6396951b-4d58-75b0',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '清澄名苑北区',
                      value: 'AREA|31c4f212-153c-6696'
                    },
                    {
                      text: '富强西里',
                      value: 'AREA|0b8f3989-8b93-05e9'
                    },
                    {
                      text: '清澄名苑南区',
                      value: 'AREA|335b0687-5a04-9c90'
                    },
                    {
                      text: '黄村西里',
                      value: 'AREA|2edeceae-ef2e-2f65'
                    },
                    {
                      text: '时代龙和',
                      value: 'AREA|b5ceb7e5-782e-daf3'
                    },
                    {
                      text: '永华北里',
                      value: 'AREA|6cec4fbf-62e1-8289'
                    },
                    {
                      text: '兴政东里',
                      value: 'AREA|7934ca7d-c20b-90ee'
                    },
                    {
                      text: '三合南里',
                      value: 'AREA|05b287f9-4512-5bf4'
                    },
                    {
                      text: '星瑞家园',
                      value: 'AREA|1371f685-3391-7b7a'
                    },
                    {
                      text: '兴政西里',
                      value: 'AREA|14f56395-93f6-58e3'
                    }
                  ]
                },
                {
                  text: '郁花园',
                  value: 'AREA|1bac8bc0-e92a-0cd0',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '郁花园一里',
                      value: 'AREA|d7fa580d-bac4-033c'
                    },
                    {
                      text: '郁花园二里',
                      value: 'AREA|aea77f61-1e9c-bb73'
                    },
                    {
                      text: '郁花园三里',
                      value: 'AREA|69efbb06-63e8-9f62'
                    },
                    {
                      text: '双高花园',
                      value: 'AREA|5ed36584-1230-c973'
                    }
                  ]
                },
                {
                  text: '瀛海',
                  value: 'AREA|f2875cbd-c29b-d72f',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '兴海园',
                      value: 'AREA|4d1005f0-b03e-f8b0'
                    },
                    {
                      text: '中国铁建花语金郡',
                      value: 'AREA|1a1f03ae-598f-ca03'
                    },
                    {
                      text: '德茂佳苑',
                      value: 'AREA|7efcf929-9aa7-6139'
                    },
                    {
                      text: '德茂小区',
                      value: 'AREA|ec943020-dd19-1d4c'
                    }
                  ]
                },
                {
                  text: '天宫院',
                  value: 'AREA|7d5a070d-343e-5327',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '明发雅苑',
                      value: 'AREA|a8d3961b-6c06-e8cd'
                    },
                    {
                      text: '鑫苑鑫都汇',
                      value: 'AREA|0de9ea13-6b36-b58f'
                    },
                    {
                      text: '天宫院小区',
                      value: 'AREA|5d8feb79-753e-7e71'
                    },
                    {
                      text: '住总万科橙',
                      value: 'AREA|0b07b023-5d54-7f73'
                    },
                    {
                      text: '新源时代',
                      value: 'AREA|15765c00-1d55-8666'
                    }
                  ]
                },
                {
                  text: '大兴其它',
                  value: 'AREA|9525be8f-dfe3-7594',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '团河苑',
                      value: 'AREA|b394de9a-cd1d-445b'
                    }
                  ]
                },
                {
                  text: '高米店南',
                  value: 'AREA|b05c2a58-e5f4-a2bf',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '新里.西斯莱公馆',
                      value: 'AREA|891b0f50-695f-40c1'
                    },
                    {
                      text: '康颐园',
                      value: 'AREA|c87c20df-5d76-afac'
                    },
                    {
                      text: '原生墅',
                      value: 'AREA|ff54415d-ee31-6637'
                    }
                  ]
                },
                {
                  text: '黄村北',
                  value: 'AREA|63aa6cce-f2f2-b156',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '金惠园三里',
                      value: 'AREA|cd80c2f7-844f-464c'
                    },
                    {
                      text: '金惠园二里',
                      value: 'AREA|e8dbc500-600e-1015'
                    }
                  ]
                }
              ]
            },
            {
              text: '房山',
              value: 'AREA|56c2a821-73c2-1c1f',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '良乡',
                  value: 'AREA|2bbdcade-ea08-6a05',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '京投万科新里程南区',
                      value: 'AREA|d7a6447d-8101-da7d'
                    },
                    {
                      text: '阳光邑上',
                      value: 'AREA|3555f085-1b3d-2fcc'
                    },
                    {
                      text: '瑞雪春堂',
                      value: 'AREA|db5b3e09-b263-e35d'
                    },
                    {
                      text: '兴家小区',
                      value: 'AREA|5def03b5-e73c-de3b'
                    },
                    {
                      text: '新里程南区二期',
                      value: 'AREA|2c632cfc-1d8c-7611'
                    },
                    {
                      text: '西潞园一里',
                      value: 'AREA|d408e4d7-77e8-3ce2'
                    },
                    {
                      text: '西潞昊宏家园',
                      value: 'AREA|6f515a6f-21a7-4ead'
                    },
                    {
                      text: '吴店东里',
                      value: 'AREA|d2e99386-46de-548c'
                    },
                    {
                      text: '佳世苑小区',
                      value: 'AREA|2b870f33-b6e7-59d0'
                    },
                    {
                      text: '行宫园四里',
                      value: 'AREA|4dcbdbf4-9d82-ba32'
                    },
                    {
                      text: '建设巷小区',
                      value: 'AREA|80493fbe-8375-d01c'
                    }
                  ]
                },
                {
                  text: '长阳',
                  value: 'AREA|dd50ab49-337b-0614',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '长阳半岛怡和南路10号院',
                      value: 'AREA|fb40d67f-f670-2203'
                    },
                    {
                      text: '首开熙悦山熹园3号院',
                      value: 'AREA|fb094b7e-b783-5463'
                    },
                    {
                      text: '长阳国际城二区',
                      value: 'AREA|3445652d-3465-7d31'
                    },
                    {
                      text: '长阳半岛怡和路3号院',
                      value: 'AREA|1169ce86-aa99-7153'
                    },
                    {
                      text: '长阳半岛4号院',
                      value: 'AREA|d8b1428f-cb43-c833'
                    },
                    {
                      text: '长阳半岛怡和路1号院',
                      value: 'AREA|f5b320c4-f9d7-034e'
                    },
                    {
                      text: '长阳半岛2号院',
                      value: 'AREA|0a2e0180-70d3-9dc5'
                    },
                    {
                      text: '长阳半岛怡和路6号院',
                      value: 'AREA|d00562fb-a878-f4b9'
                    },
                    {
                      text: '芭蕾雨悦都北区',
                      value: 'AREA|eeca3e3f-a95b-5799'
                    },
                    {
                      text: '建邦华庭西区',
                      value: 'AREA|616fe8b2-6f3e-fc9b'
                    },
                    {
                      text: '邑上公馆',
                      value: 'AREA|a1db0788-6e39-c066'
                    },
                    {
                      text: '首开熙悦山熹园1号院',
                      value: 'AREA|05231076-7475-4b93'
                    },
                    {
                      text: '长阳半岛1号院',
                      value: 'AREA|8146e17f-810f-44a0'
                    },
                    {
                      text: '建邦华庭东区',
                      value: 'AREA|c329bb8c-403b-8484'
                    },
                    {
                      text: '九洲溪雅苑二区',
                      value: 'AREA|3ad02b30-596d-491b'
                    }
                  ]
                },
                {
                  text: '阎村',
                  value: 'AREA|de4771a4-761d-9a41',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '天恒乐活城',
                      value: 'AREA|a53124e6-9ce8-a35c'
                    },
                    {
                      text: '乐活家园',
                      value: 'AREA|8e59aa90-f636-6336'
                    },
                    {
                      text: '燕化星城建德一里',
                      value: 'AREA|1ccdd352-f728-dbe1'
                    }
                  ]
                }
              ]
            },
            {
              text: '亦庄开发区',
              value: 'AREA|f46287e7-3d9e-fbf6',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '亦庄',
                  value: 'AREA|55158331-4bb5-0604',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '富源里',
                      value: 'AREA|452a4194-b323-e89c'
                    },
                    {
                      text: '郁金香舍',
                      value: 'AREA|20ae0545-f573-f9a4'
                    },
                    {
                      text: '国融国际',
                      value: 'AREA|d87e6937-e3b2-d279'
                    },
                    {
                      text: '林肯公园',
                      value: 'AREA|5cd943a7-5262-e4d4'
                    },
                    {
                      text: '北京经开壹中心',
                      value: 'AREA|346a3333-c79c-7cc2'
                    },
                    {
                      text: '博客雅居',
                      value: 'AREA|2e4ec5f6-023c-dca3'
                    },
                    {
                      text: '贵园东里',
                      value: 'AREA|ffe976e8-c83f-d54b'
                    },
                    {
                      text: '新康家园',
                      value: 'AREA|65d339f4-8a6e-8744'
                    },
                    {
                      text: '一品亦庄',
                      value: 'AREA|f0a5b014-ac33-a98b'
                    }
                  ]
                }
              ]
            },
            {
              text: '门头沟',
              value: 'AREA|cb61da76-ef85-ad84',
              children: [
                {
                  text: '不限',
                  value: 'null'
                },
                {
                  text: '滨河西区',
                  value: 'AREA|77570336-ab92-fda0',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '永兴小区',
                      value: 'AREA|8142538d-ce9e-4207'
                    }
                  ]
                },
                {
                  text: '冯村',
                  value: 'AREA|72c8f1e1-2475-d2be',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '冯村信园小区',
                      value: 'AREA|775821a6-8cc9-8dde'
                    },
                    {
                      text: '丽景长安',
                      value: 'AREA|4cc46120-68f1-9f18'
                    }
                  ]
                },
                {
                  text: '石门营',
                  value: 'AREA|872e6fb1-0973-f7a7',
                  children: [
                    {
                      text: '不限',
                      value: 'null'
                    },
                    {
                      text: '石门营新区七区北苑',
                      value: 'AREA|d3b321af-9a94-4dae'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
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
    onSearch() {
      // 跳转地图
    },
    // 搜索栏左边的跳转地图
    mapFn() {
      this.$router.push({
        path: '/city'
      })
    },
    // 第一个滚轮的确认和取消按钮
    onConfirm_1() {
      this.$refs.down_1.toggleItem()
    },
    // 第一个滚轮的确认和取消按钮
    onCancel_1() {
      this.$refs.down_1.toggleItem()
    },
    async getCondition() {
      let { data } = await getCondition(this.id)
      // 处理替换文字
      data = JSON.parse(JSON.stringify(data).replace(/label/g, 'text'))
      console.log(data)
      // 处理嵌套
      this.columns_1.push(data.body.area, data.body.subway)
    }
  }
}
</script>

<style scoped lang="less">
.down {
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
</style>
