<template>
  <div>

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
  mounted(){},
  methods:{
    async initData(){
      var res = await LabourServicesNewApi.fetchfindAllSubcons(this.currentPage,this.pageSize)
    },
  }
  
}
</script>
<style lang="scss" scoped>

</style>