<template>
  <div class="engineering">
    <div class="head">
      <div class="left">
        <el-date-picker
          v-model="ny"
          type="month"
          :picker-options="pickerOptions"
          value-format="yyyy-MM"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <!-- <h1>资金管理</h1> -->
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
    <div>

      <!-- tab -->
      <div>
        <div class="radio-group">
          <span
            v-for="(tab, index) in tabs"
            :class="{ active: current === index }"
            :key="index"
            @click="tabChange(index)">{{ tab }}
          </span>
        </div>
        <!-- <div style="margin:10px 0;"></div> -->
        <!-- <keep-alive>
          <component :is="currentComponent" :ny="ny"></component>
        </keep-alive> -->
      </div>

      <!-- tab end -->
      <div class="chartContainerFather">
        <dv-border-box-10 class="chartContainer">
          <div class="title">重点项目管理指标情况</div>
          <div class="content">
            <div class="echartwrapper" id="valuation"></div>
          </div>
        </dv-border-box-10>
        <dv-border-box-10 class="chartContainer">
          <div class="title">十三五各年度经济运行趋势分析</div>
          <div class="content2">
            <div class="echartwrapper" id="earing"></div>
            <div class="echartwrapper" id="profit"></div>
          </div>
        </dv-border-box-10>
      </div>
    </div>
  </div>
</template>
<script>

import echarts from "echarts";
import { financeApi } from "@/api";
export default {

  mounted() {},
  created() {
    console.log("this.ny",this.ny)
    if (!this.ny){
      const date = new Date();
      this.ny = `${date.getFullYear()}-${('0' + date.getMonth()).substr(-2)}`
    }
    this.initData()
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
  data() {
    return {
      ny: this.$route.params.ny,
      pickerOptions: {
        disabledDate(time) {
          return time >Date.now();
        },
      },      
    };
  },
  watch:{
    ny(newValue,oldValue){
      financeApi.fetchFinanceValuation(this.ny).then((data)=>{
        this.financeValuationData = data;   
        this.financeValuation()
      })
    }
  },
  
  methods: {
     initData(){
      // 获取项目计价回款数据
      financeApi.fetchFinanceValuation(this.ny).then((data)=>{
        this.financeValuationData = data;   
        this.financeValuation()
      })
      financeApi.fetchFinancePlanEarning().then((data)=>{
        this.FinancePlanData = data;
        this.financePlanEarning()
        this.financeProfit()
      })
    },
    financeValuation(){
      console.log("重点项目管理指标情况",this.financeValuationData.data)
      let valuationData = this.financeValuationData.data
      
      let xData = []
      let legendData = []
      
      
      let rateReturn =[] //计价回款率
      let revenueRate =[] //产值收入率
      let interestRate =[]  //资金上缴率

      for (var i in valuationData ) {
        //项目名称
        xData.push(valuationData[i].deptName)
        rateReturn.push(valuationData[i].rateReturn)
        revenueRate.push(valuationData[i].revenueRate)
        interestRate.push(valuationData[i].interestRate)
        
      }
      let seriesData =[
        {
          name: '计价回款率',
          label:{
            color:"#fff",
            position:"top",
            show:true,
            formatter:"{c}%"
          },
          type: 'bar',
          data: rateReturn
        },
        {
          name: '产值收入率',
          label:{
            color:"#fff",
            position:"top",
            show:true,
            formatter:"{c}%"
          },
          type: 'bar',
          data: revenueRate
        },
        {
          name: '资金上缴率',
          label:{
            color:"#fff",
            position:"top",
            show:true,
            formatter:"{c}%"
          },
          type: 'bar',
          data: interestRate
        },
      ]
      var myChart = echarts.init(document.getElementById("valuation"));
      //图表配置
      var option = {
        legend:{
          data:["计价回款率","产值收入率","资金上缴率"],

          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          },
        },
        color: ["#2f89cf", "#27d08a", "#e62d2d", "#0fa0d6", "#0fb4d6"],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
           type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter:"{a}{c}%<br>{a1}{c1}%<br>{a2}{c2}%"

        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top:"12%",
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
          
            data: xData,
            axisTick: {
              alignWithLabel: true
            },
            nameTextStyle: {
              //---坐标轴名称样式
              color: "#fff",
              padding: [5, 0, 0, -5], //---坐标轴名称相对位置
              fontSize: 12,
              // fontWeight: "bold",
            },
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
              rotate: 40, //---旋转角度
              margin: 5, //---刻度标签与轴线之间的距离
              interval: 0,
              //color:'red',				//---默认取轴线的颜色
              textStyle: {
                fontSize: 12,
                // fontWeight: "bold",
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            
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
          splitLine: {
                show: true,
                lineStyle:{
                  color: ['#315070'],
                  width: 1,
                  type: 'solid'
              }
        　　},
        }
      ],
        series: seriesData
      }
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });  
    },
    financePlanEarning(){
      console.log("this.FinancePlanData",this.FinancePlanData.data.earing)
      let earing= this.FinancePlanData.data.earing
      let id="earing"
      let xData=[]
      let legendData=['营业收入','两金余额']
      let takingData=[]
      let balanceData=[]
      let yTitle="亿元"
      let unit = ""
      for(var i in earing){
        console.log("earing[i].taking",earing[i].taking)
        xData.push(earing[i].year)
        takingData.push(earing[i].taking)
        balanceData.push(earing[i].balance)
      }
      console.log("xData,taking,taking",xData,takingData,balanceData)
      let seriesData=[
        {
            name: '营业收入',
            type: 'line',
            itemStyle:{
              normal:{
                label:{
                  show:true,
                  textStyle:{
                    color:"#fff"
                  }
                }
              }
            },       
            data: takingData
          },
          {
            name: '两金余额',
            type: 'line',
            itemStyle:{
              normal:{
                label:{
                  show:true,
                  textStyle:{
                    color:"#fff"
                  }
                }
              }
            },
            data:balanceData
          },
      ]   
      this.drawEcharsLine(id, xData, legendData, seriesData, yTitle,unit)
    },
    financeProfit(){
      let profit= this.FinancePlanData.data.profit
      // console.log("this.FinancePlanData.data.profit",this.FinancePlanData.data.profit)
      //let earing= this.FinancePlanData.data.earing
      let id="profit"
      let xData=[]
      let legendData=['净利润','货币存量']
      let profitData=[]
      let monetaryData=[]
      let yTitle="百万"
      let unit = ""
      for(var i in profit){
        xData.push(profit[i].year)
        profitData.push(profit[i].profit)
        monetaryData.push(profit[i].monetary)
      }
      console.log("xData,profitData,monetaryData",xData,profitData,monetaryData)
      let seriesData=[
        {
          name: '净利润',
          type: 'line',
          label:{
            position:"top"
          },
          itemStyle:{
            normal:{
              label:{
                show:true,
                textStyle:{
                  color:"#fff"
                }
              }
            }
          },  
          data: profitData
        },
        {
          name: '货币存量',
          type: 'line',
          itemStyle:{
            normal:{
              label:{
                show:true,
                textStyle:{
                  color:"#fff"
                }
              }
            }
          },         
          data:monetaryData
        },
      ]
      this.drawEcharsLine(id, xData, legendData, seriesData, yTitle,unit)
    },

    drawEcharsLine(id, xData, legendData, seriesData, yTitle,unit){
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        legend:{
          data:legendData, //["营业收入","两金余额"],
          top:"12%",
          textStyle: {
            color: "rgba(255,255,255,.6)"
          }
        },
        title: {
          // "十三五规划对比图",
          x: "center",
          y: "top",
          subtextStyle:{
            align:'right',
            rich: {
                a: {
                    // 没有设置 `align`，则 `align` 为 right
                }
            }
          },
          textStyle: {
            color: "#fff",
            fontSize: "14"
          },
          subtext: unit,
          rich: {
            title: {
              color: '#eee',
              align: 'right'
            },
          }
        },    
        grid: {
          left: '5%',
          right: '5%',
          bottom: '3%',
          top:'20%',
          containLabel: true
        },
        color: [ "#27d08a", "#e62d2d", "#0fa0d6", "#0fb4d6"],
        tooltip: {
          trigger: 'axis',
          // axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          //  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          // }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: '年度',
            data: xData,//['2015年', '2016年','2017年','2018年','2019年'],
            axisTick: {
              alignWithLabel: true
            },
            nameTextStyle: {
              //---坐标轴名称样式
              color: "#fff",
              padding: [5, 0, 0, -5], //---坐标轴名称相对位置
              fontSize: 14,
              // fontWeight: "bold",
            },
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
                fontSize: 12,
                // fontWeight: "bold",
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name:yTitle,
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
            splitLine: {
              show: true,
              lineStyle:{
                color: ['#315070'],
                width: 1,
                type: 'solid'
              }
        　　},
          }
        ],
        series: seriesData
      }
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });  
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
    tabChange: function(tab) {
      this.tabView = this.componentsList[tab];
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  position: relative;  
  .left {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.chartContainerFather {
    width: 100%;
    padding: 0 0.2rem 0 0.2rem;
    .chartContainer {
      height: 4rem;
      margin-bottom: 0.1rem;
      .title {
        font-size:0.2rem;
        height:0.5rem;
        line-height:0.5rem;
        color:#fff;

      }
      .content {
        .echartwrapper{
          width: 100%;
          height: 3.4rem;
        }
      }
      .content2 {
        display: flex;
        .echartwrapper{
          flex:1;
          
          // width: 100%;
          height: 3.4rem;
        }
        
      }
      
    }
  }
// .radio-group span {
//   display: inline-block;
//   letter-spacing: normal;
//   cursor: pointer;
//   box-sizing: border-box;
//   width: 106px;
//   height: 40px;
//   line-height: 40px;
//   border-radius: 5px 5px 0px 0px;
//   text-align: left;
//   color: #fff;
//   font-size: 12px;
//   text-indent: 30px;
//   background-color: #67737e;
//   margin: 5px;
// }

// .radio-group .cur {
//   background-color: #1b88e7;
// }
</style>
