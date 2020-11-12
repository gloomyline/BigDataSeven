<template>
  <div class="production">
    <!-- 内容区域 -->
    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">各单位人员情况({{ currentCompany }})</div>
          <div class="chartCont1" id="barChart1" ref="humanDetails"></div>
        </div>
        <el-radio-group class="company-selector" v-model="currentCompany">
          <el-radio-button v-for="(company, index) in companies" :label="company" :key="index"></el-radio-button>
        </el-radio-group>
      </dv-border-box-10>
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">调配人员信息</div>
          <div class="chartCont1" id="dispatchHumanInfo" ></div>
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import { HumanNewApi  } from '@/api';
export default {
  name: "Production",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      // 分公司索引，轮播计数器
      count: 0,
      companies: ['独立项目部','华北分公司','城轨分公司','西北分公司','房建分公司','武汉分公司','湖北分公司'],
      currentCompany: '独立项目部',
      // person details request from server
      personInfo: [],
      // interval for every companies data bar display, unit is mileseconds
      intervalTime: 5000,
    };
  },
  async mounted() {
    await this.getPersonnerInfo();
    this.dispatchHumanInfo()
    this.$nextTick(() => {
      this.echarts();
    });
  },
  watch: {
    currentCompany(val) {
      this.count = this.companies.indexOf(val);
      this.drawHumanDetails(this.count);
    },
  },
  created(){
  },
  methods: {
    async getPersonnerInfo(){
      const res = await HumanNewApi.fetchGetPersonnerInfoData();
      this.personInfo = res.personnerInfo;
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
    goPro() {
      this.$router.push({ path: "/HumanDetails" });
    },
    echarts() {
      this.drawHumanDetails();
    },
    _filterCompany(name, isProjects = true) {
      const filteredProjects = this.personInfo.filter(item => item.conname === name);
      if(isProjects) {
        return filteredProjects.map(item => item.name);
      } else {
        // 一类劳务人员各项目人数
        const filteredOs = filteredProjects.map(item => item.countOnum);
        // 局聘
        const filteredJs = filteredProjects.map(item => item.countJnum);
        // 定编
        const filteredDs = filteredProjects.map(item => item.countDnum);
        // 在岗
        const filteredOnJob = filteredProjects.map(item => item.isOnTheJob);
        // 不在岗
        const filteredNotOnJob = filteredProjects.map(item => item.NotOnTheJob);
        return [filteredOs, filteredJs, filteredDs,filteredOnJob,filteredNotOnJob];
      }
    },
    drawHumanDetails(startWith = 0) {
      const self = this;
      const elHumanDetails = this.$refs.humanDetails;
      const humanDetails = echarts.init(elHumanDetails);
      // simulate human details data
      const dataList = [
        {
          companyName: '独立项目部',
          projectNames: self._filterCompany('独立项目部'),
          data: self._filterCompany('独立项目部', false),
        },
        {
          companyName: '华北分公司',
          projectNames: self._filterCompany('华北分公司'),
          data: self._filterCompany('华北分公司', false),
        },
        {
          companyName: '城轨分公司',
          projectNames: self._filterCompany('城轨分公司'),
          data: self._filterCompany('城轨分公司', false),
        },
        {
          companyName: '西北分公司',
          projectNames: self._filterCompany('西北分公司'),
          data: self._filterCompany('西北分公司', false),
        },
        {
          companyName: '房建分公司',
          projectNames: self._filterCompany('房建分公司'),
          data: self._filterCompany('房建分公司', false),
        },
        {
          companyName: '武汉分公司',
          projectNames: self._filterCompany('武汉分公司'),
          data: self._filterCompany('武汉分公司', false),
        },
        {
          companyName: '湖北分公司',
          projectNames: self._filterCompany('湖北分公司'),
          data: self._filterCompany('湖北分公司', false),
        },
      ]
      const option = {
        color: ["#a5dff9", "#3398DB", "#6096E6", "#9ADFBF","#BFBFBF"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" ,// 默认为直线，可选为：'line' | 'shadow'
			
          },
		      formatter:`{a}:{c}<br>{a1}:{c1}<br>{a2}:{c2}<br>{a3}:{c3}<br>{a4}:{c4}`
		  
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["一类劳务人员", "局聘", "定员定编"],
          textStyle: { color: "rgba(255, 255, 255, .6)", fontSize: 12 }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "18%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: dataList[startWith]['projectNames'],
            axisLabel: {
              // interval: 0,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.2)"
              }
            },
            axisLabel: {
              //---坐标轴 标签
              show: true, //---是否显示
              inside: false, //---是否朝内
              rotate: 40, //---旋转角度
              margin: 5, //---刻度标签与轴线之间的距离
              interval: 0,
              color:'white',				//---默认取轴线的颜色
              textStyle: {
                fontSize: 14,
                // fontWeight: "bold",
              }
            },
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: { color: "rgba(255, 255, 255, .2)" }
            }
          }
        ],
        series: [
		    	{
            name: "一类劳务人员",
            type: "bar",
            stack: "outside",
            data: dataList[startWith]['data'][0],
		    	},
          {
            name: "局聘",
            type: "bar",
            barWidth: 50,
            stack: "outside",
            data: dataList[startWith]['data'][1],
          },
          
          {
            name: "定员定编",
            type: "bar",
            barGap: '5%',
            barWidth: 50,
            data: dataList[startWith]['data'][2],
          },
          {
            name: "在岗",
            type: "bar",
            stack: "onjob",
            data: dataList[startWith]['data'][3],
		    	},
          {
            name: "不在岗",
            type: "bar",
            barWidth: 50,
            stack: "onjob",
            data: dataList[startWith]['data'][4],
          },
        ]
      };

      // first render echart
      this.companyName = dataList[startWith].companyName;
      humanDetails.setOption(option);

      window.addEventListener('resize', () => {
        humanDetails.resize();
      });

      // did not enable animation of human details before, enable here.
      if(!this.intervalHandler) {
        this.enableAnimation(humanDetails, option, dataList);
      }
    },
    enableAnimation(humanDetails, option, dataList) {
      const self = this;

      self.intervalHandler = option.timeTicket = setInterval(function() {
        const timesOneTurn = dataList.length;
        self.count += 1;
        if (self.count >= timesOneTurn) {
          self.count = 0;
        }

        option.xAxis[0].data = dataList[self.count].projectNames;
        dataList[self.count].data.forEach((item, index) => {
			
          option.series[index].data = item;
        });

        self.currentCompany = dataList[self.count].companyName;
        humanDetails.setOption(option);
      }, this.intervalTime);
    },
    //可调配人员信息
    async dispatchHumanInfo(){
      var res = await HumanNewApi.fetchDispatchHumanInfoData();
      console.log("dispatchHumanInfo",res)
      var xAxispro = []
      var first = []
      var second = []
      var headcount = []
      var deputyChief = []
      res.map((item)=>{
        xAxispro.push(item.pro)
        first.push(item.first)
        second.push(item.second)
        headcount.push(item.headcount)
        deputyChief.push(item.deputyChief)
      })
      this.drawdispatchChart("dispatchHumanInfo",xAxispro,first,second,headcount,deputyChief)

    },
    drawdispatchChart(id,xAxisData,firstData,secondData,headcountData,deputyChiefData){
      var myChart = echarts.init(document.getElementById(id));
      var option={
        color:["#A5DFF9","#3398DB","#6096E6","#34A471"],
        xAxis:{
          data: xAxisData
        },
        yAxis:{
          type: 'value'
        },
        tooltip:{
          show:true,
        },
        dataZoom: [{
          
          type: 'slider',
          show: true,
          start: 0,
          end: 25,
          xAxisIndex: [0],
        
        }],

        series:[
          {
            name:"副科",
            type:"bar",
            stack:"info",
            barWidth:50,
            barGap: "30%",
            data: deputyChiefData,
            label:{
              show:true,
              formatter: '{a}'
            }

          },
          {
            name:"其他",
            type:"bar",
            stack:"info",
            barWidth:50,
            barGap: "30%",
            data: headcountData,
            label:{
              show:true,
              formatter: '{a}'
            }
          },
          {
            name:"二级",
            type:"bar",
            stack:"info",
            barWidth:50,
            barGap: "30%",
            data: secondData,
            label:{
              show:true,
              formatter: '{a}'
            }
          },
          {
            name:"一级",
            type:"bar",
            stack:"info",
            barWidth:50,
            barGap: "30%",
            data: firstData,
            label:{
              show:true,
              formatter: '{a}',
              position:"inside"
            }
          },
        ]
      }
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  },
  destroyed() {
    clearInterval(this.intervalHandler);
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
    height: 8rem;
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
        height: 6.4rem;
      }
    }
    .company-selector {
      position: absolute;
      left: 50%;
      top: 8%;
      width:90%;
      transform: translateX(-50%);
    }
  }
}
</style>
