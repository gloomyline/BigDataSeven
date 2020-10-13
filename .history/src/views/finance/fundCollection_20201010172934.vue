<template>
  <div class="finance">
    资金回款包含回款率（月度数据）、上缴率（月度数据）、资金集中率（月度数据）
    <dv-border-box-10>
      <div id="main" style="width: 600px;height:400px;"></div>
    </dv-border-box-10>
  </div>
</template>
<script>
export default {
  mounted(){
    this.drawChart()
  },
  methods:{
    drawChart(){
      var myChart = echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
  }
}
</script>
