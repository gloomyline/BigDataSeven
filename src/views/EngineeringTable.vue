<template>
  <div class="engineering">
    
    <!-- 表格区域 -->
    <div class="table boxall">
      <div class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">大桥局七公司工经数据</span>
        
      </div>
      <div class="right">
          <el-select v-model="value" placeholder="请选择" @change="selectChangEvent">
            <el-option
              v-for="item in branchList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              
              >
            </el-option>
          </el-select>
        </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :summary-method="getTotal"
        show-summary
        class="customTable"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="title" label="片区名称" min-width="120"></el-table-column>
        <el-table-column prop="region" label="工程项目名称" min-width="120"></el-table-column>
        <el-table-column prop="p1" label="建设年限" min-width="120"></el-table-column>
    
        <!-- <el-table-column prop="pFinished" label="完成产值" min-width="120"></el-table-column> -->
        <!-- <el-table-column prop="yRatio" label="计价比例" min-width="120"></el-table-column> -->

        <el-table-column prop="p2" label="合同价" min-width="120"></el-table-column>

        <!-- <el-table-column prop="p3" label="开累施工产值" min-width="120"></el-table-column> -->
        <el-table-column prop="pFinished" label="完成产值" min-width="120"></el-table-column>

        

        <el-table-column prop="p4" label="暂定金" min-width="120"></el-table-column>
        <el-table-column prop="name" label="本月计价完成" min-width="120"></el-table-column>
        <el-table-column prop="completedUnpriced" label="已完工未计价" min-width="120"></el-table-column>
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
          <!-- <el-table-column prop="name3" label="计价比例" min-width="120"></el-table-column> -->
          <el-table-column prop="yRatio" label="计价比例" min-width="120"></el-table-column>
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
    <!-- 利润 -->
    <!-- <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">收尾项目关账推进情况</span>
      </p>
      <el-table
        :data="tableData1"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="100"></el-table-column> -->
        <!-- <el-table-column prop="deptId" label="项目id" ></el-table-column> -->
        <!-- <el-table-column prop="deptName" label="项目名称"></el-table-column>
        <el-table-column prop="endDate" label="竣工时间"></el-table-column>
        <el-table-column prop="settlementNum" label="未完成末次结算个数"></el-table-column>
        <el-table-column prop="settlement" label="结算"></el-table-column>
        <el-table-column prop="closeTheAccount" label="封账"></el-table-column>
        <el-table-column prop="feesReceivable" label="各类应收费用"></el-table-column>
        <el-table-column prop="advancePlan" label="推进计划完成情况"></el-table-column>
        <el-table-column prop="dutyPerson" label="责任人"></el-table-column>
        <el-table-column prop="earlyWarningLevel" label="预警等级">
           <template slot-scope="scope"> -->
            <!-- {{scope.row.earlyWarningLevel}} -->
            <!-- <template v-if="scope.row.earlyWarningLevel === '红色'"><el-tag type="danger">红色</el-tag></template>
            <template v-if="scope.row.earlyWarningLevel === '橙色'"><el-tag type="warning">橙色</el-tag></template>
            <template v-if="scope.row.earlyWarningLevel === '黄色'"><el-tag type="info">黄色</el-tag></template>
          </template> 
        </el-table-column>
        <el-table-column prop="deptEndDate" label="合同时间"></el-table-column>

      </el-table>
      <div class="boxfoot"></div>
    </div> -->
    <!-- 收尾 -->
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">利润率及责任成本节超率</span>
      </p>
      <el-table
        :data="tableData2"
        style="width: 100%"
        row-key="id"
      >
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <!-- <el-table-column prop="deptId" label="项目id" ></el-table-column> -->
        <el-table-column prop="deptName" label="项目名称" ></el-table-column>
        <el-table-column prop="zrGoal" label="责任目标" ></el-table-column>
        <el-table-column prop="zrProfit" label="责任利润率" ></el-table-column>
        <el-table-column prop="tiredFinishedOutput" label="开累完成产值" ></el-table-column>
        <el-table-column prop="tiredActualCost" label="开累实际成本金额" ></el-table-column>
        <!-- <el-table-column prop="tiredZrCost" label="开累责任成本金额" ></el-table-column> -->
        <!-- <el-table-column prop="tiredProfit" label="开累利润" ></el-table-column> -->
        <!-- <el-table-column prop="projectProfit" label="项目利润率" ></el-table-column> -->
        <!-- <el-table-column prop="profitEarlywarning" label="利润额预警等级" >
           <template slot-scope="scope">
            <template v-if="scope.row.profitEarlywarning === '红色'"><el-tag type="danger">红色</el-tag></template>
            <template v-if="scope.row.profitEarlywarning === '橙色'"><el-tag type="warning">橙色</el-tag></template>
            <template v-if="scope.row.profitEarlywarning === '黄色'"><el-tag type="info">黄色</el-tag></template>
          </template> 
        </el-table-column> -->
        <el-table-column prop="laborCost" label="劳务成本" width="150" >
          <template slot-scope="scope">
            <div title="点击查看详情">
            <el-button
              @click.native.prevent="getDetails(scope.$index, tableData2)"
              type="primary"
              round
              size="small">
              {{scope.row.laborCost}}
            </el-button>
            </div>
          </template>
              
        </el-table-column>
        <el-table-column prop="proportionOfLaborCost" label="劳务成本占总成本比例" ></el-table-column>
        <!-- <el-table-column prop="zrCost" label="责任成本盈亏" ></el-table-column>
        <el-table-column prop="zrCostSectionExcessRate" label="责任成本节超率" > -->
          <!-- <template slot-scope="scope">
            {{scope.row.zrCostSectionExcessRate}}%
          </template>  -->
        </el-table-column>
        <!-- <el-table-column prop="zrjcEarlywarning" label="责任成本节超率预警等级" >
           <template slot-scope="scope">
            
            <template v-if="scope.row.zrjcEarlywarning === '红色'"><el-tag type="danger">红色</el-tag></template>
            <template v-if="scope.row.zrjcEarlywarning === '橙色'"><el-tag type="warning">橙色</el-tag></template>
            <template v-if="scope.row.zrjcEarlywarning === '黄色'"><el-tag type="info">黄色</el-tag></template>
          </template>  
        </el-table-column> -->
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
     
        value: '',
      alltableData:[],
      tableData:[],
      // tableData: [
      //   {
      //     date: "",
      //     title: "在建",
      //     region: "-",
      //     name: "",
      //     name1: "",
      //     name2: "",
      //     name3: "",
      //     name4: "",
      //     name5: "",
      //     name6: "",
      //     name7: "",
      //     name8: "",
      //     name9: "",
      //     name10: "",
      //     name11: "",
      //     name12: "",
      //     name13: "",
      //     name14: "",
      //     zip: "",
      //     id: 1,
      //     children: [],
      //   },
      //   {
      //     date: "",
      //     title: "新建",
      //     region: "-",
      //     name: "",
      //     name1: "",
      //     name2: "",
      //     name3: "",
      //     name4: "",
      //     name5: "",
      //     name6: "",
      //     name7: "",
      //     name8: "",
      //     name9: "",
      //     name10: "",
      //     name11: "",
      //     name12: "",
      //     name13: "",
      //     name14: "",
      //     zip: "",
      //     id: 2,
      //     children: [ 
      //     ]
      //   },
      //   {
      //     date: "",
      //     title: "收尾",
      //     region: "-",
      //     name: "",
      //     name1: "",
      //     name2: "",
      //     name3: "",
      //     name4: "",
      //     name5: "",
      //     name6: "",
      //     name7: "",
      //     name8: "",
      //     name9: "",
      //     name10: "",
      //     zip: "",
      //     id:3,
      //     children: [
      //     ]
      //   },
      // ],
      tableData1:[],
      tableData2:[],
      branchList:[]
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
  mounted(){
    this.showSummariesPosition()
  },
  methods: {
     showSummariesPosition() {
      const table = document.querySelector('.customTable')  // customTable这个是在el-table定义的类名
      const footer = document.querySelector('.customTable .el-table__footer-wrapper')
      const body = document.querySelector('.customTable .el-table__body-wrapper')
      table.removeChild(footer)  // 移除表格最下方的合计行
      table.insertBefore(footer, body) // 把合计行插入到表格body的上面
    },
    getTotal(param){
      
      console.log("合计", param.columns[2])
      console.log("合计数据", param.data)
      const {columns,data} = param
      const sums = []
      columns.forEach((column,index)=>{
        
      
      const values = data.map(item =>{
        // console.log("valuesitem",item.children)
        console.log("子项目``````",item)
        if(item.children.length!=0){
          var itemchildren =item.children.map(item =>{
            // console.log("itemchilditem",item)
            // console.log("itemchilditem",column.property)
            
            var temp
            if(item[column.property] == undefined){
              temp=0
            }else{
              temp =item[column.property]
            }
            return temp
          })
        }else{
            return 0
        }
        // console.log("itemchildren",itemchildren)
        
        
       return this.sum(itemchildren)

      })
      
       console.log("values",values)
       console.log("---------")
      //  console.log("data[1].children[1][column.property]",data[1].children[0][column.property])
       console.log("data[0]",data[0])
       console.log("data[1]",data[1])
      if (data[0].children.length!=0){
        if(typeof (data[0].children[0][column.property])=='number' ){
          console.log("我是数字")
          sums[index] = (this.sum(values)).toFixed(2)
        }else{
          console.log("我不是数字")
          sums[index] = "-"
        }
      }

      if (data[1].children.length!=0){
        if(typeof (data[1].children[0][column.property])=='number' ){
          console.log("我是数字")
          sums[index] = (this.sum(values)).toFixed(2)
        }else{
          console.log("我不是数字")
          sums[index] = "-"
        }
      }

        if(index ===0){
          sums[index] = '合计'
        }
      })
      console.log("sums",sums)

      return sums
    },
    //数组求和
    sum(arr) {
      return arr.reduce(function(prev, curr, idx, arr){
        return prev + curr;
      });
    },

    selectChangEvent(comName){
      console.log("selectdata",comName)
      if(comName=="所有分公司"){
       var dataList=this.alltableData
      }else{
        var dataList = this.alltableData.filter(item=>{
          return item.comName === comName
        })
      }
      console.log("dataList",dataList)

      this.branchCompany(dataList)
    },
    getDetails(index, tableData2){
      console.log("index,tableData",index,tableData2)
      console.log("tableData[0]",tableData2[index].deptId)
      var obj={
        deptId:tableData2[index].deptId,
        projectName:tableData2[index].deptName
      }
      this.$router.push({name:'EngineeringTableDetail',params:{deptId:obj.deptId,projectName:obj.projectName}})

    },
    async ajaxData(){
      var ajaxData =await economyApi.fetchEconomyTable(this.date)

          //  const ajaxData = data;
        // initilize the tableData
        // this.tableData = this.$options.data().tableData;
        // initlize the counter
        
      this.alltableData = ajaxData
      this.branchCompany(this.alltableData)
        console.log("this.tableData",this.tableData)
        // this.alltableData=

        console.log("ajaxData",ajaxData)

        var companyidList = ajaxData.map(item =>{
          return item.comName
        })
        
        var branchListData = this.unique(companyidList)
        
        this.branchList = branchListData.map(item=>{
          return {
            label:item,
            value:item
          }
        })
        this.branchList.unshift({
            label:"所有分公司",
            value:"所有分公司"
          })
        this.value="所有分公司"


        console.log("companyidList",this.branchList)
 

      
      economyApi.fetchfindEndTable(this.date).then((data)=>{
        this.tableData1 = data
      })
      economyApi.fetchfindProfitandjiechaoTable(this.date).then((data)=>{
        this.tableData2 = data
      })
    },
    branchCompany(data){
      
      this.tableData=[
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
        // {
        //   date: "",
        //   title: "新建",
        //   region: "-",
        //   name: "",
        //   name1: "",
        //   name2: "",
        //   name3: "",
        //   name4: "",
        //   name5: "",
        //   name6: "",
        //   name7: "",
        //   name8: "",
        //   name9: "",
        //   name10: "",
        //   name11: "",
        //   name12: "",
        //   name13: "",
        //   name14: "",
        //   zip: "",
        //   id: 2,
        //   children: [ 
        //   ]
        // },
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
      let count = 4
        data.forEach(tableData => {
          if(tableData.areaId===2){
            // debugger
             this.tableData[0].children.push({
                id: ++count,
                date: "",
                title: "",
                region: tableData.name,
                p1: tableData.beginDate+'-'+tableData.endDae,
                p2: tableData.contractCost,
                p3: tableData.conOutput,
                p4: tableData.provisionalSum,
                //完成产值  ：pFinished 计价比例  ： yRatio
                pFinished:tableData.pfinished,
                yRatio:`${(tableData.yratio*100).toFixed(2)}%`,

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
             this.tableData[0].children.push({
                id: ++count,
                date: "",
                title: "",
                region: tableData.name,
                p1: tableData.beginDate+'-'+tableData.endDae,
                p2: tableData.contractCost,
                p3: tableData.conOutput,
                p4: tableData.provisionalSum,
                //完成产值  ：pFinished 计价比例  ： yRatio
                pFinished:tableData.pfinished,
                yRatio:`${(tableData.yratio*100).toFixed(2)}%`,
                name: tableData.monthPlanFinished,
                name1: tableData.lastPeriodPlan,
                name2: tableData.openPrice,
                // name2: tableData.periodPlan,
                completedUnpriced:tableData.completedUnpriced,
                earlyWarningLevel:tableData.earlyWarningLevel,
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
          }else if(tableData.areaId===5){
             this.tableData[0].children.push({
                id: ++count,
                date: "",
                title: "",
                region: tableData.name,
                p1: tableData.beginDate+'-'+tableData.endDae,
                p2: tableData.contractCost,
                p3: tableData.conOutput,
                p4: tableData.provisionalSum,
                //完成产值  ：pFinished 计价比例  ： yRatio
                pFinished:tableData.pfinished,
                yRatio:`${(tableData.yratio*100).toFixed(2)}%`,
                name: tableData.monthPlanFinished,
                name1: tableData.lastPeriodPlan,
                name2: tableData.openPrice,
                // name2: tableData.periodPlan,
                completedUnpriced:tableData.completedUnpriced,
                earlyWarningLevel:tableData.earlyWarningLevel,
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
          }else if(tableData.areaId===4){
             this.tableData[1].children.push({
                id: ++count,
                date: "",
                title: "",
                region: tableData.name,
                p1: tableData.beginDate+'-'+tableData.endDae,
                p2: tableData.contractCost,
                p3: tableData.conOutput,
                p4: tableData.provisionalSum,
                //完成产值  ：pFinished 计价比例  ： yRatio
                pFinished:tableData.pfinished,
                yRatio:`${(tableData.yratio*100).toFixed(2)}%`,
                name: tableData.monthPlanFinished,
                name1: tableData.lastPeriodPlan,
                name2: tableData.openPrice,
                // name2: tableData.periodPlan,
                completedUnpriced:tableData.completedUnpriced,
                earlyWarningLevel:tableData.earlyWarningLevel,
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
             this.tableData[1].children.push({
                id: ++count,
                date: "",
                title: "",
                region: tableData.name,
                p1: tableData.beginDate+'-'+tableData.endDae,
                p2: tableData.contractCost,
                p3: tableData.conOutput,
                p4: tableData.provisionalSum,
                //完成产值  ：pFinished 计价比例  ： yRatio
                pFinished:tableData.pfinished,
                yRatio:`${(tableData.yratio*100).toFixed(2)}%`,
                name: tableData.monthPlanFinished,
                name1: tableData.lastPeriodPlan,
                name2: tableData.openPrice,
                // name2: tableData.periodPlan,
                completedUnpriced:tableData.completedUnpriced,
                earlyWarningLevel:tableData.earlyWarningLevel,
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

        this.tableData.map(item =>{
          // name: tableData.monthPlanFinished,
          //       name1: tableData.lastPeriodPlan,
          //       name2: tableData.openPrice,
          //       completedUnpriced:tableData.completedUnpriced,
          // console.log("name,completedupPrice",item.name,item.completedUnpriced)
          // console.log("name,completedupPrice",item)
          item.children.map(items=>{
            console.log("```````name,completedupPrice",items.region,items.completedUnpriced)
          })
        })
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
    unique(arr) {
          return arr.filter(function(item, index, arr) {
            //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
            return arr.indexOf(item, 0) === index;
          });
        },
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
::v-deep .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td {
    background-color: transparent;
    color: #606266;
}

::v-deep .has-gutter tr td:nth-child(1){
  width:100px
}
.right{
  position: relative;
  top:-60px;
  float:right;
  // display:inline-block;
}
.engineering {
  .head {
    position:relative;
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
.el-tag.el-tag--danger {
    background-color:  #f30;
    border-color: #fde2e2;
    color: #fff;
}
.el-tag.el-tag--info {
    background-color: #ff0;
    border-color: #e9e9eb;
    color: #909399 ;
}
.el-tag.el-tag--warning {
    background-color: #e6a23c;
    border-color: #faecd8;
    color: #fff;
}
</style>