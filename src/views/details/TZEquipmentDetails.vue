<template>
  <div class="equipmentDetails">
    <div class="head">
      <h1>项目部设备情况</h1>
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
        <span class="tilte">机械设备租赁公司机械设备管理台账</span>
        <div  style="display:inline-block;float:right">
          <el-button type="primary" round @click="allData">全部</el-button>
          <el-button type="primary" round @click="usingData">在用</el-button>
          <el-button type="primary" round @click="freeData">空闲</el-button>
        </div>
        <div style="display:inline-block;width:2rem;float:right;margin-right:1rem;line-height:40px;">
          <!-- <div style="float:left;width:3rem;"> 
            <el-input
              placeholder="请输入设备名称"
              prefix-icon="el-icon-search"
              >
            </el-input>
          </div>
          <el-button type="primary" icon="el-icon-search">搜索</el-button> -->
          <a :href="hostname" target="_blank">链接后台搜索入口</a>
        </div>

      </div>
      <el-table
        :data="tableData2"
        row-key="id"
        default-expand-all
        :row-class-name="tableRowClassName"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="equipmentType" label="机械类别" min-width="120"></el-table-column>
        <el-table-column prop="necessaryEquipment" label="主要机械设备" min-width="100"></el-table-column>
        <el-table-column prop="number" label="管理编号"></el-table-column>
        <el-table-column prop="equipmentName" label="机械名称"></el-table-column>
        <el-table-column prop="model" label="型号"></el-table-column>
        <el-table-column prop="specifications" label="规格"></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂家"></el-table-column>
        <el-table-column prop="purchaseDate" label="购置日期"></el-table-column>
        <el-table-column prop="power" label="功率(kW)"></el-table-column>
        <el-table-column prop="valueOf" label="原值(元)"></el-table-column>
        <el-table-column prop="location" label="现存地"></el-table-column>
        <el-table-column prop="technicalConditions" label="技术状况">
          <template slot-scope="scope">
            <span v-if="scope.row.technicalConditions === 1">良好</span>
            <span v-if="scope.row.technicalConditions === 2">一般</span>
            <span v-if="scope.row.technicalConditions === 3">差</span>
            <span v-if="scope.row.technicalConditions === 4">较差</span>
            <span v-if="scope.row.technicalConditions === 5">极差</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="usingState" 
          label="使用状态" 
          :filters="[{ text: '在用', value: '在用' }, { text: '闲置', value: "闲置" }]" 
          :filter-method="filterUsingState"> -->
        <el-table-column prop="usingState"  label="使用状态" >
           <template slot-scope="scope">
            <span v-if="scope.row.usingState === 1">在用</span>
            <span v-if="scope.row.usingState === 2">闲置</span>
            <span v-if="scope.row.usingState === 3">长久闲置</span>
          </template> 
        </el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>
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
      hostname:"",
      tableData2: [],
      allEquipment: [],
      usingEquipment:[],
      freeEquipment:[],

    };
  },
  created() {
    this.hostname = `http://${ window.location.hostname}:8218/index`
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
      const response = await equipmentApi.fetchFindAllEquipmentData();
      console.log("response",response)
      response.forEach((element, index) => {
        this.$set(element, 'id', index+1)
        this.$set(element, 'necessaryEquipment', '-')
        if(element.children && element.children.length > 0) {
          element.children.forEach(i => {
            this.$set(i, 'equipmentType','')
          })
        }
      });
      console.log("tableData2",this.tableData2)
      this.allEquipment = copyObj(response)
      this.usingEquipment = copyObj(response)
      console.log("this.usingEquipment------",this.usingEquipment)
      this.freeEquipment = copyObj(response)
      console.log("this.freeEquipment```````",this.freeEquipment)
      this.tableData2 = this.freeEquipment
      function copyObj(obj) {
            let res = []
            for (var index in obj) {

              //  console.log("obj",obj)
               let item = {}
               console.log("obj[key]",obj[index])
               for(var key in obj[index]){
                 console.log("obj[key][key]",key,obj[index][key])
                 item[key] = obj[index][key]
                
               }
              console.log("item[key]",item)

              res.push(item)
            }
           
            
            console.log("res``````",res)
            return res
      }
      
      this.usingEquipment = this.usingEquipment.map((item)=>{
        // console.log("filter item",item)
        var childrenitem =item.children.filter(item1=>{
          // console.log("itemchildren",item)
          return item1.usingState == 1
        })
        console.log("childrenitem",childrenitem)
        item.children = childrenitem
        return item
      })
      console.log("this.usingEquipment",this.usingEquipment)
      console.log("using后  respon",response)
      console.log("using后 allEquipment",this.allEquipment)
      this.freeEquipment= this.freeEquipment.map((item2)=>{
        // console.log("filter item",item)
        var childrenitem =item2.children.filter(item1=>{
          // console.log("itemchildren",item)
          return item1.usingState == 2
        })
        console.log("childrenitem",childrenitem)
        item2.children = childrenitem
        return item2
      })
      console.log("this.freeEquipment",this.freeEquipment)
      
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