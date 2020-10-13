<template>
  <div class="wrapperContainer">
    片区预算营业收入、两金压降、净利润、经营性现金流
    <dv-border-box-10 class="chartContainer">
      <div>
        <div class="chartTitle">营业收入</div>
        <div id="income" class="chartContent" ></div>
      </div>
      <div>
        <div class="chartTitle">两金压降</div>
        <div id="drop" class="chartContent" ></div>
      </div>
    </dv-border-box-10>
    <dv-border-box-10 class="chartContainer">
      <div>
        <div class="chartTitle">净利润</div>
        <div id="profit" class="chartContent" ></div>
      </div>
      <div>
        <div class="chartTitle">经营性现金流</div>
        <div id="cashflow" class="chartContent" ></div>
      </div>
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
