const { axios } = window;

export default {
    //经费开累计划执行比和开累产值计划完成比
    async fetchRatioData(ny){
        //const response = await axios.get('/emp/ratio');
        const response = await axios.get('/emp/ratio',{params:{ny:ny}});
    return response;
    },
    //工资总额
    async fetchSalaryData(ny){
        const response = await axios.get('/emp/salary',{params:{ny:ny}});
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
    },
    //调配人员信息
    async fetchDispatchHumanInfoData(){
      const response = await axios.get('/emp/allocate')
      return response.data;
    },
     //调配人员信息详情
     async fetchDispatchHumanDetailData1(){
      const response = await axios.get('/emp/deptAllocate')
      return response.data;
    },
    //调配人员信息详情每科室人员详情deptAllocateDetails?deptId=57&pro=办公室事务管理&job=second
    async fetchPersonInfoDetail(deptId,pro,job){
      const response = await axios.get('/emp/deptAllocateDetails',{params:{deptId:deptId,pro:pro,job:job}})
      return response.data;
    },
    //年度绩效
    async fetchDispatchHumanDetailData(date){
      const response = await axios.get('/emp/findPerformance',{params:{ny:date}})
      return response.data;
    },
    //年度绩效干部考核
        async fetchDispatchHumanLeaderData(date){
              const response = await axios.get('/emp/cadreassessment',{params:{ny:date}})
              return response.data;
            },
          //职称情况
          async fetchprofessionalData(){
              const response = await axios.get('/emp/professional')
              return response.data;
            }
    
}