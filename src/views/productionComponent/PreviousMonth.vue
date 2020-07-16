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
  data() {
    return {
      year: '',
      month: '',
      tableData: []
    };
  },
  created() {
    this.fetchPlanfinishlMonth()
    const date = new Date();
    this.year = date.getFullYear();
    this.month = ('00' + date.getMonth()).substr(-2, 2);
    // simulate table data
  },
  methods: {
    async fetchPlanfinishlMonth() {
      const _date = new Date();
      let mm = _date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth();
      const res = await productionNewApi.fetchPlanfinishlMonthData(`${_date.getFullYear()}-${mm}`);
      if(res && res.code === '000000') {
        this.tableData = res.data
      } 
    }
  }
}
</script>

<style lang="scss">
.table-container {
} 
</style>
