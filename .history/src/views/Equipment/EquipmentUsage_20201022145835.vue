<template>
    <div>
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon">
          <div class="chartTit">租赁价格比对</div>
          <div class="chartCont" id="price"></div>
        </div>
        <!-- <div class="chartContentSon">
          <div class="chartTit" @click="jumpTzDetail()">自有主要机械设备使用情况(单位:台)</div>
          <div class="chartCont" id="circlePieChart"></div>
        </div> -->
        <div class="chartContentSon">
          <div class="chartTit">设备利用率</div>
          <div class="chartCont" id="usingRate"></div>
        </div>
      </dv-border-box-10>
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon">
          <div class="chartTit">设备完好率</div>
          <div class="chartCont" id="completeRate"></div>
        </div>
        <!-- <div class="chartContentSon">
          <div class="chartTit" @click="jumpTzDetail()">自有主要机械设备使用情况(单位:台)</div>
          <div class="chartCont" id="circlePieChart"></div>
        </div> -->
        <div class="chartContentSon">
          <div class="chartTit">燃油消耗率</div>
          <div class="chartCont" id="expendRate"></div>
        </div>
      </dv-border-box-10>
    </div>
</template>
<script>
import echarts from "echarts";
import { equipmentApi } from '@/api';
export default {
  data(){
    return {
      priceData:[],
      usingRateData:[],
      completeRateData:[],
      expendRateData:[]

    }
  },
  mounted(){
    this.initData()
  },
  methods:{
    async initData(){
      const res = await equipmentApi.fetchfindEquipmentUsageData()
      console.log("设备使用情况",res)
      if(res != null){
        this.price(res["租赁价格比对"])
      }
    },
    price(data){
      var deptId = []
      var deptName = []
      var rentalPrice = []
      var companyPrice = []
      var groupPrice = []
      if(data){
        data.map((item)=>{
          deptId.push(item.deptId),
          deptName.push(item.deptName),
          rentalPrice.push(item.rentalPrice),
          companyPrice.push(item.companyPrice),
          groupPrice.push(item.groupPrice)
        })
      }else{
        deptId = []
        deptName = []
        rentalPrice = []
        companyPrice = []
        groupPrice = []
      }
      var xData = deptName
      var seriesData = [
        {
          name: "租赁价格",
          type: "bar",
          data: rentalPrice,
          stack:"price",
          barWidth: "20", //---柱形宽度
          // barCategoryGap: "20%", //---柱形间距
          label: {
            //---图形上的文本标签
            show: true,
            position: "top", //---相对位置
            rotate: 0, //---旋转角度
            color: "#ffffff",
            fontSize: 16,
          },
        },
        {
          name: "公司限价",
          type: "bar",
          data: companyPrice,
          stack:"price",
          barWidth: "20", //---柱形宽度
          // barCategoryGap: "20%", //---柱形间距
          label: {
            //---图形上的文本标签
            show: true,
            position: "top", //---相对位置
            rotate: 0, //---旋转角度
            color: "#ffffff",
            fontSize: 16,
          },
        },
        {
          name: "集团限价",
          type: "bar",
          data: groupPrice,
          stack:"price",
          barWidth: "20", //---柱形宽度
          // barCategoryGap: "20%", //---柱形间距
          label: {
            //---图形上的文本标签
            show: true,
            position: "top", //---相对位置
            rotate: 0, //---旋转角度
            color: "#ffffff",
            fontSize: 16,
          },
        },
      ]

      this.echarts("price", xData, seriesData, '单位(万元)')
    },
    usingRate(data){},
    completeRate(data){},
    expendRate(data){},
    echarts(id, xData, seriesData, yTitle, projectIdArr) {
      var myChart = echarts.init(document.getElementById(id));
      var _that = this;
      var option = {
        color:["#56CA95","#FFBA55","#010C48","#FFBA55"],
        tooltip: {
          trigger: "axis",
        },
        dataZoom : [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 25,
            // xAxisIndex: [0],
          },
        ],
        grid: { bottom: 70 },
        // legend: {
        //   type: "plain", //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
        //   top: "1%", //----图例相对容器位置,top\bottom\left\right
        //   textStyle: {
        //     color: "#fff",
        //   },
        //   tooltip: {
        //     //图例提示框，默认不显示
        //     show: true,
        //     color: "red",
        //   },
        //   data: legendData,
        // },
        xAxis: {
          data: xData,
          show: true, //---是否显示
          position: "bottom", //---x轴位置
          offset: 0, //---x轴相对于默认位置的偏移
          type: "category", //---轴类型，默认'category'
          name: "项目", //---轴名称
          nameLocation: "end", //---轴名称相对位置
          triggerEvent: true,
          nameTextStyle: {
            //---坐标轴名称样式
            color: "#fff",
            padding: [5, 0, 0, -5], //---坐标轴名称相对位置
          },
          nameGap: 15, //---坐标轴名称与轴线之间的距离
          //nameRotate:270,			//---坐标轴名字旋转

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
            //color:'red',				//---默认取轴线的颜色
          },
          splitLine: {
            //---grid 区域中的分隔线
            show: false, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
            lineStyle: {
              //color:'red',
              //width:1,
              //type:'solid',
            },
          },
          splitArea: {
            //--网格区域
            show: false, //---是否显示，默认false
          },
        },
        yAxis: {
          show: true, //---是否显示
          position: "left", //---y轴位置
          offset: 0, //---y轴相对于默认位置的偏移
          type: "value", //---轴类型，默认'category'
          name: yTitle, //---轴名称
          nameLocation: "end", //---轴名称相对位置value
          nameTextStyle: {
            //---坐标轴名称样式
            color: "#fff",
            padding: [5, 0, 0, 5], //---坐标轴名称相对位置
          },
          nameGap: 15, //---坐标轴名称与轴线之间的距离
          //nameRotate:270,			//---坐标轴名字旋转

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
            margin: 8, //---刻度标签与轴线之间的距离
            //color:'red',				//---默认取轴线的颜色
          },
          splitLine: {
            //---grid 区域中的分隔线
            show: true, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
            lineStyle: {
              color: "#666",
              width: 1,
              type: "dashed", //---类型
            },
          },
          splitArea: {
            //--网格区域
            show: false, //---是否显示，默认false
          },
        },
        series: seriesData,
      };
      const self = this;
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
  }
  
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
    .left {
      position: absolute;
      left: 0;
      top: 0;
    }
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
    height: 5rem;
    margin-bottom: 0.1rem;
    .chartContentSon {
      width: 50%;
      height: 100%;
      float: left;
      .chartTit {
        padding: 0.15rem;
        color: #ffffff;
        font-size: 0.24rem;
        font-weight: bold;
      }
      .chartCont {
        width: 100%;
        height: 3.6rem;
      }
    }
    .chartContentSon1 {
      width: 100%;
      height: 100%;
      clear: both;
      .chartTit1 {
        padding: 0.15rem;
        color: #ffffff;
        font-size: 0.24rem;
        font-weight: bold;
      }
      .chartCont1 {
        width: 100%;
        height: 3.6rem;
      }
    }
  }
}
</style>