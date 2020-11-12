<template>
  <div class="engineering">
    
    <!-- 表格区域 -->
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">大桥局七公司工经数据</span>
      </p>
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="title" label="片区名称" min-width="120"></el-table-column>
        <el-table-column prop="region" label="工程项目名称" min-width="120"></el-table-column>
        <el-table-column prop="p1" label="建设年限" min-width="120"></el-table-column>
        <el-table-column prop="p2" label="合同价" min-width="120"></el-table-column>
        <el-table-column prop="p3" label="开累施工产值" min-width="120"></el-table-column>
        <el-table-column prop="p4" label="暂定金" min-width="120"></el-table-column>
        <el-table-column prop="name" label="本月计价完成" min-width="120"></el-table-column>
        <el-table-column prop="completedUnpriced" label="已完成未计价" min-width="120"></el-table-column>
        <el-table-column prop="earlyWarningLevel" label="预警等级" min-width="120">
          <template slot-scope="scope">
            <!-- {{scope.row.earlyWarningLevel}} -->
            <template v-if="scope.row.earlyWarningLevel === '红色'"><el-tag type="danger">红色</el-tag></template>
            <template v-if="scope.row.earlyWarningLevel === '橙色'"><el-tag type="warning">橙色</el-tag></template>
            <template v-if="scope.row.earlyWarningLevel === '黄色'"><el-tag type="info">黄色</el-tag></template>
          </template> 
        </el-table-column>
        <el-table-column label="开累">
          <el-table-column prop="name1" label="上期开累计价" min-width="120"></el-table-column>
          <el-table-column prop="name2" label="开累计价" min-width="120"></el-table-column>
          <el-table-column prop="name3" label="计价比例" min-width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="2020年度变更索赔">
          <el-table-column prop="name4" label="年度计划" min-width="120"></el-table-column>
          <el-table-column prop="name5" label="月度完成" min-width="120"></el-table-column>
          <el-table-column prop="name6" label="年度完成" min-width="120"></el-table-column>
          <el-table-column prop="name7" label="完成比" min-width="120"></el-table-column>
        </el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import { economyApi } from "@/api";
export default {
  name: "Engineering",
  props: ['date'],
  data() {
    return {
      tableData: [
        {
          date: "",
          title: "在建",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          name6: "",
          name7: "",
          name8: "",
          name9: "",
          name10: "",
          name11: "",
          name12: "",
          name13: "",
          name14: "",
          zip: "",
          id: 1,
          children: [],
        },
        {
          date: "",
          title: "新建",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          name6: "",
          name7: "",
          name8: "",
          name9: "",
          name10: "",
          name11: "",
          name12: "",
          name13: "",
          name14: "",
          zip: "",
          id: 2,
          children: [ 
          ]
        },
        {
          date: "",
          title: "收尾",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          name6: "",
          name7: "",
          name8: "",
          name9: "",
          name10: "",
          zip: "",
          id:3,
          children: [
          ]
        },
      ]
    };
  },
  watch: {
    date(newDate) {
      this.ajaxData();
    },
  },
  created(){
    this.ajaxData();
  },
  methods: {
    ajaxData(){
      economyApi.fetchEconomyTable(this.date).then((data)=>{
        const ajaxData = data;
        // initilize the tableData
        this.tableData = this.$options.data().tableData;
        // initlize the counter
        let count = 4
        ajaxData.forEach(tableData => {
          if(tableData.areaId===2){
             this.tableData[0].children.push({
                id: ++count,
                date: "",
                title: "",
                region: tableData.name,
                p1: tableData.beginDate+'-'+tableData.endDae,
                p2: tableData.contractCost,
                p3: tableData.conOutput,
                p4: tableData.provisionalSum,
                name: tableData.monthPlanFinished,
                name1: tableData.lastPeriodPlan,
                name2: tableData.openPrice,
                completedUnpriced:tableData.completedUnpriced,
                earlyWarningLevel:tableData.earlyWarningLevel,
                
                //计价比例
                name3: tableData.openPrice===0||tableData.conOutput===0?'0%':(tableData.openPrice/tableData.conOutput*100).toFixed(2)+'%',
                name4: tableData.yplan,
                name5: tableData.monthFinished,
                name6: tableData.yfinished,
                name7: tableData.yfinished===0||tableData.yplan===0?'0%':(tableData.yfinished/tableData.yplan*100).toFixed(2)+'%',
                name8: "0",
                name9: "",
                name10: "",
                zip: ""
              })
          }else if(tableData.areaId===1){
             this.tableData[1].children.push({
                id: ++count,
                date: "",
                title: "",
                region: tableData.name,
                p1: tableData.beginDate+'-'+tableData.endDae,
                p2: tableData.contractCost,
                p3: tableData.conOutput,
                p4: tableData.provisionalSum,
                name: tableData.monthPlanFinished,
                name1: tableData.lastPeriodPlan,
                name2: tableData.periodPlan,
                name3: tableData.lastPeriodPlan===0||tableData.periodPlan===0?0:(tableData.lastPeriodPlan/tableData.periodPlan*100).toFixed(2)+'%',
                name4: tableData.yplan,
                name5: tableData.monthFinished,
                name6: tableData.yfinished,
                name7: tableData.yfinished===0||tableData.yplan===0?'0%':(tableData.yfinished/tableData.yplan*100).toFixed(2)+'%',
                name8: "0",
                name9: "",
                name10: "", 
                zip: ""
              })
          }else if(tableData.areaId===3){
             this.tableData[2].children.push({
                id: ++count,
                date: "",
                title: "",
                region: tableData.name,
                p1: tableData.beginDate+'-'+tableData.endDae,
                p2: tableData.contractCost,
                p3: tableData.conOutput,
                p4: tableData.provisionalSum,
                name: tableData.monthPlanFinished,
                name1: tableData.lastPeriodPlan,
                name2: tableData.periodPlan,
                name3: tableData.lastPeriodPlan===0||tableData.periodPlan===0?0:(tableData.lastPeriodPlan/tableData.periodPlan*100).toFixed(2)+'%',
                name4: tableData.yplan,
                name5: tableData.monthFinished,
                name6: tableData.yfinished,
                name7: tableData.yfinished===0||tableData.yplan===0?'0%':(tableData.yfinished/tableData.yplan*100).toFixed(2)+'%',
                name8: "0",
                name9: "",
                name10: "",
                zip: ""
              })
          }
        });
      });
    },
    //单元格格式
    //  tableCellClassName({row, column, rowIndex, columnIndex}) {
      // console.log("tableCellClassNamerow",row,"rowIndex",rowIndex)
      // if(row.earlyWarningLevel){
      //   // console.log("rowIndex```````",rowIndex)
      //   let curRowIndex = rowIndex
      //   if(row.earlyWarningLevel=="红色"){
      //     if(rowIndex === curRowIndex){
      //       return "textcolorRed"
      //     }
      //   }
      //   if(row.earlyWarningLevel=="橙色"){
      //     if(rowIndex === curRowIndex){
      //       return "textcolorOrange"
      //     }
      //   }
      //   if(row.earlyWarningLevel=="黄色"){
      //     if(rowIndex === curRowIndex){
      //       return "textcolorYellow"
      //     }
      //   }

      // }

    // },
    goBack() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-table__row.textcolorRed td div.cell{
    color:rgb(236, 128, 141)
     
}
::v-deep .el-table__row.textcolorOrange td div.cell{
    color:rgb(255,165,0)
     
}
::v-deep .el-table__row.textcolorYellow td div.cell{
    color:rgb(250, 205, 145)
     
}
.engineering {
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