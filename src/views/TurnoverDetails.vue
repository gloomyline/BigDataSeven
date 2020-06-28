<template>
  <div class="turnoverDetails">
    <div class="head">
      <h1>周转材料</h1>
      <div class="weather">
        <el-button type="primary" size="small" icon="el-icon-arrow-left" round @click="goBack">返回主页面</el-button>
      </div>
    </div>
    <!-- 图表 -->
    <div class="map" id="map_l">
      <!-- <div class="map4" id="map_l"></div> -->
    </div>
    <!-- 表格区域 -->
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">周转材料账面清单</span>
      </p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="片区名称" min-width="150"></el-table-column>
        <el-table-column prop="region" label="工程项目名称" min-width="150"></el-table-column>
        <el-table-column prop="date" label="建设年限" min-width="150"></el-table-column>
        <el-table-column label="A类">
          <el-table-column prop="name" label="账面总量" min-width="120"></el-table-column>
          <el-table-column prop="name" label="账面在用量" min-width="120"></el-table-column>
          <el-table-column prop="name" label="利用率" min-width="120"></el-table-column>
          <el-table-column label="账面库存总量">
            <el-table-column prop="province" label="中心库库存" min-width="120"></el-table-column>
            <el-table-column prop="city" label="现场库存" min-width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="B类">
          <el-table-column prop="name" label="账面总量" min-width="120"></el-table-column>
          <el-table-column prop="name" label="账面在用量" min-width="120"></el-table-column>
          <el-table-column prop="name" label="利用率" min-width="120"></el-table-column>
          <el-table-column label="账面库存总量">
            <el-table-column prop="province" label="中心库库存" min-width="120"></el-table-column>
            <el-table-column prop="city" label="现场库存" min-width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="C类">
          <el-table-column prop="name" label="账面总量" min-width="120"></el-table-column>
          <el-table-column prop="name" label="账面在用量" min-width="120"></el-table-column>
          <el-table-column prop="name" label="利用率" min-width="120"></el-table-column>
          <el-table-column label="账面库存总量">
            <el-table-column prop="province" label="中心库库存" min-width="120"></el-table-column>
            <el-table-column prop="city" label="现场库存" min-width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import "@/assets/js/china.js";
import echarts from "echarts";
export default {
  name: "TurnoverDetails",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          title: "西南片区",
          region: "安九铁路",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          title: "西南片区",
          region: "安九铁路",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          title: "西南片区",
          region: "安九铁路",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          title: "西南片区",
          region: "安九铁路",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  mounted() {

  },
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)"
    });

    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  methods: {
    goBack() {
        this.$router.push({ path:'/'});
    },
    
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