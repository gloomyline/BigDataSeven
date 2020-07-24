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
        <el-table-column prop="name" label="营业收入(元)"></el-table-column>
        <el-table-column prop="name1" label="营业毛利润"></el-table-column>
        <el-table-column prop="name2" label="计价回款率">
        </el-table-column>
        <el-table-column prop="name3" label="计价收入率"></el-table-column>
        <el-table-column prop="name4" label="人月均经费"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import { financeApi } from "@/api";
export default {
  name: "Finance",
  props: ['date'],
  data() {
    return {
      financeData: [],
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
  created(){
    this.initData();
  },
  watch: {
    date(newDate) {
      this.initData();
    },
  },
  methods: {
    initData(){
      financeApi.fetchFinance(this.date).then((data)=>{
        this.financeData = data.data.map((item,index) => ({id: index, ...item}));
        this.dealData();
      })
    },
    dealData(){
      const storeds = [];
      const flagCom = [];
      let count = 0;
      this.financeData.forEach((financeData, index) => {
        if(!flagCom.includes(financeData.area)){
          flagCom.push(financeData.area);
          storeds.push(
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
              id: count++,
              children: [
              ]
            }   
          );
          storeds[storeds.length-1].children.push(
            {
              id: count++,
              date: "",
              title: "",
              region: financeData.projectName ,
              name: financeData.income,
              name1: financeData.interestRate?`${financeData.interestRate}%`:"",
              name2: financeData.huikuanlv?`${financeData.huikuanlv}%`:"",
              name3: financeData.incomeRate?`${financeData.incomeRate}%`:"",
              name4: `${financeData.monthFunding}`,
              name5: "",
              zip: ""
            }
          );
        }else{
          const areaIndex=storeds.findIndex((children)=>{
            return children.title === financeData.area
          });
          storeds[areaIndex].children.push(
            {
              id: count++,
              date: "",
              title: "",
              region:financeData.projectName ,
              name: financeData.income,
              name1: financeData.interestRate?`${financeData.interestRate}%`:'',
              name2: financeData.huikuanlv?`${financeData.huikuanlv}%`:"",
              name3: financeData.incomeRate?`${financeData.incomeRate}%`:"",
              name4: `${financeData.monthFunding}`,
              name5: "",
              zip: ""
            }
          );
        }
      });
      this.tableData = storeds;
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