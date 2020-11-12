const { axios } = window;

export default {
  async fetchedWebPreviewInfo(pid) {
    const response = await axios.get('/proviewinfo/getWebProviewInfo', { params: { pid: pid } });
    return response;
  },
  async fetchGetDepartProductionData(pid) {
    const response = await axios.get('/production/getDepartProduction', { params: { pid: pid } });
    return response;
  },
  //节点滞后
  async fetchedNodeList(ny,pid) {
    const response = await axios.get('/proviewinfo/getWebProviewInfo', { params: { 
      ny:ny,projectid: pid, } });
    return response;
  },
  //  上个月完成产值情况
  async fetchPlanfinishlMonthData1(date) {
    const response = await axios.get('/production/planfinishlmonth', { params: { ny: date } });
    return response;
  },
  //项目简介
  async fetchProjectIntroduction(deptId) {
    const response = await axios.get('/deptdesc/findDeptDesc', { params: { deptId: deptId } });
    return response;
  },
}