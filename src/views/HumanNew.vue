<template>
  <div class="engineering">
    <div class="head">
      <h1>人力资源</h1>
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
        <component v-bind:is="tabView"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import humanOrgan from "./humanComponent/HumanOrgan.vue";
import humanStatus from "./humanComponent/HumanStatus.vue";
import humanFun from "./humanComponent/HumanFun.vue";
import humanCre from "./humanComponent/HumanCre.vue";

export default {
  components: {
    humanOrgan,
    humanStatus,
    humanFun,
    humanCre,
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
  },
  data() {
    return {
      tabView: "humanOrgan",
      iscur: 0,
      tabs: [{ name: "组织机构" }, { name: "人员情况" }, { name: "薪酬情况" }, { name: "资质证书管理情况" }],
      componentsList: ["humanOrgan", "humanStatus", "humanFun", "humanCre"],
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
.radio-group span {
  display: inline-block;
  letter-spacing: normal;
  cursor: pointer;
  box-sizing: border-box;
  width: 106px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px 5px 0px 0px;
  color: #fff;
  font-size: 12px;
  background-color: #67737e;
  margin: 5px;
}

.radio-group .cur {
  background-color: #1b88e7;
}
</style>
