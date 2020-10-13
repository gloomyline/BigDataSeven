<template>
  <div class="wrapperContainer">
    双清管理
    双清管理包括收尾清欠（季度数据）、两金构成分析（季度数据）
    <dv-border-box-10 class="chartContainer">
      <div class="chartTitle">回款率</div>
      <div id="returnRate" class="chartContent" ></div>
    </dv-border-box-10>
    
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .chartTitle {
    padding: 0.2rem 0 0 0;
    color: #ffffff;
    font-size: 0.2rem;
    font-weight: bold;
  }
  .chartContent{
    height: 3.8rem;
  }
  .chartContainer {
    height: 4.5rem;
    margin-bottom: 0.2rem;
  }
</style>