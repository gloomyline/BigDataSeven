<template>
  <div class="engineering">
    
    <!-- 表格区域 -->
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">大桥局七公司工经数据</span>
      </p>
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="title" label="片区名称" min-width="120"></el-table-column>
        <el-table-column prop="region" label="工程项目名称" min-width="120"></el-table-column>
        <el-table-column prop="p1" label="建设年限" min-width="120"></el-table-column>
        <el-table-column prop="p2" label="合同价" min-width="120"></el-table-column>
        <el-table-column prop="p3" label="施工产值" min-width="120"></el-table-column>
        <el-table-column prop="p4" label="暂定金" min-width="120"></el-table-column>
        <el-table-column prop="name" label="本月计价完" min-width="120"></el-table-column>
        <el-table-column label="开累">
          <el-table-column prop="name1" label="上期开累计价" min-width="120"></el-table-column>
          <el-table-column prop="name2" label="开累计价" min-width="120"></el-table-column>
          <el-table-column prop="name3" label="计价比例" min-width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="2020年度变更索赔">
          <el-table-column prop="name4" label="年度计划" min-width="120"></el-table-column>
          <el-table-column prop="name5" label="月度完成" min-width="120"></el-table-column>
          <el-table-column prop="name6" label="完成比" min-width="120"></el-table-column>
        </el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Engineering",
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
          name6: "",
          name7: "",
          name8: "",
          name9: "",
          name10: "",
          name11: "",
          name12: "",
          name13: "",
          name14: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 11,
              date: "",
              title: "",
              region: "安九铁路",
              p1: "2017.10-2021.10",
              p2: "133046",
              p3: "133046",
              p4: "0",
              name: "0",
              name1: "76705",
              name2: "76705",
              name3: "111%",
              name4: "10750",
              name5: "0",
              name6: "0",
              name7: "0",
              name8: "",
              name9: "",
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
              p1: "2017.11.01-2020.09.30",
              p2: "128734",
              p3: "84592",
              p4: "0",
              name: "3991",
              name1: "55388",
              name2: "59379",
              name3: "96%",
              name4: "3105",
              name5: "",
              name6: "",
              name7: "",
              name8: "",
              name9: "",
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
              p1: "2018.09.01-2022.08.31",
              p2: "137901",
              p3: "137901",
              p4: "0",
              name: "0",
              name1: "66727",
              name2: "66727",
              name3: "80%",
              name4: "3707",
              name5: "417",
              name6: "11%",
              name7: "0",
              name8: "",
              name9: "",
              zip: ""
            },
            {
              id: 17,
              date: "",
              title: "",
              region: "西宁昆仑路",
              p1: "2019.12.1-2021.9.1",
              p2: "68273",
              p3: "68273",
              p4: "0",
              name: "",
              name1: "",
              name2: "",
              name3: "",
              name4: "",
              name5: "",
              name6: "",
              name7: "",
              name8: "",
              name9: "",
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
          name6: "",
          name7: "",
          name8: "",
          name9: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 14,
              date: "待补充",
              title: "",
              region: "武嘉高速",
              plan: "2902",
              finish: "210",
              rate: "10.7%",
              p1: "2019.06.01-2021.01.20",
              p2: "53364",
              p3: "53364",
              p4: "2600",
              name: "2902",
              name1: "10607",
              name2: "13509",
              name3: "76%",
              name4: "4478",
              name5: "",
              name6: "",
              name7: "0",
              name8: "",
              name9: "",
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
              p1: "2019.07.01-2022.12.31",
              p2: "223400",
              p3: "223400",
              p4: "0",
              name: "0",
              name1: "0",
              name2: "0",
              name3: "0",
              name4: "3872",
              name5: "0",
              name6: "0",
              name7: "0",
              name8: "",
              name9: "",
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
              p1: "2016.12-2020.5.15",
              p2: "23853",
              p3: "21695",
              p4: "2158",
              name: "836",
              name1: "17330",
              name2: "18167",
              name3: "96%",
              name4: "1553",
              name5: "731",
              name6: "47%",
              name7: "",
              name8: "",
              name9: "",
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
              p1: "2019.06.01-2020.11.21",
              p2: "79966",
              p3: "79966",
              p4: "0",
              name: "0",
              name1: "30693",
              name2: "30693",
              name3: "50%",
              name4: "4009",
              name5: "0",
              name6: "0",
              name7: "0",
              name8: "",
              name9: "",
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
              p1: "2020.2.10-2022.1.30",
              p2: "54285",
              p3: "54285",
              p4: "0",
              name: "0",
              name1: "0",
              name2: "0",
              name3: "0",
              name4: "1191",
              name5: "0",
              name6: "0",
              name7: "",
              name8: "",
              name9: "",
              zip: ""
            }
          ]
        }
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
.engineering {
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