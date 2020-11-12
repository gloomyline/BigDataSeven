<template>
  <div class="dispatch">
    <div class="head">
      <div class="left">
        <el-date-picker
          v-model="ny"
          type="month"
          :picker-options="pickerOptions"
          value-format="yyyy-MM"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="middle"><h1>{{title}}项目部生产明细</h1></div>
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack(false)"
          >返回</el-button
        >
      </div>
    </div>
    <el-button-group>
      <el-button type="primary" @click="goto(0)">生产明细</el-button>
      <el-button type="primary" @click="goto(1)">周转材料</el-button>
      <el-button type="primary" @click="goto(2)">设备情况</el-button>
      <el-button type="primary" @click="goto(3)">人力资源</el-button>
      <el-button type="primary" @click="goto(4)">劳务管理</el-button>
    </el-button-group>
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">{{title}}项目简介</span>
      </p>
      <div class="chartContent">
        <div class="textcolorWhite" v-html="projectinfo">{{projectinfo}}</div>
      </div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">计划完成情况</span>
      </p>
      <div class="chartBox">
        <div class="sy" id="fb1"></div>
        <div class="sy" id="fb2"></div>
        <div class="sy" id="fb3"></div>
      </div>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">节点完成情况</span>
      </p>
      <div class="title" >里程碑线路完成情况</div>
      <div class="chartBox">
        <!-- 里程碑线路 --> 
        <el-table
        :data="milerNodeList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pprojectname"
          label="项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pnodename"
          label="节点名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pplandate"
          label="计划完成日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pfinishdate"
          label="预计/实际完成日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="diffday"
          label="进度偏差(天数)">
        </el-table-column>
      </el-table>
      </div>
      <div class="title">关键线路完成情况</div>
      <div class="chartBox">
      <!-- 关键线路 -->
      <el-table
        :data="keyLineNodeList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pprojectname"
          label="项目名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pnodename"
          label="节点名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pplandate"
          label="计划完成日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pfinishdate"
          label="预计/实际完成日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="diffday"
          label="进度偏差(天数)">
        </el-table-column>
      </el-table>
      <!-- 主要线路 -->
      </div>
      <div class="title">主要线路完成情况</div>
      <div class="chartBox">

      <el-table
          :data="primaryLineNodeList"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="pprojectname"
            label="项目名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="linename"
            label="线路名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="pnodename"
            label="节点名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="pplandate"
            label="计划完成日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="pfinishdate"
            label="预计/实际完成日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="diffday"
            label="进度偏差(天数)">
          </el-table-column>
        </el-table>
      </div>

      
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">项目施组及专项方案评审情况</span>
      </p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="施组及专项方案名称"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="审批状态"
          min-width="150"
        >

         <template slot-scope="scope">
           {{ scope.row.status | fiterStatus}} 
          <!-- <span v-if="scope.row.status === '0'">未评审</span>
          <span v-else-if="scope.row.status === '1'">评审中</span>
          <span v-else-if="scope.row.status === '2 '">已评审</span>  -->
        </template> 
        </el-table-column>
        <el-table-column
          prop="casefile"
          label="附件"
          min-width="220"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column
          prop="dateplantoview"
          label="计划评审时间"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="datetoview"
          label="评审时间"
          min-width="150"
        ></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import { DispatchNewApi }  from '@/api'
import echarts from "echarts";
import btnList from "@/components/BtnList.vue";

export default {
  filters:{
    fiterStatus: function(value){
      if(value==0){
        return "未评审"
      }else if(value==1){
        return "评审中"
      }else if(value==2){
        return "已评审"
      }
    }
  },
  components: {
    btnList,
  },
  created(){
    this.projectInfo()
  },
  data() {
    return {
      ny:this.$route.params.ny,
      tableData: [],
      milerNodeList:[],
      keyLineNodeList:[],
      primaryLineNodeList:[],
      title: this.$route.params.name,
      projectinfo:"",
      pickerOptions: {
        disabledDate(time) {
            return time >Date.now()
        },
      }
    };
  },
  mounted() {
    this._initData();
  },
  watch:{
    ny(newValue,oldValue){
      if(newValue,oldValue){
        this._initData();
      }
    }
  },
  methods: {
    async _initData() {
      const loading = this.$loading({
        lock: true,
        text: "页面加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 1)",
      });
      await this.getTableData()
      await this.finishlmonth()
      await this.getWebPreviewInfo()
      await this.getNodeListData()
      loading.close();
    },
    goto(idx) {
      const routeMap = [
        {
          name: 'DispatchNew',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
        {
          name: 'TurnoverDetails',
          params: { deptId: this.$route.params.id, ny: this.$route.params.ny },
        },
        {
          name: 'BigEquipmentDetails',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
        {
          name: 'HumanDetailsNew',
          params: { projectId: this.$route.params.id, projectName: this.$route.params.name, ny: this.$route.params.ny },
        },
        {
          name: 'LabourProjectDetails',
          params: { projectId: this.$route.params.id, projectName: this.$route.params.name, ny: this.$route.params.ny },
        },
      ];
      if (idx === 0) {
        this._initData();
      } else {
        this.$router.push(routeMap[idx]);
      }
    },
    formatter(row) {
      let str = row.casefile.split('\\')
      return str[str.length -1]
    },
    async getWebPreviewInfo() {
      const res = await DispatchNewApi.fetchedWebPreviewInfo(`${this.$route.params.id}`);
      this.tableData = res.data
      console.log("this.tableData",this.tableData)
    },
    async getTableData() {
      const res = await DispatchNewApi.fetchPlanfinishlMonthData1(`${this.$route.params.id}`);
      //console.log("getTableData",res)
      // this.tableData = res.data
    },
    // 节点滞后模块   { ny:ny,projectid: pid, type:type}
    async getNodeListData() {
      const res1 = await DispatchNewApi.fetchedNodeList(this.ny,`${this.$route.params.id}`,1);
      // console.log("nodeList",res)
      this.milerNodeList = res1.data
      const res2 = await DispatchNewApi.fetchedNodeList(this.ny,`${this.$route.params.id}`,2);
      this.keyLineNodeList = res2.data
      const res3 = await DispatchNewApi.fetchedNodeList(this.ny,`${this.$route.params.id}`,3);
      this.primaryLineNodeList = res3.data
      
    },
    async projectInfo() {
      const res = await DispatchNewApi.fetchProjectIntroduction(`${this.$route.params.id}`);
      //console.log("projectInfo",res.data.deptContent)
      if(res.data.deptContent){
         this.projectinfo = res.data.deptContent
      }else{
         this.projectinfo="暂无数据"
      }
    },
    async finishlmonth() {
      const res = await DispatchNewApi.fetchGetDepartProductionData(`${this.$route.params.id}`);
      if(res && res.data) {
        this.echarts_31(res.data.monthly.finished, res.data.monthly.remained)
        this.echarts_32(res.data.yearly.finished, res.data.yearly.remained)
        this.echarts_33(res.data.sofar.finished, res.data.sofar.remained)
      } else {
        this.echarts_31(0, 0)
        this.echarts_32(0, 0)
        this.echarts_33(0, 0)
      }
    },
    goBack(res) {
      if (res) {
        this.$router.push({ path: "/" });
      } else {
        // this.$router.go(-1);
        this.$router.push({ name: 'ProductionNew' });
      }
    },
    echarts_31(finish, remained) {
      let str = (Number(finish) / (Number(finish)+(Number(remained)))*100).toFixed(2) === 'NaN' ? `0` : (Number(finish) / (Number(finish)+(Number(remained)))*100).toFixed(2)
      // 基于准备好的dom，初始化echarts实例
      let rendercolor="red"
      if(str>=90){
        rendercolor = "green"
      }else if(str<90 && str>=70){
        rendercolor = "yellow"
      }else if(str<70){
        rendercolor="red"
      }
      var myChart = echarts.init(document.getElementById("fb1"));
      var option = {
        title: [
          {
            text: "当月完成产值",
            left: "center",
            textStyle: {
              color: "#57D1C9",
              fontSize: "15"
            }
          },
          {
            text: `${str}%`,
            top: "37%",
            left: "center",
            textStyle: {
              color: "#57D1C9",
              fontSize: "14"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          position: function(p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
          }
        },
        legend: {
          top: "85%",
          itemWidth: 10,
          itemHeight: 10,
          data: ["完成"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          },
          formatter: function(params) {
            
            return params === "完成" ? `月计划 ${finish}` : "";
          }
        },
        series: [
          {
            name: "当月完成产值",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["40%", "60%"],
            color: [`${rendercolor}`, "#066eab"],
            label: { show: true },
            labelLine: { show: true },
            data: [
              { value: `${finish}`, name: "完成" },
              { value: `${remained}`, name: "剩余" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  //"{b} : {c}",
                  formatter: function(params) {
                    // console.log("params");
                    // console.log(params);
                    if (params.name === "完成") {
                      return params.name + "：" + params.data.value;
                    } else {
                      return "";
                    }
                  },
                  position: "inner"
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_32(finish, remained) {
      let str = (Number(finish) / (Number(finish)+(Number(remained)))*100).toFixed(2) === 'NaN' ? `0` : (Number(finish) / (Number(finish)+(Number(remained)))*100).toFixed(2)
      // 基于准备好的dom，初始化echarts实例
      let rendercolor="red"
      if(str>=90){
        rendercolor = "green"
      }else if(str<90 && str>=70){
        rendercolor = "yellow"
      }else if(str<70){
        rendercolor="red"
      }
      var myChart = echarts.init(document.getElementById("fb2"));
      var option = {
        title: [
          {
            text: "年累完成产值",
            left: "center",
            textStyle: {
              color: "#FFE869",
              fontSize: "15"
            }
          },
          {
            text: `${str}%`,
            top: "37%",
            left: "center",
            textStyle: {
              color: "#FFE869",
              fontSize: "14"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          position: function(p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
          }
        },
        legend: {
          top: "85%",
          itemWidth: 10,
          itemHeight: 10,
          data: ["完成"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          },
          formatter: function(params) {
            
            return params === "完成" ? `年计划 ${finish}` : "";
          }
        },
        series: [
          {
            name: "年累产值完成比例",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["40%", "60%"],
            color: [`${rendercolor}`, "#066eab"],
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: finish, name: "完成" },
              { value: remained, name: "剩余" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  //"{b} : {c}",
                  formatter: function(params) {
                    // console.log("params");
                    // console.log(params);
                    if (params.name === "完成") {
                      return params.name + "：" + params.data.value;
                    } else {
                      return "";
                    }
                  },
                  position: "inner"
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_33(finish, remained) {
      // console.log(finish, remained, '实打实打算')
      // 基于准备好的dom，初始化echarts实例
      let str = (Number(finish) / (Number(finish)+(Number(remained)))*100).toFixed(2) === 'NaN' ? `0` : (Number(finish) / (Number(finish)+(Number(remained)))*100).toFixed(2)
      let rendercolor="red"
      if(str>=90){
        rendercolor = "green"
      }else if(str<90 && str>=70){
        rendercolor = "yellow"
      }else if(str<70){
        rendercolor="red"
      }
      var myChart = echarts.init(document.getElementById("fb3"));
      var option = {
        title: [
          {
            text: "开累完成产值",
            left: "center",
            textStyle: {
              color: "#EE6A50",
              fontSize: "15"
            }
          },
          {
            text: `${str}%`,
            top: "37%",
            left: "center",
            textStyle: {
              color: "#EE6A50",
              fontSize: "14"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          position: function(p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
          }
        },
        legend: {
          top: "85%",
          itemWidth: 10,
          itemHeight: 10,
          data: ["完成"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          },
          formatter: function(params) {
            
            return params === "完成" ? `总产值 ${finish}` : "";
          }
        },
        series: [
          {
            name: "开累完成产值比例",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["40%", "60%"],
            color: [
              `${rendercolor}`,
              "#066eab",
              "#0682ab",
              "#0696ab",
              "#06a0ab",
              "#06b4ab",
              "#06c8ab",
              "#06dcab",
              "#06f0ab"
            ],
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: finish, name: "完成" },
              { value: remained, name: "剩余" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  formatter: function(params) {
                    // console.log("params");
                    // console.log(params);
                    if (params.name === "完成") {
                      return params.name + "：" + params.data.value;
                    } else {
                      return "";
                    }
                  },
                  position: "inner"
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .table.boxall .title {
  font-size:16px;
  color:#fff;
  line-height: 50px;
  height:50px;
}
.textcolorWhite {
  color:#fff;
  font-size:16px;
}
.white{

  margin-bottom: 30px;
  h1{
    font-size: 30px;
  }
  p{
    font-size: 18px;
    text-align: left;
    text-indent: 25px;
    line-height: 25p;
  }
}
.dispatch {
  .head {
    height: 1.05rem;
    background: url(~@/assets/images/head_bg.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    padding:0 1px;
    box-sizing:border-box;
    .left{
      position: static;
      width:220px;
    }
    .weather{
      position: static;
      width:220px;
    }
    h1 {
      flex:1;
      color: #63ecff;
      text-align: center;
      font-size: 0.4rem;
      line-height: 0.8rem;
    }
    .middle{
      width:800px;
    }
    
  }
  .img-box {
    width: 92%;
    min-width: 1000px;
    margin: 0 auto;
    .img {
      width: 100%;
      height: 100%;
      min-height: 360px;
    }
  }

  .map {
    width: 1200px;
    height: 460px;
    margin: 0 auto;
  }
  .table {
    margin: 0.4rem;
    margin-top: 0.6rem;
    border: rgba(0, 102, 153, 1) 1px solid;
    padding: 0.6rem;
    background-color: #0c2456 !important;
    .chartBox {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      width: 100%;
      .sy {
        height: 2.65rem;
      }
    }
    .thead {
      text-align: left;
      margin-bottom: 0.6rem;
      .img {
        width: 0.6rem;
        height: 0.28rem;
      }
      .tilte {
        font-size: 18px;
        color: #b6d7ff;
        line-height: 0.3rem;
        margin-left: 0.6rem;
      }
    }
    .e-table {
      width: 100%;
      min-width: 800px;
      margin: 0 auto;
    }
    .chartContent {
      .chartContChild {
        height: 1.3rem;
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
      .chartTit {
        padding: 0.1rem;
        color: #ffffff;
        font-size: 0.15rem;
        font-weight: bold;
      }
      .chartCont {
        width: 100%;
      }
    }
  }
}
// .boxall{

// }
</style>
