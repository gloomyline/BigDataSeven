<template>
  <div class="equipmentDetails">
    <div class="head">
      <h1>武嘉项目部设备情况</h1>
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
        <span class="tilte">机械设备租赁公司机械设备管理台账</span>
      </p>
      <el-table
        :data="tableData2"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="title" label="机械类别" min-width="120"></el-table-column>
        <el-table-column prop="title1" label="主要机械设备" min-width="100"></el-table-column>
        <el-table-column prop="region" label="管理编号"></el-table-column>
        <el-table-column prop="date" label="机械名称"></el-table-column>
        <el-table-column prop="date" label="型号"></el-table-column>
        <el-table-column prop="date" label="规格"></el-table-column>
        <el-table-column prop="date" label="生产厂家"></el-table-column>
        <el-table-column prop="date" label="购置日期"></el-table-column>
        <el-table-column prop="date" label="功率(kW)"></el-table-column>
        <el-table-column prop="date" label="原值(元)"></el-table-column>
        <el-table-column prop="date" label="现存地"></el-table-column>
        <el-table-column prop="date" label="技术状况"></el-table-column>
        <el-table-column prop="date" label="使用状态"></el-table-column>
        <el-table-column prop="date" label="备注"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import btnList from "@/components/BtnList.vue";
export default {
  components: {
    btnList
  },
  data() {
    return {
      tableData2: [
        {
          title: "土石方机械",
          title1: "",
          region: "",
          date: "",
          id: "1",
          children: [
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "11"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "12"
            }
          ]
        },
        {
          title: "动力  机械",
          title1: "",
          region: "",
          date: "",
          id: "2",
          children: [
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "21"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "22"
            }
          ]
        }
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