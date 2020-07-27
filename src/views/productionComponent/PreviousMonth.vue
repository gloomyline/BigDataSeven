<template lang="html">
  <div class="previous-month">
    <h2 class="title" style="height: 0.6rem; line-height: 0.6rem; font-size: 0.32rem;color: #fff;">{{ year }}年{{ month }}月份完成情况</h2>
    <div class="talble-container">
      <el-table
        :data="tableData"
        height="8.6rem"
        border
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
      this.fetchPlanfinishlMonth();      
    }

  },
  created() {
    this.fetchPlanfinishlMonth();
  },
  methods: {
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
