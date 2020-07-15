<template>
  <div class="labourServices">
    <div class="head">
      <h1>劳务管理</h1>
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack"
          >返回主页面</el-button
        >
      </div>
    </div>
    <div class="box boxall">
      <!-- 图表 -->
      <div class="map" id="map_l">
        <!-- <div class="map4" id="map_l"></div> -->
      </div>
      <!-- 表格区域 -->
      <div class="table">
        <p class="thead">
          <span class="tilte">劳务队伍参建项目数</span>
        </p>
        <el-table
          style="width:100%"
          :row-class-name="tableRowClassName"
          :data="tableData"
          border
          size="mini"
          @row-click="openDetails"
        >
          <el-table-column
            type="index"
            label="排序"
            width="120"
          ></el-table-column>
          <el-table-column prop="comname" label="劳务队伍"></el-table-column>
          <el-table-column prop="deptidnum" label="参建项目数"></el-table-column>
        </el-table>
      </div>
      <div class="boxfoot"></div>
    </div>

    <div class="box boxall m-top4">
      <!-- 图表 -->
      <div class="map" id="map_2"></div>
      <!-- 表格区域 -->
      <div class="table">
        <p class="thead">
          <span class="tilte">劳务队伍作业人数占比</span>
        </p>
        <el-table
          style="width:100%"
          height="4rem"
          :data="tableData2"
          border
          @row-click="seeDetails"
          size="mini"
        >
          <el-table-column
            type="index"
            label="序号"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="comname"
            min-width="150"
            label="劳务队伍"
          ></el-table-column>
          <el-table-column
            prop="deptname"
            min-width="120"
            label="参建项目"
          ></el-table-column>
          <el-table-column prop="worknum" label="作业人数"></el-table-column>
          <el-table-column prop="regisnum" label="注册人数"></el-table-column>
          <el-table-column prop="prate" label="占比">
          <!-- <el-table-column prop="prate" label="占比" :formatter="formatter"> -->
          </el-table-column>
        </el-table>
      </div>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import "@/assets/js/china.js";
import echarts from "echarts";
import { LabourServicesNewApi } from '@/api'
export default {
  data() {
    return {
      tableInfo:{},
      tableData: [{
        comname: 'aaa'
      }],
      tableData2: [],
    };
  },
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0,1)",
    });

    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  created() {
    this._sortTableData2();
    this.initData()
    this.fetchedLabelteamnumData()
  },
  mounted() {
    this.$nextTick(() => {
      this.echarts();
      this.echarts2();
    });
  },
  methods: {
    // 劳务队伍
    async initData() {
      const _date = new Date();
      let mm = _date.getMonth() < 10 ? `0${_date.getMonth()+1}` : _date.getMonth()+1;
      this.tableInfo = await LabourServicesNewApi.fetchLabelteamworkrateData(`${_date.getFullYear()}-${mm}`)
      console.log(this.tableInfo, 'lm res')
    },
    // 劳务队伍作业人数占比
    async fetchedLabelteamnumData() {
      const _date = new Date();
      let mm = _date.getMonth() < 10 ? `0${_date.getMonth()+1}` : _date.getMonth()+1;
      this.tableInfo = await LabourServicesNewApi.fetchedLabelteamnumData(`${_date.getFullYear()}-${mm}`)
      console.log(this.tableInfo, 'lm res')
    },
    _sortTableData2() {
      this.tableData2 = this.tableData2.sort((a, b) => (b.data / b.value - a.data / a.value));
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.name > 2) {
        return "red-row";
      } else if (row.name == 2) {
        return "yellow-row";
      } else if (row.name < 2) {
        return "cyan-row";
      }
    },
    formatter(resRow) {
      var resvalue = Math.floor((resRow.data / resRow.value) * 10000) / 100;
      return isNaN(resvalue) ? "" : resvalue + "%";
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
    openDetails() {
      this.$router.push({ 
        name: "LabourServicesDetails",
        Params: {}
       });
    },
    seeDetails(resRow) {
      this.echarts2(resRow);
    },
    echarts() {
      var myChart = echarts.init(document.getElementById("map_l"));
      var option = {
        // color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "2%",
          right: "10%",
          top: "8%",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [1, 2, 3, 4, 5, 6, 7],
            axisTick: {
              alignWithLabel: true,
            },
            name: "项目数",
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "劳务队伍数",
            splitLine: { show: false }, //去除网格线
            axisLabel: {},
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        ],
        series: [
          {
            name: "劳务队伍数",
            type: "bar",
            barWidth: "40%",
            data: [81, 4, 1, 0, 0, 0, 0],
            itemStyle: {
              normal: {
                color: function(params) {
                  if (params.dataIndex >= 2) {
                    return ["rgb(236, 128, 141)"];
                  } else if (params.dataIndex === 1) {
                    return ["rgb(250, 205, 145)"];
                  } else if (params.dataIndex === 0) {
                    return ["rgb(202, 249, 130)"];
                  }
                  // return colorList[params.dataIndex];
                },
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#fff",
                    fontSize: 12,
                  },
                },
              },
            },
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts2() {
      var myChart = echarts.init(document.getElementById("map_2"));
      var dataOpcton = [
        { value: 2, name: "参建人数占大于总人数85%" },
        { value: 14, name: "参建人数大于总人数65%-85%" },
        { value: 70, name: "参建人数小于总人数60%" },
      ];
      var titleList = ["参建人数占大于总人数85%", "参建人数大于总人数65%-85%", "参建人数小于总人数60%"];
      // var dataOpcton = this.tableData2.map((item) => {
      //   var resvalue = Math.floor((item.data / item.value) * 10000) / 100;
      //   if (resvalue >= 85) {
      //     item.color = colorList[0];
      //   } else if (resvalue >= 60 && resvalue < 85) {
      //     item.color = colorList[1];
      //   } else {
      //     item.color = colorList[2];
      //   }
      //   item.proportion = isNaN(resvalue) ? "" : resvalue + "%";
      //   return item;
      // });
      var option = {
        title: {
          text: "劳务队伍作业人数占比",
          left: "center",
          textStyle: {
            color: "#fff", //颜色
            fontWeight: "bold", //粗细
            fontSize: 18, //大小
            align: "center", //水平对齐
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          top: 40,
          data: titleList,
          show: true,
          textStyle: {
            color: "#fff", //颜色
            fontWeight: "bold", //粗细
            fontSize: 12, //大小
          },
        },
        color: ["rgb(236, 128, 141)","rgb(250, 205, 145)","rgb(202, 249, 130)"],
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["45%", "60%"],
            label: {
              fontSize: 16,
              formatter: '{c}个',
            },
            data: dataOpcton,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            }
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.labourServices {
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
  .box {
    width: 98%;
    min-width: 1200px;
    margin: 0.1rem auto 0 auto;
    display: flex;
    .map {
      flex: 0 0 50%;
      width: 50%;
      height: 4rem;
      margin-top: 0.6rem;
    }
    .table {
      flex: 1;
      height: 4rem;
      margin-top: 0.1rem;
      .thead {
        width: 100%;
        text-align: center;
        line-height: 0.8rem;
        .tilte {
          color: #ffffff;
          font-size: 24px;
          line-height: 0.3rem;
          margin-left: 0.6rem;
        }
      }
    }
  }
}
</style>
<style>
.el-table .red-row {
  background: rgb(236, 128, 141) !important;
}
.el-table .yellow-row {
  background: rgb(250, 205, 145) !important;
}
.el-table .cyan-row {
  background: rgb(202, 249, 130) !important;
}
</style>
