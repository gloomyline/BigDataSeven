<template>
  <div class="engineering">
    <div class="head">
      <div class="left">
        <el-date-picker
          v-model="ny"
          type="month"
          :picker-options="pickerOptions"
          value-format="yyyy-MM"
          placeholder="选择月">
        </el-date-picker>
      </div>
      <div class="middle"><h1 >人力资源</h1></div>
      <div class="right">
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
      
        <component v-bind:is="tabView" :ny="ny" ></component>
      
    </div>
  </div>
</template>
<script>
import humanOrganNew from "./humanComponent/HumanOrganNew.vue";
/* import humanOrganNew from "./org-tree/index.vue"; */
// import humanOrgan from "./humanComponent/HumanOrgan.vue";
import humanStatus from "./humanComponent/HumanStatus.vue";
import humanFun from "./humanComponent/HumanFun.vue";
import humanCre from "./humanComponent/HumanCre.vue";
import humanYear from "./humanComponent/HumanYear.vue";
import professionalTitle from "./humanComponent/ProfessionalTitle"

export default {
  provide:["ny"],
  components: {
	humanOrganNew,
    // humanOrgan,
    humanStatus,
    humanFun,
    humanCre,
    humanYear,
    professionalTitle
  },
  mounted() {
    this.ny = `${(new Date()).getFullYear()}-${('00' + (new Date()).getMonth()).substr(-2)}`;
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
  data() {
    return {
      tabView: "humanOrganNew",
      ny:this.$route.params.ny,
      iscur: 0,
      tabs: [{ name: "组织机构" }, { name: "人员情况" }, { name: "薪酬情况" }, { name: "资质证书" },{name:"年度考核"},{name:"职称情况"}],
 
      componentsList: ["humanOrganNew", "humanStatus", "humanFun", "humanCre","humanYear","professionalTitle"],
     
      pickerOptions: {
         disabledDate(time) {
            return time >Date.now()
          },
        }   
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
.head {
  padding-top:10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between

}
.el-month-table td.today .cell {
    color: #606266 !important;
    font-weight: 100 !important;
}

</style>
