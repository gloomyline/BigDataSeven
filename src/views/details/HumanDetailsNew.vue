<template>
  <div class="equipmentDetails">
    <div class="head">
      <h1>项目部</h1>
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack(true)"
        >返回</el-button>
      </div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">项目部岗位名单</span>
      </p>
      <el-table
        :data="tableData"
        row-key="id"
        :show-header="true"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="department" label="部门名称" min-width="50"></el-table-column>
        <el-table-column prop="post" label="职务" min-width="50"></el-table-column>
        <el-table-column prop="name" label="人员姓名"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import { HumanNewApi } from '@/api'

export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.initData()
  },
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中..",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)"
    });

    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  methods: {
    goBack(res) {
      if (res) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: "/" });
      }
    },
    async initData() {
      const res = await HumanNewApi.fetchGetEmployeeData(this.$route.params.projectId)
      if (res && res.code === '000000') {
        this.tableData = res.data
      }
    },
    equSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 11) {
        return {
          rowspan: 666,
          colspan: 1
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.equipmentDetails {
  .head {
    height: 1.05rem;
    background: url(~@/assets/images/head_bg.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    z-index: 100;
    h1 {
      color: #63ecff;
      text-align: center;
      font-size: 0.4rem;
      line-height: 0.8rem;
      .img {
        width: 1.5rem;
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.2rem;
      }
    }
  }
  .map {
    width: 1200px;
    height: 460px;
    margin: 0 auto;
  }
  .table {
    margin: 0.4rem;
    margin-top: 0.6rem;
    border: rgba(0, 102, 153, 1) 1px solid;
    padding: 0.6rem;
    background-color: #0c2456 !important;
    .thead {
      text-align: left;
      margin-bottom: 0.6rem;
      .img {
        width: 0.6rem;
        height: 0.28rem;
      }
      .tilte {
        font-size: 18px;
        color: #b6d7ff;
        line-height: 0.3rem;
        margin-left: 0.6rem;
      }
    }
    .e-table {
      width: 100%;
      min-width: 800px;
      margin: 0 auto;
    }
  }
}
</style>