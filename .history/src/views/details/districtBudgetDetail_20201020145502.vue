<template>
  <div>
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
      <!-- <h1>资金管理</h1> -->
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
  </div>
</template>
<script>
export default {
  mounted(){
    console.log("this.$route.params",this.$route.params)
  }
}
</script>
<style lang="scss" scoped>

</style>