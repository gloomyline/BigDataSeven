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
      prop="pkeyrodename"
      label="关键线路节点名称"
      width="100">
      </el-table-column>
      <el-table-column
      prop="pkeyrodeday"
      label="关键线路状态(天)"
      sortable
      width="100">
      </el-table-column>
      <el-table-column
      prop="pmilerodename"
      label="里程碑线路节点名称"
      width="100">
      </el-table-column>
      <el-table-column
      prop="pmilerodeday"
      label="里程碑线路状态(天)"
      sortable
      width="100">
      </el-table-column>
    </el-table-column>
    <el-table-column
      label="产值进度偏差"
      width="200">
      <el-table-column
      prop="ppfinishrate"
      label="产值完成比(%)"
      width="100">
      </el-table-column>
      <el-table-column
      prop="pwfinishrate"
      label="工期完成比(%)"
      width="100">
      </el-table-column>
      <el-table-column
        prop="diffday"
        label="偏差(%)"
        sortable
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
    this.$nextTick(() => {
        console.log("表格111111",this.$refs.tableList.headerWrapper)
    })
    

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
      // this.$refs.tableList.bodyWrapper.scrollTop =this.$refs.tableList.bodyWrapper.scrollHeight

      // console.log("scrollTop",this.$refs.tableList.bodyWrapper.scrollTop)

      })

      this.play()
      
      

    },
    play(){
      console.log("playthis.$refs.tableList",this.$refs.tableList)
    },
    tableCellClassName({row, column, rowIndex, columnIndex}){      
      if(row.mdesc){
        // console.log("celllrow",row.mdesc)
        // console.log("celllrowIndex",rowIndex)
        // console.log("celllcolumnIndex",columnIndex)
        if(columnIndex==2){
          return "blink"
        } 
      }
      if(row.pkeyrodeday<0){
        // console.log("celllrow",row.mdesc)
        // console.log("celllrowIndex",rowIndex)
        // console.log("celllcolumnIndex",columnIndex)
        if(columnIndex==2){
          return "blink"
        } 
      }
      if(row.diffday>=30){
        if(columnIndex==7){
          return 'red-row' 
        }     
      }else if(row.diffday>=20 && row.diffday<30){
        if(columnIndex==7){
          return 'orange-row'
        } 
        
      }else if(row.diffday>=10 && row.diffday<20){
        if(columnIndex==7){
          return 'yellow-row'
        } 
        
      }else {
        if(columnIndex==7){
          return 'green-row'
        } 
        
      }
      

    },
  //   tableRowClassName({row, rowIndex}){
  //     // console.log("tablerow",row.diffday,rowIndex)
  //     if(row.diffday>=30){
  //       return 'red-row';     
  //     }else if(row.diffday>=20 && row.diffday<30){
  //       return 'orange-row'
  //     }else if(row.diffday>=10 && row.diffday<20){
  //       return 'yellow-row'
  //     }else {
  //       return 'green-row'
  //     }
  //     // if (rowIndex === 1) {
  //     //   return 'warning-row';
  //     // } else if (rowIndex === 3) {
  //     //   return 'success-row';
  //     // }
  //     // return '';
  //   }
  }

}
</script>
<style lang="scss" scoped>
::v-deep .el-table .el-table__row .red-row .cell {
    color: #F45853 !important;
  }
::v-deep .el-table .el-table__row .yell-row .cell{
  color: #FFE443 ;
}
::v-deep .el-table .el-table__row .orange-row .cell{
  color: #FD783E;
}
::v-deep .el-table .el-table__row .green-row .cell{
  color: #71DC58;
}

::v-deep .blink .cell {
  font-size: 22px;
  font-weight: bold;
  background: linear-gradient(to right, red, red);
  -webkit-background-clip: text;
  background-clip: text;
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