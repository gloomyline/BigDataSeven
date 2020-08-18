const { axios } = window;

export default {
  async fetchLabelteamworkrateData(date) {
    const response = await axios.get('/labour/labelteamworkrate', { params: { month: date } });
    return response;
  },
  async fetchedLabelteamnumData(date) {
    const response = await axios.get('/labour/labelteamnum', { params: { month: date } });
    return response;
  },
  //劳务企业使用情况
  async fetchLabourusageData(date) {
    const response = await axios.get('/labour/labourusage', { params: { month: date } });
    return response;
  },
  async fetchLabourusagedetailData(date, deptId) {
    const response = await axios.get('/labour/labourusagedetail', { params: { month: date, deptId: deptId} });
    return response;
  }

}