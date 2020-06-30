<template>
  <div class="production">
    <!-- 内容区域 -->
    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">各单位人员情况({{ companyName }})</div>
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
      companyName: '',
      formInline: {
        user: "",
        region: "",
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
            data: ['安九铁路', '江汉七桥',],
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
            data: [51, 21]
          },
          {
            name: "局聘",
            type: "bar",
            stack: "outside",
            data: [56, 33],
          },
          {
            name: "实际人数",
            type: "bar",
            data: [107, 54,],
          },
          {
            name: "定聘人数",
            type: "bar",
            data: [85, 48,],
          }
        ]
      };

      const data = [
        {
          companyName: '独立项目',
          projectNames: ['安九铁路', '江汉七桥',],
          data: [[51, 21], [56, 33], [107, 54,], [85, 48,],],
        },
        {
          companyName: '华北分公司',
          projectNames: ['太原节点改造', '虎峪河道路改造', '西安西三环', '潇河大桥', '左云十里河桥', '东峰路南延',],
          data: [[0, 5, 5, 20, 7, 8], [4, 15, 8, 57, 10, 9], [4, 20, 13, 77, 17, 17], [4, 15, 8, 57, 10, 9],],
        },
        {
          companyName: '城轨分公司',
          projectNames: ['建安街','地铁八号线','中北路停车场','武嘉高速','武大高速','新武金堤','七号线','常青花园道路改造',],
          data: [[15, 10, 5, 10, 25, 2, 32, 0,], [20, 12, 5, 34, 110, 16, 34, 5], [35, 22, 10, 44, 135, 18, 66, 5],[15, 14, 6, 40, 125, 12, 54, 3], ],
        },
        {
          companyName: '西北分公司',
          projectNames: ['中兰客专', '靖远黄河桥', '西宁昆仑路',],
          data: [[20, 4, 10], [40, 8, 10], [60, 12, 20], [45, 10, 15],],
        },
        {
          companyName: '房建分公司',
          projectNames: ['房建项目部', '海口公交专用线', '美兰机场', 'G15沈海高速',],
          data: [[2, 0, 4, 6], [27, 10, 9, 20], [29, 10, 13, 26], [18, 5, 8, 20]],
        },
      ]
      // first render echart
      this.companyName = data[0].companyName;
      humanDetails.setOption(option);

      const self = this;
      let count = 0;
      option.timeTicket = setInterval(function() {
        const timesOneTurn = data.length;
        count += 1;
        if (count >= timesOneTurn) {
          count = 0;
        }

        option.xAxis[0].data = data[count].projectNames;
        data[count].data.forEach((item, index) => {
          option.series[index].data = item;
        });

        self.companyName = data[count].companyName;
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
