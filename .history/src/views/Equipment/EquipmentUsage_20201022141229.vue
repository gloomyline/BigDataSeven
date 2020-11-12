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
  mounted(){
    this.initData()
  },
  methods:{
    async initData(){
      const response = await equipmentApi.fetchfindEquipmentUsageData()
      console.log("设备使用情况",response)
    },
    priceData(){},
    usingRateData(){},
    completeData(){},
    expendData(){},
  }
  
}
</script>

<style lang="scss" scoped>

</style>