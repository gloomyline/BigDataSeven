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
          prop="projectName"
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
  export default {
    data() {
      return {
        month: '',
        year: '',
        tableData: [],
      };
    },
    created() {
      const date = new Date();
      this.year = date.getFullYear();
      this.month = ('00' + (date.getMonth() + 1)).substr(-2, 2);
      this._fetchData();
    },
    methods: {
      _fetchData() {
        this.tableData = [
          {
            projectName: '童庄河',
            plan: 761,
          },
          {
            projectName: '建安街',
            plan: 913,
          },
          {
            projectName: '地铁八号线',
            plan: 375,
          },
          {
            projectName: '中北路停车场',
            plan: 240,
          },
          {
            projectName: '安九铁路',
            plan: 3515,
          },
          {
            projectName: '江汉七桥',
            plan: 3727,
          },
          {
            projectName: '太原节点改造',
            plan: 0,
          },
          {
            projectName: '虎峪河道路改造',
            plan: 956,
          },
          {
            projectName: '西安西三环',
            plan: 376,
          },
          {
            projectName: '潇河大桥',
            plan: 4331,
          },
          {
            projectName: '左云十里河桥',
            plan: 0,
          },
          {
            projectName: '东峰路南延',
            plan: 2664,
          },
          {
            projectName: '武嘉高速',
            plan: 6507,
          },
          {
            projectName: '武大高速',
            plan: 7580,
          },
          {
            projectName: '新武金堤',
            plan: 2116,
          },
          {
            projectName: '七号线',
            plan: 2880,
          },
          {
            projectName: '中兰客专',
            plan: 8567,
          },
          {
            projectName: '靖远黄河桥',
            plan: 1055,
          },
          {
            projectName: '西宁昆仑路',
            plan: 4555,
          },
          {
            projectName: '常青花园',
            plan: 0,
          },
          {
            projectName: '黄石宏维天地',
            plan: 465,
          },
        ];
      },
    }
  }
</script>

<style lang="scss" scoped></style>