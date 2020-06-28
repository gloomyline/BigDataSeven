<template>
  <div class="labourServicesDetails">
    <div class="head">
      <h1>武嘉项目部劳务详情</h1>
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
        <span class="tilte">项目在用劳务企业月报表（2020年X月）</span>
      </p>
      <el-table
        :data="tableData2"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="name" label="序号" width="150"></el-table-column>
        <el-table-column prop="title" label="劳务分包企业名称" min-width="120"></el-table-column>
        <el-table-column prop="title1" label="集团准入证号" min-width="100"></el-table-column>
        <el-table-column prop="region" label="合同额（万元）"></el-table-column>
        <el-table-column prop="date" label="劳务人员数量（人）"></el-table-column>
        <el-table-column prop="date" label="其中骨干人员（人）"></el-table-column>
        <el-table-column prop="date" label="其它人员（人）"></el-table-column>
        <el-table-column prop="date" label="作业内容"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import btnList from "@/components/BtnList.vue";
export default {
  name: "LabourServicesDetails",
  components: {
    btnList
  },
  data() {
    return {
      tableData2: [
        {
          title: "安九铁路湖北段AJZQ-3标项目部",
          title1: "",
          region: "",
          date: "",
          id: "1",
          name: "",
          children: [
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "11",
              name: "1"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "12",
              name: "2"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "13",
              name: "3"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "14",
              name: "4"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "15",
              name: "5"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "16",
              name: "6"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "17",
              name: "8"
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
.labourServicesDetails {
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