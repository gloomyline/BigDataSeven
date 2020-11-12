<template>
  <div>
    <div class="head">
      <div class="left">

      </div>
      <h1>片区预算详情</h1> 
      <div class="weather">
        <!-- <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack"
          >返回主页面</el-button
        > -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
    console.log("this.$route.params",this.$route.params)
  },
  methods:{
    initData(){
      this.ny = this.$route.params.ny

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