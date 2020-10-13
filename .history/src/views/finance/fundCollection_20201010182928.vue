<template>
  <div class="finance">
    资金回款包含回款率（月度数据）、上缴率（月度数据）、资金集中率（月度数据）
    <dv-border-box-10>
      <div class="chartTitle">回款率</div>
      <div id="main" class="chartContent" ></div>
    </dv-border-box-10>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  activated(){
    this.drawChart()
  },
  mounted(){
    this.$nextTick(() => {
      this.drawChart()
    })
    
  },
  methods:{
    returnRate(){
      // 回款率
    },
    turnInRate(){
      // 上缴率
    },
    capitalRate(){
      // 资金集中率
    },
    drawChart(id, ydata){
      var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
          color: ["#E4111f", "#e46c11", "#1188e4", "#11E46c", "orange","#f57A82","#0fc1d6"],
            
          tooltip: {},
          // legend: {
          //     data:['销量']
          // },
          xAxis: {
              data: ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
          },
          yAxis: {
            axisLabel: {  
              show: true,  
              interval: 'auto',  
              formatter: '{value} %'  
            },  
          },
          series: [{
              // name: '回款率',
              type: 'bar',
              data: [60, 20, 86, 60, 80, 20,45,35,88],
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
    padding: 0.1rem;
    color: #ffffff;
    font-size: 0.2rem;
    font-weight: bold;
  }
  .chartContent{
    height: 400px;
  }
</style>