<template>
  <div class="production">
    <div class="head">
      <h1>生产管理</h1>
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
    <!-- 操作搜索区域 -->
    <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label>
        <el-input v-model="formInline.user" placeholder="项目"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary">上月项目完成情况</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">月度施工计划</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">片区完成比例</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-arrow-left" @click="goBack"
          >返回主页面</el-button
        >
      </el-form-item>
    </el-form> -->
    <!-- 内容区域 -->

    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartTitle">公司总体施工情况</div>
        <div class="chartContent">
          <div class="chartContentSon">
            <div class="chartTit">片区公司产值情况</div>
            <div class="chartCont" id="pieChart"></div>
          </div>
          <div class="chartContentSon">
            <div class="chartTit">施工情况简报</div>
            <div class="chartCont">
              <dv-border-box-10
                class="chartContChild"
                style="margin-bottom:0.2rem"
              >
                <p>
                  公司在建项目总数<span class="sred">41</span>个，自营项目<span
                    class="sred"
                    >14</span
                  >个，联营项目<span class="sred">27</span>个，其中：<span
                    class="sred"
                    >3</span
                  >个停工项目，<span class="sred">2</span>个新上项目。
                </p>
              </dv-border-box-10>
              <dv-border-box-10 class="chartContChild">
                <p>
                  5月对<span class="sred">38个</span>项目下达计划，<span
                    class="sgreen"
                    >25个项目</span
                  >为<span class="sgreen">绿色管理</span>项目，<span
                    class="syellow"
                    >3个项目</span
                  >为<span class="syellow">黄色警示</span>项目，<span
                    class="sred"
                    >6个项目</span
                  >为<span class="sred">红色警示</span>项目，<span
                    class="spurple"
                    >4个项目</span
                  >无产值。
                </p>
              </dv-border-box-10>
            </div>
          </div>
        </div>
      </dv-border-box-10>
      <dv-border-box-10 class="chartContainer">
        <div class="chartTitle">自营</div>
        <div class="chartContent">
          <div class="chartContentSon">
            <div class="chartTit">产值情况（万元）</div>
            <div class="chartCont" id="barChart1"></div>
          </div>
          <div class="chartContentSon">
            <div class="chartTit">人均产值排名</div>
            <dv-capsule-chart :config="rjczConfig" class="chartCont" />
            <!-- <div class="chartCont" id="rowBarChart1"></div> -->
          </div>
        </div>
      </dv-border-box-10>
      <dv-border-box-10 class="chartContainer">
        <div class="chartTitle">联营</div>
        <div class="chartContent">
          <div class="chartContentSon">
            <div class="chartTit">产值情况（万元）</div>
            <div class="chartCont" id="barChart2"></div>
          </div>
          <div class="chartContentSon">
            <div class="chartTit">人均产值排名</div>
            <dv-capsule-chart :config="rjczConfig2" class="chartCont" />
            <!-- <div class="chartCont" id="rowBarChart2"></div> -->
          </div>
        </div>
      </dv-border-box-10>
    </div>
    <div class="tableContainer">
      <dv-border-box-10 class="tableContainerSon">
        <div class="tableContainerSonTitle">
          工期滞后排名
        </div>
        <dv-scroll-board
          :config="config"
          class="tableContainerSonTable"
          @click="onTableClick($event)"
        />
      </dv-border-box-10>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "Production",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      config: {},
      rjczConfig: {},
      rjczConfig2: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      const pieOption = {
        pieData: [
          { value: 98, name: "A公司" },
          { value: 250, name: "B公司" },
          { value: 50, name: "C公司" },
          { value: 100, name: "D公司" },
          { value: 280, name: "E公司" },
        ],
      };

      this.drawPieChart("pieChart", pieOption.pieData);

      const barChartBOption = {
        xData: ["月度", "年度", "开累"],
        legendData: [
          {
            name: "计划",
          },
          {
            name: "完成",
          },
        ],
        seriesData: [
          {
            name: "计划",
            type: "bar",
            data: [5, 20, 36],
            // stack: "使用情况",
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 16,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(54,169,206)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
          {
            name: "完成",
            type: "bar",
            data: [40, 22, 18],
            // stack: "使用情况",
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 16,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(202,249,130)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
        ],
      };
      this.drawDoubleBarChart(
        "barChart1",
        barChartBOption.xData,
        barChartBOption.legendData,
        barChartBOption.seriesData,
        "产值"
      );

      this.drawDoubleBarChart(
        "barChart2",
        barChartBOption.xData,
        barChartBOption.legendData,
        barChartBOption.seriesData,
        "产值"
      );

      const option1 = {
        yAxis: ["项目一", "项目二", "项目三", "项目四", "项目五", "项目六"],
        seriesData: [500, 600, 700, 800, 900, 1000],
      };

      // this.drawHorizontalBarChart(
      //   "rowBarChart1",
      //   option1.yAxis,
      //   option1.seriesData
      // );

      // this.drawHorizontalBarChart(
      //   "rowBarChart2",
      //   option1.yAxis,
      //   option1.seriesData
      // );

      this.rjczConfig = {
        data: [
          {
            name: "项目一",
            value: 167,
          },
          {
            name: "项目二",
            value: 123,
          },
          {
            name: "项目三",
            value: 98,
          },
          {
            name: "项目四",
            value: 75,
          },
          {
            name: "项目五",
            value: 66,
          },
          {
            name: "项目六",
            value: 46,
          },
        ],
        colors: [
          "rgb(202,249,130)",
          "rgb(202,249,130)",
          "rgb(202,249,130)",
          "#e062ae",
          "#e062ae",
          "#e062ae",
        ],
        unit: "人均产值",
        showValue: true,
      };

      this.rjczConfig2 = {
        data: [
          {
            name: "项目一",
            value: 167,
          },
          {
            name: "项目二",
            value: 123,
          },
          {
            name: "项目三",
            value: 98,
          },
          {
            name: "项目四",
            value: 75,
          },
          {
            name: "项目五",
            value: 66,
          },
          {
            name: "项目六",
            value: 46,
          },
        ],
        colors: [
          "rgb(202,249,130)",
          "rgb(202,249,130)",
          "rgb(202,249,130)",
          "#e062ae",
          "#e062ae",
          "#e062ae",
        ],
        unit: "人均产值",
        showValue: true,
      };

      this.config = {
        header: ["项目", "滞后比"],
        data: [
          ["项目1", "80%"],
          ["项目2", "70%"],
          ["项目3", "60%"],
          ["项目4", "59%"],
          ["项目5", "56%"],
          ["项目6", "53%"],
          ["项目7", "45%"],
          ["项目8", "32%"],
          ["项目9", "30%"],
          ["项目10", "26%"],
          ["项目11", "23%"],
          ["项目12", "22%"],
          ["项目13", "21%"],
          ["项目14", "20%"],
          ["项目15", "19%"],
          ["项目16", "18%"],
          ["项目17", "17%"],
          ["项目18", "16%"],
          ["项目19", "15%"],
          ["项目20", "14%"],
          ["项目21", "13%"],
        ],
        index: true,
        indexHeader: "排名",
        columnWidth: [50],
        rowNum: 20,
        align: ["center"],
      };
    });
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)",
    });
    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
    onTableClick(e) {
      this.$router.push({ name: "DispatchNew" });
    },
    drawPieChart(id, pieData) {
      var myChart = echarts.init(document.getElementById(id));

      var option = {
        // title: [
        //   {
        //     text: "自有机械设备使用情况",
        //     x: "center",
        //     y: "top",
        //     textStyle: {
        //       color: "#2f89cf",
        //       fontSize: "14",
        //     },
        //   },
        // ],
        color: ["#2f89cf", "#0f63d6", "#0f8cd6", "#0fa0d6", "#0fb4d6"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },

        series: [
          {
            type: "pie",
            radius: "70%",
            center: ["50%", "42%"],
            selectedMode: "single",
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    drawDoubleBarChart(id, xData, legendData, seriesData, yTitle) {
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        // title: {
        //   text: "资源总览",
        //   left: "20px",
        //   textStyle: {
        //     color: "#436EEE",
        //     fontSize: 17,
        //   },
        // },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          type: "plain", //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
          top: "1%", //----图例相对容器位置,top\bottom\left\right
          textStyle: {
            color: "#fff",
          },
          tooltip: {
            //图例提示框，默认不显示
            show: true,
            color: "red",
          },
          data: legendData,
        },
        xAxis: {
          data: xData,
          show: true, //---是否显示
          position: "bottom", //---x轴位置
          offset: 0, //---x轴相对于默认位置的偏移
          type: "category", //---轴类型，默认'category'
          name: "时间段", //---轴名称
          nameLocation: "end", //---轴名称相对位置
          nameTextStyle: {
            //---坐标轴名称样式
            color: "#fff",
            padding: [5, 0, 0, -5], //---坐标轴名称相对位置
          },
          nameGap: 15, //---坐标轴名称与轴线之间的距离
          //nameRotate:270,			//---坐标轴名字旋转

          axisLine: {
            //---坐标轴 轴线
            show: true, //---是否显示
            //------------------- 线 -------------------------
            lineStyle: {
              color: "#fff",
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            //---坐标轴 刻度
            show: false, //---是否显示
          },
          axisLabel: {
            //---坐标轴 标签
            show: true, //---是否显示
            inside: false, //---是否朝内
            rotate: 0, //---旋转角度
            margin: 5, //---刻度标签与轴线之间的距离
            //color:'red',				//---默认取轴线的颜色
          },
          splitLine: {
            //---grid 区域中的分隔线
            show: false, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
            lineStyle: {
              //color:'red',
              //width:1,
              //type:'solid',
            },
          },
          splitArea: {
            //--网格区域
            show: false, //---是否显示，默认false
          },
        },
        yAxis: {
          show: true, //---是否显示
          position: "left", //---y轴位置
          offset: 0, //---y轴相对于默认位置的偏移
          type: "value", //---轴类型，默认'category'
          name: yTitle, //---轴名称
          nameLocation: "end", //---轴名称相对位置value
          nameTextStyle: {
            //---坐标轴名称样式
            color: "#fff",
            padding: [5, 0, 0, 5], //---坐标轴名称相对位置
          },
          nameGap: 15, //---坐标轴名称与轴线之间的距离
          //nameRotate:270,			//---坐标轴名字旋转

          axisLine: {
            //---坐标轴 轴线
            show: true, //---是否显示
            //------------------- 线 -------------------------
            lineStyle: {
              color: "#fff",
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            //---坐标轴 刻度
            show: false, //---是否显示
          },
          axisLabel: {
            //---坐标轴 标签
            show: true, //---是否显示
            inside: false, //---是否朝内
            rotate: 0, //---旋转角度
            margin: 8, //---刻度标签与轴线之间的距离
            //color:'red',				//---默认取轴线的颜色
          },
          splitLine: {
            //---grid 区域中的分隔线
            show: true, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
            lineStyle: {
              color: "#666",
              width: 1,
              type: "dashed", //---类型
            },
          },
          splitArea: {
            //--网格区域
            show: false, //---是否显示，默认false
          },
        },
        series: seriesData,
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    drawHorizontalBarChart(id, category, barData) {
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          splitLine: { show: false },
          boundaryGap: ["5%", "5%"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#ffffff",
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: category,
          splitLine: { show: false },
          boundaryGap: ["5%", "5%"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#ffffff",
              width: 1,
              type: "solid",
            },
          },
          axisTick: {
            show: false,
          },
          offset: 10,
          nameTextStyle: {
            fontSize: 15,
          },
        },
        series: [
          {
            name: "数量",
            type: "bar",
            data: barData,
            barWidth: 20,
            barGap: 10,
            smooth: true,
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [5, -2],
                textStyle: {
                  color: "#ffffff",
                  fontSize: 13,
                },
              },
            },
            itemStyle: {
              emphasis: {
                barBorderRadius: 7,
              },
              normal: {
                barBorderRadius: 7,
                color: function(params) {
                  var colorList = ["rgba(244,62,113,1)", "rgba(0,160,62,1)"];
                  if (params.dataIndex > 2) {
                    return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: colorList[1] },
                      { offset: 1, color: colorList[1] },
                    ]);
                  } else {
                    return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: colorList[0] },
                      { offset: 1, color: colorList[0] },
                    ]);
                  }
                },
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.production {
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
  .demo-form-inline {
    text-align: left;
    margin: 0 0.2rem;
    margin-top: 0.4rem;
    background-color: rgba(15, 30, 75, 0.749019607843137);
  }
  .table {
    margin: 0.4rem;
    margin-top: 0.6rem;
    border: rgba(0, 102, 153, 1) 1px solid;
    padding: 0.6rem;
    background-color: #0c2456 !important;
  }
  .chartContainerFather {
    width: 80%;
    float: left;
    padding: 0 0.1rem 0 0.1rem;
  }
  .tableContainer {
    width: 20%;
    float: right;
    padding: 0 0.1rem 0 0;
    .tableContainerSon {
      height: 12.2rem;
      .tableContainerSonTitle {
        padding: 0.2rem;
        color: #ffffff;
        font-size: 0.2rem;
        font-weight: bold;
      }
      .tableContainerSonTable {
        width: 90%;
        height: 11.6rem;
        margin: 0 auto;
      }
    }
  }
  .chartContainer {
    height: 4rem;
    margin-bottom: 0.1rem;
    .chartTitle {
      padding: 0.2rem;
      color: #ffffff;
      font-size: 0.2rem;
      font-weight: bold;
    }
    .chartContent {
      height: 3.2rem;
      .chartContChild {
        height: 1.3rem;
        // line-height: 1.2rem;
        width: 90%;
        margin: 0 auto;
        font-size: 0.2rem;
        font-weight: bold;
        color: #ffffff;
        p {
          padding: 0.2rem;
          span.sred {
            font-size: 0.3rem;
            color: red;
          }
          span.sgreen {
            font-size: 0.3rem;
            color: green;
          }
          span.syellow {
            font-size: 0.3rem;
            color: yellow;
          }
          span.spurple {
            font-size: 0.3rem;
            color: purple;
          }
        }
      }
    }
    .chartContentSon {
      width: 50%;
      height: 100%;
      float: left;
      .chartTit {
        padding: 0.1rem;
        color: #ffffff;
        font-size: 0.15rem;
        font-weight: bold;
      }
      .chartCont {
        width: 100%;
        height: 2.8rem;
      }
    }
  }
}
</style>
