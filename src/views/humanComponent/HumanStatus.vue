<template>
  <div class="production">
    <!-- 内容区域 -->
    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">各单位人员情况</div>
          <div class="chartCont1" id="barChart1" ref="humanDetails"></div>
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import groupStructure from "@/assets/js/groupStructureData";

export default {
  name: "Production",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.echarts();
    });
  },

  methods: {
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
      this.drawHumanDetails();
    },
    drawHumanDetails() {
      const elHumanDetails = this.$refs.humanDetails;
      const humanDetails = echarts.init(elHumanDetails);
      // simulate human details data
      const option = {
        color: ["#a5dff9", "#3398DB", "#60c5ba", "#feee7d"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["一类劳务人员", "局聘", "实际人数", "定聘人数"],
          textStyle: { color: "rgba(255, 255, 255, .6)", fontSize: 12 }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "18%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["项目一", "项目二", "项目三", "项目四", "项目五", "项目六"],
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12
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
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: { color: "rgba(255, 255, 255, .2)" }
            }
          }
        ],
        series: [
          {
            name: "一类劳务人员",
            type: "bar",
            stack: "outside",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "局聘",
            type: "bar",
            stack: "outside",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "实际人数",
            type: "bar",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "定聘人数",
            type: "bar",
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      };

      option.timeTicket = setInterval(function() {
        var data0 = option.series[0].data;
        var p2 = data0.shift();
        data0.push(p2);

        var kl = option.xAxis[0].data.shift();
        option.xAxis[0].data.push(kl);
        humanDetails.setOption(option);
      }, 3000);
      window.addEventListener('resize', () => {
        humanDetails.resize();
      });
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
