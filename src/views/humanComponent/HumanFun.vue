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
              style="height: 100%"
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
import echarts from 'echarts'
import { HumanNewApi } from '@/api'
export default {
  name: 'Production',
  data() {
    return {
      formInline: {
        user: '',
        region: '',
      },
    }
  },
  created() {
    this.ratio()
    this.salary()
  },
  mounted() {
    this.$nextTick(() => {
      this.echarts()
    })
  },

  methods: {
    async ratio() {
      const _date = new Date()
      const res = await HumanNewApi.fetchRatioData()
      if (res && res.code === '000000') {
        this.drawHumanFun(res.data)
      }
    },
    async salary() {
      const _date = new Date()
      const res = await HumanNewApi.fetchSalaryData()
      if (res && res.code === '000000') {
        this.drawSalaryTotal(
          res.data.costVo.yearPerformance,
          res.data.costVo.residue
        )
      }
    },
    onSubmit() {
      console.log('submit!')
    },
    goBack() {
      this.$router.push({ path: '/' })
    },
    goPro() {
      this.$router.push({ path: '/HumanDetails' })
    },
    mounted() {
      this.$nextTick(() => {
        this.echarts()
      })
    },

    echarts() {
      this.drawSalaryTotal()
    },
    drawSalaryTotal(yearPerformance, residue) {
      const salaryTotal = echarts.init(this.$refs.salaryTotal)
      // simulate salary total data
      const option = {
        title: {
          text: '工资总额年度预算执行情况',
          x: 'center',
          y: '3%',
          textStyle: {
            color: '#ffffff',
            fontSize: 24,
            lineHeight: 32,
          },
          show: true,
        },
        color: ['#2f89cf', '#fb3232', '#0f8cd6', '#0fa0d6', '#0fb4d6'],
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
        },
        grid: {
          top: '10%',
          bottom: '5%',
        },
        legend: {
          bottom: '5%',
          itemWidth: 10,
          itemHeight: 10,
          data: ['使用', '剩余'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: 16,
          },
        },
        series: [
          {
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              { value: residue, name: '剩余' },
              {
                value: yearPerformance,
                name: '使用',
              },
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: '{b} : {c}万 ({d}%)',
                  position: 'inner',
                },
                labelLine: { show: true },
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      }
      salaryTotal.setOption(option)
      window.addEventListener('resize', () => {
        salaryTotal.resize()
      })
    },
    drawHumanFun(data) {
      const humanDetails = echarts.init(this.$refs.humanDetails)

      let nameArr = []
      let productionArr = []
      let expenditureArr = []
      data.forEach((item) => {
        nameArr.push(item.name)
        productionArr.push(item.production)
        expenditureArr.push(item.expenditure)
      })

      // simulate human details data
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#dddc6b',
            },
          },
          formatter: '{b}<br/>{a0}:{c0}%<br/>{a1}:{c1}%',
        },
        legend: {
          top: '2%',
          data: ['经费开累计划执行比', '开累产值计划完成比'],
          textStyle: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '14',
          },
        },
        grid: {
          left: '20',
          top: '60',
          right: '30',
          bottom: '20',
          containLabel: true,
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 50,
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 50,
          },
        ],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              // interval: 1,
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: 14,
              },
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.2)',
              },
            },
            data: nameArr,
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: 'bottom',
            offset: 20,
          },
        ],

        yAxis: [
          {
            type: 'value',
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
              },
            },
            axisLabel: {
              textStyle: {
                color: 'rgba(255,255,255,.6)',
                fontSize: 14,
              },
            },

            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.1)',
              },
            },
          },
        ],
        series: [
          {
            name: '经费开累计划执行比',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                color: '#0184d5',
                width: 3,
              },
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
                      color: 'rgba(1, 132, 213, 0.4)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(1, 132, 213, 0.1)',
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
              },
            },
            itemStyle: {
              normal: {
                color: '#0184d5',
                borderColor: 'rgba(221, 220, 107, .1)',
                label: {
                  show: true,
                  textStyle: {
                    fontSize: 14,
                  },
                },
                borderWidth: 12,
              },
            },
            data: expenditureArr,
          },
          {
            name: '开累产值计划完成比',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                color: '#fb3232',
                width: 3,
              },
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
                      color: 'rgba(0, 216, 135, 0.4)',
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0, 216, 135, 0.1)',
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
              },
            },
            itemStyle: {
              normal: {
                color: '#fb3232',
                borderColor: 'rgba(221, 220, 107, .1)',
                borderWidth: 12,
                label: {
                  show: true,
                  textStyle: {
                    fontSize: 14,
                  },
                },
              },
            },
            data: productionArr,
          },
        ],
      }

      humanDetails.setOption(option)

      window.addEventListener('resize', () => {
        humanDetails.resize()
      })
    },
  },
}
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
