<template>
  <div class="production">
    <div class="head">
      <h1>周转材料</h1>
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
        <div class="chartContentSon1">
          <div class="chartTit1">A类材料(单位：吨)</div>
          <div class="pie-material-a" ref="materialAPie"></div>
          <div class="chartCont1 material-a" id="barChartA"></div>
        </div>
      </dv-border-box-10>

      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">B类材料(单位：吨)</div>
          <div class="chartCont1" id="barChartB"></div>
        </div>
      </dv-border-box-10>

      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">C类材料(单位：吨)</div>
          <div class="chartCont1" id="barChartC"></div>
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { turnoverApi } from '@/api';

export default {
  name: "Production",
  data() {
    return {
      typeA: [],
      typeB: [],
      typeC: [],
      pieRate: {},
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  created() {
    this._initData();
  },
  mounted() {
    this.$nextTick(() => {
      // this.drawTypeA();
      // this.drawTypeB();
      // this.drawTypeC();
      // this._drawPie();
    });
  },
  methods: {
    async _initData() {
      const loading = this.$loading({
        lock: true,
        text: "页面加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 1)",
      });
      this.typeA = await turnoverApi.fetchTypeA();
      console.log(this.typeA, '----------sdfsdfsdfsdfdsf------')
      this.drawTypeA();
      this.typeB = await turnoverApi.fetchTypeB();
      this.drawTypeB();
      this.typeC = await turnoverApi.fetchTypeC();
      this.drawTypeC();
      this.pieRate = await turnoverApi.fetchRate();
      this._drawPie();
      loading.close();
    },
    drawTypeA() {
      const barChartAOption = {
        // xData: ["东心湖", "清徐", "江汉", "安九", "武大", "中南", '武嘉', '萧何', '西宁', '沈海', '童庄河', '其他'],
        xData: this.typeA.data.map(item => `${item.deptId}-${item.name}`),
        legendData: [
          {
            name: "在用",
          },
          {
            name: "封存",
          },
        ],
        seriesData: [
          {
            name: "在用",
            type: "bar",
            // data: [17983-3364, 0, 2705, 7367, 0, 513, 81, 87, 0, 0, 1083, 2607,],
            data: this.typeA.data.map(item => item.isUsing === 0 ? item.isUsing : (item.isUsing).toFixed(2)),
            // stack: "使用情况",
            barWidth: "10", //---柱形宽度
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
            name: "封存",
            type: "bar",
            // data: [3364, 272, 0, 0, 0, 0, 0, 0, 0, 0, 0, 177,],
            data: this.typeA.data.map(item => item.isSealed === 0 ? item.isSealed : (item.isSealed).toFixed(2)),
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
              color: "rgb(244,128,163)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
        ],
      };
      this.drawDoubleBarChart(
        "barChartA",
        barChartAOption.xData,
        barChartAOption.legendData,
        barChartAOption.seriesData,
        "数量"
      ); 
    },
    drawTypeB() {
      const barChartBOption = {
        // xData: ["东心湖", "清徐", "江汉", "安九", "武大", "中南", '武嘉', '萧何', '西宁', '沈海', '童庄河', '其他'],
        xData: this.typeB.data.map(item => `${item.deptId}-${item.name}`),
        legendData: [
          {
            name: "在用",
          },
          {
            name: "闲置",
          },
        ],
        seriesData: [
          {
            name: "在用",
            type: "bar",
            // data: [0, 0, 7844, 25516, 460, 5004, 747, 4413, 0, 0, 5711, 4544,],
            data: this.typeB.data.map(item => item.isUsing === 0 ? item.isUsing : (item.isUsing).toFixed(2)),
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
            name: "闲置",
            type: "bar",
            // data: [3364, 272, 0, 0, 0, 0, 0, 0, 0, 0, 0, 177,],
            data: this.typeB.data.map(item => item.isUnused === 0 ? item.isUnused : (item.isUnused).toFixed(2)),
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
          {
            name: '利用率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            itemStyle: {
                //折线拐点标志的样式
                color: "#058cff"
            },
            lineStyle: {
                color: "#058cff"
            },
            areaStyle:{
                color: "rgba(5,140,255, 0.2)"
            },
            data: this.typeB.data.map(item => (item.rate * 100).toFixed(2)),
            // data: [100, 97, 100, 100, 100, 0, 0, 100, 85, 70, 60, 85],
          }
        ],
      };
      this.drawDoubleBarChart(
        "barChartB",
        barChartBOption.xData,
        barChartBOption.legendData,
        barChartBOption.seriesData,
        "数量",
        true
      );
    },
    drawTypeC() {
      const barChartCOption = {
        // xData: ["东心湖", "清徐", "江汉", "安九", "武大", "中南", '武嘉', '萧何', '西宁', '沈海', '童庄河', '其他'],
        xData: this.typeC.data.map(item => `${item.deptId}-${item.name}`),
        legendData: [
          {
            name: "在用",
          },
          {
            name: "闲置",
          },
        ],
        seriesData: [
          {
            name: "在用",
            type: "bar",
            // data: [0, 0, 7844, 25516, 460, 5004, 747, 4413, 0, 0, 5711, 4544,],
            data: this.typeC.data.map(item => item.isUsing === 0 ? item.isUsing : (item.isUsing).toFixed(2)),
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
            name: "闲置",
            type: "bar",
            // data: [3364, 272, 0, 0, 0, 0, 0, 0, 0, 0, 0, 177,],
            data: this.typeC.data.map(item => item.isUnused === 0 ? item.isUnused : (item.isUnused).toFixed(2)),
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
          {
            name: '利用率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 10, //标记的大小
            itemStyle: {
                //折线拐点标志的样式
                color: "#058cff"
            },
            lineStyle: {
                color: "#058cff"
            },
            areaStyle:{
                color: "rgba(5,140,255, 0.2)"
            },
            // data: [100, 97, 100, 100, 100, 0, 0, 100, 85, 70, 60, 85],
            data: this.typeC.data.map(item => (item.rate * 100).toFixed(2)),
          }
        ],
      };

      this.drawDoubleBarChart(
        "barChartC",
        barChartCOption.xData,
        barChartCOption.legendData,
        barChartCOption.seriesData,
        "数量",
        true
      );
    },
    onSubmit() {
      console.log("submit!");
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
    _drawPie() {
      const pie = echarts.init(this.$refs.materialAPie);
      const option = {
        title: [
          {
            text: "整体利用率",
            x: "center",
            y: "top",
            textStyle: {
              color: "#2f89cf",
              fontSize: "14"
            }
          }
        ],
        color: ["#27d08a", "#0f63d6", "#0f8cd6", "#0fa0d6", "#0fb4d6"],
        series: [
          {
            type: "pie",
            radius: "45%",
            center: ["52%", "50%"],
            selectedMode: "single",
            // data: [
            //   {
            //     value: 14443,
            //     name: "在用",
            //   },
            //   { value: 3636, name: "闲置", },
            //   { value: 177, name: '封存', },
            // ],
            data: [{ name: '在用', value: (this.pieRate.data.isUsing) }, { name: '闲置', value: (this.pieRate.data.isUnused) }, { name: '封存', value: (this.pieRate.data.isSealed) }],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} : {c}\n({d}%)",
                  // position: "inner"
                },
                labelLine: { show: true }
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      pie.setOption(option);
      window.addEventListener('resize', () => {
        pie.resize();
      });
    },
    drawDoubleBarChart(id, xData, legendData, seriesData, yTitle, isDouble) {
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
        // 设置滚动条
        // dataZoom: [{
        //   type: 'slider',
        //   show: true, //flase直接隐藏图形
        //   xAxisIndex: [0],
        //   left: '9%', //滚动条靠左侧的百分比
        //   bottom: -5,
        //   start: 0,//滚动条的起始位置
        //   end: 20 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
        // }],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          type: "scroll", //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
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
          name: "      项目", //---轴名称
          nameLocation: "end", //---轴名称相对位置
          triggerEvent: true,
          nameTextStyle: {
            //---坐标轴名称样式
            color: "#fff",
            padding: [5, 0, 0, -5], //---坐标轴名称相对位置
            fontSize: 14,
            // fontWeight: "bold",
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
            interval: 0,
            //color:'red',				//---默认取轴线的颜色
            textStyle: {
              fontSize: 14,
              // fontWeight: "bold",
            },
            formatter: function(params) {
              return params.split('-')[1];
            },
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
            fontSize: 14,
            // fontWeight: "bold",
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
            textStyle: {
              fontSize: 14,
              // fontWeight: "bold",
            },
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
      if(isDouble) {
        const oldYAxis = option.yAxis;
        option.yAxis = [
          oldYAxis,
          {
            type: 'value',
            name: '利用率',
            nameTextStyle: { color: '#fff' },
            position: 'right',
            splitLine: { show: true, color: '#fff',},
            axisLine: { show:true, color: '#fff',},
            axisLabel: { show: true, formatter: '{value} %', color: '#fff',},
          }
        ]
      }
      myChart.setOption(option);
      myChart.on("click", function(params) {
        if (params.componentType == "xAxis") {
          // alert("单击了" + params.value + "x轴标签");
          const deptId = params.value.split('-')[0]
          _that.$router.push({ name: "TurnoverDetails", params: { deptId } });
        }
      });
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
        &.material-a {
          display: inline-block;
          vertital-align: top;
          width: 76%;
        }
      }
      .pie-material-a {
        display: inline-block;
        vertital-align: top;
        width: 24%;
        height: 3.4rem
      }
    }
  }
}
</style>
