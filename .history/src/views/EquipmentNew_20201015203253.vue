<template>
  <div class="production">
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
      <h1>机械设备</h1>
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
      <keep-alive>
        <component :is="currentComponent" :data="ny"></component>
      </keep-alive>
    </div> 



    <!-- <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon">
          <div class="chartTit">项目大型机械设备(单位:台)</div>
          <div class="chartCont" id="barChart1"></div>
        </div>
        <div class="chartContentSon">
          <div class="chartTit" @click="jumpTzDetail()">自有主要机械设备使用情况(单位:台)</div>
          <div class="chartCont" id="circlePieChart"></div>
        </div>
      </dv-border-box-10>
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">项目机械设备(单位:台)</div>
          <div class="chartCont1" id="barChart2"></div>
        </div>
      </dv-border-box-10>
    </div> -->
  </div>
</template>
<script>
import echarts from "echarts";
import { equipmentApi } from '@/api';
import EquipmentPresence from '@/views/equipment/EquipmentPresence'
import EquipmentUsage from '@/views/equipment/EquipmentUsage'


export default {
  name: "Production",
  components: { EquipmentPresence, EquipmentUsage },
  data() {
    return {
      ny:this.$route.params.ny,
      current: 0,
      tabs: ['设备在场情况','设备使用情况' ],
      currentComponent: 'EquipmentPresence',
      componentList: ['EquipmentPresence', 'EquipmentUsage'],
      bigEquipments: [],
      projectEquipments: [],
      usingDetail: {
        // 在用
        isUsing: null,
        // 闲置
        isUnused: null,
        // 长期闲置
        isIdle: null,
      },
      date: '',
      pickerOptions: {
        disabledDate(time) {
          return time >Date.now();
        },
      },      
    };
  },
  watch: {
 
  },
  async mounted() {
 
  },
  methods: {
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
    .left {
      position: absolute;
      left: 0;
      top: 0;
    }
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
  .demo-form-inline {
    text-align: left;
    margin: 0 0.2rem;
    margin-top: 0.4rem;
    background-color: rgba(15, 30, 75, 0.749019607843137);
  }
  .table {
    margin: 0.4rem;
    margin-top: 0.6rem;
    border: rgba(0, 102, 153, 1) 1px solid;
    padding: 0.6rem;
    background-color: #0c2456 !important;
  }
  .chartContainerFather {
    width: 100%;
    padding: 0 0.2rem 0 0.2rem;
  }
  .chartContainer {
    height: 5rem;
    margin-bottom: 0.1rem;
    .chartContentSon {
      width: 50%;
      height: 100%;
      float: left;
      .chartTit {
        padding: 0.15rem;
        color: #ffffff;
        font-size: 0.24rem;
        font-weight: bold;
      }
      .chartCont {
        width: 100%;
        height: 3.6rem;
      }
    }
    .chartContentSon1 {
      width: 100%;
      height: 100%;
      clear: both;
      .chartTit1 {
        padding: 0.15rem;
        color: #ffffff;
        font-size: 0.24rem;
        font-weight: bold;
      }
      .chartCont1 {
        width: 100%;
        height: 3.6rem;
      }
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

</style>
