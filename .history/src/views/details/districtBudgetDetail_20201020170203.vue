<template>
  <div>
    <div class="head">   
      <h1>片区预算详情</h1> 
    </div>
    <div>
      <el-table
        :data="primary"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="indexData"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="company"
          label="片区分公司"
          width="100">
        </el-table-column>
        <el-table-column
          prop="company"
          label="项目部"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { financeApi } from "@/api";
export default {
  data(){
    return {
      primary:[]
    }
  },
  mounted(){
    console.log("this.$route.params",this.$route.params)
    this.initData()
  },
  methods:{
   async initData(){
      this.ny = this.$route.params.ny
      this.pid = this.$route.params.pid
      var res = await financeApi.fetchdistrictBudgetDetail(this.ny,this.pid)
      console.log("片区预算详情",res)
      //项目主要指标
      var primaryidx = 1
      this.primary = res[0].map((item)=>{
        return {
          indexData:'',
          capital:"",
          company:item.company,
          deptName:"",
          payRate:"",
          projectFund: "",
          rateOfReturn: "",
          researchCharge: "",
          taking: "",
          totalProfit: "",
          children:item.mainIndexVo.map((item1)=>{
            return {
              indexData:primaryidx++,
              capital:item1.capital,
              company:"",
              deptName:item1.deptName,
              payRate:item1.payRate,
              projectFund: item1.projectFund,
              rateOfReturn: item1.rateOfReturn,
              researchCharge: item1.researchCharge,
              taking: item1.taking,
              totalProfit: item1.totalProfit,
            }
          }),
        }
      })
      console.log("this.primary",this.primary)


      this.endClear = res[1]
      this.twoGold = res[2]


    }
  }
}
</script>
<style lang="scss" scoped>
.head {
  position: relative;  
  .left {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>