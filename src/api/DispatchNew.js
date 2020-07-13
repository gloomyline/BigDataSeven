const { axios } = window;

export default {
  async fetchedWebPreviewInfo(date) {
    const response = await axios.get('/proviewinfo/getWebProviewInfo', { params: { 
      pid: date } });
    return response;
  },
  async fetchGetDepartProductionData(date) {
    const response = await axios.get('/production/getDepartProduction', { params: { pid: date } });
    return response;
  },
}