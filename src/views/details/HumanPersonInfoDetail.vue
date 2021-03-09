<template>
  <div class="engineering">
    <div class="head">
      <div class="left">
        <!-- <el-date-picker
          v-model="ny"
          type="month"
          :picker-options="pickerOptions"
          value-format="yyyy-MM"
          placeholder="选择月">
        </el-date-picker> -->
      </div>
      <div class="middle"><h1 >【{{deptName}}】{{pro}}可调配人员名单</h1></div>
      <div class="right">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack"
          >返回</el-button
        >
      </div>
    </div>
    <div class="wrapper">
      <dv-border-box-10 >
      

 
        
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            >
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="deptName"
              label="项目名称">
            </el-table-column>
            <el-table-column
              prop="department"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="post"
              label="岗位">
            </el-table-column>
            <el-table-column
              prop="tecPost"
              label="职称">
            </el-table-column>
            <el-table-column
              prop="pro"
              label="人事专业">
            </el-table-column>
            <el-table-column
              prop="dutyname"
              label="职务职别">
            </el-table-column>
            <el-table-column
              prop="categoryStr"
              label="人员类别">
            </el-table-column>
            <el-table-column
              prop="age"
              label="年龄">
            </el-table-column>
            <el-table-column
              prop="nation"
              label="民族">
            </el-table-column>
            <el-table-column
              prop="workingDate"
              label="参加工作">
            </el-table-column>
            <el-table-column
              prop="edu"
              label="学历">
            </el-table-column>
            <el-table-column
              prop="onJob"
              label="工作状态">
            </el-table-column>
           
            
          </el-table>
      </dv-border-box-10>
   </div> 

  </div>
</template>
<script>
import { HumanNewApi  } from '@/api';

export default {
  data(){
    return {
      // deptId:row.deptId,deptName:row.deptName,pro:row.projectname,job:column.property
     deptId:this.$route.query.deptId,
     deptName:this.$route.query.deptName,
     pro:this.$route.query.pro,
     job:this.$route.query.job,
     tableData:[]
    }
  },

  mounted() {
    this.initData()
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)",
    });
    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  
  methods: {
    async initData(){
       const res = await HumanNewApi.fetchPersonInfoDetail(this.deptId,this.pro,this.job);
       console.log("res``",res)
       this.tableData = res
    },
    goBack() {
      this.$router.push({ path: "/HumanInfoDetail" });
    },
    // getRowKeys(row) {
    //     return row.id;
    // },
   

    
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  margin:30px;
}
.radio-group span {
  display: inline-block;
  letter-spacing: normal;
  cursor: pointer;
  box-sizing: border-box;
  width: 106px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px 5px 0px 0px;
  color: #fff;
  font-size: 12px;
  background-color: #67737e;
  margin: 5px;
}

.radio-group .cur {
  background-color: #1b88e7;
}
.head {
  padding-top:10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between

}
.el-month-table td.today .cell {
    color: #606266 !important;
    font-weight: 100 !important;
}
::v-deep .cellColorGreen .cell{
  color:#15ff00
}
</style>
