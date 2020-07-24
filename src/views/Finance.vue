<template>
  <div class="engineering">
    <div class="head">
      <div class="left">
        <el-date-picker
          v-model="date"
          type="month"
          :picker-options="pickerOptions"
          value-format="yyyy-MM"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <h1>资金管理</h1>
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack"
          >返回主页面</el-button
        >
      </div>
    </div>
    <div>
      <div class="radio-group">
        <span
          v-for="(tab, index) in tabs"
          :class="{ cur: iscur == index }"
          :key="index"
          @click="(iscur = index), tabChange(index)"
        >
          {{ tab.name }}
        </span>
      </div>
      <div style="margin:10px 0;"></div>
      <keep-alive>
        <component v-bind:is="tabView" :date="date"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import financeChart from "./FinanceChart.vue";
import financeTable from "./FinanceTable.vue";

export default {
  components: {
    financeChart,
    financeTable,
  },
  mounted() {},
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
    const date = new Date();
    this.date = `${date.getFullYear()}-${('0' + date.getMonth()).substr(-2)}`
  },
  data() {
    return {
      tabView: "financeChart",
      iscur: 0,
      tabs: [{ name: "分析视图" }, { name: "表格视图" }],
      componentsList: ["financeChart", "financeTable"],
      date: '',
      pickerOptions: {
        disabledDate(time) {
          return time >Date.now();
        },
      },      
    };
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/" });
    },
    tabChange: function(tab) {
      this.tabView = this.componentsList[tab];
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  position: relative;  
  .left {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.radio-group span {
  display: inline-block;
  letter-spacing: normal;
  cursor: pointer;
  box-sizing: border-box;
  width: 106px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px 5px 0px 0px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 30px;
  background-color: #67737e;
  margin: 5px;
}

.radio-group .cur {
  background-color: #1b88e7;
}
</style>
