<template>
  <div class="finance">
    <!-- 表格区域 -->
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">项目月度资金统计</span>
      </p>
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="title" label="片区"></el-table-column>
        <el-table-column prop="region" label="项目名称"></el-table-column>
        <el-table-column prop="name" label="营业收入"></el-table-column>
        <el-table-column prop="name1" label="营业利润"></el-table-column>
        <el-table-column prop="name2" label="计价回款率">
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.name2">{{``}}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="name3" label="计价收入率"></el-table-column>
        <el-table-column prop="name4" label="人月均经费"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <!-- <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">公司主要财务指标</span>
      </p>
      <el-table :data="tableData2" style="width: 86%;  margin: 0 auto; min-width: 800px;">
        <el-table-column prop="title" label min-width="150"></el-table-column>
        <el-table-column prop="title1" label="月度数" min-width="150"></el-table-column>
        <el-table-column prop="region" label="季度数" min-width="150"></el-table-column>
        <el-table-column prop="date" label="年度数/年度完成率" min-width="150"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div> -->
  </div>
</template>
<script>
import { financeApi } from "@/api";
export default {
  name: "Finance",
  data() {
    return {
      tableData: [],
      
      tableData2: [
        { title: "营业收入", title1: "", region: "", date: "" },
        { title: "营业利润", title1: "", region: "", date: "" },
        { title: "资产负债率", title1: "", region: "", date: "" },
        { title: "资金归集率", title1: "", region: "", date: "" },
        { title: "集中统保率", title1: "", region: "", date: "" },
        { title: "两金压降余额", title1: "", region: "", date: "" },
        { title: "经营性现金", title1: "", region: "", date: "" },
      ]
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.echarts();
    // });
  },
  created(){
    this.initData();
  },
  methods: {
    initData(){
      const date = new Date();
      financeApi.fetchFinance(`${date.getFullYear()}-${date.getMonth()>9?'':'0'}${date.getMonth()}`).then((data)=>{
        this.financeData = data.data;
        this.dealData();
      })
    },
    dealData(){
      let flagCom = [];
      this.financeData.forEach((financeData) => {
        console.log(financeData.area, '-------------financeData.area')
        if(!flagCom.includes(financeData.area)){
          flagCom.push(financeData.area);
          this.tableData.push(
              {
                date: "",
                title: financeData.area,
                region: "-",
                name: "",
                name1: "",
                name2: "",
                name3: "",
                name4: "",
                name5: "",
                zip: "",
                id: this.tableData.length+1,
                children: [
                ]
              }   
          );
          this.tableData[this.tableData.length-1].children.push(
            {
              id: this.tableData[this.tableData.length-1].children.length+this.tableData.length*10+1,
              date: "",
              title: "",
              region:financeData.projectName ,
              name: financeData.income,
              name1: financeData.interestRate,
              name2: `${financeData.huikuanlv}%`,
              name3: `${financeData.incomeRate}%`,
              name4: "0",
              name5: "",
              zip: ""
            }
          );
        }else{
          let areaIndex=this.tableData.findIndex((children)=>{
            return children.title === financeData.area
          });
          this.tableData[areaIndex].children.push(
            {
              id: this.tableData[areaIndex].children.length+(areaIndex+1)*10+1,
              date: "",
              title: "",
              region:financeData.projectName ,
              name: financeData.income,
              name1: financeData.interestRate,
              name2: `${financeData.huikuanlv}%`,
              name3: `${financeData.incomeRate}%`,
              name4: "0",
              name5: "",
              zip: ""
            }
          );
        }
      });
    },
    goBack() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
.finance {
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
  }
}
</style>