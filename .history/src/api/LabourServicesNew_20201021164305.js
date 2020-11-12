const { axios } = window;

export default {
/*  async fetchLabelteamworkrateData(date) {
    const response = await axios.get('/labour/labelteamworkrate', { params: { month: date } });
    return response;
  }, */
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
  },
  //公司劳动力配置情况
  async fetchlabourconfigrateData(date) {
    const response = await axios.get('/labour/labourconfigrate', { params: { month: date } });
    return response;
  },
  async fetchlabourconfigratedetailslData(date, deptId) {
    const response = await axios.get('/labour/labourconfigratedetails', { params: { month: date, deptId: deptId} });
    return response;
  },
  async fetchlabourconstructiondetailData(page,limit,subconid) {
    const response = await axios.get('/labour/findSubcontractorDetailsIfId', { params: { page:page,limit:limit,subconid: subconid} });
    return response;
  },
  //台帐管理
  async fetchfindAllSubcons(currentpage,limit) {
    const response = await axios.get('/labour/findAllSubcons', { params: { page:currentpage,limit:limit } });
    return response.data;
  },
  //公司劳动力配置二级- 三级页面详情
}