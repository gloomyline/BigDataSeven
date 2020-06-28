<template>
  <div class="human">
    <div class="head">
      <h1>人力资源</h1>
      <div class="weather">
        <el-button type="primary" size="small" icon="el-icon-arrow-left" round @click="goBack">返回主页面</el-button>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">人力资源</span>
      </p>
      <el-table
        @row-click="openDetails"
        :data="tableData"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="title" label="片区名称" min-width="150"></el-table-column>
        <el-table-column prop="region" label="单位名称" min-width="150"></el-table-column>
        <el-table-column label="现有人数">
          <el-table-column prop="name" label="局聘" min-width="120"></el-table-column>
          <el-table-column prop="name1" label="一类劳务人员" min-width="120"></el-table-column>
          <el-table-column prop="name2" label="总人数" min-width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="在岗情况">
          <el-table-column prop="name3" label="在岗" min-width="120"></el-table-column>
          <el-table-column prop="name4" label="不在岗" min-width="120"></el-table-column>
        </el-table-column>
        <el-table-column prop="zip" label="定员定编局聘人数" min-width="150"></el-table-column>
        <el-table-column label="人员构成">
          <el-table-column prop="name5" label="党政技" min-width="120"></el-table-column>
          <el-table-column prop="name6" label="其他班子成员" min-width="120"></el-table-column>
          <el-table-column prop="name7" label="部门负责人" min-width="120"></el-table-column>
        </el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">中铁大桥局七公司季（年）度项目管理费</span>
      </p>
      <el-table
        @row-click="openDetails"
        :data="tableData"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="title" label="片区名称" min-width="150"></el-table-column>
        <el-table-column prop="region" label="工程项目名称" min-width="150"></el-table-column>
        <el-table-column prop="date" label="建设年限" min-width="150"></el-table-column>
        <el-table-column label="开累">
          <el-table-column prop="plan" label="全期计划" min-width="120"></el-table-column>
          <el-table-column prop="finish" label="目前执行完成情况" min-width="120"></el-table-column>
          <el-table-column prop="rate" label="完成比例" min-width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="年度">
          <el-table-column prop label="年度计划" min-width="120"></el-table-column>
          <el-table-column prop label="目前执行完成情况" min-width="120"></el-table-column>
          <el-table-column prop label="完成比例" min-width="120"></el-table-column>
        </el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Human",
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
              name: "57",
              name1: "24",
              name2: "81",
              name3: "81",
              name4: "0",
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
              name: "0",
              name1: "1",
              name2: "1",
              name3: "0",
              name4: "1",
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
              name: "29",
              name1: "16",
              name2: "45",
              name3: "45",
              name4: "0",
              name5: "",
              zip: ""
            },
            {
              id: 17,
              date: "",
              title: "",
              region: "西宁昆仑路",
              name: "15",
              name1: "4",
              name2: "19",
              name3: "19",
              name4: "0",
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
              name: "31",
              name1: "25",
              name2: "56",
              name3: "56",
              name4: "0",
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
              name: "52",
              name1: "55",
              name2: "107",
              name3: "107",
              name4: "0",
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
              plan: "1455",
              finish: "1888",
              rate: "129.7%",
              name: "11",
              name1: "12",
              name2: "23",
              name3: "23",
              name4: "0",
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
      ]
    };
  },
  mounted() {},
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
      this.$router.push({ path: "/" });
    },
    openDetails() {
      this.$router.push({ name: "HumanDetails" });
    }
  }
};
</script>

<style lang="scss" scoped>
.human {
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