<template>
  <div class="production">
    <!-- 内容区域 -->
    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">项目计价情况</div>
          <div class="chartCont1" id="barChart1"></div>
        </div>
      </dv-border-box-10>
      <dv-border-box-10 class="chartContainer" ref="finished">
        <div class="chartContentSon1">
          <div class="chartTit1">年度变更索赔完成情况</div>
          <div class="chartCont1" id="barChart2"></div>
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { economyApi } from "@/api";

export default {
  name: "Production",
  props: ['date','ishideClaim'],
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      economyMeter: null,
      economyClaim: null
    };
  },
  watch: {
    date(newDate) {
      this.initData();
    },
    ishideClaim(newValue,oldValue){
      console.log("newValue",newValue)  
      //this.initData();
      if(newValue){
        console.log("this.$refs.finished----",this.$refs.finished.$el)
        this.$refs.finished.$el.style.display="block"
      } else {
        console.log("this.$refs.finished",this.$refs.finished.$el)
        this.$refs.finished.$el.style.display="none"
      }
      // this.loadMeterChart();
      // this.loadClaimChart();
      
    }
  },
  created(){
    this.initData();
    console.log("ishideClaim",this.ishideClaim)
    
    
  },

  methods: {
    async initData(){
      this.economyMeter =  await economyApi.fetchEconomyMeter(this.date)
      console.log("this.economyMeter666666",this.economyMeter)
      this.economyClaim =  await economyApi.fetchEconomyClaim(this.date)
      console.log("this.loadClaimChart666666",this.economyMeter)
      this.loadMeterChart();
      this.loadClaimChart();
      this.$refs.finished.$el.style.display="none"
      // economyApi.fetchEconomyMeter(this.date).then((data)=>{
      //   this.economyMeter = data;
      //   this.loadMeterChart();
      // });
      // economyApi.fetchEconomyClaim(this.date).then((data)=>{
      //   this.economyClaim = data;
      //   this.loadClaimChart();
      
      // });
    },
    loadMeterChart(){
      const singleBarOption = {
        xData: [],
        seriesData: [
          {name:'产值',value:[]},
          {name:'计价金额',value:[]},
          {name:'计价比例',value:[]}
        ],
       
  
      };
      this.economyMeter.forEach(claim => {
         singleBarOption.xData.push(claim.name);
         singleBarOption.seriesData[0].value.push(claim.charge);
         singleBarOption.seriesData[1].value.push(claim.output);
         singleBarOption.seriesData[2].value.push(claim.proportion);
         
       });
      this.drawSingleBarChart(
        "barChart1",
        singleBarOption.xData,
        "计价比例（%）",
        singleBarOption.seriesData
      );
    },
    loadClaimChart(){
      const singleBarOption2 = {
        xData: [
        ],
        seriesData: [{name:'计划',value:[]},
        {name:'完成',value:[]},
        {name:'索赔完成率',value:[]}
        ],
        deptId:[]

      };
       this.economyClaim.forEach(claim => {
         singleBarOption2.xData.push(claim.name);
         singleBarOption2.seriesData[0].value.push(claim.planed);
         singleBarOption2.seriesData[1].value.push(claim.finished);
         singleBarOption2.seriesData[2].value.push(claim.claim);
         singleBarOption2.deptId.push(claim.deptId)

       });

       console.log("name",singleBarOption2.xData)
       console.log("deptId",singleBarOption2.deptId)
      this.drawSingleBarChart2(
      "barChart2",
      singleBarOption2.xData,
      "索赔完成率（%）",
      singleBarOption2.seriesData,
      singleBarOption2.deptId
      );
    },
    onSubmit() {
      console.log("submit!");
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
    drawSingleBarChart(id, xData, yTitle, seriesData) {
      console.log("seriesData",seriesData)
      let seriesname=[]
      for(let i=0;i<seriesData.length;i++){
        seriesname.push(seriesData[i].name)  
      }
      console.log("seriesname",seriesname)
      let arr = []
      if(xData && xData.length > 9) {
        arr = [{
          type: 'slider',
          show: true, //flase直接隐藏图形
          xAxisIndex: [0],
          left: '9%', //滚动条靠左侧的百分比
          bottom: -5,
          start: 0,//滚动条的起始位置
          end: 22 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
        }]
      } else {
        arr = []
      }
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        
        tooltip: {
          trigger: "axis",
        },
        legend:{
          show:true,
          textStyle: {
            color: '#fff'
         }

        },
        //dataZoom: arr,
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 50
            },
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 50
            }
        ],
        grid: { left: 48, right: 48, },
        //-------------   x轴   -------------------
        xAxis: {
          show: true, //---是否显示
          
          position: "bottom", //---x轴位置
          offset: 0, //---x轴相对于默认位置的偏移
          type: "category", //---轴类型，默认'category'
          name: "项目", //---轴名称
          nameLocation: "end", //---轴名称相对位置
          nameTextStyle: {
            //---坐标轴名称样式
            color: "#fff",
            padding: [5, 0, 0, -5], //---坐标轴名称相对位置
          },
          nameGap: 24, //---坐标轴名称与轴线之间的距离
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
            'interval':0,
            //---坐标轴 标签
            show: true, //---是否显示
            inside: false, //---是否朝内
            rotate: seriesData[2].value.length>9?45:0, //---旋转角度
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
          data: xData,
        },

        //----------------------  y轴  ------------------------
        yAxis: [
          {
            show: true, //---是否显示
            position: "left", //---y轴位置
            offset: 0, //---y轴相对于默认位置的偏移
            type: "value", //---轴类型，默认'category'
            name: '金额（万元）', //---轴名称
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
              margin: 2, //---刻度标签与轴线之间的距离
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
          {
            show: true, //---是否显示
            position: "right", //---y轴位置
            offset: 0, //---y轴相对于默认位置的偏移
            type: "value", //---轴类型，默认'category'
            name: seriesData[2].name+'（%）', //---轴名称
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
              show: false, //---是否显示
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
            axisLabel: {  
              show: true,  
              interval: 'auto',  
              formatter: '{value} %'  
            },  
          }
        ],

        //------------ 内容数据  -----------------
        series: [
          {
            name: seriesData[0].name, //---系列名称
            type: "bar", //---类型
            legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
            label: {
              //---图形上的文本标签
              show: true,
              position: [-30, -10], //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 14,
              formatter: "{c}",
            },
            itemStyle: {
              //---图形形状
              color: "rgb(54,169,206)",
              barBorderRadius: [18, 18, 0, 0],
            },
            barWidth: "20", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            data: seriesData[0].value,
          },
          {
            name: seriesData[1].name, //---系列名称
            type: "bar", //---类型
            legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
            label: {
              //---图形上的文本标签
              show: true,
              position: [10, -10], //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 14,
              formatter: "{c}",
            },
            itemStyle: {
              //---图形形状
              color: "#27d08a",
              barBorderRadius: [18, 18, 0, 0],
            },
            barWidth: "20", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            data: seriesData[1].value,
          },
          {
            name: seriesData[2].name,
            type: 'line',
            label: {
              //---图形上的文本标签
              show: true,
              position: [10, -10], //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 14,
              formatter: "{c}%",
            },
            smooth: true,
            //symbol:'star',//拐点样式
            symbolSize: 8,//拐点大小
            yAxisIndex: 1,
            data: seriesData[2].value,
            lineStyle:{
              color:"#ff9933",
              width:5
            },
            markLine: {
              symbol: "none", //去掉警戒线最后面的箭头
              valueIndex: 1,
              label: {
                position: "end",
                formatter: "{c}",
              },
              data: [
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "red",
                    width:5,
                  },
                  yAxis: 80, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                },
              ],
            },
          }
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    drawSingleBarChart2(id, xData, yTitle, seriesData,deptId) {
      var _this = this
      console.log("seriesData",seriesData)
      let seriesname=[]
      for(let i=0;i<seriesData.length;i++){
        seriesname.push(seriesData[i].name)  
      }
      console.log("seriesname",seriesname)
      let arr = []
      if(xData && xData.length > 9) {
        arr = [{
          type: 'slider',
          show: true, //flase直接隐藏图形
          xAxisIndex: [0],
          left: '9%', //滚动条靠左侧的百分比
          bottom: -5,
          start: 0,//滚动条的起始位置
          end: 22 //滚动条的截止位置（按比例分割你的柱状图x轴长度）
        }]
      } else {
        arr = []
      }
      var myChart = echarts.init(document.getElementById(id));
      var option = {
        
        tooltip: {
          trigger: "axis",
        },
        legend:{
          show:true,
          textStyle: {
            color: '#fff'
         }

        },
        //dataZoom: arr,
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 0,
                end: 50
            },
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 50
            }
        ],
        grid: { left: 48, right: 48, },
        //-------------   x轴   -------------------
        xAxis: {
          show: true, //---是否显示
          triggerEvent:true,
          gridIndex:0,
          position: "bottom", //---x轴位置
          offset: 0, //---x轴相对于默认位置的偏移
          type: "category", //---轴类型，默认'category'
          name: "项目", //---轴名称
          nameLocation: "end", //---轴名称相对位置
          nameTextStyle: {
            //---坐标轴名称样式
            color: "#fff",
            padding: [5, 0, 0, -5], //---坐标轴名称相对位置
          },
          nameGap: 24, //---坐标轴名称与轴线之间的距离
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
            'interval':0,
            //---坐标轴 标签
            show: true, //---是否显示
            inside: false, //---是否朝内
            rotate: seriesData[2].value.length>9?45:0, //---旋转角度
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
          data: xData,
        },

        //----------------------  y轴  ------------------------
        yAxis: [
          {
            show: true, //---是否显示
            position: "left", //---y轴位置
            offset: 0, //---y轴相对于默认位置的偏移
            type: "value", //---轴类型，默认'category'
            name: '金额（万元）', //---轴名称
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
              margin: 2, //---刻度标签与轴线之间的距离
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
          {
            show: true, //---是否显示
            position: "right", //---y轴位置
            offset: 0, //---y轴相对于默认位置的偏移
            type: "value", //---轴类型，默认'category'
            name: seriesData[2].name+'（%）', //---轴名称
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
              show: false, //---是否显示
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
            axisLabel: {  
              show: true,  
              interval: 'auto',  
              formatter: '{value} %'  
            },  
          }
        ],

        //------------ 内容数据  -----------------
        series: [
          {
            name: seriesData[0].name, //---系列名称
            type: "bar", //---类型
            legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
            label: {
              //---图形上的文本标签
              show: true,
              position: [-30, -10], //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 14,
              formatter: "{c}",
            },
            itemStyle: {
              //---图形形状
              color: "rgb(54,169,206)",
              barBorderRadius: [18, 18, 0, 0],
            },
            barWidth: "20", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            data: seriesData[0].value,
          },
          {
            name: seriesData[1].name, //---系列名称
            type: "bar", //---类型
            legendHoverLink: true, //---是否启用图例 hover 时的联动高亮
            label: {
              //---图形上的文本标签
              show: true,
              position: [10, -10], //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 14,
              formatter: "{c}",
            },
            itemStyle: {
              //---图形形状
              color: "#27d08a",
              barBorderRadius: [18, 18, 0, 0],
            },
            barWidth: "20", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            data: seriesData[1].value,
          },
          {
            name: seriesData[2].name,
            type: 'line',
            label: {
              //---图形上的文本标签
              show: true,
              position: [10, -10], //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 14,
              formatter: "{c}%",
            },
            smooth: true,
            //symbol:'star',//拐点样式
            symbolSize: 8,//拐点大小
            yAxisIndex: 1,
            data: seriesData[2].value,
            lineStyle:{
              color:"#ff9933",
              width:5
            },
            markLine: {
              symbol: "none", //去掉警戒线最后面的箭头
              valueIndex: 1,
              label: {
                position: "end",
                formatter: "{c}",
              },
              data: [
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "red",
                    width:5,
                  },
                  yAxis: 80, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                },
              ],
            },
          }
        ],
      };
      myChart.setOption(option);
      myChart.on('click', function(params) {
        
        console.log(params)
        console.log(params.dataIndex)
        // this.$router.push({name:'EngineeringDetail'})
        
        if(params.componentType =="xAxis"){
          console.log("params.componentType ==xAxis",params)
          let obj = {
            deptId:deptId[params.event.target.anid.split("_")[1]],
            projectName:params.value
          }
          console.log("obj",obj)
          console.log("_this.ny",_this.ny)
          _this.$router.push({name:'EngineeringDetail',params:{ny:_this.date,deptId:obj.deptId,projectName:obj.projectName}})
          // console.log("obj[deptId]",deptId[obj.siteId])

        } 
        // if(params.componentType=="series"){
              
        // }
      })
 
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
    height: 4rem;
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
        height: 3.4rem;
      }
    }
  }
}
</style>
