<template>
  <div class="bigMainEquipment">
    <div class="head">
      <h1>项目部设备情况</h1>
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack"
          >返回</el-button
        >
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="table">
      <p class="thead">
        <img class="img" src="../../assets/images/u563.png" />
        <span class="tilte">大型主要设备</span>
        
      </p>
      <el-table class="e-table">
        <el-table-column
          label="机械类别"
        ></el-table-column>
        <el-table-column
          label="主要机械设备"
          min-width="120"
        ></el-table-column>
        <el-table-column
          label="管理编号"
        ></el-table-column>
        <el-table-column
          label="机械名称"
        ></el-table-column>
        <el-table-column
          label="型号"
        ></el-table-column>
        <el-table-column
          label="规格"
        ></el-table-column>
        <el-table-column
          label="生产厂家"
        ></el-table-column>
        <el-table-column
          label="购置日期"
        ></el-table-column>
        <el-table-column
          label="功率（kW）"
        ></el-table-column>
        <el-table-column
          label="原值（元）"
        ></el-table-column>
        <el-table-column
          label="现存地"
        ></el-table-column>
        <el-table-column
          label="技术情况"
        ></el-table-column>
        <el-table-column
          label="使用状态"
        ></el-table-column>
        <el-table-column
          label="备注"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>

export default {
  name: "bigMainEquipment",
  data() {
    return {

    };
  },
  
  created() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)",
    });
    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  // computed: {
    // date() {
    //   const dateMap = [0, -1, 1];
    //   return  `${this.ny.substr(0, 4)}-${('0' + (Number(this.ny.substr(-2)) + dateMap[this.current])).substr(-2)}`
    // }
  // },
  methods: {
    goBack() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss" scoped>
.bigMainEquipment {
  .head {
    height: 1.05rem;
    background: url(~@/assets/images/head_bg.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    z-index: 100;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
  .weather  {
    position:inherit;
  }
  .rightBtn{
    position: absolute;
  }
  .rightBtn:nth-child(5){
    right:3rem;
  }
  .rightBtn:nth-child(6){
    right:2rem;
  }
  .rightBtn:nth-child(7){
    right:1rem;
  }
}
</style>
