<template>
  <div class="equipmentDetails">
    <div class="head">
      <h1>{{projectName}}项目变更索赔成果明细</h1>
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack(true)"
        >返回</el-button>
      </div>
    </div>

    <div class="table boxall">
      <div class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">{{projectName}}项目变更索赔成果明细</span>
        
        

      </div>
      <el-table
        :data="tableList"
        class="tableBox"
        row-key="id" 
        :span-method="objectSpanMethod"
      >
       <el-table-column label="序号" type="index" width="70"></el-table-column>
       <el-table-column prop="claimProjectName" label="索赔项目名称" width="200"></el-table-column>
       <el-table-column prop="amount" label="批复金额" width="100"></el-table-column>
       <el-table-column prop="planning" label="策划"></el-table-column>
       <el-table-column prop="dataPreparation" label="资料准备"></el-table-column>
       <el-table-column prop="communicationSkills" label="沟通技巧"></el-table-column>
       <el-table-column prop="implement" label="实施要点"></el-table-column>
         <!-- <el-table-column prop="number" label="管理编号"></el-table-column>
        <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
        <el-table-column prop="specifications" label="规格"></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂家"></el-table-column> -->
        <!-- <el-table-column prop="purchaseDate" label="购置日期"></el-table-column> -->
        <!-- <el-table-column prop="power" label="功率(kW)"></el-table-column> -->
        <!-- <el-table-column prop="valueOf" label="原值(元)"></el-table-column> -->
        <!-- <el-table-column prop="location" label="现存地"></el-table-column> -->

        <!-- <el-table-column prop="note" label="备注"></el-table-column> -->
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import { equipmentApi } from '@/api';
import {economyApi} from '@/api';

// import btnList from "@/components/BtnList.vue";
export default {

  data() {
    return {
     ny:this.$route.params.ny,
     deptId:this.$route.params.deptId,
     projectName:this.$route.params.projectName,
     tableList:[],
     spanArr:[],
     spanArr4:[],
     spanArr5:[],
     spanArr6:[],
     spanArr7:[]

    };
  },
  created(){
    // this.ny=this.$route.params.ny,
    // this.deptId=this.$route.params.deptId,
    // this.projectName=this.$route.params.projectName
    this.annualclaimdetails()
    
  },
  mounted() {
    console.log("this.ny",this.ny)
    
  },
  beforeCreate() {
    // const loading = this.$loading({
    //   lock: true,
    //   text: "页面加载中..",
    //   spinner: "el-icon-loading",
    //   background: "rgba(0, 0, 0, 1)"
    // });

    // setTimeout(() => {
    //   loading.close();
    // }, 2000);
  },
  methods: {
    
    getSpanArr(data){
      //data后端数据
      for(var i=0;i<data.length;i++){
        if(i===0){
          this.spanArr.push(1)
          this.pos=0
        }else{
          //判断当前元素与上一个元素是否相同
          if(data[i].planning===data[i-1].planning){
            this.spanArr[this.pos]+=1
            this.spanArr.push(0)
          }else{
            this.spanArr.push(1)
            this.pos = i

          }
        }
        console.log(this.spanArr)
      }
      //第5列
      for(var i=0;i<data.length;i++){
        if(i===0){
          this.spanArr4.push(1)
          this.pos4=0
        }else{
          //判断当前元素与上一个元素是否相同
          if(data[i].dataPreparation===data[i-1].dataPreparation){
            this.spanArr4[this.pos4]+=1
            this.spanArr4.push(0)
          }else{
            this.spanArr4.push(1)
            this.pos4 = i

          }
        }
        
      }
      console.log("this.spanArr4",this.spanArr4)

      //第6列
      for(var i=0;i<data.length;i++){
        if(i===0){
          this.spanArr5.push(1)
          this.pos5=0
        }else{
          //判断当前元素与上一个元素是否相同
          if(data[i].communicationSkills===data[i-1].communicationSkills){
            this.spanArr5[this.pos5]+=1
            this.spanArr5.push(0)
          }else{
            this.spanArr5.push(1)
            this.pos5 = i

          }
        }
        
      }
      console.log("this.spanArr4",this.spanArr5)

      //第7列
      for(var i=0;i<data.length;i++){
        if(i===0){
          this.spanArr6.push(1)
          this.pos6=0
        }else{
          //判断当前元素与上一个元素是否相同
          if(data[i].implement===data[i-1].implement){
            this.spanArr6[this.pos6]+=1
            this.spanArr6.push(0)
          }else{
            this.spanArr6.push(1)
            this.pos6 = i

          }
        }
        
      }
      console.log("this.spanArr4",this.spanArr6)

    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log("row",row)
      // console.log("column",column)
      // console.log("rowIndex",rowIndex)
      // console.log("columnIndex",columnIndex)

      if(columnIndex===3){
        const _row = this.spanArr[rowIndex]
        const _col = _row>0 ? 1 : 0
        // console.log(`rowspan${_row} colspan${_col}`)
        //[0,0]表示这行不显示 [2,1]表示行合并数
        return{
          rowspan:_row,
          colspan:_col
        }
        
      }
      if(columnIndex===4){
        const _row = this.spanArr4[rowIndex]
        const _col = _row>0 ? 1 : 0
        console.log(`rowspan${_row} colspan${_col}`)
        //[0,0]表示这行不显示 [2,1]表示行合并数
        return{
          rowspan:_row,
          colspan:_col
        }
        
      }

      if(columnIndex===5){
        const _row = this.spanArr5[rowIndex]
        const _col = _row>0 ? 1 : 0
        console.log(`rowspan${_row} colspan${_col}`)
        //[0,0]表示这行不显示 [2,1]表示行合并数
        return{
          rowspan:_row,
          colspan:_col
        }
        
      }
      if(columnIndex===6){
        const _row = this.spanArr6[rowIndex]
        const _col = _row>0 ? 1 : 0
        console.log(`rowspan${_row} colspan${_col}`)
        //[0,0]表示这行不显示 [2,1]表示行合并数
        return{
          rowspan:_row,
          colspan:_col
        }
        
      }

      // if (columnIndex === 0) {
      //   if (rowIndex % 2 === 0) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
      
      // if(columnIndex === 3){
      //   return {
      //     rowspan:8,
      //     colspan:1
      //   }
      // }
      // if (columnIndex === 0) {
      //   const _row = this.spanArr[rowIndex]
      //   const _col = _row > 0 ? 1 : 0;
      //   return {
      //       rowspan: _row,
      //       colspan: _col
      //   }
      // }
      // if (columnIndex === 1) {
      //   const _row = this.spanArr[rowIndex]
      //   const _col = _row > 0 ? 1 : 0;
      //   return {
      //     rowspan: _row,
      //     colspan: _col
      //   }
      // }
    },
    async annualclaimdetails(){
      var res = await economyApi.fetchAnnualclaimdetails(this.ny,this.deptId)
      this.tableList = res
      console.log("工程经济年度索赔",res)
      this.getSpanArr(this.tableList)
    },
    goBack(res) {
      if (res) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: "/" });
      }
    },
    
  }
};
</script>

<style lang="scss" scoped>
// .tableBox{
//   td {
//     height:30px;
//   }
// }
::v-deep .el-table__row.textcolorRed td div.cell{
    color:rgb(236, 128, 141)
     
}
::v-deep .el-table__row.textcolorGreen td div.cell{
    color:rgb(202, 249, 130)
     
}
::v-deep .el-table__row.textcolorYellow td div.cell{
    color:rgb(250, 205, 145)
     
}
.equipmentDetails {
  .head {
    height: 1.05rem;
    background: url(~@/assets/images/head_bg.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    z-index: 100;
    h1 {
      color: #63ecff;
      text-align: center;
      font-size: 0.4rem;
      line-height: 0.8rem;
      .img {
        width: 1.5rem;
        display: inline-block;
        vertical-align: middle;
        margin-right: 0.2rem;
      }
    }
  }
  .map {
    width: 1200px;
    // height: 460px;
    margin: 0 auto;
  }
  .table {
    margin: 0.4rem;
    margin-top: 0.6rem;
    border: rgba(0, 102, 153, 1) 1px solid;
    padding: 0.6rem;
    background-color: #0c2456 !important;
    .thead {
      text-align: left;
      margin-bottom: 0.6rem;
      .img {
        width: 0.6rem;
        height: 0.28rem;
      }
      .tilte {
        font-size: 18px;
        color: #b6d7ff;
        line-height: 0.3rem;
        margin-left: 0.6rem;
      }
    }
    .e-table {
      width: 100%;
      min-width: 800px;
      margin: 0 auto;
    }
  }
}
</style>