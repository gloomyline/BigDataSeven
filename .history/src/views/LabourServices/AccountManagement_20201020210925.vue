<template>
  <div>
    <el-table
        :data="tableList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        
        <el-table-column
          prop=""
          label="是否在用"
          width="120">
        </el-table-column>
        <el-table-column
          prop="subCompanyName"
          label="分包企业名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="subType"
          label="分包类别"
          >
        </el-table-column>
        <el-table-column
          prop=""
          label="合同资产(万元)"
          >
        </el-table-column>
        <el-table-column
          prop=""
          label="存货(万元)"
         >
        </el-table-column>
        <el-table-column
          prop=""
          label="其他应收(万元)">
        </el-table-column>
        
        

      </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalRecords">
    </el-pagination>
  </div>
</template>
<script>
import { LabourServicesNewApi } from '@/api'
export default {
  data(){
    return {
      tableList:[],
      pageSize:100,
      currentPage:1,
      totalRecords:[]
    }
  },
  mounted(){
    this.initData()
  },
  methods:{
    async initData(){
      var res = await LabourServicesNewApi.fetchfindAllSubcons(this.currentPage,this.pageSize)
      console.log("resresresresres",res)
      this.totalRecords=res.totalRecords
    },
  }
  
}
</script>
<style lang="scss" scoped>

</style>