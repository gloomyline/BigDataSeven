const { axios } = window;

export default {
    //经费开累计划执行比和开累产值计划完成比
    async fetchRatioData(){
        const response = await axios.get('/emp/ratio');
    return response;
    },
    //工资总额
    async fetchSalaryData(){
        const response = await axios.get('/emp/salary');
    return response;
    },
    // 人员情况
    async fetchGetPersonnerInfoData(){
        const response = await axios.get('/employ/getPersonnerInfo');
    return response;
    },
    // 组织机构
    async fetchGetEmpOrganizationData(){
        const response = await axios.get('/emp/organization');
    return response;
    },
    // 人员三级界面
    async fetchGetEmployeeData(projectId){
        const response = await axios.get('/emp/employee',{
            params: {
                projectId: projectId
            }
        }

        );
    return response;
    }
}