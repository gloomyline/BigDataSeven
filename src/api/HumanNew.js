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
    }
}