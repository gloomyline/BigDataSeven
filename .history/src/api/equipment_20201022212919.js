const { axios } = window;

export default {
  async fetchEquipments(ny = `${(new Date()).getFullYear()}-${('00' + ((new Date()).getMonth())).substr(-2)}`) {
    const response = await axios.get('/equipment/equipment', { params: { ny } });
    return response.data;
  },
  async fetchEquipmentsByProject(projectId, ny) {
    const response = await axios.get('/equipment/findByProjectId', { params: { projectId, ny } });
    return response.data;
  },
  async fetchFindAllEquipmentData(ny = `${(new Date()).getFullYear()}-${('00' + ((new Date()).getMonth())).substr(-2)}`) {
    const response = await axios.get('/equipment/findAllEquipment', { params: { ny } });
    return response.data;
  },
  //大施组比对
  async fetchfindBigConstructionData(date) {
    const response = await axios.get('/equipment/findBigConstructionOrganizationComparison',{ params: { ny: date } });
    return response.data;
  },
  //设备在场情况
  async fetchfindEquipmentUsageData() {
    const response = await axios.get('/equipment/findEquipmentUsage');
    return response.data;
  },
  //大型主要设备
  async fetchfindEquipmentUsageData() {
    const response = await axios.get('/equipment/findMainEquipments');
    return response.data;
  },
}
