<template>
  <div class="equipmentDetails">
    <div class="head">
      <h1>大型主要设备情况</h1>
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
        <span class="tilte">大型主要设备详情</span>
        
        

      </div>
      <el-table
        :data="bigMainEq"
        row-key="id" >
        <el-table-column prop="number" label="管理编号"></el-table-column>
        <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="specifications" label="规格"></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂家"></el-table-column>
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
import btnList from "@/components/BtnList.vue";
export default {
  components: {
    btnList
  },
  data() {
    return {
      bigMainEq:[],
      tableData2: [],
      allEquipment: [],
      usingEquipment:[],
      freeEquipment:[],

    };
  },
  mounted() {
    this.initData()
  },
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中..",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)"
    });

    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  methods: {
    async initData() {
      const response = await equipmentApi.fetchMainEquipmentsData();
      this.bigMainEq = response
     
    },
    allData(){
      this.tableData2=this.allEquipment
    },
    usingData(){
      this.tableData2=this.usingEquipment
    },
    freeData(){
      this.tableData2=this.freeEquipment
    },
    filterUsingState(value, row, column){
      console.log("row------1",row)
      // console.log("column------1",column)
      return row.children[0].usingState === Number(value)
      // row.children.forEach((item,index)=>{
      //   console.log("item.usingState",item.usingState)
      //   console.log("value",value)
      //   console.log("item.usingState===value",Boolean(item.usingState===Number(value)))
      //   return item.usingState=== Number(value)
      // })
      
      
      // return row.usingState === value;
    },
    tableRowClassName({row, rowIndex}) {
      // console.log("row",row,"rowIndex",rowIndex)
      if(row.usingState){
        // console.log("rowIndex```````",rowIndex)
        let curRowIndex=rowIndex
        if(row.usingState==2){
          if(rowIndex === curRowIndex){
            return "textcolorYellow"
          }
        }else if(row.usingState==3){
            return "textcolorRed"
        }

      }
      
      // if (!row.usingState && row.children && row.children.length>0){
      // console.log("row",row.children.length)
      
      //  for (let i=0;i<row.children.length;i++){
      //    if (row.children[i].usingState==2){
      //      console.log("rowIndex------------",rowIndex)
      //  let curentrowIndex = rowIndex
          //  console.log("row.children[i]",row.children[i])
          //  console.log("rowindex22222",rowIndex)
           
         
          
        //    if(rowIndex===curentrowIndex){
        //      return "textcolorYellow"
        //    }
         
        //  }else if (row.children[i].usingState==2){
        //    return "textcolorRed"
        //  }
      //  }
      // }
        // if (rowIndex === 1) {
        //   return 'warning-row';
        // } else if (rowIndex === 3) {
        //   return 'success-row';
        // }
        // return '';
      },
    goBack(res) {
      if (res) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: "/" });
      }
    },
    equSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 11) {
        return {
          rowspan: 666,
          colspan: 1
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
    height: 460px;
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