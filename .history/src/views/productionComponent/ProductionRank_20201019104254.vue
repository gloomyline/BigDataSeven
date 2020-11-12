<template>
  <div>
      <el-table
    :data="tableData"
    style="width: 100%"
    height="11.2rem"
    >
    <el-table-column
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
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