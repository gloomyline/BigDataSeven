<template>
    <div>设备使用情况</div>
</template>
<script>
import echarts from "echarts";
import { equipmentApi } from '@/api';
export default {
  data(){
    return {
      priceData:[],
      usingRateData:[],
      completeData:[],
      expendData:[]

    }
  },
  methods:{
    async initData(){
      const response = await equipmentApi.fetchfindEquipmentUsageData(this.date);
    }
  }
  
}
</script>

<style lang="scss" scoped>

</style>