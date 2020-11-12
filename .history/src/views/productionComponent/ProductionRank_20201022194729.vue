<template>
  <div>
      <el-table
    :data="tableData"
    style="width: 100%"
    height="11.2rem"
    ref= "tableList"
    
    :cell-class-name="tableCellClassName"
    >
    <el-table-column
      prop="pprojectname"
      label="项目名称"
      width="100">
    </el-table-column>
    <el-table-column
      label="形象进度偏差"
      width="200">
      <el-table-column
      prop="pmilerodename"
      label="关键线路节点名称"
      width="100">
      </el-table-column>
      <el-table-column
      prop="pkeyrodeday"
      label="关键线路状态"
      width="100">
      </el-table-column>
      <el-table-column
      prop="pmilerodename"
      label="里程碑线路节点名称"
      width="100">
      </el-table-column>
      <el-table-column
      prop="pmilerodeday"
      label="里程碑线路状态"
      width="100">
      </el-table-column>
    </el-table-column>
    <el-table-column
      label="产值进度偏差"
      width="200">
      <el-table-column
      prop="ppfinishrate"
      label="产值完成比"
      width="100">
      </el-table-column>
      <el-table-column
      prop="pwfinishrate"
      label="工期完成比"
      width="100">
      </el-table-column>
      <el-table-column
        prop="diffday"
        label="偏差"
        width="100">
      </el-table-column>
    </el-table-column>
    <el-table-column
      prop="score"
      label="类别"
      >
    </el-table-column>
    <el-table-column
      prop="mdesc"
      label="备注"
      width="300">
    </el-table-column>
    
   
  </el-table>
  <!-- <p class="arktitle">asdfasdfasdfasdf</p> -->
  </div>
</template>
<script>
import { productionNewApi  } from '@/api';
export default {
  props:["ny"],
  data() {
    return {
      tableData: []
    }
  },
  created(){
   
  },
  mounted(){
    this.initData()
    console.log("$",$)
    

  },
  watch:{
    ny(newValue,oldValue){
      if(newValue!=oldValue){
        this.initData()
      }
    }
  },
  methods:{
   async initData() {
      console.log("ny------",this.ny)
      productionNewApi.fetchRankListData(this.ny).then((response)=>{
      console.log("排名数据",response.data)
      this.tableData = response.data

      console.log("表格",this.$refs)
      this.$refs.tableList.bodyWrapper.scrollTop =this.$refs.tableList.bodyWrapper.scrollHeight

      console.log("scrollTop",this.$refs.tableList.bodyWrapper.scrollTop)
      })
      
      

    },
    tableCellClassName({row, column, rowIndex, columnIndex}){
      
      if(row.mdesc){
        // console.log("celllrow",row.mdesc)
        // console.log("celllrowIndex",rowIndex)
        console.log("celllcolumnIndex",columnIndex)
        if(columnIndex==2){
          return "blink"
        }
        
      }

    }
  }

}
</script>
<style lang="scss" scoped>
::v-deep .blink .cell {
  font-size: 22px;
  font-weight: bold;
  line-height: 280px;
  background: linear-gradient(to right, red, red);
  -webkit-background-clip: text;
  color: transparent;
  
  animation: blink 2s linear infinite;
  -webkit-animation: blink 2s linear infinite;
  -moz-animation: blink 2s linear infinite;
  -ms-animation: blink 2s linear infinite;
  -o-animation: blink 2s linear infinite;
}
@keyframes blink{
  0%{opacity: 1;}
  50%{opacity: 0.5;}
  100%{opacity: 0.8;}
}
@-webkit-keyframes blink {
  0% { opacity: 1; }
  50%{ opacity: 0.5;}
  100% { opacity: 0.8; }
}
@-moz-keyframes blink {
  0% { opacity: 1; }
  50%{ opacity: 0.5; }
  100% { opacity: 0.8; }
}
@-ms-keyframes blink {
  0% { opacity: 1; }
  50%{ opacity: 0.5; }
  100% { opacity: 0.8;}
}
@-o-keyframes blink {
  0% { opacity: 1; }
  50%{ opacity: 0.5; }
  100% { opacity: 0.8; }
}
 
::v-deep tbody tr.hover-row td{
	background-color:rgba(2,2,2,0)
}
</style>