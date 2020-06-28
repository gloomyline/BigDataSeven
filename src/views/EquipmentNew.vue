<template>
  <div class="production">
    <div class="head">
      <h1>机械设备</h1>
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
    <!-- 内容区域 -->
    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon">
          <div class="chartTit">项目大型机械设备</div>
          <div class="chartCont" id="barChart1"></div>
        </div>
        <div class="chartContentSon">
          <div class="chartTit" @click="jumpTzDetail()">机械设备使用情况</div>
          <div class="chartCont" id="circlePieChart"></div>
        </div>
      </dv-border-box-10>
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">项目机械设备</div>
          <div class="chartCont1" id="barChart2"></div>
        </div>
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
    };
  },
  mounted() {
    this.$nextTick(() => {
      const singleBarOption = {
        xData: [
          "类型1",
          "类型2",
          "类型3",
          "类型4",
          "类型5",
          "类型6",
          "类型7",
          "类型8",
          "类型9",
          "类型10",
          "类型11",
          "类型12",
        ],
        seriesData: [
          3020,
          4800,
          3600,
          6050,
          4320,
          6200,
          5050,
          7200,
          4521,
          6700,
          8000,
          5020,
        ],
      };
      this.drawSingleBarChart(
        "barChart1",
        singleBarOption.xData,
        singleBarOption.seriesData
      );

      const pieOption = {
        legendData: [
          "直达",
          "营销广告",
          "搜索引擎",
          "邮件营销",
          "联盟广告",
          "视频广告",
        ],
        seriesData: [
          { value: 300, name: "长期闲置" },
          { value: 350, name: "在用" },
          { value: 200, name: "闲置" },
        ],
        innerCircleData: [{ value: 1000, name: "主要机械设备" }],
      };
      this.drawCirclePieChart(
        "circlePieChart",
        pieOption.legendData,
        pieOption.seriesData,
        pieOption.innerCircleData
      );

      const barChartBOption = {
        xData: [
          "项目一",
          "项目二",
          "项目三",
          "项目四",
          "项目五",
          "项目六",
          "项目七",
          "项目八",
          "项目九",
          "项目十",
          "项目十一",
        ],
        legendData: [
          {
            name: "大型机械设备",
          },
          {
            name: "其他机械设备",
          },
        ],
        seriesData: [
          {
            name: "大型机械设备",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10],
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
            name: "其他机械设备",
            type: "bar",
            data: [40, 22, 18, 35, 42, 40, 40, 22, 18, 35, 42],
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
        "barChart2",
        barChartBOption.xData,
        barChartBOption.legendData,
        barChartBOption.seriesData,
        "数量"
      );
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
    jumpTzDetail() {
      this.$router.push({ name: "TZEquipmentDetails" });
    },
    drawSingleBarChart(id, xData, seriesData) {
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        tooltip: {
          trigger: "axis",
        },
        //-------------   x轴   -------------------
        xAxis: {
          show: true, //---是否显示
          position: "bottom", //---x轴位置
          offset: 0, //---x轴相对于默认位置的偏移
          type: "category", //---轴类型，默认'category'
          name: "类型", //---轴名称
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
          data: xData,
        },

        //----------------------  y轴  ------------------------
        yAxis: {
          show: true, //---是否显示
          position: "left", //---y轴位置
          offset: 0, //---y轴相对于默认位置的偏移
          type: "value", //---轴类型，默认'category'
          name: "数量", //---轴名称
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

        //------------ 内容数据  -----------------
        series: [
          {
            name: "数量", //---系列名称
            type: "bar", //---类型
            legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
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
              barBorderRadius: [18, 18, 0, 0],
            },
            barWidth: "20", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            data: seriesData,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    drawDoubleBarChart(id, xData, legendData, seriesData, yTitle) {
      var myChart = echarts.init(document.getElementById(id));
      var _that = this;
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
          name: "项目", //---轴名称
          nameLocation: "end", //---轴名称相对位置
          triggerEvent: true,
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
      myChart.on("click", function(params) {
        if (params.componentType == "xAxis") {
          // alert("单击了" + params.value + "x轴标签");
          _that.$router.push({ name: "BigEquipmentDetails" });
        }
      });
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    drawCirclePieChart(id, legendData, seriesData, innerCircleData) {
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          textStyle: {
            //----图例内容样式
            color: "#fff", //---所有图例的字体颜色
            //backgroundColor:'black',	//---所有图例的字体背景色
          },
          data: legendData,
        },
        series: [
          {
            name: "自有机械设备",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],

            label: {
              position: "inner",
            },
            labelLine: {
              show: false,
            },
            data: innerCircleData,
          },
          {
            name: "自有机械设备",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center",
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33,
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
            data: seriesData,
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
    width: 100%;
    padding: 0 0.2rem 0 0.2rem;
  }
  .chartContainer {
    height: 4rem;
    margin-bottom: 0.1rem;
    .chartContentSon {
      width: 50%;
      height: 100%;
      float: left;
      .chartTit {
        padding: 0.15rem;
        color: #ffffff;
        font-size: 0.2rem;
        font-weight: bold;
      }
      .chartCont {
        width: 100%;
        height: 3.4rem;
      }
    }
    .chartContentSon1 {
      width: 100%;
      height: 100%;
      clear: both;
      .chartTit1 {
        padding: 0.15rem;
        color: #ffffff;
        font-size: 0.2rem;
        font-weight: bold;
      }
      .chartCont1 {
        width: 100%;
        height: 3.4rem;
      }
    }
  }
}
</style>
