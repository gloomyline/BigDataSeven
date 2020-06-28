<template>
  <div class="btn-box">
    <el-row @click="goToDetails">
      <el-button size="small" type="primary" @click="goToDetails('HumanDetails')">人力资源</el-button>
      <el-button size="small" type="success" @click="goToDetails('TurnoverDetails')">周转材料</el-button>
      <el-button size="small" type="info" @click="goToDetails('Dispatch')">生产管理</el-button>
      <el-button size="small" type="warning" @click="goToDetails('EquipmentDetails')">机械设备</el-button>
      <el-button size="small" type="danger" @click="goToDetails('LabourServicesDetails')">劳务管理</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "BtnList",
  data() {
    return {};
  },
  methods: {
    goToDetails(resName) {
      if (!resName) return;
      this.$router.push({ name: resName });
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-box {
  margin: 0.6rem 1rem;
  text-align: left;
}
</style>