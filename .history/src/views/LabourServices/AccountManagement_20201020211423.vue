<template>
  <div>
    <el-table
        :data="tableList"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        
        <el-table-column
          prop=""
          label="是否在用"
          width="120">
        </el-table-column>
        <el-table-column
          prop="subCompanyName"
          label="分包企业名称"
          width="100">
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
        <el-table-column
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
        </el-table-column>
        <el-table-column
          prop="groupAdmitTime"
          label="准入时间">
        </el-table-column>
        <el-table-column
          prop="recommendDept"
          label="推荐项目部">
        </el-table-column>
        <el-table-column
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
          prop=""
          label="">
        </el-table-column>
        <el-table-column
          prop=""
          label="">
        </el-table-column>
        <el-table-column
          prop=""
          label="">
        </el-table-column>
        <el-table-column
          prop=""
          label="">
        </el-table-column>


        
        

      </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="totalRecords">
    </el-pagination>
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
      totalRecords:[]
    }
  },
  mounted(){
    this.initData()
  },
  methods:{
    async initData(){
      var res = await LabourServicesNewApi.fetchfindAllSubcons(this.currentPage,this.pageSize)
      console.log("resresresresres",res)
      this.totalRecords=res.totalRecords
    },
  }
  
}
</script>
<style lang="scss" scoped>

</style>