<template>
  <div class="labourServices">
   
    <dv-border-box-10>
    <div class="container">
      <div class="partWrapper">
        <div class="title">劳务企业参建项目情况</div>
        <div class="contentWrapper">
            <div class="chartcont">
              <div class="map" id="map_l"></div>
              <div class="maplegend">
                  <div class="rectangle3"></div>参建项目3个以上
              </div> 
              <div class="maplegend">
                  <div class="rectangle2"></div>参建项目2个
              </div> 
              <div class="maplegend">
                  <div class="rectangle1"></div>参建项目1个  
              </div>  
            </div>
            <div class="tablecont">
              <el-table
                style="width:100%"
                :row-class-name="tableRowClassName"
			        	@row-click="handleRowChange"
                :data="tableData"
                border
                size="mini"
                height="3.5rem"
              >
                <el-table-column
                  type="index"
                  label="排序"
                  width="50"
                ></el-table-column>
                <el-table-column prop="comname" label="劳务企业"></el-table-column>
                <el-table-column  width="70" prop="deptidnum" label="参建项目数"></el-table-column>
                <el-table-column prop="deptname" label="参建项目"></el-table-column>
              </el-table>
            </div>
        </div>
      </div>
      <div class="partWrapper">
        <div class="goto">
            <a :href="hostname" target="_blank">链接后台搜索入口</a>
         </div>
        <div class="title">劳务企业使用情况</div>
        <div class="contentWrapper">
            <div class="chartcont">
              <div style="position:absolute;right:0;z-index:99"><el-button type="primary"  @click.native="labourwhole">七公司</el-button></div>
              <div class="map" id="labourusage" style="margin-top:.3rem"></div> 
              <div class="describe">公司现有注册劳务企业 <a >{{conStatistics.regist}} </a>  家，在用劳务企业 <a >{{conStatistics.using}}  </a >家。A级企业 <a @click="gotoDetail('A')">{{conStatistics.A}} </a >家，B级企业 <a @click="gotoDetail('B')">{{conStatistics.B}} </a >家，C级企业  <a @click="gotoDetail('C')">{{conStatistics.C}} </a >家，D级企业 <a @click="gotoDetail('D')">{{conStatistics.D}} </a >家，不合格劳务企业 <a @click="gotoDetail('E')">{{conStatistics.E}}家 </a ></div>
              
            </div>
            <div class="tablecont">
			    	<div id="app_labourusage_head">七公司</div>
            <el-table
              style="width:100%"
              height="3.1rem"
              :data="LabourusagedetailData"
              border
              size="mini"
              :row-class-name="tableRowClassName2"
            >
              <el-table-column
                type="index"
                label="序号"
                width="50"
              ></el-table-column>
              <el-table-column
                prop="type"
                min-width="150"
                label="劳务企业类型"
              ></el-table-column>
              <el-table-column
                prop="number"
                min-width="120"
                label="数量"
              ></el-table-column>
              <el-table-column 
                prop="rate" 
                label="占比" 
                :formatter="rateFormat"
              ></el-table-column>
              </el-table>
            </div>
        </div>
      </div>
      
    </div>
    </dv-border-box-10>
     <dv-border-box-10 class="box2">
    <div class="container">
      <div class="title">
        公司劳动力配置情况
      </div>
      <div class="part1">
        <div class="map" id="labourconfigrateWhole"></div>
      </div>
      <div class="part2"> <div class="map" id="labourconfigRate"></div></div>
      <div class="part3">
        <el-table
                style="width:100%"
                height="3rem"
                :data="labourconfigrateDetails"
                border
                size="mini"
                :row-class-name="tableRowClassName3"
				@row-click="handleRowChange2"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  width="50"
                ></el-table-column>
                <!-- <el-table-column
                  prop="comname"
                  min-width="100"
                  label="劳务企业"
                ></el-table-column> -->
                <el-table-column
                  prop="deptname"
                  min-width="90"
                  label="参建项目"
                ></el-table-column>
                <el-table-column min-width="70" prop="worknum" label="作业人数"></el-table-column>
                <el-table-column min-width="70" prop="regisnum" label="需求人数"></el-table-column>
                <el-table-column prop="prate" :formatter="prateFormat" label="占比"></el-table-column>
              </el-table>
      </div>
    </div>
     </dv-border-box-10>

   
  </div>
</template>
<script>
import "@/assets/js/china.js";
import echarts from "echarts";
import { LabourServicesNewApi } from '@/api'
export default {
  props:["date"],
  data() {
    return {
      hostname:"",
      tableData: [],
      tableData2: [],
      conStatistics:"",
      // LabourusageData:[],
      LabourusagedetailData:[],
      labourconfigrateDetails:[],
      // date: '',
      pickerOptions: {
        disabledDate(time) {
          return time >Date.now();
        },
      },      
    };
  },
  beforeCreate() {
    
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0,1)",
    });
    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  created() {
    // const _date = new Date()
    // this.date = `${_date.getFullYear()}-${('0' + _date.getMonth()).substr(-2)}`
    if(!this.date){
      const _date = new Date();
      var month = _date.getMonth();
      var year = _date.getFullYear();
      var day = _date.getDate()
      var mm
      if(day<25){
         if(month==0){
            month = 12
             mm = month < 10 ? `0${month}` : month;
            year=year-1
          } else {
            mm = month < 10 ? `0${month}` : month;
          }

      }else{
        if(month==0){
            month = 1
            mm = month < 10 ? `0${month}` : month; 
        }else{
            month = month+1
            mm = month < 10 ? `0${month}` : month; 
        }
      }
      this.date=`${year}-${mm}`
      this.ny=`${year}-${mm}`
      // this.ny="2020-12"
      console.log("ny",this.ny)
    }




    // http://219.139.193.50:8218/index
    this.hostname = `http://${ window.location.hostname}:8218/index`
    
  },
  mounted(){
    this.initData()
  },
  watch: {
    date(newDate) {
      this.initData();
    },
  },
  methods: {
    gotoDetail(level){
      this.$router.push({ name: 'LabourSubconsByLevelDetail', params: { level: level }})
    },

    async labourwhole(){
      document.getElementById("app_labourusage_head").innerText = "七公司"
      let arr = await LabourServicesNewApi.fetchLabourusagedetailData(this.date,"") 
      this.LabourusagedetailData = arr.data
    },
    prateFormat(row, column) {
	  return row.prate.toString().trim().concat("%") 
    },
	rateFormat(row, column) {
	  return row.rate.toString().trim().concat("%")
	},
	handleRowChange(row){
		this.$router.push({
		  name: "LabourServicesDetails",
		  params: {
			subconid: row.subconid,
			comname:row.comname,
			page:1,
			limit:10
	      }
	   });
   },
   
   handleRowChange2(row){
     console.log("一行",row)
		this.$router.push({
		  name: "LabourProjectDetails",
		  params: {
			id: row.deptidnum,
			name:row.deptname,
			ny:this.date
	      }
	   });
	 },
      //参比数改变字体颜色
     tableRowClassName2({row, rowIndex}) {
       //console.log("rowrowindex",row,rowIndex)
       if(row.prate>=85){
         return 'textcolorRed'
       }else if(row.prate<85 && row.prate>=60){
         return 'textcolorYellow'
       }else if(row.prate<60){
         return 'textcolorGreen'
       }
        // if (rowIndex === 1) {
        //   return 'textcolorRed';
        // } else if (rowIndex === 3) {
        //   return 'textcolorYellow';
        // }
        // return '';
      },
	  //参比数改变字体颜色
	  tableRowClassName3({row, rowIndex}) {
	    //console.log("rowrowindex",row,rowIndex)
	    if(row.prate>=90){
	      return 'textcolorGreen'
	    }else if(row.prate<90 && row.prate>=80){
	      return 'textcolorYellow'
	    }else if(row.prate<80){
	      return 'textcolorRed'
	    }
	    
	   },
    // 劳务队伍
    async initData() {
      const _date = new Date();
      //let arr = await LabourServicesNewApi.fetchLabelteamworkrateData(this.date);
      //this.tableData2 = arr.data.right
      //this._sortTableData2();
      //this.echarts2(arr.data.left);
  
      this.fetchedLabelteamnumData();
      this.fetchLabourusageData()
      this.fetchLabourusagedetaiData()
      this.fetchlabourconfigrateData()
      this.fetchlabourconfigdetailData()
      this.fetchconStatistics()

    },
    //描述
    async fetchconStatistics(){
       let res = await LabourServicesNewApi.fetchconStatistics(this.date);
       console.log("res内容",res.regist)
       this.conStatistics=res
    },
    // 劳务队伍作业人数占比
    async fetchedLabelteamnumData() {
      let arr = await LabourServicesNewApi.fetchedLabelteamnumData(this.date);

      //console.log("arr.data.leftleft",arr.data.left)
      this.tableData = arr.data.right
      this.echarts(arr.data.left);
      // this.echarts4(arr.data.left);
    },
    //劳务企业使用情况
    async fetchLabourusageData(){
      var arr = await LabourServicesNewApi.fetchLabourusageData(this.date)
      this.LabourusageData = arr.data
      //console.log("LabourusageData",this.LabourusageData)
      this.echarts2(this.LabourusageData)
    },
    async fetchLabourusagedetaiData(){
      var arr = await LabourServicesNewApi.fetchLabourusagedetailData(this.date,"")
      this.LabourusagedetailData = arr.data
      // console.log("````````````",this.LabourusagedetailData)
    },
    //七公司
    
    //公司劳动力配置
    async fetchlabourconfigrateData(){
      //整个公司
      var arr = await LabourServicesNewApi.fetchlabourconfigrateData(this.date)
      this.labourconfigrate = arr.data
      //console.log("labourconfigrateData",this.labourconfigrateWhole)
      this.labourconfigrateWhole(this.labourconfigrate.whole);
      //分支公司
      this.labourconfigRate(this.labourconfigrate.branch)
    },

     async fetchlabourconfigdetailData(){
      var arr = await LabourServicesNewApi.fetchlabourconfigratedetailslData(this.date,"")
      this.labourconfigrateDetails = arr.data
      //console.log("fetchlabourconfigratedetailslData111111111",this.labourconfigrateDetails)
     },

    // _sortTableData2() {
    //   this.tableData2 = this.tableData2.sort((a, b) => (b.data / b.value - a.data / a.value));
    // },
    tableRowClassName({ row, rowIndex }) {
      //  console.log("rowrowindex",row,rowIndex)
       if(row.deptidnum==3){
         return 'textcolorRed'
       }else if(row.deptidnum==2){
         return 'textcolorYellow'
       }else if(row.deptidnum==1){
         return 'textcolorGreen'
       }
      // console.log("rowname",row.name)
      // if (row.name > 2) {
      //   return "red-row";
      // } else if (row.name == 2) {
      //   return "yellow-row";
      // } else if (row.name < 2) {
        
      // }
      
    },
    formatter(resRow) {
      var resvalue = Math.floor((resRow.data / resRow.value) * 10000) / 100;
      return isNaN(resvalue) ? "" : resvalue + "%";
    },
    goBack() {
      this.$router.push({ path: "/" }); 
    },
    openDetails(row) {
      // console.log(row, '-----------')
      this.$router.push({ 
        name: "LabourServicesDetails",
        params: {
          name: row.name
        }
       });
    },
    seeDetails(resRow) {
      this.echarts2(resRow);
    },
    echarts(left) {

      //console.log("leftlefteftleft",left)
      let data = []
      let colorList=["#CAF982", "#FACD91", "#EC808D", "#0fa0d6", "#0fb4d6"]
      // for(let i=0; i<left.length; i++){
      //   data.push(i+1)
      // }
      var myChart = echarts.init(document.getElementById("map_l"));
      var option = {
        // color: ["#3398DB"],
      
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "10%",
          right: "20%",
          top: "20%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            // data,
            axisTick: {
              alignWithLabel: true,
            },
            name: "项目数",
            nameLocation:"end",
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "劳务企业数",
            splitLine: { show: false }, //去除网格线
            axisLabel: {},
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        ],
        series: [
          {
            name: "劳务企业数",
            type: "bar",
            barWidth: "40%",
            data: left,
            itemStyle: {
              normal: {
                color: function(params) {
                  // if (params.dataIndex >= 2) {
                  //   return ["rgb(236, 128, 141)"];
                  // } else if (params.dataIndex === 1) {
                  //   return ["rgb(250, 205, 145)"];
                  // } else if (params.dataIndex === 0) {
                  //   return ["rgb(202, 249, 130)"];
                  // }
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#fff",
                    fontSize: 12,
                  },
                },
              },
            },
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts2(LabourusageData) {
      var _this= this
      console.log("_this",this)
      console.log("echarts LabourusageData",LabourusageData)
      let deptId =[]
      let seriesData =[]
      for(var i =0;i<LabourusageData.length;i++){
        deptId.push(LabourusageData[i].id)
        seriesData.push({
          name:LabourusageData[i].deptname,
          value:LabourusageData[i].value,
        })
      }
      var myChart = echarts.init(document.getElementById("labourusage"));
  

      var option = {
        grid:{
          x:'20%'
        },
        title: {
          
          left: "center",
          textStyle: {
            color: "#fff", //颜色
            fontWeight: "bold", //粗细
            fontSize: 18, //大小
            align: "center", //水平对齐
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          top: 40,
          //data: [left[0].name, left[1].name, left[2].name],
          show: false,
          textStyle: {
            color: "#fff", //颜色
            fontWeight: "bold", //粗细
            fontSize: 12, //大小
          },
        },

        color: ["#E4111f", "#e46c11", "#11E46c", "#f57A82","#0fc1d6","#1188e4","orange", ],
        series: [
          {
            type: "pie",
            radius: "40%",
            center: ["50%", "50%"],
            label: {
              fontSize: 12,
              formatter: '{b}:{c}个',
              position: 'outside'
            },
            labelLine:{
              show:true,
              length:5,
              length2:5
            },
            // 后台name返回汉字错误，进行转换，如后台修改后，直接赋值 data: left  即可
            // left: [{name: "参见人数占大于总人数85%", value: 49}, {name: "参见人数占比大于总人数65%-85%", value: 0},…]
            data: seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            }
          },
        ],
      };
    
      // myChart.setOption(option,true);
      myChart.setOption(option);
      myChart.off('click');
      myChart.on('click',function (param){
    //  //劳务企业使用情况标题行
        console.log("我点击了")
        document.getElementById("app_labourusage_head").innerText = param.name
        //请求数据的id
        console.log("我点击了 deptId[param.dataIndex])",deptId[param.dataIndex])
        LabourServicesNewApi.fetchLabourusagedetailData(_this.date,deptId[param.dataIndex]).then((data)=>{
          console.log("data````````",data)
          _this.LabourusagedetailData = data.data
        })
      })

      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    
    labourconfigrateWhole(configwhole) {
      // console.log("leftleft",left)
      console.log("configwholeconfigwholeconfigwhole",configwhole)
       let colorlist ={
        percent100:["#CAF982","#aaa"],
        percent90:["#CAF982","#aaa"],
        percent80:["#FACD91","#aaa"],
        percent0:["#EC808D","#aaa"],
        // background:#CAF982;
        // background:#FACD91;
        // background:#EC808D;
      }
      let unconfiged=0
      let configed=0
      // let configwhole ={existn:101,needn: 100}
      let color
      let configedpercent = 0
      if(configwhole.existn!=0 && configwhole.needn!==0){
        configed = ((configwhole.existn/configwhole.needn).toFixed(2))*100
        if (configed>100){
          unconfiged = 100 - configed
          color = colorlist.percent100
          configedpercent = "100+"
        }else if(configed>=90){
          unconfiged = 100 - configed
          color = colorlist.percent90
          configedpercent = configed
        }else if(configed>=80){
          unconfiged = 100 - configed
          color = colorlist.percent80
          configedpercent = configed
        }else{
          unconfiged = 100 - configed
          color = colorlist.percent0
          configedpercent = configed
        }
        
      }
      console.log("configed,unconfiged",configed,unconfiged)
      // console.log("configwhole percent",percent)
     


      let seriesData = []
      
      seriesData.push(
        {
          name:"已配置",
          value:configed,
          label: {
              normal: {
                fontSize:22,
                show: true,
                formatter: `${configedpercent}%`
            }
          }

        },
        {
          name:"未配置",
          value:unconfiged,
          label: {
                normal: {
                  show: false,
                  formatter: '{d}%'
              }
          }
        },
      )

      console.log("config seriesData",seriesData)

      var myChart = echarts.init(document.getElementById("labourconfigrateWhole"));
      // var dataOpcton = left;
      // var titleList = ["参建人数占大于总人数85%", "参建人数大于总人数60%-85%", "参建人数小于总人数60%"];
      // var dataOpcton = this.tableData2.map((item) => {
      //   var resvalue = Math.floor((item.data / item.value) * 10000) / 100;
      //   if (resvalue >= 85) {
      //     item.color = colorList[0];
      //   } else if (resvalue >= 60 && resvalue < 85) {
      //     item.color = colorList[1];
      //   } else {
      //     item.color = colorList[2];
      //   }
      //   item.proportion = isNaN(resvalue) ? "" : resvalue + "%";
      //   return item;
      // });
     
      var option = {
        grid:{
          left:'30%'
        },
        title: {
          text: "公司劳动力配置率",
          left: "center",
          textStyle: {
            color: "#fff", //颜色
            fontWeight: "bold", //粗细
            fontSize: 18, //大小
            align: "center", //水平对齐
          },
        },
        tooltip: {
          trigger: "item",
          // formatter:
          // formatter: function(a,b,c){
          //  console.log("a",a)
          //   console.log("b",b)
          //   console.log("c",c)
          //   let percent = parseInt(a.percent)
          //   return `${a.name}:${percent}%`
          // },
        },
        legend: {
          orient: "vertical",
          left: 10,
          top: 40,
          //data: [left[0].name, left[1].name, left[2].name],
          show: false,
          textStyle: {
            color: "#fff", //颜色
            fontWeight: "bold", //粗细
            fontSize: 12, //大小
          },
        },
        // color: ["rgb(236, 128, 141)","rgb(250, 205, 145)","rgb(202, 249, 130)"],
        color:color,
        series: [
          {
            type: "pie",
            radius: ['50%', '70%'],
            center: ["45%", "60%"],
            label: {
              fontSize: 16,
              formatter: '{d}%\n{b}',
              normal:{
                position:'center'
              }
            },
            // 后台name返回汉字错误，进行转换，如后台修改后，直接赋值 data: left  即可
            // left: [{name: "参见人数占大于总人数85%", value: 49}, {name: "参见人数占比大于总人数65%-85%", value: 0},…]
            data: seriesData,
            // data:[{
            //     value: 40,
            //     name: "已配置",
            //     label: {
            //         normal: {
            //           show: true,
            //           fontSize: 30,
            //           formatter: '{d}%'
            //         }
            //     }
            //   },
            //   {
            //     value: 60,
            //     name: '未配置',
            //     label: {
            //         normal: {
            //             show: false,
            //             formatter: '{d}%'
            //         }
            //     }
            //   }
            // ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            }
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    labourconfigRate(labourconfigRate) {
      console.log("this.labourconfigRate",labourconfigRate)
      let xData = []
      let deptId = []
      let seriesData = []
      for(var i=0;i<labourconfigRate.length;i++){
        xData.push(labourconfigRate[i].deptname)
       
        deptId.push(labourconfigRate[i].id)
        seriesData.push(labourconfigRate[i].value)
      }
       //console.log("xdata",xData)
      var colorlist=["#1AE642","#E6E61A","#D83939"] 

       // "#1AE642" #E6E61A  #E61A1A
                  // if (params.dataIndex >= 2) {
                  //   return "#D83939";
                  // } else if (params.dataIndex === 1) {
                  //   return "#E6E61A";
                  // } else if (params.dataIndex === 0) {
                  //   return "#1AE642";
                  // }
      var myChart = echarts.init(document.getElementById("labourconfigRate"));
      var option = {
        // color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
		  formatter : function(params){  
			//console.log("params-----》",params);//打印params
			return  params[0].name+"<br>"+params[0].seriesName+":"+params[0].value+"%";
		  }
        },
        grid: {
          left: "1%",
          right: "22%",
          top: "12%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data:xData,
            axisLabel: {
              interval:0,
              formatter:function(value){
                //console.log("value",value)
                return value.split("").join("\n");
              }
            },
            axisTick: {
              alignWithLabel: true,
            },
            name: "片区分公司",
            nameLocation:"end",
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "劳动力配置率",
            splitLine: { show: false }, //去除网格线
            axisLabel: {},
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        ],
        series: [
          {
            name: "劳动力配置率",
            type: "bar",
            barWidth: "40%",
            data: seriesData,
            itemStyle: {
              normal: {
                color: function(params) {
                  //console.log("paramsparamsparamsparamsparams",params)
                  if (params.data>=90){
                    return "#1AE642";    
                  }else if (params.data<90 && params.data>=80){
                    return "#E6E61A"
                  }else if(params.data<80){
                    return "#D83939"
                  }
                  // "#1AE642" #E6E61A  #E61A1A
                  // if (params.dataIndex >= 2) {
                  //   return "#D83939";
                  // } else if (params.dataIndex === 1) {
                  //   return "#E6E61A";
                  // } else if (params.dataIndex === 0) {
                  //   return "#1AE642";
                  // }
                  // return colorList[params.dataIndex];
                },
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#fff",
                    fontSize: 12,
                  },
				  formatter: '{c}%'
                },
              },
            },
          },
        ],
      };
      
      myChart.setOption(option);
      myChart.off('click')
      myChart.on("click", (param)=>{
        console.log("公司配置率柱状图",param)
        //请求数据的id
        console.log("`````deptId[param.dataIndex])",deptId[param.dataIndex])
        LabourServicesNewApi.fetchlabourconfigratedetailslData(this.date,deptId[param.dataIndex]).then((data)=>{
          this.labourconfigrateDetails = data.data
        })
        console.log("``````公司配置率柱状图",param)
      })
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.subtitle {
  font-size:16px;
  color:#fff;
}

.dv-border-box-10.box2{
  margin-top:0.2rem;
  padding-bottom:0.3rem;
}
::v-deep .el-table__row.textcolorRed td div.cell{
    color:rgb(236, 128, 141)
     
}
::v-deep .el-table__row.textcolorGreen td div.cell{
    color:rgb(202, 249, 130)
     
}
::v-deep .el-table__row.textcolorYellow td div.cell{
    color:rgb(250, 205, 145)
     
}

.el-table .success-row {
  background:"red";
}
.labourServices {
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
  .container{
    overflow: auto;
    overflow-y:hidden;
    width:100%;
    .title {
      color: #63ecff;
      text-align: center;
      font-size: 0.3rem;
      line-height: 0.8rem;
      padding:0.1rem 0;
    }
    .part1{
      float:left;
      width:33%;
      .map{
        height:3rem;
        width:auto;
      }
    }
    .part2{
      float:left;
      width:33%;
      .map{
        height:3rem;
        width:auto;
      }
    }
    .part3{
      float:left;
      width:33%;
    }
    .partWrapper{
      float:left;
      width:50%;
      height:5rem;
      .contentWrapper{
        .title {
          color: #63ecff;
          text-align: center;
          font-size: 0.4rem;
          line-height: 0.8rem;
          padding:0.5rem 0;
        }
         width:100%;
        .chartcont{
          float:left;
          position: relative;
          height:4rem;
          width:40%;
          box-sizing: border-box;
          padding:0 10px;
          .maplegend {
            height:0.2rem;
            font-size:0.1rem;
            text-align: left;
            padding-left:1rem;
            color:#aaa;
            .rectangle1{
              display:inline-block;
              
              border-radius: 2px;
              width: 10px;
              background:#CAF982;
              height:10px;
              margin-right:10px;
              
            }
            .rectangle2{
              display:inline-block;
              border-radius: 2px;
              
              width: 10px;
              height:10px;
              background:#FACD91;
              margin-right:10px;
              
            }
            .rectangle3{
              display:inline-block;
              border-radius: 2px;
              background:#EC808D;
              width: 10px;
              height:10px;
              margin-right:10px;
              
            }

            
          }
          .map{
            height:2.4rem;
            width:auto;
          }
        }
        .tablecont{
          float:left;
          width:60%;
          box-sizing: border-box;
          padding:0 20px;
        } 
      }
    }  
  }
  .box {
    width: 98%;
    min-width: 1200px;
    margin: 0.1rem auto 0 auto;
    display: flex;
    .map {
      flex: 0 0 50%;
      width: 50%;
      height: 4rem;
      margin-top: 0.6rem;
    }
    .table {
      flex: 1;
      height: 4rem;
      margin-top: 0.1rem;
      .thead {
        width: 100%;
        text-align: center;
        line-height: 0.8rem;
        .tilte {
          color: #ffffff;
          font-size: 24px;
          line-height: 0.3rem;
          margin-left: 0.6rem;
        }
      }
    }
  }
}


.el-table .red-row {
  background: rgb(236, 128, 141) !important;
}
.el-table .yellow-row {
  background: rgb(250, 205, 145) !important;
}
.el-table .cyan-row {
  background: rgb(202, 249, 130) !important;
}
.describe {
  color:#fff;
}
#app_labourusage_head{
  width: 100%;
  background-color: rgba(225, 225, 225, 0.1);
  border-top: solid rgb(137,137,137);
  border-left: solid rgb(137,137,137);
  border-right: solid rgb(137,137,137);
  text-align: center;
  font-size: large;
  color: white;
}
.el-button--primary {
    color: #FFF;
    background-color: rgba(75,143,211,.4);
    border-color: rgba(75,143,211,.4);
}
.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #DCDFE6;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 4px;
}
.goto {
  position: absolute;
  right:.2rem;
  top:.2rem

}
::v-deep .goto a:hover{
  text-decoration:underline;
}

</style>
