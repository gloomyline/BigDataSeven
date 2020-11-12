<template lang="html">
  <div class="production-summaries">
    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartTitle">施工情况简报</div>
        <div class="chartContent" style="height:1.6rem">
          <div class="chartContentSon" style="width: 50%;">
            <dv-border-box-10 class="chartContChild" style="margin-bottom:0.1rem;">
                <p>
                  公司在建项目总数<span class="sred">{{allCompany.data && (allCompany.data.constructionDigest.isBuilding !== '' ? allCompany.data.constructionDigest.isBuilding : 0)}}</span>个，自营项目<span
                    class="sred"
                    >{{allCompany.data && (allCompany.data.constructionDigest.selfSupport !== '' ? allCompany.data.constructionDigest.selfSupport : 0)}}</span
                  >个，联营项目<span class="sred">{{allCompany.data && (allCompany.data.constructionDigest.jointOperation !== '' ? allCompany.data.constructionDigest.jointOperation : 0)}}</span>个，其中：<span
                    class="sred"
                    >{{allCompany.data && (allCompany.data.constructionDigest.shutDown !== '' ? allCompany.data.constructionDigest.shutDown : 0)}}</span
                  >个停工项目，<span class="sred">{{allCompany.data && (allCompany.data.constructionDigest.newest !== '' ? allCompany.data.constructionDigest.newest : 0)}}</span>个新上项目。
                </p>
              </dv-border-box-10>
            <!-- <div class="chartTit"></div>
            <div class="chartCont" id="pieChart"></div> -->
          </div>
          <div class="chartContentSon" style="width: 50%;">
            <dv-border-box-10 class="chartContChild">
                <p>
                  <span>{{allCompany.data && (allCompany.data.constructionDigest.month ? allCompany.data.constructionDigest.month : this.month)}}</span>月对<span class="sred">{{allCompany.data && (allCompany.data.constructionDigest.planed !== '' ? allCompany.data.constructionDigest.planed : 0)}}个</span>项目下达计划，<span
                    class="sgreen"
                    >{{allCompany.data && (allCompany.data.constructionDigest.green !== '' ? allCompany.data.constructionDigest.green : 0)}}个项目</span
                  >为<span class="sgreen">绿色管理</span>项目，<span
                    class="syellow"
                    >{{allCompany.data && (allCompany.data.constructionDigest.yellow !== '' ? allCompany.data.constructionDigest.yellow : 0)}}个项目</span
                  >为<span class="syellow">黄色警示</span>项目，<span
                    class="sred"
                    >{{allCompany.data && (allCompany.data.constructionDigest.red !== '' ? allCompany.data.constructionDigest.red : 0)}}个项目</span
                  >为<span class="sred">红色警示</span>项目，<span
                    class="spurple"
                    >{{allCompany.data && (allCompany.data.constructionDigest.purple !== '' ? allCompany.data.constructionDigest.purple : 0)}}个项目</span
                  >无产值。
                </p>
              </dv-border-box-10>
            <!-- <div class="chartTit">施工情况简报</div>
            <div class="chartCont">
              
              
            </div> -->
          </div>
        </div>
      </dv-border-box-10>
      <div class="container">
        <div class="left">
          <dv-border-box-10 class="wrapper">
            <div class="chartTitle">
              工期进度偏差排名
              <div class="goto">
                <a href="http://211.149.184.113:8218/index" target="_blank">链接后台搜索入口</a>
              </div>
            </div>
            <div class="scroll-wrap" ref="rank">
              <!--<dv-scroll-board  ref="scroll"  :config="config" class="tableContainerSonTable">
              </dv-scroll-board>-->
              <production-rank :ny="ny"></production-rank>
            </div>
          </dv-border-box-10>
        </div>
        <div class="right">
          <dv-border-box-10 class="wrapper">
            <div class="chartTitle">片区公司产值情况</div>
            <div class="chartContent">
              <div class="chartContentSon triples" style="height:3.5rem;">
                <!-- <div class="chartTit">自营产值情况（万元）</div> -->
                <div class="chartCont" id="pieChart" style="height:100%;widht:100%"></div>
              </div>
            </div>
          </dv-border-box-10>
          <dv-border-box-10 class="wrapper">
            <div class="chartTitle">自营项目产值情况</div>
            <div class="chartContent">
              <div class="chartContentSon triples" style="height:3.5rem;">
                <!-- <div class="chartTit">自营产值情况（万元）</div> -->
                <div class="chartCont" id="barChart1" style="height:100%"></div>
              </div>
            </div>
          </dv-border-box-10>
          <dv-border-box-10 class="wrapper" >
            <div class="chartTitle">联营项目产值情况</div>
            <div class="chartContent">
              <div class="chartContentSon triples" style="height:3.5rem;">
                <!-- <div class="chartTit">联营产值情况（万元）</div> -->
                <div class="chartCont" id="barChart2" style="height:100%"></div>
              </div>
            </div>
          </dv-border-box-10>
        </div>

      </div>


      
    </div>
<!-- 
    <!-- <div class="tableContainer">
      <dv-border-box-10 class="tableContainerSon">
        <div class="tableContainerSonTitle">
          工期进度偏差排名
        </div>
        <div class="scroll-wrap" ref="rank">
          <dv-scroll-board  ref="scroll"
            :config="config"
            class="tableContainerSonTable"
           
          /> 
        </div>
      </dv-border-box-10>
    </div> --> 
  </div>
</template>

<script>
  import { productionNewApi  } from '@/api';
  import ProductionRank from '@/views/productionComponent/ProductionRank'
  import echarts from "echarts";
  export default {
    props:["ny"],
    components:{ProductionRank},
    // mounted(){
      
    //   console.log("this.$refs.scroll",this.$refs.scroll)
    // },
    watch:{
      ny:function(newValue,oldValue){
        //console.log("newvalue,oldvalue",newValue,oldValue)
        if(newValue!==oldValue){
          console.log("时间newValue",newValue)
           this.initData()
           this.selfSupport()
           this.joinSupport()
           
        }
      }
    },
    data() {
      return {
        isselfcjczSort:0,
        isselfczSort:0,
        isjoinrjczSort:0,
        isjoinczSort:0,
        pieOption: {
          pieData: []
        },
        arr: [],
        total: 0,
        forminline: {
          user: "",
          region: "",
        },
        DeptArr: [],
        config: {},
        czConfig: {},
        rjczConfig: {},
        czConfig2: {},
        rjczConfig2: {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        },
        allCompany: {},
        month: '',
        newZhb: [],
        zhb: [],
        lagList: [],
        jczConfig2: {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        },
        rjczConfig: {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        },
        joinSeriesData: [
          {
            name: "计划",
            type: "bar",
            data: [],
            // stack: "使用情况",
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 12,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(54,169,206)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
          {
            name: "完成",
            type: "bar",
            data: [30911, 85897, 336029],
            // stack: "使用情况",
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 12,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(202,249,130)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
        ],
        seriesData: [
          {
            name: "计划",
            type: "bar",
            data: [],
            // stack: "使用情况",
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 12,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(54,169,206)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
          {
            name: "完成",
            type: "bar",
            data: [30911, 85897, 336029],
            // stack: "使用情况",
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 12,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(202,249,130)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
        ],
      };
    },
    created() {
    },
    activated() {
      this.initData()
      this.getLagList()
      this.selfSupport()
      
      this.joinSupport()
    },
    mounted() {

    
      // console.log("----$el",this.$refs.scroll.$el)
      // console.log("--this.$refs.scroll.$el.children[1]--",this.$refs.scroll.$el.children[1])
      // this.$refs.scroll.$el.addEventListener('scroll', this.handleScroll,true)
    
    
      this.$nextTick(() => {
        const option1 = {
          yAxis: ["项目一", "项目二", "项目三", "项目四", "项目五", "项目六"],
          seriesData: [500, 600, 700, 800, 900, 1000],
        };
        //console.log("props ny",this.ny)

        // 人均产值排名，在项目名称前增加排序，数字为在所有自营或联营项目中进行排名(客户需求)
        this.czConfig = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "产值",
          showValue: true,
        };

        // 人均产值排名，在项目名称前增加排序，数字为在所有自营或联营项目中进行排名(客户需求)
        this.rjczConfig2 = {
          data: [
            
          ],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        };

        // 产值排名，在项目名称前增加排序，数字为在所有自营或联营项目中进行排名(客户需求)
        this.czConfig2 = {data: []};
      });
    },
    methods: {
      handleScroll () {
        //$.this.scrollTop
        console.log("this.$refs.scroll.$el handldScroll-----",this.$refs.scroll.$el.children[1].scrollTop)
        let scrollTop =this.$refs.scroll.$el.children[1].scrollTop 
        console.log("this",this)
        //console.log("scrollTop-----------",scrollTop)
        //console.log("this.$refs.scroll.$el.children[1].offsetHeight",this.$refs.scroll.$el.children[1].offsetHeight)
        //console.log("this.$refs.scroll.$el.children[1]",this.$refs.scroll.$el.children[1])
        // this.$refs.scroll.$el.children[1].style.height
        //this.$refs.scroll.$el.children[1].scrollTop=scrollTop
        //this.config.rowNum = scrollTop;
        //this.$refs.scroll.animation(true)
        //  var rowHeigth=this.$refs.scroll.$el.children[1].children[2].style.height
        // console.log("this.$refs.scroll.$el.children[1].children[2].style.height",this.$refs.scroll.$el.children[1].children[2].style.height)
        // console.log("scrollTop",scrollTop)
        // if(scrollTop){
        //    var rowIndexnum = parseInt(scrollTop/rowHeigth)
        //     console.log("rowIndexnum",rowIndexnum)
        // }   
        // this.$refs.scroll.stopAnimation();
      },
      selfrjczSort(e){
        // console.log("我点击了排序",e)
        this.isselfcjczSort = !this.isselfcjczSort
        // this.reserveaveragecost = averagecost.data.concat()
        // this.reserveaveragecost.sort(compare('value'));
        let averagecost = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        }
        if(this.isselfcjczSort){
          averagecost.data.push(...this.selfcjczReserve)
        }else{
          averagecost.data.push(...this.selfcjcz)
        }
        this.rjczConfig = {...averagecost}
        //console.log("this.rjczConfig",this.rjczConfig)
      },
      selfczSort(e){
        // console.log("我点击了排序",e)
        this.isselfczSort = !this.isselfczSort
        // this.reserveaveragecost = averagecost.data.concat()
        // this.reserveaveragecost.sort(compare('value'));
        let multTotal = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "产值",
          showValue: true,
        }
        if(this.isselfczSort){
          multTotal.data.push(...this.selfcjczReserve)
        }else{
          multTotal.data.push(...this.selfcjcz)
        }
        this.czConfig = {...multTotal}
        //console.log("this.rjczConfig",this.rjczConfig)
      },
      joinrjczSort(e){
        // console.log("我点击了排序",e)
        this.isjoinrjczSort = !this.isjoinrjczSort
        // this.reserveaveragecost = averagecost.data.concat()
        // this.reserveaveragecost.sort(compare('value'));
        let averagecost = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        }
        if(this.isjoinrjczSort){
          averagecost.data.push(...this.joinrjczReserve)
        }else{
          averagecost.data.push(...this.joinrjcz)
        }
        this.rjczConfig2 = {...averagecost}
        //console.log("this.rjczConfig",this.rjczConfig)
      },
      joinczSort(e){
        // console.log("我点击了排序",e)
        this.isjoinczSort = !this.isjoinczSort
        // this.reserveaveragecost = averagecost.data.concat()
        // this.reserveaveragecost.sort(compare('value'));
        let multTotal = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "产值",
          showValue: true,
        }
        if(this.isjoinczSort){
          multTotal.data.push(...this.joinczReserve)
        }else{
          multTotal.data.push(...this.joincz)
        }
        this.czConfig2 = {...multTotal}
        //console.log("this.rjczConfig",this.rjczConfig)
      },
      getDeptNumName() {
        // request home api
        const _date = new Date();
        this.DeptArr=[]

        productionNewApi.fetchGetDeptNumNameData().then(res => {
          console.log("res depname",res.data)
          if(res && res.data.length > 0 && res.code === '000000') {
            //console.log("thisDeptArr res",res)
            res.data.forEach(item => {
              let obj = {
                name: item.selectName,
                value: item.deptCode
              }
              this.DeptArr.push(obj)
            })
          }
        })
      },
      //数组比较
      compare(key){
        return function(value1,value2){
          var val1=value1[key];
          var val2=value2[key];
          return val1-val2;
        }
      },
      
      // 自营
      async selfSupport() {
        const barChartZYOption = {
          xData: ["月度", "年度", "开累"],
          legendData: [
            {
              name: "计划",
            },
            {
              name: "完成",
            },
          ],
          seriesData: this.seriesData
        };
        // request home api
        // const _date = new Date();
        // let mm = _date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth();
        const res = await productionNewApi .fetchSelfBusinessData(this.ny);
        //console.log("自营11111111111",res.data)
        //  产值赋值
        this.seriesData.forEach(item => {
          item.data = []
          let data = [parseInt(Number(res.data.proinfo.monthly.plan)), parseInt(Number(res.data.proinfo.yearly.plan)), parseInt(Number(res.data.proinfo.sofar.remained))]
          let downData = [parseInt(Number(res.data.proinfo.monthly.finished)), parseInt(Number(res.data.proinfo.yearly.finished)), parseInt(Number(res.data.proinfo.sofar.finished))]
          if(item.name === '计划') {
            this.$set(item, 'data', data)
          }
          if(item.name === '完成') {
            this.$set(item, 'data', downData)
          }
        })
        //  echarts重新渲染
        this.drawDoubleBarChart(
          "barChart1",
          barChartZYOption.xData,
          barChartZYOption.legendData,
          barChartZYOption.seriesData,
          "产值"
        );
        let averagecost = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        }
        //console.log("res.data.multAverage", res.data.multAverage)
        
        if(res.data.multAverage.length>0){
          res.data.multAverage.forEach((item, index) => {
            //console.log("multAverage item",item)
            //console.log("multAverage item cost",item.cost)
            let obj = {
              name: item.deptname,
              value: item.cost === null ? 0 : item.cost
            }
            averagecost.data.push(obj)
          })

        }else{
          averagecost.data.push(
            {name:"",value:0},
            {name:" ",value:0},
            {name:"  ",value:0},
            {name:"   ",value:0},
            {name:"    ",value:0},
            {name:"     ",value:0},
          ) 
        }
        console.log("averagecost.data",averagecost.data)
        
        this.selfcjcz = averagecost.data
        this.selfcjczReserve = averagecost.data.concat()
        this.selfcjczReserve.sort(this.compare('value'));
        console.log("selfcjczReserve reserveaveragecost",this.selfcjczReserve);
        this.rjczConfig = {...averagecost}


        let multTotal = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "产值",
          showValue: true,
        }
        if(res.data.multTotal.length>0){
          res.data.multTotal.forEach((item, index) => {
          let obj = {
            name: item.deptname,
            value: item.cost === null ? 0 : item.cost
            }
            multTotal.data.push(obj)
          })
          
        }else{
          multTotal.data.push(
            {name:"",value:0},
            {name:" ",value:0},
            {name:"  ",value:0},
            {name:"   ",value:0},
            {name:"    ",value:0},
            {name:"     ",value:0},
          )
        }

        console.log("averagecost.data",multTotal.data)
        
        this.selfcz = multTotal.data
        this.selfczReserve =multTotal.data.concat()
        this.selfczReserve.sort(this.compare('value'));
        console.log("selfcjczReserve reserveaveragecost",this.selfczReserve);
        this.rjczConfig = {...averagecost}



        this.czConfig = {...multTotal}
        //console.log("this.$refs.rjcz",this.$refs.rjcz)
        //console.log("this.$refs.rjcz.$el.children[1].children[1]",this.$refs.rjcz.$el.children[1].children[1])
        // console.log("this.$refs.rjcz",this.$refs.rjcz)
        // console.log("this.$refs.rjcz.$el.children[1].children",this.$refs.rjcz.$el.children[1].firstChild.width)
   
        //console.log("this.$refs.rjcz",this.$refs.rjcz.$el.children[1].offsetWidth)
        //console.log("111111",this.getStyle(this.$refs.rjcz.$el.children[1],width))
      },
      // 联营
      async joinSupport() {
        // const _date = new Date();
        // let mm = _date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth();
        const res = await productionNewApi.fetchJoinSupportData(this.ny);
        //console.log(res.data.proinfo, '--------res')
        this.joinSeriesData.forEach(item => {
          item.data = []
          let data = [parseInt(Number(res.data.proinfo.monthly.plan)), parseInt(Number(res.data.proinfo.yearly.plan)), parseInt(Number(res.data.proinfo.sofar.remained))]
          let downData = [parseInt(Number(res.data.proinfo.monthly.finished)), parseInt(Number(res.data.proinfo.yearly.finished)), parseInt(Number(res.data.proinfo.sofar.finished))]
          if(item.name === '计划') {
            this.$set(item, 'data', data)
          }
          if(item.name === '完成') {
            this.$set(item, 'data', downData)
          }
        })
        const barChartZYOption = {
          xData: ["月度", "年度", "开累"],
          legendData: [
            {
              name: "计划",
            },
            {
              name: "完成",
            },
          ],
          seriesData: this.joinSeriesData
        };
        this.drawDoubleBarChart(
          "barChart2",
          barChartZYOption.xData,
          barChartZYOption.legendData,
          barChartZYOption.seriesData,
          "产值"
        );
        let averagecost = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        }
        if (res.data.multAverage.length > 0) {
          res.data.multAverage.forEach((item, index) => {
            let obj = {
              name: item.deptname,
              value: item.cost === null ? 0 : item.cost
            }
            averagecost.data.push(obj)
          })
          
        }else{
           averagecost.data.push(
            {name:"",value:0},
            {name:" ",value:0},
            {name:"  ",value:0},
            {name:"   ",value:0},
            {name:"    ",value:0},
            {name:"     ",value:0},
          ) 
        }

        this.joinrjcz = averagecost.data
        this.joinrjczReserve = averagecost.data.concat()
        this.joinrjczReserve.sort(this.compare('value'));
        console.log("this.joinrjczReserve",this.joinrjczReserve);

        this.rjczConfig2 = {...averagecost}

        let multTotal = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "产值",
          showValue: true,
        }
        if (res && res.data.multTotal && res.data.multTotal.length > 0) {
          res.data.multTotal.forEach((item, index) => {
            let obj = {
              name: item.deptname,
              value: item.cost === null ? 0 : item.cost
            }
            multTotal.data.push(obj)
          })
          
        }else{
          multTotal.data.push(
            {name:'',value:0},
            {name:' ',value:0},
            {name:'  ',value:0},
            {name:'   ',value:0},
            {name:'    ',value:0},
            {name:'     ',value:0}
          )     
        }

        this.joincz = multTotal.data
        this.joinczReserve = multTotal.data.concat()
        this.joinczReserve.sort(this.compare('value'));
        console.log("this.joinczReserve",this.joinczReserve);

        this.czConfig2 = {...multTotal}
      },
      // 滞后list
      async getLagList() {
        // request home api
        const _date = new Date();
        this.month = _date.getMonth();
        let mm = _date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth();
        let res = await productionNewApi  .fetchLagListData(this.ny);
        const lateRateColors = ['#e82e11', '#d97808', '#ddf420','#1AE642'];
        const lateRateValues = [30, 20, 10];
        let zhb = []
        this.lagList = res.data
        if(res && res.data && res.data.length > 0) {
          res.data.forEach(item => {
            zhb.push([item.name, item.delayrate, item.id])
          })
        }
        const newZhb = zhb.map((item) => {
          const rate = Number(item[1].replace(/[\%|]/g, ''));
           console.log(rate, '--newZhb-------rate--------')
          let color = '';
          for(let i = 0; i < lateRateValues.length; i += 1) {
            if(rate >= lateRateValues[0]) {
              color = lateRateColors[0];
              break;
            }
            if(rate >= lateRateValues[1] && rate < lateRateValues[0]) {
              //console.log(rate, '----rate')
              color = lateRateColors[1];
              break;
            }
            if(lateRateValues[2] <= rate && rate <= lateRateValues[1]) {
              color = lateRateColors[2];
              break;
            }
            if(rate < lateRateValues[2]) {
              color = lateRateColors[3];
              break;
            }
              
            // if(rate < lateRateValues[i] && ) {
            //   color = lateRateColors[i];
            //   break;
            // }
            // if(rate >= lateRateValues[i]) {
              
            //   color = lateRateColors[i];
            //   break;
            // }
            // console.log(lateRateValues, '----console.log(lateRateValues[i])-----')
          }
          return [`<span style="color:${color};">${item[0]}</span>`, `<span style="color:${color};">${item[1]}%</span>`];
        });

        this.config = {
          header: ["项目", "进度偏差"],
          data: newZhb,
          index: true,
          indexHeader: "排名",
          columnWidth: [50],
          rowNum: 15,
          carousel:"single",
          waitTime:1000,
          align: ["center"],
        };
      },
      // 公司总体施工情况，片区+施工情况
      async initData() {
        this.pieOption.pieData = []
        this.DeptArr=[]
        // request home api
        const _date = new Date();
        this.month = _date.getMonth();
        let mm = _date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth();
        //console.log("productionsummer 月份",mm)
        this.getDeptNumName()
        this.allCompany = await productionNewApi .fetchProManData(this.ny);
        console.log("allCompany",this.allCompany)
        console.log("this.DeptArr",this.DeptArr)
        // console.log("production summerrallCompany",this.allCompany)
        // this.total = this.arr.reduce((n,m) => n + m);
        this.total=0
        // if(this.allCompany.data){
        //   Object.keys(this.allCompany.data.productionValue).forEach(item => {
        //     //console.log("this.allCompany.data.productionValue[item]", parseInt(this.allCompany.data.productionValue[item]))
        //     this.arr.push(parseInt(this.allCompany.data.productionValue[item]))
        //     this.total = this.arr.reduce((n,m) => n + m);
        //   })
        // }  
        //console.log("this.total",this.total)
        if(this.allCompany && this.allCompany.data && this.allCompany.data.productionValue) {
          Object.keys(this.allCompany.data.productionValue).forEach(item => {
            this.DeptArr.forEach(i => {
              if(i.value === item) {
                let str = 0
                if(this.total === 0 || Number(this.allCompany.data.productionValue[item] === 0)) {
                  str = 0
                } else {
                  str = parseInt(Number(this.allCompany.data.productionValue[item] / this.total) * 100)
                  //console.log(this.allCompany.data.productionValue[item], this.total)
                }
                var obj = {
                  value: this.allCompany.data.productionValue[item],
                  name: `${i.name}:${this.allCompany.data.productionValue[item]}(${str}%)`
                }
                console.log("obj",obj)
                this.pieOption.pieData.push(obj)

              } 

            })
            
                
          })
          this.drawPieChart("pieChart", this.pieOption.pieData,'片区公司产值情况');
        }
        
      },
      onTableClick(row) {
        let id = ''
        let name = ''
        console.log("this.lagList",this.lagList)
        this.lagList && this.lagList.length > 0 && this.lagList.forEach((item, index) => {
          if(row.rowIndex === index) {
            id = item.id
            name = item.name
          }
        })
        this.$router.push({ 
          name: "DispatchNew",
          params: {
            id,
            name,
            ny: this.ny,
          }
       });
      },
      drawPieChart(id, pieData,seriesName) {
        var myChart = echarts.init(document.getElementById(id));

        var option = {
          color: ["#E4111f", "#e46c11", "#1188e4", "#11E46c", "orange","#f57A82","#0fc1d6"],
          tooltip: {
            trigger: "item",
            formatter: (params)=>{
              // return seriesName+'<br>'+params.name.slice(0,5)+'：'+params.data.value+'万元（'+ params.percent+"%）"
              return params.name.slice(0,5)+'：'+params.data.value+'万元（'+ params.percent+"%）"
            },
          },
          grid:{
            top:'50'
          },
          series: [
            {
              name:seriesName,
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              selectedMode: "single",
              data: pieData,
              label: {
                formatter: (params)=>{
                  return params.name.slice(0,5)+'('+ params.percent+"%）"
                },
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      },
      drawDoubleBarChart(id, xData, legendData, seriesData, yTitle) {
        var myChart = echarts.init(document.getElementById(id));
        var option = {
          tooltip: {
            trigger: "axis",
          },
          grid: {
            left: '20%',
            bottom: '15%',

          },
         
          
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
            name: "时间段", //---轴名称
            nameLocation: "end", //---轴名称相对位置
            nameTextStyle: {
              //---坐标轴名称样式
              color: "#fff",
              padding: [5, 0, 0, -5], //---坐标轴名称相对位置
            },
            nameGap: 15, //---坐标轴名称与轴线之间的距离
            //nameRotate:270,     //---坐标轴名字旋转

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
              margin: 5, //---刻度标签与轴线之间的距离
              //color:'red',        //---默认取轴线的颜色
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
            //nameRotate:270,     //---坐标轴名字旋转

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
              //color:'red',        //---默认取轴线的颜色
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
        myChart.setOption(option);
        // window.addEventListener("resize", function() {
        //   myChart.resize();
        // });
      },
      drawHorizontalBarChart(id, category, barData) {
        var myChart = echarts.init(document.getElementById(id));
        var option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            splitLine: { show: false },
            boundaryGap: ["5%", "5%"],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ffffff",
                width: 1,
                type: "solid",
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            type: "category",
            data: category,
            splitLine: { show: false },
            boundaryGap: ["5%", "5%"],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ffffff",
                width: 1,
                type: "solid",
              },
            },
            axisTick: {
              show: false,
            },
            offset: 10,
            nameTextStyle: {
              fontSize: 15,
            },
          },
          series: [
            {
              name: "数量",
              type: "bar",
              data: barData,
              barWidth: 20,
              barGap: 10,
              smooth: true,
              label: {
                normal: {
                  show: true,
                  position: "right",
                  offset: [5, -2],
                  textStyle: {
                    color: "#ffffff",
                    fontSize: 13,
                  },
                },
              },
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7,
                },
                normal: {
                  barBorderRadius: 7,
                  color: function(params) {
                    var colorList = ["rgba(244,62,113,1)", "rgba(0,160,62,1)"];
                    if (params.dataIndex > 2) {
                      return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: colorList[1] },
                        { offset: 1, color: colorList[1] },
                      ]);
                    } else {
                      return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: colorList[0] },
                        { offset: 1, color: colorList[0] },
                      ]);
                    }
                  },
                },
              },
            },
          ],
        };
        myChart.setOption(option);
      },
    },
    deactivated(){
      console.log("this.pieOption.pieData",this.pieOption.pieData)
      
    }
  }
</script>

<style lang="scss">
// .dv-scroll-board.tableContainerSonTable{
//   overflow:hidden;
// }
.dv-scroll-board .rows{
  overflow-y: scroll;
}
.dv-capsule-chart .label-column {
    display:block;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 10px;
    text-align: right;
    font-size: 12px;
    width: 103px;
}
.dv-capsule-chart .label-column div {
    height: 21px;
    line-height: 21px;
    margin:0;
    padding:0;
    text-align:left;
    overflow: hidden;
    text-overflow: ellipsis;
    width:103px;
    white-space: nowrap;
    
}
.dv-capsule-chart .capsule-item{
  display:block;
  height:18px;
  margin:0;
  padding:3px 0;
  box-sizing: border-box;
  margin:3px 0;
}
.dv-capsule-chart .unit-label {
    height: 23px;
    font-size: 12px;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top:2.3rem;
    z-index:9990;
    width:calc(100% - 30px - 103px);
}
.dv-capsule-chart .unit-text {
    position:absolute;
    top:2.3rem;
    text-align: right;
    display: flex;
    align-items: flex-end;
    font-size: 12px;
    line-height: 20px;
    z-index:9990;
    margin-left: 10px;
    
}
.dv-capsule-chart {
    position:static;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    padding: 10px;
    color: #fff;
}

.production-summaries .chartContainer .chartContentSon.triples {
    position:relative;
    z-index: 888;
}

.production-summaries {
  .table {
    margin: 0.4rem;
    margin-top: 0.6rem;
    border: rgba(0, 102, 153, 1) 1px solid;
    padding: 0.6rem;
    background-color: #0c2456 !important;
  }
  .chartContainerFather {
    float: left;
    padding: 0 0.1rem 0 0.1rem;
    width:100%
  }
  .tableContainer {
    float: right;
    padding: 0 0.1rem 0 0;
    .tableContainerSon {
      height: 9.35rem;
      .tableContainerSonTitle {
        padding: 0.2rem;
        color: #ffffff;
        font-size: 0.2rem;
        font-weight: bold;
      }
      .scroll-wrap {
        height: 8.6rem;
        .tableContainerSonTable {
          width: 90%;
          margin: 0 auto;
        }
      }
    }
  }
  .chartContainer {
    margin-bottom: 0.1rem;
    .chartTitle {
      padding: 0.2rem;
      color: #ffffff;
      font-size: 0.2rem;
      font-weight: bold;
    }
    .chartContent {
      .chartContChild {
        height: 1.05rem;
        // line-height: 1.2rem;
        width: 90%;
        margin: 0 auto;
        font-size: 0.2rem;
        font-weight: bold;
        color: #ffffff;
        p {
          padding: 0.2rem;
          padding-top: 0.35rem;
          span.sred {
            // font-size: 0.3rem;
            color: red;
          }
          span.sgreen {
            // font-size: 0.3rem;
            color: green;
          }
          span.syellow {
            // font-size: 0.3rem;
            color: yellow;
          }
          span.spurple {
            // font-size: 0.3rem;
            color: purple;
          }
        }
      }
    }
    .chartContentSon {
      width: 50%;
      height: 100%;
      float: left;
      &.triples {
        width: 33%;
      }
      .sort{
        color:#fff;
        border:1px solid #7b93e2;
        border-radius: 5px;
        width:30px;
        float:right;
        position:absolute;
        top:-5px;
        right:0;
      }
      .chartTit {
        padding: 0.01rem;
        color: #ffffff;
        font-size: 0.15rem;
        font-weight: bold;
      }
      .chartCont {
        width: 100%;
        height: 2.2rem;
      }
    }
  }
}
.chartTitle {
      padding: 0.2rem;
      color: #ffffff;
      font-size: 0.2rem;
      font-weight: bold;
}
.container{
  .left {
    width:66%;
    float:left;
    margin:0 1% 0 0;
    .wrapper {
      height:12.2rem;
    }
  }
  .right {
    width:33%;
    float:left;
    .wrapper {
      height:4rem;
      margin-bottom:0.1rem;
    }
  }
}
.scroll-wrap {
    width:100%;
    height:11.5rem;
    
      box-sizing: border-box;
      padding:0 0.2rem 0.2rem 0.2rem;
}
.goto {
  float:right
}
::v-deep .goto a:hover{
  text-decoration:underline;
}

</style>