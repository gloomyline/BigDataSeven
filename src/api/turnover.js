const { axios } = window;
export default {
  async fetchTypeA(date) {
    const response = await axios.get('/material/typeA', { params: { ny: date } });
    return response;
  },
  async fetchTypeB(date) {
    const response = await axios.get('/material/typeB', { params: { ny: date } });
    return response;
  },
  async fetchTypeC(date) {
    const response = await axios.get('/material/typeC', { params: { ny: date } });
    return response;
  },
  async fetchRate(date) {
    const response = await axios.get('/material/rateMonth', { params: { ny: date } });
    return response;
  },
  async fetchProjectDetails(deptId,ny) {
    console.log("fechprojectdate",ny)
    const response = await axios.get('/material/threePage', { params: { deptId:deptId,ny:ny } });
    return response;
  }
}