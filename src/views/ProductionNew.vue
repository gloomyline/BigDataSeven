<template>
  <div class="production">
    <div class="head">
      <div class="left">
        <el-date-picker
          v-model="ny"
          type="month"
          :picker-options="pickerOptions"
          value-format="yyyy-MM"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <h1>生产管理</h1>
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
    <!-- 内容区域 -->
    <div>
      <div class="radio-group">
        <span
          v-for="(tab, index) in tabs"
          :class="{ active: current === index }"
          :key="index"
          @click="tabChange(index)">{{ tab }}</span>
      </div>
      <!-- <div style="margin:10px 0;"></div> -->
      <keep-alive>
        <component :is="currentComponent" :ny="date"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import ProductionSummaries from '@/views/productionComponent/ProductionSummaries.vue';
import PreviousMonth from '@/views/productionComponent/PreviousMonth.vue';
import CurrentMonth from '@/views/productionComponent/CurrentMonth.vue';
export default {
  name: "Production",
  components: { ProductionSummaries, PreviousMonth, CurrentMonth },
  data() {
    return {
      current: 0,
      tabs: ['公司施工总体情况', '上月计划完成情况', '下月项目施工计划', ],
      currentComponent: 'ProductionSummaries',
      componentList: ['ProductionSummaries', 'PreviousMonth', 'CurrentMonth'],
      allCompany: {}, 
      ny:this.$route.params.ny,
      pickerOptions: {
        disabledDate(time) {
            return time >Date.now()
        },
      }
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
    if(!this.ny){
      const _date = new Date();
      this.month = _date.getMonth();
      let mm = _date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth();
      this.ny=`${_date.getFullYear()}-${mm}`
    }
  },
  computed: {
    date() {
      const dateMap = [0, -1, 1];
      return  `${this.ny.substr(0, 4)}-${('0' + (Number(this.ny.substr(-2)) + dateMap[this.current])).substr(-2)}`
    }
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/" });
    },
    tabChange: function(idx) {
      this.current = Number(idx);
      this.currentComponent = this.componentList[idx];
    },
  },
};
</script>

<style lang="scss" scoped>
.production {
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
  .radio-group span {
    display: inline-block;
    letter-spacing: normal;
    cursor: pointer;
    height: 0.64rem;
    line-height: 0.64rem;
    margin: 5px;
    padding: 0 8px;
    color: #fff;
    font-size: 12px;
    border-radius: 5px 5px 0px 0px;
    background-color: #67737e;
    box-sizing: border-box;
    &:last-child {
      margin-right: 0;
    }
  }
  .radio-group .active {
    background-color: #1b88e7;
  }
  .weather  {
    position:inherit;
  }
}
</style>
