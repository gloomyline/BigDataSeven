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
      <div class="middle"><h1 >调配人员信息</h1></div>
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
    
    <dv-border-box-10>
 <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>

  
    </dv-border-box-10>
    

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
 tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          children: [{
              id: 3555,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 31233,
              date: '',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          },{
              id: 32133,
              date: '',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          },{
              id: 33223,
              date: '',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          },{
              id: 33322,
              date: '',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }],
       
      
    }
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/" });
    },
    async dispatchHumanDetail(){
      const res = await HumanNewApi.fetchDispatchHumanDetailData();
      console.log("fetchDispatchHumanDetailData",res)
      var HumanDetailData =[]
      if(res){
        var tempDeptName = res[0]
        console.log("tempDeptName",tempDeptName)
        res.map((item) =>{
          console.log("item",item)
        })
        
      }


    },
  }
}
</script>

<style lang="scss" scoped>
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
