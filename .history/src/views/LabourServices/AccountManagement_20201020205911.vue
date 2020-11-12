<template>
  <div>
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
          prop="receivables"
          label="应收帐款(万元)"
          >
        </el-table-column>
        <el-table-column
          prop="contractAssets"
          label="合同资产(万元)"
          >
        </el-table-column>
        <el-table-column
          prop="stock"
          label="存货(万元)"
         >
        </el-table-column>
        <el-table-column
          prop="receivableOther"
          label="其他应收(万元)">
        </el-table-column>
        
        

      </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="337">
    </el-pagination>
  </div>
</template>
<script>
import { LabourServicesNewApi } from '@/api'
export default {
  data(){
    return {
      pageSize:100,
      currentPage:1,
    }
  },
  mounted(){
    this.initData()
  },
  methods:{
    async initData(){
      var res = await LabourServicesNewApi.fetchfindAllSubcons(this.currentPage,this.pageSize)
      console.log("resresresresres",res)
    },
  }
  
}
</script>
<style lang="scss" scoped>

</style>