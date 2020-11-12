<template>
  <div>
    <div class="head">   
      <h1>片区预算详情</h1> 
    </div>
    <div>
    </div>
  </div>
</template>
<script>
import { financeApi } from "@/api";
export default {
  mounted(){
    console.log("this.$route.params",this.$route.params)
    this.initData()
  },
  methods:{
   async initData(){
      this.ny = this.$route.params.ny
      this.pid = this.$route.params.pid
      var res = await financeApi.fetchdistrictBudgetDetail(this.ny,this.pid)
      console.log("片区预算详情",res)
      //项目主要指标
      this.primary = res[0]


      this.endClear = res[1]
      this.twoGold = res[2]


    }
  }
}
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
</style>