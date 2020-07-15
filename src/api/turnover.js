const { axios } = window;
export default {
  async fetchTypeA() {
    const response = await axios.get('/material/typeA');
    return response;
  },
  async fetchTypeB() {
    const response = await axios.get('/material/typeB');
    return response;
  },
  async fetchTypeC() {
    const response = await axios.get('/material/typeC');
    return response;
  },
  async fetchRate() {
    const response = await axios.get('/material/rateMonth');
    return response;
  },
  async fetchProjectDetails(deptId) {
    const response = await axios.get('/material/threePage', { params: { deptId } });
    return response;
  }
}