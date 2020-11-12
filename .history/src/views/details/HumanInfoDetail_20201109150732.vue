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
      <div class="middle"><h1 >可调配人员信息</h1></div>
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
      <dv-border-box-10 >
        <el-table
            :data="HumanDetailData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            :row-key="getRowKeys"
            :expand-row-keys="expands"
            :row-class-name="tableRowClassName"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
              prop="pro"
              label="专业"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="deptName"
              label="项目名称"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="deputyChief"
              label="副科级及以上">
            </el-table-column>
            <el-table-column
              prop="first"
              label="一级科员">
            </el-table-column>
            <el-table-column
              prop="second"
              label="二级科员">
            </el-table-column>
            <el-table-column
              prop="headcount"
              label="职员">
            </el-table-column>
            
          </el-table>
      </dv-border-box-10>
   </div> 

  </div>
</template>
<script>
import { HumanNewApi  } from '@/api';

export default {

  mounted() {
    this.dispatchHumanDetail()
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
  data() {
    return {
      HumanDetailData:[],
      expands:["uuid0"],
      tableData: [
        {
          id:3,
          deptName:"童庄河",
          deputyChief:null,
          first:null ,
          headcount: null,
          id: 3,
          pro: null,
          second: null,
          children: [{
            id:4,
            deptName:"",
            deputyChief: 0,
            first: 1,
            headcount: 0,
           
            pro: "物资管理(含材料)",
            second: 0,
          }]
        }
      ],
       
      
    }
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/" });
    },
    getRowKeys(row) {
        return row.id;
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    async dispatchHumanDetail(){
      const res = await HumanNewApi.fetchDispatchHumanDetailData1();
      console.log("fetchDispatchHumanDetailData",res)
      
      if(res){
        var proArr = res.map((item) =>{   
          return  item.pro
        })
        console.log("asdfasdf",res)
        console.log("proArr",proArr)
        var proSet = new Set(proArr)
        console.log("deptNameSet",proSet)
        var proArr = Array.from(proSet)
        console.log("deptNameSetArr",proArr)
        for (var i=0;i<proArr.length;i++){ 
          var childrenlist = res.filter((item)=>{
            // console.log("item",item)
            return item.pro == proArr[i]
          })
          childrenlist =childrenlist.map((item)=>{
            return {id:item.id,
              pro:null,
              deptName:item.deptName,
              deputyChief:item.deputyChief,
              first: item.first,
              headcount: item.headcount,
              
              second: item.second,
            }   
          })
          console.log("childrenlist",childrenlist)
          var temp = {
            id:'uuid'+ i,
            pro:proArr[i],
            deptName:null,
            deputyChief:null,
            first:null ,
            headcount: null,
            
            second: null,
            children:childrenlist
          }
          this.HumanDetailData.push(temp)



        }
        console.log("HumanDetailData",this.HumanDetailData)
        
      }


    },
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

</style>
