<template>
  <div class="finance">
    <dv-border-box-10 class="chartContainer">
      <div class="chartTitle">项目资金回款率</div>
      <div id="returnRate" class="chartContent" ></div>
    </dv-border-box-10>
    <dv-border-box-10 class="chartContainer">
      <div class="chartTitle">项目资金上缴率</div>
      <div id="turnInRate" class="chartContent" ></div>
    </dv-border-box-10>
    <dv-border-box-10 class="chartContainer">
      <div class="chartTitle">项目资金资金集中率</div>
      <div id="capitalRate" class="chartContent" ></div>
    </dv-border-box-10>
  </div>
</template>
<script>
import echarts from "echarts";
import { financeApi } from "@/api";
export default {
  props:["ny"],
  data(){
    return {
       companyNameData:[],
       // 回款率
       returnRateData:[],
       // 上缴率
       turnInRateData:[],
       // 资金集中率
       capitalRateData:[]
    }
  },
  created(){
    this.initData()
  },
  activated(){
    // this.drawChart()
   
  },
  watch:{
    ny(newValue,oldValue){
      if(newValue!=oldValue){
        this.initData()
      }
      
    }
  },
  mounted(){
    this.$nextTick(() => {
    this.initData()
    //  this.returnRate()
    //  this.turnInRate()
    //  this.capitalRate()
    })
    
  },
  methods:{
    async initData(){
      // var res = {
      //   code:"000",
      //   success:true,
      //   data:[
      //     {
      //       company: "湖北分公司",
      //       rateOfReturn: 0.94,
      //       payRate: 1.09,
      //       capital: 0.9,
      //       pid: 2
      //     },
      //     {
      //       company: "华北分公司",
      //       rateOfReturn: 0.8,
      //       payRate: 1,
      //       capital: 0.77,
      //       pid: 3
      //     },
      //     {
      //       company: "城轨分公司",
      //       rateOfReturn: 0.85,
      //       payRate: 0.93,
      //       capital: 0.99,
      //       pid: 4
      //     },
      //     {
      //       company: "西北分公司",
      //       rateOfReturn: 1.74,
      //       payRate: 1.25,
      //       capital: 1.15,
      //       pid: 6
      //     },
      //     {
      //       company: "武汉分公司",
      //       rateOfReturn: 0.86,
      //       payRate: 0,
      //       capital: 0.49,
      //       pid: 7
      //     },
      //     {
      //       company: "独立项目",
      //       rateOfReturn: 1.87,
      //       payRate: 1.87,
      //       capital: 1.77,
      //       pid: 8
      //     },
      //     {
      //       company: "海南项目群",
      //       rateOfReturn: 0.89,
      //       payRate: 0,
      //       capital: 0.6,
      //       pid: 9
      //     }
      //   ]
      // }
      const res = await financeApi.fetchMoneyCollection(this.ny)
      this.companyNameData=[]
      this.returnRateData=[]
      this.turnInRateData=[]
      this.capitalRateData=[]
      if(res){
        res.map((item)=>{
          console.log("回款率",item)
          this.companyNameData.push(item.company)
          this.returnRateData.push(item.rateOfReturn)
          this.turnInRateData.push(item.payRate)
          this.capitalRateData.push(item.capital)
        })
        this.returnRate()
        this.turnInRate()
        this.capitalRate()
      }
      

     

    },

    returnRate(){

      // 回款率
      // var xAxisdata = ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
      // var seriesdata = [60, 20, 86, 60, 80, 20,45,35,88] 
      // console.log("this.capitalRateData",this.capitalRateData)
      this.drawChart("returnRate",this.companyNameData,this.returnRateData)
    },
    turnInRate(){
      // 上缴率
      // var xAxisdata = ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
      // var seriesdata = [60, 20, 86, 60, 80, 20,45,35,88] 
      // console.log("this.turnInRateData",this.turnInRateData)
      this.drawChart("turnInRate",this.companyNameData,this.turnInRateData)
    },
    capitalRate(){
      // 资金集中率
      // var xAxisdata = ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
      // var seriesdata = [60, 20, 86, 60, 80, 20,45,35,88] 
      // console.log("this.capitalRateData",this.capitalRateData)
      this.drawChart("capitalRate",this.companyNameData,this.capitalRateData)
    },
    drawChart(id,xAxisdata,seriesdata){
      var myChart = echarts.init(document.getElementById(id));
        // 指定图表的配置项和数据
        var option = {
          color: ["#E4111f", "#e46c11", "#1188e4", "#11E46c", "orange","#f57A82","#0fc1d6"],  
          grid:{
            top:"15%",
            bottom:"15%",
          },
          tooltip: {},
          // legend: {
          //     data:['销量']
          // },
          xAxis: {
              // data: ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
              data:xAxisdata,
              axisLabel: {  
                show: true,
                color: "#ccc",
              },
              axisLine: {
                show:true,
                lineStyle: {
                  color: "#aaa"
                }
              }
          },
          yAxis: {
            axisLabel: {  
              show: true,
              color: "#eee",
              interval: 'auto',  
              formatter: '{value} %'  
            },
            axisLine: {
              show:true,
              lineStyle: {
                color: "#aaa"
              }
            },
            axisTick: {
              show:false
            },
            splitLine: {
              lineStyle: {
                color: ['#354277']
              }
            }
            
          },
          series: [{
              // name: '回款率',
              type: 'line',
              data: seriesdata,
              barWidth:"35"
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
    }
  }
}
</script>
<style  scoped>
  .chartTitle {
    padding: 0.2rem 0 0 0;
    color: #ffffff;
    font-size: 0.2rem;
    font-weight: bold;
  }
  .chartContent{
    height: 3.8rem;
  }
  .chartContainer {
    height: 4.5rem;
    margin-bottom: 0.2rem;
  }
  
</style>