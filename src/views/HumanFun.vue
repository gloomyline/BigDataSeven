<template>
  <div class="production">
    <!-- 内容区域 -->
    <div class="chartContainer">
      <el-container class="container-top" style="height: 80vh;">
        <el-aside width="70%" style="padding-right: 10px;">
          <dv-border-box-10>
            <div
              class="echart-human-details"
              ref="humanDetails"
              style="padding-top: 80px;height: 80%"
            ></div>
          </dv-border-box-10>
        </el-aside>
        <el-aside width="30%" style="padding-left: 10px;">
          <dv-border-box-10>
            <div
              class="echart-salary-total"
              ref="salaryTotal"
              style="width: 100%;height: 100%;"
            ></div>
          </dv-border-box-10>
        </el-aside>
      </el-container>
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
      this.drawHumanFun();
      this.drawSalaryTotal();
    },
    drawSalaryTotal() {
      const salaryTotal = echarts.init(this.$refs.salaryTotal);
      // simulate salary total data
      const option = {
        title: {
          text: "工资总额年度预算执行情况",
          x: "center",
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
            lineHeight: 32,
          },
          show: true,
        },
        color: ["#2f89cf", "#0f63d6", "#0f8cd6", "#0fa0d6", "#0fb4d6"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        grid: {
          top: "10%",
        },
        legend: {
          top: "75%",
          itemWidth: 10,
          itemHeight: 10,
          data: ["完成", "剩余"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          }
        },
        series: [
          {
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              {
                value: 78,
                name: "完成",
              },
              { value: 42, name: "剩余" },
            ],
             itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} : {c}万",
                  position: "inner"
                },
                labelLine: { show: true }
              }
            },
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
      salaryTotal.setOption(option);
      this._addResizeListener(salaryTotal);
    },
   drawHumanFun() {
      const elHumanDetails = this.$refs.humanDetails;
      const humanDetails = echarts.init(elHumanDetails);
      // simulate human details data
      const option = {
       
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#dddc6b"
            }
          }
        },
        legend: {
          top: "0%",
          data: [
            "经费开累计划执行比",
            "开累产值计划完成比"
          ],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "8"
          }
        },
        grid: {
          left: "20",
          top: "30",
          right: "30",
          bottom: "10",
          containLabel: true
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
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
            },

            data: ["项目一", "项目二", "项目三", "项目四", "项目五", "项目六", "项目七", "项目八", "项目九", "项目十", "项目十一"]
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: "bottom",
            offset: 20
          }
        ],

        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)"
              }
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12
              }
            },

            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)"
              }
            }
          }
        ],
        series: [
          {
            name: "经费开累计划执行比",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                color: "#0184d5",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(1, 132, 213, 0.4)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(1, 132, 213, 0.1)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            },
            itemStyle: {
              normal: {
                color: "#0184d5",
                borderColor: "rgba(221, 220, 107, .1)",
                label: {
                  show: true
                },
                borderWidth: 12
              }
            },
            data: [73, 79, 80, 60, 57, 33, 44, 55, 66, 77, 88, 99, 25, 21]
          },
          {
            name: "开累产值计划完成比",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                color: "#00d887",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 216, 135, 0.4)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 216, 135, 0.1)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            },
            itemStyle: {
              normal: {
                color: "#00d887",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
                label: {
                  show: true
                }
              }
            },
            data: [66, 79, 97, 23, 66, 88, 71, 61, 51, 41, 31, 55, 66, 67]
          }
        ]
      };
     
      humanDetails.setOption(option);
      this._addResizeListener(humanDetails);
    },
    _addResizeListener(echartIns) {
      window.addEventListener("resize", () => {
        echartIns.resize();
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
