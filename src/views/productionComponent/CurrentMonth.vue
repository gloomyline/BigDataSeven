<template lang="html">
  <div class="current-month">
    <h2 class="title" style="height: 0.6rem; line-height: 0.6rem; font-size: 0.32rem;color: #fff;">{{ year }}年{{ month }}月份项目计划</h2>
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
      </el-table>     
    </div>
  </div>
</template>

<script>
  import { productionNewApi } from '@/api';
  export default {
    data() {
      return {
        month: '',
        year: '',
        tableData: [],
      };
    },
    created() {
      this.fetchPlannmonthDat()
      const date = new Date();
      this.year = date.getFullYear();
      this.month = ('00' + (date.getMonth() + 1)).substr(-2, 2);
      // this._fetchData();
    },
    methods: {
      async fetchPlannmonthDat() {
        const _date = new Date();
        let mm = _date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth();
        const res = await productionNewApi.fetchPlannmonthData(`${_date.getFullYear()}-${mm}`);
        this.tableData = res.data
      }
    }
  }
</script>

<style lang="scss" scoped></style>