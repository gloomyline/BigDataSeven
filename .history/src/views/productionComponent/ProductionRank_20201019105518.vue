<template>
  <div>
      <el-table
    :data="tableData"
    style="width: 100%"
    height="11.2rem"
    >
    <el-table-column
      prop="pprojectname"
      label="项目名称"
      width="150">
    </el-table-column>
    <el-table-column
      label="形象进度偏差"
      width="300">
      <el-table-column
      prop="pkeyrodeday"
      label="关键线路状态"
      width="150">
      </el-table-column>
      <el-table-column
      prop="pmilerodeday"
      label="里程碑线路状态"
      width="150">
      </el-table-column>
    </el-table-column>
    <el-table-column
      label="产值进度偏差"
      width="300">
      <el-table-column
      prop="ppfinishrate"
      label="产值完成比"
      width="150">
      </el-table-column>
      <el-table-column
      prop="pwfinishrate"
      label="工期完成比"
      width="150">
      </el-table-column>
    </el-table-column>
    <el-table-column
      prop="diffday"
      label="偏差"
      width="150">
    </el-table-column>
    <el-table-column
      prop="mdesc"
      label="备注"
      width="150">
    </el-table-column>
    
   
  </el-table>
  </div>
</template>
<script>
import { productionNewApi  } from '@/api';
export default {
  props:["ny"],
  data() {
    return {
      tableData: []
    }
  },
  created(){
    this.initData()
  },
  mounted(){
    console.log("$",$)

  },
  methods:{
   async initData() {
      console.log("ny------",this.ny)
      var res = await productionNewApi.fetchRankListData(this.ny)
      console.log("排名数据",res)
      this.tableData = res

    },
  }

}
</script>
<style lang="scss" scoped>
::v-deep tbody tr.hover-row td{
	background-color:rgba(2,2,2,0)
}
</style>