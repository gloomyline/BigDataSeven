<template>
  <div class="turnoverDetails">
    <div class="head">
      <h1>武嘉项目部周转材料明细表</h1>
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack('-1')"
        >返回</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">A类</span>
      </p>
      <el-table :data="tableData" style="width: 86%;  margin: 0 auto; min-width: 800px;">
        <el-table-column prop="title" label></el-table-column>
        <el-table-column prop="title1" label="大桥1号桁梁"></el-table-column>
        <el-table-column prop="region" label="贝雷梁"></el-table-column>
        <el-table-column prop="date" label="各型钢轨、钢轨束"></el-table-column>
        <el-table-column prop="date" label="标准钢筋车间主杆件"></el-table-column>
        <el-table-column prop="date" label="标准钢支撑及标准连接系"></el-table-column>
        <el-table-column prop="date" label="标准步梯"></el-table-column>
        <el-table-column prop="date" label="汇总"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">B类</span>
      </p>
      <el-table :data="tableData2">
        <el-table-column prop="title" label></el-table-column>
        <el-table-column prop="title1" label="钢挂篮"></el-table-column>
        <el-table-column prop="region" label="钢模板"></el-table-column>
        <el-table-column prop="date" label="钢护筒"></el-table-column>
        <el-table-column prop="date" label="工钢束"></el-table-column>
        <el-table-column prop="date" label="钢垫块"></el-table-column>
        <el-table-column prop="date" label="工钢"></el-table-column>
        <el-table-column prop="date" label="槽钢"></el-table-column>
        <el-table-column prop="date" label="H型钢"></el-table-column>
        <el-table-column prop="date" label="钢桥面板"></el-table-column>
        <el-table-column prop="date" label="新制支撑架"></el-table-column>
        <el-table-column prop="date" label="分配梁"></el-table-column>
        <el-table-column prop="date" label="大桥施工常用组合杆件钢管柱" min-width="150"></el-table-column>
        <el-table-column prop="date" label="锁口钢管桩围堰"></el-table-column>
        <el-table-column prop="date" label="其他"></el-table-column>
        <el-table-column prop="date" label="汇总"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">C类</span>
      </p>
      <el-table :data="tableData3">
        <el-table-column prop="title" label min-width="120"></el-table-column>
        <el-table-column prop="title1" label="钢筋"></el-table-column>
        <el-table-column prop="region" label="钢绞线"></el-table-column>
        <el-table-column prop="date" label="特型结构模板、平面模板" min-width="120"></el-table-column>
        <el-table-column prop="date" label="工钢"></el-table-column>
        <el-table-column prop="date" label="角钢"></el-table-column>
        <el-table-column prop="date" label="槽钢"></el-table-column>
        <el-table-column prop="date" label="H型钢"></el-table-column>
        <el-table-column prop="date" label="螺旋管"></el-table-column>
        <el-table-column prop="date" label="钢板"></el-table-column>
        <el-table-column prop="date" label="其他钢结构"></el-table-column>
        <el-table-column prop="date" label="其他"></el-table-column>
        <el-table-column prop="date" label="汇总"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>


<script>
import btnList from "@/components/BtnList.vue";
export default {
  name: "TurnoverDetails",
  components: {
    btnList
  },
  data() {
    return {
      tableData: [
        { title: "帐面总资产", title1: "", region: "", date: "" },
        { title: "帐面在用资产", title1: "", region: "", date: "" },
        { title: "帐面库存资产", title1: "", region: "", date: "" }
      ],
      tableData2: [
        { title: "采购量", title1: "", region: "", date: "" },
        { title: "再用量", title1: "", region: "", date: "" }
      ],
      tableData3: [
        { title: "可直接调拨使用", title1: "", region: "", date: "" },
        { title: "加工改制后使用", title1: "", region: "", date: "" }
      ]
    };
  },
  mounted() {},
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
    }
  }
};
</script>

<style lang="scss" scoped>
.turnoverDetails {
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