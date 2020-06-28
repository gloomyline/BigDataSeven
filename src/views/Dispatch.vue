<template>
  <div class="dispatch">
    <div class="head">
      <h1>武嘉项目部生产明细</h1>
      <div class="weather">
        <el-button type="primary" size="small" icon="el-icon-arrow-left" round @click="goBack">返回主页面</el-button>
      </div>
    </div>

    <div class="btn-box">
      <el-row>
        <el-button size="small" type="primary">人力资源</el-button>
        <el-button size="small" type="success">转载材料</el-button>
        <el-button size="small" type="info">生产管理</el-button>
        <el-button size="small" type="warning">机械设备</el-button>
        <el-button size="small" type="danger">劳务管理</el-button>
      </el-row>
    </div>

    <div class="img-box">
      <img class="img" src="../assets/images/u2617.png" alt />
    </div>

    <!-- 表格区域 -->
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">施工图纸</span>
      </p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="160"></el-table-column>
        <el-table-column prop="title" label="图纸名称" min-width="150"></el-table-column>
        <el-table-column prop="region" label="附件/PDF" min-width="150"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">项目施组及专项方案评审情况</span>
      </p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="160"></el-table-column>
        <el-table-column prop="title" label="施组及专项方案名称" min-width="150"></el-table-column>
        <el-table-column prop="region" label="审批状态" min-width="150"></el-table-column>
        <el-table-column prop="date" label="附件" min-width="150"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dispatch",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          title: "西南片区",
          region: "安九铁路",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          title: "西南片区",
          region: "安九铁路",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          title: "西南片区",
          region: "安九铁路",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          title: "西南片区",
          region: "安九铁路",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  mounted() {},
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)"
    });

    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  methods: {
    goBack() {
        this.$router.push({ path:'/' });
    }
  }
};
</script>

<style lang="scss" scoped>
.dispatch {
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
  .img-box {
    height: 360px;
    width: 92%;
    min-width: 1000px;
    margin: 0 auto;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .btn-box {
    margin: 0.6rem 1rem;
    text-align: left;
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