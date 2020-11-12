<template>
  <div class="equipmentDetails">
    <div class="head">
      <h1>{{this.$route.params.name}}项目部设备情况</h1>
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack(true)"
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
        <span class="tilte">项目机械设备台账</span>
      </p>
      <el-table :data="tableData" :span-method="equSpanMethod">
        <el-table-column prop="number" label="管理编号"></el-table-column>
        <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
        <el-table-column prop="specifications" label="型号规格"></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂家"></el-table-column>
        <el-table-column prop="manufactureDate" label="出厂年月"></el-table-column>
        <el-table-column prop="equipmentSource" label="设备来源">
          <template slot-scope="scope">
            <span v-if="scope.row.equipmentSource === 1">自带</span>
            <span v-if="scope.row.equipmentSource === 2">内租</span>
            <span v-if="scope.row.equipmentSource === 3">外租</span>
          </template>
        </el-table-column>
        <el-table-column prop="provideUnit" label="设备提供单位"></el-table-column>
        <el-table-column prop="startDate" label="进场时间"></el-table-column>
        <el-table-column prop="useTheUnit" label="设备使用单位"></el-table-column>
        <el-table-column prop="isCaptain" label="是否 实施机长负责制">
           <template slot-scope="scope">
            <span v-if="scope.row.isCaptain === 1">是</span>
            <span v-if="scope.row.isCaptain === 2">否</span>
          </template>
        </el-table-column>
        <el-table-column prop="captainName" label="机长"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import { equipmentApi } from '@/api';
import btnList from "@/components/BtnList.vue";
export default {
  name: "EquipmentDetails",
  components: {
    btnList
  },
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this._requestData()
  },
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中..",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)"
    });

    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  methods: {
    async _requestData() {
      const response = await equipmentApi.fetchEquipmentsByProject(this.$route.params.id, this.$route.params.ny);
      this.tableData = response
    },
    goto(idx) {
      const routeMap = [
        {
          name: 'DispatchNew',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
        {
          name: 'TurnoverDetails',
          params: { id: this.$route.params.id, ny: this.$route.params.ny },
        },
        {
          name: 'BigEquipmentDetails',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
        {
          name: 'HumanDetailsNew',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
        {
          name: 'LabourProjectDetails',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
      ];
      if (idx === 2) {
        this._requestData();
      } else {
        this.$router.push(routeMap[idx]);
      }
    },
    goBack(res) {
      if (res) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: "/" });
      }
    },
    equSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 11) {
        return {
          rowspan: 666,
          colspan: 1
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.equipmentDetails {
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