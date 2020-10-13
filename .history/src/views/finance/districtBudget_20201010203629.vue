<template>
  <div class="wrapperContainer">
    片区预算营业收入、两金压降、净利润、经营性现金流
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
        <div class="chartTitle">经营性现金流</div>
        <div id="cashflow" class="chartContent" ></div>
      </div>
    </dv-border-box-10>

  </div>
</template>
<script>
import echarts from "echarts";
export default {
   mounted(){
    this.$nextTick(() => {
     this.income()
     this.drop()
    })
    
  },
  methods: {
    income(){
      // 回款率
      var xAxisdata = ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
      var seriesdata = [60, 20, 86, 60, 80, 20,45,35,88] 
      this.drawChart("income",xAxisdata,seriesdata)
    },
    drop(){
      // 回款率
      var xAxisdata = ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
      var seriesdata = [60, 20, 86, 60, 80, 20,45,35,88] 
      this.drawChart("drop",xAxisdata,seriesdata)
    },
    income(){
      // 回款率
      var xAxisdata = ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
      var seriesdata = [60, 20, 86, 60, 80, 20,45,35,88] 
      this.drawChart("income",xAxisdata,seriesdata)
    },
    income(){
      // 回款率
      var xAxisdata = ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
      var seriesdata = [60, 20, 86, 60, 80, 20,45,35,88] 
      this.drawChart("income",xAxisdata,seriesdata)
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
              type: 'bar',
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
    width:50%;
    padding:1rem;
  }
</style>
