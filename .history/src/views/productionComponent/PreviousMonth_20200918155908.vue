<template lang="html">
  <div class="previous-month">
    <h2 class="title" style="height: 0.6rem; line-height: 0.6rem; font-size: 0.32rem;color: #fff;">本月计划完成情况</h2>
    <div class="talble-container">
      <el-table
        :data="tableData"
        height="8.6rem"
        border
        @row-click="openDetails"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="projectname"
          label="项目名称"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="plan"
          label="计划产值"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="finish"
          label="完成产值"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="finishrate"
          label="完成比例"
          min-width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.finishrate">{{`${scope.row.finishrate}%`}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="score"
          label="类别"
          min-width="180">
        </el-table-column>
      </el-table>     
    </div>
  </div>
</template>

<script>
import { productionNewApi } from '@/api';
export default {
  props:["ny"],
  data() {
    return {
      year: '',
      month: '',
      tableData: [],
    };
  },
  watch:{
    ny:function(newValue,oldValue){
      console.log("plainfinish",newValue)
      this.fetchPlanfinishlMonth(this.ny);
    }

  },
  created() {
    this.fetchPlanfinishlMonth(this.ny);
  },
  methods: {
    openDetails(row){
      console.log("row.projectname",row.projectname)
      let id = ''
        let name = ''
        console.log("this.tableData------",this.tableData)
        this.tableData && this.tableData.length > 0 && this.tableData.forEach((item, index) => {
          // console.log("indexindex",index)
          if(row.projectname === item.projectname) {
            id = item.id
            name = item.projectname
          }
        })
        this.$router.push({ 
          name: "DispatchNew",
          params: {
            id,
            name,
            ny: this.ny,
          }
       });
    },
    async fetchPlanfinishlMonth() {
      const res = await productionNewApi.fetchPlanfinishlMonthData(this.ny);
      if(res && res.code === '000000') {
        this.tableData = res.data
      } 
    }
  }
}
</script>

<style lang="scss">
</style>
