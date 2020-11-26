<template>
  <div>
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
      <div class="middle"><h1 >劳务管理</h1></div>
      <div class="right">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack"
          >返回主页面</el-button
        >
      </div>
    </div>
    <div class="wrapper">

      <el-table
          :data="tableList"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column
            prop="labconusingesc"
            label=""
            width="80">
          </el-table-column>
          <el-table-column
            prop="subCompanyName"
            label="分包企业名称"
            width="300">
          </el-table-column>
          <el-table-column
            prop="subType"
            label="分包类别"
            >
          </el-table-column>
          <el-table-column
            prop="creditRating"
            label="资信等级"
            >
          </el-table-column>
          <!-- <el-table-column
            prop="legalPerson"
            label="法定代表人姓名"
          >
          </el-table-column>
          <el-table-column
            prop="client"
            label="委托代理人姓名">
          </el-table-column>
          <el-table-column
            prop="tel"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="groupAdmitNo"
            label="准入证号">
          </el-table-column> -->
          <el-table-column
            prop="groupAdmitTime"
            label="准入时间">
          </el-table-column>
          <el-table-column
            prop="recommendDept"
            label="推荐项目部">
          </el-table-column>
          <!-- <el-table-column
            prop="recommendPerson"
            label="项目推荐人">
          </el-table-column>
          <el-table-column
            prop="registeredCapital"
            label="注册资本金(万元)">
          </el-table-column>
          <el-table-column
            prop="creditCode"
            label="统一社会信用代码">
          </el-table-column>
          <el-table-column
            prop="securityLicense"
            label="安全生产许可证">
          </el-table-column>
          <el-table-column
            prop="qualificationNo"
            label="资质证书编号">
          </el-table-column>
          <el-table-column
            prop="subRange"
            label="分包作业范围">
          </el-table-column>
          <el-table-column
            prop="checkRating"
            label="考核等级">
          </el-table-column>
          <el-table-column
            prop="checkRating"
            label="最近年审时间">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="labconusingesc"
            label="是否在用描述">
          </el-table-column> -->
          <el-table-column
            prop="qualifiedesc"
            label="是否合格描述">
          </el-table-column>


          
          

        </el-table>

      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="totalRecords">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { LabourServicesNewApi } from '@/api'
export default {
  data(){
    return {
      tableList:[],
      pageSize:100,
      currentPage:1,
      totalRecords:0
    }
  },
  mounted(){
    this.initData()
  },
  methods:{
    async initData(){
      var res = await LabourServicesNewApi.fetchfindAllSubcons(this.currentPage,this.pageSize)
      console.log("resresresresres",res)
      this.totalRecords = res.totalRecords
      console.log("resresresresres",res.dataBody)
      this.tableList = res.dataBody
      
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        LabourServicesNewApi.fetchfindAllSubcons(this.currentPage,this.pageSize).then((data)=>{
          this.totalRecords = data.totalRecords
        this.tableList = data.dataBody
        })
        
    }
  }
  
}
</script>
<style lang="scss" scoped>
.wrapper{
  padding:.2rem;
}
</style>