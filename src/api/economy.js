const { axios } = window;

export default {
  async fetchEconomyMeter(date) {
    const response = await axios.get('/economy/meter', { params: { ny: date } });
    return response.data;
  },
  async fetchEconomyClaim(date) {
    const response = await axios.get('/economy/claim', { params: { ny: date } });
    return response.data;
  },
  async fetchEconomyTable(date) {
    const response = await axios.get('/economy/table', { params: { ny: date } });
    return response.data;
  },
  //收尾
  async fetchfindEndTable(date) {
    const response = await axios.get('/economy/findEnd', { params: { ny: date } });
    return response.data;
  },
  //利润
  async fetchfindProfitandjiechaoTable(date) {
    const response = await axios.get('/economy/findProfitandjiechao', { params: { ny: date } });
    return response.data;
  },
  //年度索赔明细
  async fetchAnnualclaimdetails(ny,deptId) {
    const response = await axios.get('/economy/findClaimByDeptId', { params: { ny: ny,deptId:deptId } });
    return response.data;
  },
  //劳务分包信息
  async fetchLaborByDeptId(deptId) {
    const response = await axios.get('/economy/findEcoLaborByDeptId', { params: { deptId:deptId } });
    return response.data;
  },
}
