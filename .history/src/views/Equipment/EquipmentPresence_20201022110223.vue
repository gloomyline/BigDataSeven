<template>
  <div class="production">
    
    <!-- 内容区域 -->

    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon">
          <div class="chartTit">大施组比对</div>
          <div class="chartCont" id="barChart3"></div>
        </div>
        <!-- <div class="chartContentSon">
          <div class="chartTit" @click="jumpTzDetail()">自有主要机械设备使用情况(单位:台)</div>
          <div class="chartCont" id="circlePieChart"></div>
        </div> -->
        <div class="chartContentSon">
          <div class="chartTit">项目大型机械设备(单位:台)</div>
          <div class="chartCont" id="barChart1"></div>
        </div>
      </dv-border-box-10>
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">项目机械设备(单位:台)</div>
          <div class="chartCont1" id="barChart2"></div>
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { equipmentApi } from '@/api';

export default {
  name: "Production",
  props:["date"],
  data() {
    return {
      
      bigEquipments: [],
      projectEquipments: [],
      usingDetail: {
        // 在用
        isUsing: null,
        // 闲置
        isUnused: null,
        // 长期闲置
        isIdle: null,
      },
      bigCompare:[],
      // date: '',
      pickerOptions: {
        disabledDate(time) {
          return time >Date.now();
        },
      },      
    };
  },
  watch: {
    async date(newDate) {
      const loading = this.$loading({
        lock: true,
        text: "页面加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 1)",
      });
      await this._requestData();
      this._drawEcharts();
      loading.close();
      console.log("新的时间在那儿",newDate)
    },
    
  },
  async mounted() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)",
    });
    // this.date = `${(new Date()).getFullYear()}-${('00' + (new Date()).getMonth()).substr(-2)}`;
    await this._requestData();
    loading.close();
    this.$nextTick(() => {
      this._drawEcharts();      
    });
  },
  methods: {
    async _requestData() {
      const response = await equipmentApi.fetchEquipments(this.date);
      this.bigEquipments = response.bigEquipmentTypeList;
      this.projectEquipments = response.projectEquipmentList;
      this.usingDetail.isUsing = response.isUsing;
      this.usingDetail.isUnused = response.idle;
      this.usingDetail.isIdle = response.idleLong;
      //大施组比对
      const res   = await equipmentApi.fetchfindBigConstructionData(); 
      console.log("大施组比对",res)
      this.bigCompare = res
    },
    _drawEcharts() {
      const self = this;
      // 项目大型机械设备
      const singleBarOption = {
        xData: self.bigEquipments.map(item => item.equipmentType),
        seriesData: self.bigEquipments.map(item => item.countType),
        allEquipmentsData:self.bigEquipments
      };
      this.drawSingleBarChart(
        "barChart1",
        singleBarOption.xData,
        singleBarOption.seriesData,
        singleBarOption.allEquipmentsData
      );
      // 主要机械设备
      const pieOption = {
        seriesData: [
          { value: self.usingDetail.isIdle, name: "长期闲置" },
          { value: self.usingDetail.isUsing, name: "在用" },
          { value: self.usingDetail.isUnused, name: "闲置" },
        ],
        // innerCircleData: [{ value: 1000, name: "主要机械设备" }],
      };
      // this.drawCirclePieChart(
      //   "circlePieChart",
      //   pieOption.legendData,
      //   pieOption.seriesData,
      //   pieOption.innerCircleData
      // );
      // 项目机械设备，以项目来划分
      let arr = []
      self.projectEquipments.forEach(item => {
        let obj = {
          name: item.projectName,
          id: item.projectId
        }
        arr.push(obj)
      })


      const barChartBOption = {
        xData: self.projectEquipments.map(item => item.projectName),
        legendData: [
          {
            name: "大型机械设备",
          },
          {
            name: "其他机械设备",
          },
        ],
        seriesData: [
          {
            name: "大型机械设备",
            type: "bar",
            data: self.projectEquipments.map(item => item.bigEquipmentProject),
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 16,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(54,169,206)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
          {
            name: "其他机械设备",
            type: "bar",
            data: self.projectEquipments.map(item => item.otherEquipmentProject),
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 16,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(202,249,130)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
        ],
        arr,
      };
     
     this.drawDoubleBarChart(
        "barChart2",
        barChartBOption.xData,
        barChartBOption.legendData,
        barChartBOption.seriesData,
        "数量",
        barChartBOption.arr
      );

     var deptid = []
     var deptName = []
     var reality=[]
     var plan = []
     var costing = []
     var useFee=[]
     const compareOption = {
        xData: self.bigCompare.map(item => item.projectName),
        legendData: [
          {
            name: "大型机械设备",
          },
          {
            name: "其他机械设备",
          },
        ],
        seriesData: [
          {
            name: "现场配置",
            type: "bar",
            data: self.projectEquipments.map(item => item.bigEquipmentProject),
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 16,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(54,169,206)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
          {
            name: "计划配置",
            type: "bar",
            data: self.projectEquipments.map(item => item.otherEquipmentProject),
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 16,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(202,249,130)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
          {
            name: "现有责任成本",
            type: "bar",
            data: self.projectEquipments.map(item => item.otherEquipmentProject),
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 16,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(202,249,130)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
          {
            name: "开累责任成本",
            type: "bar",
            data: self.projectEquipments.map(item => item.otherEquipmentProject),
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 16,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(202,249,130)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
        ],
        arr,
      };
      
      this.drawBigCompareChart(
        "barChart3",
        compareOption.xData,
        compareOption.legendData,
        compareOption.seriesData,
        "数量",
        compareOption.arr
      );
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
    jumpTzDetail() {
      this.$router.push({ name: "TZEquipmentDetails" });
    },
    drawSingleBarChart(id, xData, seriesData,allData) {
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        tooltip: {
          trigger: "axis",
          formatter:(params)=>{
             let equipmentType = params[0].axisValue
             for(let i in allData){
               if(allData[i].equipmentType==equipmentType){
                 let children = allData[i].children
                 let str=""
                 for (let i in children){
                   str += `${children[i].equipmentType}: ${children[i].countType} <br> `
                 }
                 return  str
                 
               }
             }
          }
        },
        // dataZoom : [
        //   {
        //     type: 'slider',
        //     show: true,
        //     start: 0,
        //     end: 25,
        //     xAxisIndex: [0],
        //   },
        // ],
        grid: { top: "5%", bottom: "30%" },
        //-------------   x轴   -------------------
        xAxis: {
          show: true, //---是否显示
          position: "bottom", //---x轴位置
          offset: 0, //---x轴相对于默认位置的偏移
          type: "category", //---轴类型，默认'category'
          name: "类型", //---轴名称
          nameLocation: "end", //---轴名称相对位置
          nameTextStyle: {
            //---坐标轴名称样式
            color: "#fff",
            padding: [5, 0, 0, -5], //---坐标轴名称相对位置
          },
          nameGap: 10, //---坐标轴名称与轴线之间的距离
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
            //inside: false, //---是否朝内
            rotate: 28, //---旋转角度
            margin: 5, //---刻度标签与轴线之间的距离
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
          data: xData,
        },

        //----------------------  y轴  ------------------------
        yAxis: {
          show: true, //---是否显示
          position: "left", //---y轴位置
          offset: 0, //---y轴相对于默认位置的偏移
          type: "value", //---轴类型，默认'category'
          name: "数量", //---轴名称
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

        //------------ 内容数据  -----------------
        series: [
          {
            name: "数量", //---系列名称
            type: "bar", //---类型
            legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 16,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(54,169,206)",
              barBorderRadius: [18, 18, 0, 0],
            },
            barWidth: "20", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            data: seriesData,
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    drawDoubleBarChart(id, xData, legendData, seriesData, yTitle, projectIdArr) {
      var myChart = echarts.init(document.getElementById(id));
      var _that = this;
      var option = {
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
        legend: {
          type: "plain", //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
          top: "1%", //----图例相对容器位置,top\bottom\left\right
          textStyle: {
            color: "#fff",
          },
          tooltip: {
            //图例提示框，默认不显示
            show: true,
            color: "red",
          },
          data: legendData,
        },
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
      myChart.on("click", function(params) {
        let a = '{"error":1,"data":"用户不存在"}'
        if (params.componentType == "xAxis") {
          projectIdArr.forEach(item => {
            if(item.name === params.value) {
               _that.$router.push({ 
                name: "BigEquipmentDetails",
                params: {
                  name: item.name,
                  id: item.id,
                  ny: self.date,
                }
              });
            }
          })
        }
      });
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    drawBigCompareChart(id, xData, legendData, seriesData, yTitle, projectIdArr) {
      var myChart = echarts.init(document.getElementById(id));
      var _that = this;
      var option = {
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
        legend: {
          type: "plain", //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
          top: "1%", //----图例相对容器位置,top\bottom\left\right
          textStyle: {
            color: "#fff",
          },
          tooltip: {
            //图例提示框，默认不显示
            show: true,
            color: "red",
          },
          data: legendData,
        },
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
      myChart.on("click", function(params) {
        let a = '{"error":1,"data":"用户不存在"}'
        if (params.componentType == "xAxis") {
          projectIdArr.forEach(item => {
            if(item.name === params.value) {
               _that.$router.push({ 
                name: "BigEquipmentDetails",
                params: {
                  name: item.name,
                  id: item.id,
                  ny: self.date,
                }
              });
            }
          })
        }
      });
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    drawCirclePieChart(id, legendData, seriesData, innerCircleData) {
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          textStyle: {
            //----图例内容样式
            color: "#fff", //---所有图例的字体颜色
            //backgroundColor:'black',	//---所有图例的字体背景色
          },
          data: legendData,
        },
        series: [
          {
            type: "pie",
            selectedMode: "single",
            itemStyle: { opacity: 0 },
            label: {
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: innerCircleData,
          },
          {
            name: "自有主要机械设备",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center",
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0,
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33,
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2,
                },
              },
            },
            data: seriesData,
            color:['red', '#3CB371', '#EE9A00']
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
  },
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
