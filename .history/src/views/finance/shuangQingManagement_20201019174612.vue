<template>
  <div class="wrapperContainer">
    <dv-border-box-10 class="chartContainer">
      <div class="chartTitle">收尾清欠</div>
      <div id="endclear" class="chartContent" ></div>
    </dv-border-box-10>
    <dv-border-box-10 class="pieContainer">
      <div class="chartTitle">两金构成分析</div>
      <div id="generalSituation" class="chartContent" ></div>
      <div class="wrapper">
        <div class="container">
          <!-- <div class="chartTitle">应收帐款</div> -->
          <div id="accounts" class="chartContent" ></div>
        </div>
        <div class="container">
          <!-- <div class="chartTitle">合作资产</div> -->
          <div id="together" class="chartContent" ></div>
        </div>
        <div class="container">
          <!-- <div class="chartTitle">存货</div> -->
          <div id="stock" class="chartContent" ></div>
        </div>
        <div class="container">
          <!-- <div class="chartTitle">其他应收</div> -->
          <div id="receivable" class="chartContent" ></div>
        </div>

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
      endclearData:[],
      generalSituationData:[],
      accountsData:[],
      stockData:[],
      togetherData:[],
      receivableData:[]
    }
   },
   mounted(){
    this.$nextTick(() => {
     this. _initData()

    })
  },
  watch:{
    ny(newValue,oldValue){
      
      if(newValue!=oldValue){
        console.log("双清ny",this.ny)
        this. _initData()
        
      }
    }
  },
  methods:{
    async _initData(){
      var res = await financeApi.fetchShuangQing(this.ny)
      console.log("双清数据",res)
      this.endclearData = res[0]
      this.generalSituationData=res[1][0]
      this.accountsData=res[2][0]
      this.stockData = res[3][0]
      this.togetherData=res[4][0]
      this.receivableData=res[5][0]

      this.endclear()
      this.generalSituation()
      this.accounts()
      this.stock()
      this.together()
      this.receivable()
    },
    // 总体情况
    generalSituation(){
      console.log("this.generalSituationData",this.generalSituationData)
      var pieData = [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            {value: 535, name: '荆州'},
            {value: 510, name: '兖州'},
            {value: 634, name: '益州'},
            {value: 735, name: '西凉'}
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
      this.drawPieBig("generalSituation",pieData,"总体情况")
    },
    accounts(){
      var pieData = [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            {value: 535, name: '荆州'},
            {value: 510, name: '兖州'},
            {value: 634, name: '益州'},
            {value: 735, name: '西凉'}
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
      this.drawPie("accounts",pieData,"应收帐款")
    },
    together(){
      var pieData = [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            {value: 535, name: '荆州'},
            {value: 510, name: '兖州'},
            {value: 634, name: '益州'},
            {value: 735, name: '西凉'}
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
      this.drawPie("together",pieData,"合作资产")
    },
    stock(){
      var pieData = [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            {value: 535, name: '荆州'},
            {value: 510, name: '兖州'},
            {value: 634, name: '益州'},
            {value: 735, name: '西凉'}
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
      this.drawPie("stock",pieData,"存货")
    },
    receivable(){
      var pieData = [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            {value: 535, name: '荆州'},
            {value: 510, name: '兖州'},
            {value: 634, name: '益州'},
            {value: 735, name: '西凉'},
            {value: 735, name: '南闵'}
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
      this.drawPie("receivable",pieData,"其他应收")
    },
 
    endclear(){
      // 收尾清欠
      console.log("this.endclearData",this.endclearData)
      var xAxisdata = ["湖北分公司","华北分公司","城轨分公司","房建分公司","西北分公司","武汉分公司","独立项目","海南项目群"]
      var seriesdata = [60, 20, 86, 60, 80, 20,45,35,88] 
      this.drawChart("endclear",xAxisdata,seriesdata)
    },
    drawPie(id,pieData,titleText){
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        color: ["#E4111f", "#e46c11", "#1188e4", "#11E46c", "orange","#f57A82","#0fc1d6"],
        title: {
            text: titleText,
            // subtext: '虚构数据',
            left: 'center',
            textStyle: {
              color: "#fff",
              fontSize:12,
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //   show:false,
        //     // orient: 'vertical',
        //     // top: 'middle',
        //   top: 10,
        //   left: 'center',
        //   data: ['西凉', '益州', '兖州', '荆州', '幽州']
        // },
        series: pieData
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    drawPieBig(id,pieData,titleText){
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        color: ["#E4111f", "#e46c11", "#1188e4", "#11E46c", "orange","#f57A82","#0fc1d6"],
        title: {
            text: titleText,
            // subtext: '虚构数据',
            left: 'center',
            textStyle: {
              color: "#fff",
              fontSize:12,
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // legend: {
        //   show:false,
        //     // orient: 'vertical',
        //     // top: 'middle',
        //   top: 10,
        //   left: 'center',
        //   data: ['西凉', '益州', '兖州', '荆州', '幽州']
        // },
        series: pieData
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
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
        series: [
          {
            // name: '回款率',
            type: 'bar',
            data: seriesdata,
            barWidth:"10"
          },
          {
            // name: '回款率',
            type: 'bar',
            data: seriesdata,
            barWidth:"10"
          },
          {
            // name: '回款率',
            type: 'line',
            data: seriesdata,
            // barWidth:"35"
          }
        ]
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
   .pieContainer {
    height: 9rem;
    margin-bottom: 0.2rem;
  }
  #generalSituation {
    margin-top:0.5rem
  }
  .wrapper{
    display:flex;
    float:none;
  }
  .wrapper .container {
    flex:1
  }
</style>