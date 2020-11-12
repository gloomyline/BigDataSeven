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
        <span class="tilte">公司劳动力配置率</span>
      </p>
      <div class="chartBox">
        <div class="sy" id="fb1"></div>
      </div>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">{{title}}项目部劳务企业明细</span>
      </p>
      
      <div class="chartBox">
        <!-- 里程碑线路 --> 
        <el-table
      :data="tableData"
      style="width: 100%">
        <el-table-column
          prop="subCompanyName"
          label="分包企业名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="subType"
          label="分包类别"
          >
        </el-table-column>
        <el-table-column
          prop="creditRating"
          label="资信等级">
        </el-table-column>
        <el-table-column
          prop="groupAdmitTime"
          label="准入时间">
        </el-table-column>
        <el-table-column
          prop="recommendDept"
          label="推荐项目部">
        </el-table-column>
        <!-- <el-table-column
          prop="qualified"
          label="是否合格">
        </el-table-column>
        <el-table-column
          prop="labconusing"
          label="是否在用">
        </el-table-column> -->
        <el-table-column
          prop="labconusingesc"
          label="是否在用描述">
        </el-table-column>
        <el-table-column
          prop="qualifiedesc"
          label="是否合格描述">
        </el-table-column>

      </el-table>
      </div>
     
      
       <!-- 主要线路 -->
    
      

      
      <div class="boxfoot"></div>
    </div>

    
  </div>
</template>
<script>
import { DispatchNewApi }  from '@/api'
import { LabourServicesNewApi } from '@/api'
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
  
  data() {
    return {
      ny:this.$route.params.ny,
      id:this.$route.params.id,
      pieData:[],
      tableData: [],
      title: this.$route.params.name,
      
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
      if(newValue!=oldValue){
        console.log("newvalue",newValue)
        // this._initData();
         this.$router.push({
          name: 'LabourProjectDetails',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: newValue },
        });
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
      // await this.getTableData()
      
      await this.getData()
      loading.close();
    },
    async getData(){
      
      var res = await LabourServicesNewApi.fetchfindSubcons(this.$route.params.ny,this.$route.params.id)
      console.log("resd```````",res)
      console.log("this.$route.params",res)
      this.tableData = res.tbody
      this.pieData=res.thead
      console.log("res.tbody",res.tbody)
      
      var finish=0
      var remained=0
      var prate = res.thead.prate
      console.log("prate",prate)
      if(res.thead && res.thead.prate ){
        
        if(res.thead.prate>=100){
          var finish = prate
          var remained = 0
        }else {

          var finish = prate 
          var remained = 100 - prate
        }
      }
      this.echarts(finish, remained)
      
      
      console.log(this.tableData)
    },
    goto(idx) {
      const routeMap = [
        {
          name: 'DispatchNew',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
        {
          name: 'TurnoverDetails',
          params: { id: this.$route.params.id, ny: this.$route.params.ny },
        },
        {
          name: 'BigEquipmentDetails',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
        {
          name: 'HumanDetailsNew',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
        },
        {
          name: 'LabourProjectDetails',
          params: { id: this.$route.params.id, name: this.$route.params.name, ny: this.$route.params.ny },
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

    goBack(res) {
      if (res) {
        this.$router.push({ path: "/" });
      } else {
        // this.$router.go(-1);
        this.$router.push({ name: 'LabourServicesNew' });
      }
    },
    echarts(finish, remained) {
      console.log("finish",finish)
      let str = (Number(finish) / (Number(finish)+(Number(remained)))*100) === 'NaN' ? `0` : (Number(finish) / (Number(finish)+(Number(remained)))*100)
       console.log("finish",str)
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
            text: "公司劳动配置率",
            left: "center",
            textStyle: {
              color: "#57D1C9",
              fontSize: "15"
            }
          },
          {
            text: `${str}%`,
            top: "45%",
            left: "center",
            textStyle: {
              color: "#57D1C9",
              fontSize: "14"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}:({d}%)",
          position: function(p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
          }
        },
        // legend: {
        //   top: "85%",
        //   itemWidth: 10,
        //   itemHeight: 10,
        //   data: ["已配置"],
        //   textStyle: {
        //     color: "rgba(255,255,255,.5)",
        //     fontSize: "12"
        //   },
        //   formatter: function(params) {
            
        //     return params === "已配置" ? `月计划 ${finish}` : "";
        //   }
        // },
        series: [
          {
            name: "公司劳动配置率",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["40%", "60%"],
            color: [`${rendercolor}`, "#066eab"],
            label: { show: true },
            labelLine: { show: true },
            data: [
              { value: `${finish}`, name: "已配置" },
              { value: `${remained}`, name: "未配置" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  //"{b} : {c}",
                  formatter: function(params) {
                    // console.log("params");
                    // console.log(params);
                    if (params.name === "已配置") {
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
