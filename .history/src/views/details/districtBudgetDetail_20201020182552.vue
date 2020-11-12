<template>
  <div>
    <div class="head">   
      <h1>片区预算详情</h1> 
    </div>
    <div class="wrapper">
      <div class="title">项目主要指标</div>
      <el-table
        :data="primary"
        style="width: 100%;margin-bottom: 20px;"
        row-key="ppid"
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
          width="120">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="项目部"
          width="100">
        </el-table-column>
        <el-table-column
          prop="taking"
          label="营业收入(万元)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="totalProfit"
          label="利润总额(万元)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="projectFund"
          label="项目经费(万元)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="researchCharge"
          label="研发费用(万元)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="rateOfReturn"
          label="回款率"
          width="100">
        </el-table-column>
        <el-table-column
          prop="payRate"
          label="上缴率"
          width="100">
        </el-table-column>

        <el-table-column
          prop="capital"
          label="资金集中率">
        </el-table-column>
      </el-table>
    
    <div class="title">收尾清欠明细</div>
    <el-table
        :data="endClear"
        style="width: 100%;margin-bottom: 20px;"
        row-key="eeid"
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
          width="120">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="项目部"
          width="100">
        </el-table-column>
        <el-table-column
          prop="target"
          label="目标(万元)"
          width="300">
        </el-table-column>
        <el-table-column
          prop="finish"
          label="完成(万元)"
          width="300">
        </el-table-column>

        <el-table-column
          prop="finishingRate"
          label="完成率">
        </el-table-column>
      </el-table>

      <div class="title">两金构成明细</div>
    <el-table
        :data="twoGold"
        style="width: 100%;margin-bottom: 20px;"
        row-key="tgid"
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
          width="120">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="项目部"
          width="100">
        </el-table-column>
        <el-table-column
          prop=""
          label="应收帐款(万元)"
          width="100">
        </el-table-column>
        <el-table-column
          prop=""
          label="合同资产(万元)"
          width="100">
        </el-table-column>
        <el-table-column
          prop=""
          label="存货(万元)"
          width="100">
        </el-table-column>
        <el-table-column
          prop=""
          label="其他应收(万元)"
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
      primary:[],
      endClear:[],
      twoGold:[]
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
      if(!res){
        return
      }
      //项目主要指标
      var primaryidx = 1
      var ppid=0
      this.primary = res[0].map((item)=>{
        return {
          ppid:ppid++,
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
              ppid:ppid++,
              indexData:primaryidx++,
              capital:`${item1.capital}%`,
              company:"",
              deptName:item1.deptName,
              payRate:`${item1.payRate}%`,
              projectFund: item1.projectFund,
              rateOfReturn: `${item1.rateOfReturn}%`,
              researchCharge: item1.researchCharge,
              taking: item1.taking,
              totalProfit: item1.totalProfit,
            }
          }),
        }
      })
      console.log("this.primary",this.primary)

      var eeid=0
      var eeidx = 1
      this.endClear = res[1].map((item)=>{
        return {
          eeid:eeid ++,
          indexData:'',
          company: item.company,
          deptName: "",
          finish: "",
          finishingRate: "",
          target: "",
          children:item.finishOffIndexVo.map((item1)=>{
            return {
              eeid:eeid++,
              indexData:eeidx ++,
              company: "",
              deptName: item1.deptName,
              finish:item1.finish,
              finishingRate: `${item1.finishingRate}%`,
              target: item1.target,
            }
          })
        }
      })
      var tgid=0
      var tgidx = 1
      this.twoGold = res[2].map((item)=>{
        return {
          tgid:tgid++,
          indexData:'',
          company:item.company,
          contractAssets: "",
          deptName: "",
          receivableOther: "",
          receivables: "",
          stock: "",
          children:item.twogoldIndexVo.map((item1)=>{
            return {
              tgid:tgid++,
              indexData:tgidx++,
              contractAssets: item1.contractAssets,
              deptName: item1.deptName,
              receivableOther: item1.receivableOther,
              receivables: item1.receivables,
              stock: item1.stock,
            }
          })
        }
      
      })
      

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
.el-table [class*=el-table__row--level] .el-table__expand-icon {
  display: none;
  width: 20px;
  line-height: 20px;
  height: 20px;
  text-align: center;
  margin-right: 3px;
}
.wrapper {
  padding:10px 30px;
  .title {
    text-align: left;
    padding:30px;
    color:#fff;
    font-size:18px;
    font-weight: 700;
  }
}
</style>