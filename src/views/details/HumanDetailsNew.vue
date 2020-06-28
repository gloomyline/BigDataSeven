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
        :data="tableData2"
        row-key="id"
        :show-header="false"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="title" label="" min-width="120"></el-table-column>
        <el-table-column prop="title1" label="" min-width="100"></el-table-column>
        <el-table-column prop="region" label=""></el-table-column>
        <el-table-column prop="date" label=""></el-table-column>
        <el-table-column prop="date1" label=""></el-table-column>
        <el-table-column prop="date2" label=""></el-table-column>
        <el-table-column prop="date3" label=""></el-table-column>
        <el-table-column prop="date4" label=""></el-table-column>
        <el-table-column prop="date5" label=""></el-table-column>
        <el-table-column prop="date6" label=""></el-table-column>
        <el-table-column prop="date7" label=""></el-table-column>
        <el-table-column prop="date8" label=""></el-table-column>
        <el-table-column prop="date9" label=""></el-table-column>
        <el-table-column prop="date10" label=""></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData2: [
        {
          title: "领导班子",
          title1: "",
          region: "",
          date: "",
          id: "1",
          children: [
            {
              title: "",
              title1: "项目经理",
              region: "徐亮",
              date: "",
              id: "11"
            },
            {
              title: "",
              title1: "常务副经理",
              region: "柯卫兵",
              date: "",
              id: "12"
            },
            {
              title: "",
              title1: "党支部书记",
              region: "李祥华",
              date: "",
              id: "13"
            },
            {
              title: "",
              title1: "总工程师",
              region: "王同民",
              date: "",
              id: "14"
            },
            {
              title: "",
              title1: "党支部副书记",
              region: "程军明",
              date: "",
              id: "15"
            },
            {
              title: "",
              title1: "副经理",
              region: "刘文辉",
              date: "王建国",
              id: "16"
            },
            {
              title: "",
              title1: "经理助理",
              region: "孟君",
              date: "",
              id: "17"
            },
            {
              title: "",
              title1: "副总工程师",
              region: "王春光",
              date: "徐帆",
              date1: "朱斌",
              id: "18"
            },
            {
              title: "",
              title1: "副总物流师",
              region: "李轶思",
              date: "",
              id: "19"
            },
            {
              title: "",
              title1: "总调度长",
              region: "杨俊峰",
              date: "",
              id: "20"
            }
          ]
        },
        {
          title: "工程部",
          title1: "部长",
          region: "张彦武-测量",
          date: "郭航",
          date1: "魏爽",
          date2: "王光富-测量",
          date3: "吴典呈",
          id: "2",  
        },
        {
          title: "物机部",
          title1: "部长",
          region: "邓承文",
          date: "",
          date1: "",
          date2: "",
          date3: "",
          id: "3",  
        },
        {
          title: "工经部",
          title1: "部长",
          region: "史松",
          date: "",
          date1: "",
          date2: "",
          date3: "",
          id: "4",  
        },
        {
          title: "安质部",
          title1: "部长",
          region: "王志洋",
          date: "",
          date1: "",
          date2: "",
          date3: "",
          id: "5",  
        },
        {
          title: "财务部",
          title1: "部长",
          region: "于凯华",
          date: "",
          date1: "",
          date2: "",
          date3: "",
          id: "6",  
        },
        {
          title: "实验室",
          title1: "部长",
          region: "秦健",
          date: "",
          date1: "",
          date2: "",
          date3: "",
          id: "7",  
        },
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