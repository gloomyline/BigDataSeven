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
          prop="projectName"
          label="项目名称"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="plan"
          label="计划产值"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="completed"
          label="完成产值"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="rate"
          label="完成比例"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="cate"
          label="类别"
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
      year: '',
      month: '',
      tableData: [],
    };
  },
  created() {
    const date = new Date();
    this.year = date.getFullYear();
    this.month = ('00' + date.getMonth()).substr(-2, 2);
    // simulate table data
    this._fetchData();
  },
  methods: {
    _fetchData() {
      this.tableData = [
        {
          projectName: '童庄河',
          plan: 607,
          completed: 558,
          rate: '92%',
          cate: 'A',
        },
        {
          projectName: '建安街',
          plan: 819,
          completed: 747,
          rate: '91%',
          cate: 'A',
        },
        {
          projectName: '地铁八号线',
          plan: 502,
          completed: 505,
          rate: '101%',
          cate: 'A',
        },
        {
          projectName: '中北路停车场',
          plan: 130,
          completed: 0,
          rate: '0%',
          cate: '-',
        },
        {
          projectName: '安九铁路',
          plan: 4394,
          completed: 4177,
          rate: '95%',
          cate: 'A',
        },
        {
          projectName: '江汉七桥',
          plan: 2915,
          completed: 2610,
          rate: '90%',
          cate: 'A',
        },
        {
          projectName: '虎峪河道路改造',
          plan: 1099,
          completed: 637,
          rate: '58%',
          cate: 'C',
        },
        {
          projectName: '西安西三环',
          plan: 465,
          completed: 439,
          rate: '94%',
          cate: 'A',
        },
        {
          projectName: '潇河大桥',
          plan: 7610,
          completed: 7267,
          rate: '95%',
          cate: 'A',
        },
        {
          projectName: '东峰路南延',
          plan: 2132,
          completed: 1951,
          rate: '92%',
          cate: 'A',
        },
        {
          projectName: '武嘉高速',
          plan: 6016,
          completed: 5767,
          rate: '96%',
          cate: 'A',
        },
        {
          projectName: '武大高速',
          plan: 6946,
          completed: 5159,
          rate: '74%',
          cate: 'B',
        },
        {
          projectName: '新武金堤',
          plan: 364,
          completed: 349,
          rate: '96%',
          cate: 'A',
        },
        {
          projectName: '七号线',
          plan: 819,
          completed: 745,
          rate: '91%',
          cate: 'A',
        },
        {
          projectName: '中兰客专',
          plan: 8349,
          completed: 6762,
          rate: '81%',
          cate: 'B',
        },
        {
          projectName: '靖远黄河桥',
          plan: 990,
          completed: 947,
          rate: '96%',
          cate: 'A',
        },
        {
          projectName: '西宁昆仑路',
          plan: 4560,
          completed: 2762,
          rate: '61%',
          cate: 'C',
        },
        {
          projectName: '常青花园',
          plan: 1615,
          completed: 1615,
          rate: '100%',
          cate: 'A',
        },
        {
          projectName: '黄石宏维天地',
          plan: 450,
          completed: 430,
          rate: '96%',
          cate: 'A',
        },
        {
          projectName: '童庄河',
          plan: 607,
          completed: 558,
          rate: '92%',
          cate: 'A',
        },
      ]
    },
  }
}
</script>

<style lang="scss">
.table-container {
} 
</style>
