<template>
  <div class="production">
    <!-- 内容区域 -->
    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">各单位人员情况({{ currentCompany }})</div>
          <div class="chartCont1" id="barChart1" ref="humanDetails"></div>
        </div>
        <el-radio-group class="company-selector" v-model="currentCompany">
          <el-radio-button v-for="(company, index) in companies" :label="company" :key="index"></el-radio-button>
        </el-radio-group>
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
        region: "",
      },
      // 分公司索引，轮播计数器
      count: 0,
      companies: ['独立项目','华北分公司','城轨分公司','西北分公司','房建分公司',],
      currentCompany: '独立项目',
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.echarts();
    });
  },
  watch: {
    currentCompany(val) {
      this.count = this.companies.indexOf(val);
      this.drawHumanDetails(this.count);
    },
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
    echarts() {
      this.drawHumanDetails();
    },
    drawHumanDetails(startWith = 0) {
      const elHumanDetails = this.$refs.humanDetails;
      const humanDetails = echarts.init(elHumanDetails);
      // simulate human details data
      const dataList = [
        {
          companyName: '独立项目',
          projectNames: ['安九铁路', '江汉七桥',],
          data: [[51, 21], [56, 33], [85, 48,],],
        },
        {
          companyName: '华北分公司',
          projectNames: ['太原节点改造', '虎峪河道路改造', '西安西三环', '潇河大桥', '左云十里河桥', '东峰路南延',],
          data: [[0, 5, 5, 20, 7, 8], [4, 15, 8, 57, 10, 9], [4, 15, 8, 57, 10, 9],],
        },
        {
          companyName: '城轨分公司',
          projectNames: ['建安街','地铁八号线','中北路停车场','武嘉高速','武大高速','新武金堤','七号线','常青花园道路改造',],
          data: [[15, 10, 5, 10, 25, 2, 32, 0,], [20, 12, 5, 34, 110, 16, 34, 5], [15, 14, 6, 40, 125, 12, 54, 3], ],
        },
        {
          companyName: '西北分公司',
          projectNames: ['中兰客专', '靖远黄河桥', '西宁昆仑路',],
          data: [[20, 4, 10], [40, 8, 10], [45, 10, 15],],
        },
        {
          companyName: '房建分公司',
          projectNames: ['房建项目部', '海口公交专用线', '美兰机场', 'G15沈海高速',],
          data: [[2, 0, 4, 6], [27, 10, 9, 20], [18, 5, 8, 20]],
        },
      ]
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
          data: ["一类劳务人员", "局聘", "定编人数"],
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
            data: dataList[startWith]['projectNames'],
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
            name: "局聘",
            type: "bar",
            barWidth: 60,
            stack: "outside",
            data: dataList[startWith]['data'][1],
          },
          {
            name: "一类劳务人员",
            type: "bar",
            stack: "outside",
            data: dataList[startWith]['data'][0],
          },
          {
            name: "定编人数",
            type: "bar",
            barGap: '10%',
            barWidth: 60,
            data: dataList[startWith]['data'][2],
          }
        ]
      };

      // first render echart
      this.companyName = dataList[startWith].companyName;
      humanDetails.setOption(option);

      window.addEventListener('resize', () => {
        humanDetails.resize();
      });

      // did not enable animation of human details before, enable here.
      if(!this.intervalHandler) {
        // this.enableAnimation(humanDetails, option, dataList);
      }
    },
    enableAnimation(humanDetails, option, dataList) {
      const self = this;

      self.intervalHandler = option.timeTicket = setInterval(function() {
        const timesOneTurn = dataList.length;
        self.count += 1;
        if (self.count >= timesOneTurn) {
          self.count = 0;
        }

        option.xAxis[0].data = dataList[self.count].projectNames;
        dataList[self.count].data.forEach((item, index) => {
          option.series[index].data = item;
        });

        self.currentCompany = dataList[self.count].companyName;
        humanDetails.setOption(option);
      }, 5000);
    },
  },
  destroyed() {
    clearInteval(this.intervalHandler);
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
    .company-selector {
      position: absolute;
      left: 50%;
      top: 8%;
      transform: translateX(-50%);
    }
  }
}
</style>
