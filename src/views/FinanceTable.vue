<template>
  <div class="finance">
    <!-- 表格区域 -->
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">项目月度资金统计</span>
      </p>
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="title" label="片区"></el-table-column>
        <el-table-column prop="region" label="项目名称"></el-table-column>
        <el-table-column prop="name" label="营业收入"></el-table-column>
        <el-table-column prop="name1" label="营业利润"></el-table-column>
        <el-table-column prop="name2" label="计价回款率"></el-table-column>
        <el-table-column prop="name3" label="计价收入率"></el-table-column>
        <el-table-column prop="name4" label="人月均经费"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">公司主要财务指标</span>
      </p>
      <el-table :data="tableData2" style="width: 86%;  margin: 0 auto; min-width: 800px;">
        <el-table-column prop="title" label min-width="150"></el-table-column>
        <el-table-column prop="title1" label="月度数" min-width="150"></el-table-column>
        <el-table-column prop="region" label="季度数" min-width="150"></el-table-column>
        <el-table-column prop="date" label="年度数/年度完成率" min-width="150"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Finance",
  data() {
    return {
      tableData: [
        {
          date: "",
          title: "独立项目",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 11,
              date: "",
              title: "",
              region: "安九铁路",
              name: "11,534.00",
              name1: "128",
              name2: "6.70%",
              name3: "90.00%",
              name4: "111.40%",
              name5: "",
              zip: ""
            },
            {
              id: 12,
              date: "待补充",
              title: "",
              region: "江汉七桥",
              plan: "2800",
              finish: "2045",
              rate: "73.0%",
              name: "1,913.00",
              name1: "395",
              name2: "10.68%",
              name3: "97.00%",
              name4: "90.60%",
              name5: "",
              zip: ""
            },
            {
              id: 16,
              date: "48月",
              title: "",
              region: "中兰客专",
              plan: "5040",
              finish: "1165",
              rate: "23.1%",
              name: "1,915.00",
              name1: "97.8",
              name2: "5.11%",
              name3: "90.00%",
              name4: "92.29%",
              name5: "",
              zip: ""
            },
            {
              id: 17,
              date: "",
              title: "",
              region: "西宁昆仑路",
              name: "",
              name1: "",
              name2: "",
              name3: "",
              name4: "",
              name5: "",
              zip: ""
            }
          ]
        },
        {
          date: "",
          title: "城轨分公司",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 14,
              date: "待补充",
              title: "",
              region: "武嘉高速",
              plan: "1962",
              finish: "210",
              rate: "10.7%",
              name: "1,914.00",
              name1: "94",
              name2: "6.22%",
              name3: "85.00%",
              name4: "99.58%",
              name5: "",
              zip: ""
            }
          ]
        },
        {
          date: "",
          title: "武汉分公司",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 15,
              date: "42月",
              title: "",
              region: "武大高速",
              plan: "8458",
              finish: "709",
              rate: "8.4%",
              name: "1,575.00",
              name1: "55",
              name2: "4.95%",
              name3: "",
              name4: "",
              name5: "",
              zip: ""
            }
          ]
        },
        {
          date: "",
          title: "湖北分公司",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 11,
              date: "960天",
              title: "",
              region: "童庄河",
              plan: "1,912.00",
              finish: "112",
              rate: "6.70%",
              name: "1,912.00",
              name1: "112",
              name2: "6.70%",
              name3: "90.00%",
              name4: "111.40%",
              name5: "",
              zip: ""
            }
          ]
        },
        {
          date: "",
          title: "西北分公司",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 13,
              date: "",
              title: "",
              region: "潇河大桥",
              name: "20",
              name1: "28",
              name2: "48",
              name3: "48",
              name4: "0",
              name5: "",
              zip: ""
            }
          ]
        },
        {
          date: "",
          title: "海南项目群",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 13,
              date: "",
              title: "",
              region: "沈海高速",
              name: "10",
              name1: "6",
              name2: "16",
              name3: "16",
              name4: "0",
              name5: "",
              zip: ""
            }
          ]
        }
      ],
      tableData2: [
        { title: "营业收入", title1: "", region: "", date: "" },
        { title: "营业利润", title1: "", region: "", date: "" },
        { title: "资产负债率", title1: "", region: "", date: "" },
        { title: "资金归集率", title1: "", region: "", date: "" },
        { title: "集中统保率", title1: "", region: "", date: "" },
        { title: "两金压降余额", title1: "", region: "", date: "" },
        { title: "经营性现金", title1: "", region: "", date: "" },
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.echarts();
    });
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
.finance {
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