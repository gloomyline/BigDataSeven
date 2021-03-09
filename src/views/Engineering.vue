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
      <h1>工程经济</h1>
      
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          round
          @click="hideClaimHandler"
          ><i :class="ishideClaim ? 'el-icon-top':'el-icon-bottom'"></i></el-button
        >
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
        <component v-bind:is="tabView" :date="date" :ishideClaim="ishideClaim"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import engineeringChart from "./EngineeringChart.vue";
import engineeringTable from "./EngineeringTable.vue";

export default {
  components: {
    engineeringChart,
    engineeringTable,
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
    // this.date = `${(new Date()).getFullYear()}-${('00' + (new Date()).getMonth()).substr(-2)}`;
    if(!this.date){
      const _date = new Date();
      var month = _date.getMonth();
      var year = _date.getFullYear();
      var day = _date.getDate()
      var mm
      if(day<25){
         if(month==0){
            month = 12
             mm = month < 10 ? `0${month}` : month;
            year=year-1
          } else {
            mm = month < 10 ? `0${month}` : month;
          }

      }else{
        if(month==0){
            month = 1
            mm = month < 10 ? `0${month}` : month; 
        }else{
            month = month+1
            mm = month < 10 ? `0${month}` : month; 
        }

      }
      

      this.date=`${year}-${mm}`
      this.ny=`${year}-${mm}`
      // this.ny="2020-12"
      console.log("ny",this.ny)
    }
  },
  data() {
    return {
      ishideClaim:false,
      tabView: "engineeringChart",
      iscur: 0,
      tabs: [{ name: "分析视图" }, { name: "表格视图" }],
      componentsList: ["engineeringChart", "engineeringTable"],
      date: this.$route.params.ny,
      pickerOptions: {
        disabledDate(time) {
          return time >Date.now();
        },
      },      
    };
  },
  methods: {
    hideClaimHandler(){
      this.ishideClaim=!this.ishideClaim
    },
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
.head{
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
