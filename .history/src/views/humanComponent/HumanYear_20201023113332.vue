<template>
  <div class="production">
    <!-- 内容区域 -->
    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">年度绩效</div>
          <div class="chartCont1" id="year" ref="certificateReserve"></div>
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>
<script>
import { HumanNewApi  } from '@/api';
import echarts from "echarts";

export default {
  name: "Production",
  props:["ny"],
  data() {
    return {
      formInline: {
        user: "",
        region: "",
        echarData: []
      }
    };
  },
  mounted() {
    this.initData()
    this.$nextTick(() => {
      this.echarts();
    });
  },

  methods: {
    async initData() {
      var res = await HumanNewApi.fetchDispatchHumanDetailData(this.ny)
      // console.log(this.echarData, 'lm res')
      console.log("数据柱图",res["柱图"])
      

      // console.log("数据表格",res["表格"])
      this.drawYearChart(res["柱图"])
    },
    onSubmit() {
      console.log("submit!");
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
    goPro() {
      this.$router.push({ path: "/HumanDetails" });
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts();
      });
    },

    echarts() {
      this.drawYearChart();
    },
    drawYearChart(data) {
      console.log(data,"-------------datatotal")
      
      // simulate data
      if(data) {

      var lastThreeYearname = []
      var lastFiveYearname = []
      var xAxisData = []
      var lessThan = []
      var lessAmong = []
      var greaterAmong = []
      var greaterThan = []
      var keys = {
        "lessThan":lessThan
      };
      for (let key in data){
        console.log("ddaa``````",data)
          xAxisData.push(key)
          console.log("data[key]",data[key]);
          for (let key in data[key]){
            console.log("key",key)
            // yy[key]
            // keys[key].push(data[key][key])
            // console.log("key", keys[key])
            // key.push(data[key][key])
          }
          
      }
      console.log("lessThan",lessThan)
      console.log("lessThan",keys["lessThan"])

      console.log("xAxisData",xAxisData)
      
       var myChart = echarts.init(document.getElementById("year"));
        const option = {
          color: ["#fb3232", "#60c5ba", "#feee7d"],
          tooltip: {
            trigger: "item",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter(params){
              console.log("wqwerqwerqwer",params)        
            }
          },
          legend: {
            x: "center",
            y: "top",
            // data: ["已用", "可用存量"],
            textStyle: { color: "rgba(255, 255, 255, .6)", fontSize: 12 }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "2%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: [
                "近三年",
                "近五年"
              ],
              axisLabel: {
                interval: 0,
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: 14
                }
              },
              axisLine: {
                lineStyle: {
                  color: "rgba(255,255,255,.2)"
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              axisLabel: {
                textStyle: {
                  color: "rgba(255,255,255,.6)",
                  fontSize: 16
                }
              },
              axisLine: {
                lineStyle: { color: "rgba(255, 255, 255, .2)" }
              }
            }
          ],
          series: [
            {
              name: "小于60",
              type: "bar",
              stack: "outside",
              data:[20,30]
              // label: {
              //   show: true,
              //   color: '#3398DB',
              //   formatter: function(params) {
              //      if(Number.parseFloat(params.data) === 0 || Number.parseFloat(total[params.dataIndex]) === 0) {
              //       return `0(0.00%)`
              //     } else {
              //       return `${params.data} (${(Number.parseFloat(params.data)/Number.parseFloat(total[params.dataIndex]) * 100).toFixed(2)}%)`
              //     }
              //     console.log((Number.parseFloat(params.data)/Number.parseFloat(total[params.dataIndex])))
              //     // return `${params.data} (${(Number.parseFloat(params.data)/Number.parseFloat(total[params.dataIndex]) * 100).toFixed(2)}%)`
              //   },
              // },
            },
            {
              name: "60-70分",
              type: "bar",
              stack: "outside",
              data:[20,30]
            },
            {
              name: "70-80分",
              type: "bar",
              stack: "outside",
              data:[20,30]
            },
            {
              name: "80分以上",
              type: "bar",
              stack: "outside",
              data:[20,30]
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener('resize', () => {
          myChart.resize();
        });
      }
      // 暂时屏蔽
      // const unuseds = [5, 10, 4, 4, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0];
      // const total = usings.map((item, index) => (item + unuseds[index]));
      // const certificateReserve = echarts.init(this.$refs.certificateReserve);
      // const option = {
      //   color: ["#fb3232", "#60c5ba", "#feee7d"],
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       // 坐标轴指示器，坐标轴触发有效
      //       type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      //     },
      //   },
      //   legend: {
      //     x: "center",
      //     y: "top",
      //     data: ["已用", "可用存量"],
      //     textStyle: { color: "rgba(255, 255, 255, .6)", fontSize: 12 }
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "2%",
      //     containLabel: true
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       data: [
      //         "市政",
      //         "公路",
      //         "建筑",
      //         "铁路",
      //         "水利水电",
      //         "机电",
      //         "市政公路",
      //         "市政海航",
      //         "公路港航",
      //         "建筑市政",
      //         "铁路港航",
      //         "建筑水利水电",
      //         "公路市政建筑",
      //         "公路铁路市政"
      //       ],
      //       axisLabel: {
      //         interval: 0,
      //         textStyle: {
      //           color: "rgba(255,255,255,.6)",
      //           fontSize: 14
      //         }
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: "rgba(255,255,255,.2)"
      //         }
      //       }
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: "value",
      //       axisLabel: {
      //         textStyle: {
      //           color: "rgba(255,255,255,.6)",
      //           fontSize: 16
      //         }
      //       },
      //       axisLine: {
      //         lineStyle: { color: "rgba(255, 255, 255, .2)" }
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: "已用",
      //       type: "bar",
      //       stack: "outside",
      //       data: usings,
      //       label: {
      //         show: true,
      //         color: '#3398DB',
      //         formatter: function(params) {
      //           if(Number.parseFloat(params.data) === 0 || Number.parseFloat(total[params.dataIndex]) === 0) {
      //               return `0(0.00%)`
      //           } else {
      //             return `${params.data} (${(Number.parseFloat(params.data)/Number.parseFloat(total[params.dataIndex]) * 100).toFixed(2)}%)`
      //           }
      //           // return `${params.data} (${(Number.parseFloat(params.data)/Number.parseFloat(total[params.dataIndex]) * 100).toFixed(2)}%)`
      //         },
      //       },
      //     },
      //     {
      //       name: "可用存量",
      //       type: "bar",
      //       stack: "outside",
      //       data: unuseds,
      //       label: {
      //         show: true,
      //         formatter: function(params) {
      //           if(Number.parseFloat(params.data) === 0 || Number.parseFloat(total[params.dataIndex]) === 0) {
      //               return `0(0.00%)`
      //           } else {
      //             return `${params.data} (${(Number.parseFloat(params.data)/Number.parseFloat(total[params.dataIndex]) * 100).toFixed(2)}%)`
      //           }
      //           // return `${params.data} (${(Number.parseFloat(params.data)/Number.parseFloat(total[params.dataIndex]) * 100).toFixed(2)}%)`
      //         },
      //       },
      //     }
      //   ]
      // };
      // certificateReserve.setOption(option);
      // window.addEventListener('resize', () => {
      //   certificateReserve.resize();
      // });
    }
  }
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
    height: 8rem;
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
        height: 6.4rem;
      }
    }
  }
}
</style>
