<template>
  <div class="turnoverDetails">
    <div class="head">
      <h1>{{ deptName }}项目部周转材料明细表</h1>
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack('-1')"
        >返回</el-button>
      </div>
    </div>
    <el-button-group>
      <el-button type="primary" @click="goto(0)">生产明细</el-button>
      <el-button type="primary" @click="goto(1)">周转材料</el-button>
      <el-button type="primary" @click="goto(2)">设备情况</el-button>
      <el-button type="primary" @click="goto(3)">人力资源</el-button>
      <el-button type="primary" @click="goto(4)">劳务管理</el-button>
    </el-button-group>
    <!-- 表格区域 -->
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">A类周转材料</span>
      </p>
      <el-table :data="tableData" style="width: 86%;  margin: 0 auto; min-width: 800px;">
        <el-table-column prop="title" label></el-table-column>
        <el-table-column v-for="(item, index) in typeAList" :label="item.materialName" :prop="item.materialName" :key="index"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">B类周转材料</span>
      </p>
      <el-table :data="tableData2">
        <el-table-column prop="title" label></el-table-column>
        <el-table-column v-for="(item, index) in typeBList" :prop="item.materialName" :label="item.materialName" :key="index"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">C类周转材料</span>
      </p>
      <el-table :data="tableData3">
        <el-table-column prop="title" label min-width="120"></el-table-column>
        <el-table-column v-for="(item, index) in typeCList" :prop="item.materialName" :label="item.materialName" :key="index"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>


<script>
import { turnoverApi } from '@/api';
import btnList from "@/components/BtnList.vue";

export default {
  name: "TurnoverDetails",
  components: {
    btnList
  },
  props: { deptId: String | Number },  
  data() {
    return {
      deptName: '',
      ny:this.$route.params.ny,
      typeAList: [],
      typeBList: [],
      typeCList: [],
      tableData: [],
      tableData2: [
        { title: "采购量", title1: "", region: "", date: "" },
        { title: "再用量", title1: "", region: "", date: "" }
      ],
      tableData3: [
        { title: "可直接调拨使用", title1: "", region: "", date: "" },
        { title: "加工改制后使用", title1: "", region: "", date: "" }
      ]
    };
  },
  mounted() {},
  created() {
    this._initData();
    console
  },
  methods: {
    async _initData() {
      const loading = this.$loading({
        lock: true,
        text: "页面加载中..",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 1)"
      });
      const response = await turnoverApi.fetchProjectDetails(this.deptId,this.ny);
      this.deptName = response.data.deptName;
      this.typeAList = response.data.typeA;
      this.typeBList = response.data.typeB;
      this.typeCList = response.data.typeC;
      loading.close();
      this.fillTableData();
    },
    fillTableData() {
      // material A
      this.tableData = [
        { title: "帐面在用资产", cate: 'isUsing' },
        { title: "帐面库存资产", cate: 'isUnused' },
        { title: "帐面封存资产", cate: 'isSealed'},
      ];
      this.tableData = this.tableData.map(item => {
        const newItem = {...item};
        this.typeAList.forEach(it => {
          newItem[it.materialName] = it[item.cate];
        });
        return newItem;
      });
      // material B
      this.tableData2 = [
        { title: "帐面在用资产", cate: 'isUsing' },
        { title: "帐面库存资产", cate: 'isUnused' },
      ];
      this.tableData2 = this.tableData2.map(item =>{
        const newItem = {...item};
        this.typeBList.forEach(it => {
          newItem[it.materialName] = it[item.cate];
        });
        return newItem;
      });
      // material C
      this.tableData3 = [
        { title: "帐面在用资产", cate: 'isUsing' },
        { title: "帐面库存资产", cate: 'isUnused' },
      ];
      this.tableData3 = this.tableData3.map(item => {
        const newItem = {...item};
        this.typeCList.forEach(it => {
          newItem[it.materialName] = it[item.cate];
        });
        return newItem;
      });
    },
    goto(idx) {
      const routeMap = [
        {
          name: 'DispatchNew',
          params: {id: this.$route.params.deptId, name: this.$route.params.name, ny: this.$route.params.ny},
        },
        {
          name: 'TurnoverDetails',
          params: {id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
        {
          name: 'BigEquipmentDetails',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
        {
          name: 'HumanDetailsNew',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny},
        },
        {
          name: 'LabourProjectDetails',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
      ];
      if (idx === 1) {
        this._initData();
      } else {
        this.$router.push(routeMap[idx]);
      }
    },
    goBack(res) {
      if (res) {
        // this.$router.go(-1);
        this.$router.push({ name: 'TurnoverNew' });
      } else {
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.turnoverDetails {
  .head {
    height: 1.05rem;
    background: url(~@/assets/images/head_bg.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    z-index: 100;
    h1 {
      color: #63ecff;
      text-align: center;
      font-size: 0.4rem;
      line-height: 0.8rem;
      .img {
        width: 1.5rem;
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.2rem;
      }
    }
  }
  .map {
    width: 1200px;
    height: 460px;
    margin: 0 auto;
  }
  .table {
    margin: 0.4rem;
    margin-top: 0.6rem;
    border: rgba(0, 102, 153, 1) 1px solid;
    padding: 0.6rem;
    background-color: #0c2456 !important;
    .thead {
      text-align: left;
      margin-bottom: 0.6rem;
      .img {
        width: 0.6rem;
        height: 0.28rem;
      }
      .tilte {
        font-size: 18px;
        color: #b6d7ff;
        line-height: 0.3rem;
        margin-left: 0.6rem;
      }
    }
    .e-table {
      width: 100%;
      min-width: 800px;
      margin: 0 auto;
    }
  }
}
</style>