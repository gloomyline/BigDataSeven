<template>
  <div class="wrapperContainer">
    <dv-border-box-10 class="chartContainer">
      <div class="wrapper">
        <div class="chartTitle">营业收入</div>
        <div id="income" class="chartContent" ></div>
      </div>
      <div class="wrapper">
        <div class="chartTitle">两金压降</div>
        <div id="drop" class="chartContent" ></div>
      </div>
    </dv-border-box-10>
    <dv-border-box-10 class="chartContainer">
      <div class="wrapper">
        <div class="chartTitle">净利润</div>
        <div id="profit" class="chartContent" ></div>
      </div>
      <div class="wrapper">
        <div class="chartTitle">经费预算（全周期）</div>
        <div id="cashflow" class="chartContent" ></div>
      </div>
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
      incomeData:[],
      dropData:[],
      profitData:[],
      cashflowData:[]
    }
  },
  mounted(){
    this.$nextTick(() => {
     this.initData()
    })
    
  },
  watch:{
    ny(newValue,oldValue){
      if(newValue!=oldValue){
        this.initData()
      }
    }
  },
  methods: {
    async initData(){
        var res = await financeApi.fetchdistrictBudget(this.ny) 
        console.log("片区预算数据",res)
        this.income(res['营业收入'])
        this.drop(res['两金压降'])
        this.profit(res['净利润'])
        this.cashflow(res['经营性现金流'])
    },
    income(data){
      // 营业收入
      console.log("营业收入",data)
      var deptId =[]
      var xAxisdata = []
      var target = []
      var finish = []
      var finishingRate = []
      data.map((item)=>{
        deptId.push(item.deptId)
        xAxisdata.push(item.deptName)
        target.push(item.target)
        finish.push(item.finish)
        finishingRate.push(item.finishingRate)

      })
      console.log("营业收入deptId",deptId)
      this.drawChart("income",xAxisdata,target,finish,finishingRate,deptId)
    },
    drop(data){
      // 两金压降
      var deptId =[]
      var xAxisdata = []
      var target = []
      var finish = []
      var finishingRate = []
      data.map((item)=>{
        deptId.push(item.deptId)
        xAxisdata.push(item.deptName)
        target.push(item.target)
        finish.push(item.finish)
        finishingRate.push(item.finishingRate)

      })
      this.drawChart("drop",xAxisdata,target,finish,finishingRate,deptId)
    },
    profit(data){
      // 净利润 
      var deptId =[]
      var xAxisdata = []
      var target = []
      var finish = []
      var finishingRate = []
      data.map((item)=>{
        deptId.push(item.deptId)
        xAxisdata.push(item.deptName)
        target.push(item.target)
        finish.push(item.finish)
        finishingRate.push(item.finishingRate)

      })
      this.drawChart("profit",xAxisdata,target,finish,finishingRate,deptId)
    },
    cashflow(data){
      // 经营性现金流
       var deptId =[]
      var xAxisdata = []
      var target = []
      var finish = []
      var finishingRate = []
      data.map((item)=>{
        deptId.push(item.deptId)
        xAxisdata.push(item.deptName)
        target.push(item.target)
        finish.push(item.finish)
        finishingRate.push(item.finishingRate)

      })
      // var xAxisdata = ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
      // var seriesdata = [60, 20, 86, 60, 80, 20,45,35,88] 
      this.drawChart("cashflow",xAxisdata,target,finish,finishingRate,deptId)
    },
    drawChart(id,xAxisdata,target,finish,finishingRate,deptId){
      var _this = this
      
      var myChart = echarts.init(document.getElementById(id));

        // 指定图表的配置项和数据
      var y1interval=0
      var y2interval=0
      var option = {
        color: ["#0fa0d6", "#ffec00", "#e62d2d", "orange","#f57A82","#0fc1d6"],  
        grid:{
          top:"15%",
          bottom:"15%",
        },
        tooltip: {
          trigger:"axis",
          // triggerOn:"click",
          formatter:"{b}<br>{a}:{c}<br>{a1}:{c1}<br>{a2}:{c2}%",
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
        },
        // legend: {
        //     data:['销量']
        // },
        legend:{
          textStyle:{
            color:"#fff"
          }
        },
        xAxis: {
            // data: ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
            data:xAxisdata,
            axisLabel: {  
              show: true,
              color: "#ccc",
              interval:0,  
              rotate:20 ,
              fontSize:11,
            },
            axisLine: {
              show:true,
              lineStyle: {
                color: "#aaa"
              }
            }
        },
        yAxis: [
        {
          type:'value',
          name:"亿元",
          axisLabel: {  
            show: true,
            color: "#eee",
            interval: 'auto',  
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
          },
          // interval: 3
        },
        {
          type:'value',
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
          },
          min:function(value){
            console.log("value",value)
            var MaxValue = 
          }
          
          // interval: 100 / 6
        }
      ],
        series: [
          {
            name: '目标',
            type: 'bar',
            barGap: 0,
            data: target,
            yAxisIndex: 0,
            barWidth:"20"
          },
          {
            name: '完成',
            type: 'bar',
            barGap: 0,
            data: finish,
            yAxisIndex: 0,
            barWidth:"20"
          },
          {
            name: '完成比',
            type: 'line',
            yAxisIndex: 1,
            data: finishingRate,
            // barWidth:"35"
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

      console.log("我要的数据",deptId)
      myChart.off('click')
      myChart.on('click', function (params) {
        console.log("params.dataIndex",params.dataIndex)
        console.log("点击事件deptId",deptId)
        _this.$router.push({ name: 'DistrictBudgetDetail', params: { ny: _this.ny ,pid: deptId[params.dataIndex] }})
      })
      window.addEventListener("resize", function() {
        myChart.resize();
      });
      
    }
  }
  
}
</script>
<style scoped>
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
  .wrapper{
    float: left;
    box-sizing: border-box;
    width:50%;
    padding:0.2rem;
  }
</style>
