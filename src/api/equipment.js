const { axios } = window;

export default {
  async fetchEquipments(ny = `${(new Date()).getFullYear()}-${('00' + ((new Date()).getMonth() + 1)).substr(-2)}`) {
    const response = await axios.get('/equipment/equipment', { params: { ny } });
    return response.data;
  },
  async fetchEquipmentsByProject(projectId) {
    const response = await axios.get('/equipment/findByProjectId', { params: { projectId } });
    return response.data;
  },
}
