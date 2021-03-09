<template>
  <div>
      <el-table
    :data="tableData"
    row-key="pprojectid"
    style="width: 100%"
    height="11.2rem"
    ref= "tableList"
    @sort-change="sortChange"
    :row-class-name="tableRowClassName"
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
      label="工期比(%)"
      width="100">
      </el-table-column>
      <el-table-column
        prop="diffday"
        label="偏差(%)"
        sortable
        width="100">
      </el-table-column>
    </el-table-column>
    <!-- <el-table-column
      prop="score"
      label="类别"
      sortable=""
      :sort-method="sortByData"
      > -->
      <el-table-column
      prop="score"
      label="类别"
      sortable="'custom'"
      >
       <!-- <template slot-scope="scope">
         <template v-if="scope.row.score==null">asdfasd</template>
         <template v-else>{{scope.row.score}}</template> -->

       <!-- </template> -->
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
    sortChange:function(column){
        let _this = this;

        let tempTableList = []
        let tempTableData = []

        let fieldName = column.prop;
        let sortingType = column.order;        
        
        debugger

        tempTableList = Object.assign([], _this.tableData.filter(el => (el[fieldName] === ''  || el[fieldName] === null || el[fieldName] === undefined)))
        // 过滤出符合排序的数据形成新数组，再对该数组进行常规排序
        tempTableData = Object.assign([], _this.tableData.filter(el => (el[fieldName] !== '' && el[fieldName] !== null && el[fieldName] !== undefined)))
       
         tempTableData.forEach(t=>{
            switch (t[fieldName]){
            case 'A': t[fieldName] = 1;break;
            case 'B': t[fieldName] = 2;break;
            case 'C': t[fieldName] = 3;break;
            }
            })
       if (sortingType !== null) {
        if (sortingType === 'descending') {
          // 冒泡排序新数组
          tempTableData = tempTableData.sort((a, b) => b[fieldName] - a[fieldName])
          // 将不符合排序的数组重新放入排序完成的数组末尾，保证数据完整
            tempTableData.forEach(t=>{
            switch (t[fieldName]){
            case 1: t[fieldName] = 'A';break;
            case 2: t[fieldName] = 'B';break;
            case 3: t[fieldName] = 'C';break;
            }
            })
          // tempTableData.reverse()
          // tempTableList.forEach(el => {
          //   tempTableData.push(el)
          // })
          tempTableData = tempTableList.concat(tempTableData);
          // tempTableData.reverse()
        } else { // 按照升序排序
          // 冒泡排序新数组
          tempTableData = tempTableData.sort((a, b) => a[fieldName] - b[fieldName])
          // 将不符合排序的数组重新放入排序完成的数组末尾，保证数据完整
           tempTableData.forEach(t=>{
            switch (t[fieldName]){
            case 1: t[fieldName] = 'A';break;
            case 2: t[fieldName] = 'B';break;
            case 3: t[fieldName] = 'C';break;
            }
            })
          // tempTableList.forEach(el => {
          //   tempTableData.push(el)
          // })
            tempTableData = tempTableList.concat(tempTableData);
        }
          _this.tableData = Object.assign([], tempTableData)
        } else {
          // 如果是取消排序，则将数据还原成接口返回的数据
          _this.tableData = Object.assign([], _this.allTableData)
        }
        
        
    },
    sortByData(data1,data2,type){
      console.log("sortdata",data1,data2,type)
      if (type == 'asc') {
          return data1 > data2? -1 : 1
      } else {
          return data1 > data2? -1 : 1  
      }
    },
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
    tableRowClassName({row, rowIndex}) {
      console.log("rowrowrow",row)
      if(row.pkeyrodeday<0){
        return "rowcolorred"
      }
      // if (rowIndex === 1) {
      //   return 'warning-row';
      // } else if (rowIndex === 3) {
      //   return 'success-row';
      // }
      // return '';
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
          return 'redcell' 
        }     
      }else if(row.diffday>=20 && row.diffday<30){
        if(columnIndex==7){
          return 'orangecell'
        } 
        
      }else if(row.diffday>=10 && row.diffday<20){
        if(columnIndex==7){
          return 'yellowcell'
        } 
        
      }else {
        if(columnIndex==7){
          return 'greencell'
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
::v-deep .el-table .el-table__row .redcell .cell {
    color: #F45853 !important;
  }
::v-deep .el-table .el-table__row .yellowcell .cell{
  color: #FFE443;
}
::v-deep .el-table .el-table__row .orangecell .cell{
  color: #FD783E;
}
::v-deep .el-table .el-table__row .greencell .cell{
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
::v-deep tbody tr.el-table__row.rowcolorred > td >div.cell {
  color:#F45853 !important;
} 

</style>