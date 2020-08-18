<template>
  <div class="labourServices">
    <div class="head">
      <div class="left">
        <el-date-picker
          v-model="date"
          type="month"
          :picker-options="pickerOptions"
          value-format="yyyy-MM"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <h1>劳务管理</h1>
      <div class="weather">
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
    <div class="box boxall">
      <!-- 图表 -->
      <div class="map" id="map_l">
        <!-- <div class="map4" id="map_l"></div> -->
      </div>
      <!-- 表格区域 -->
      <div class="table">
        <p class="thead">
          <span class="tilte">劳务企业参建项目数</span>
        </p>
        <el-table
          style="width:100%"
          :row-class-name="tableRowClassName"
          :data="tableData"
          border
          size="mini"
          height="4rem"
        >
          <el-table-column
            type="index"
            label="排序"
            width="120"
          ></el-table-column>
          <el-table-column prop="comname" label="劳务企业"></el-table-column>
          <el-table-column prop="deptidnum" label="参建项目数"></el-table-column>
          <el-table-column prop="deptname" label="参建项目"></el-table-column>
        </el-table>
      </div>
      <div class="boxfoot"></div>
    </div>

    <div class="box boxall m-top4">
      <!-- 图表 -->
      <div class="map" id="map_2"></div>
      <!-- 表格区域 -->
      <div class="table">
        <p class="thead">
          <span class="tilte">劳务企业作业人数占比</span>
        </p>
        <el-table
          style="width:100%"
          height="4rem"
          :data="tableData2"
          border
          size="mini"
          :row-class-name="tableRowClassName2"
        >
          <el-table-column
            type="index"
            label="序号"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="comname"
            min-width="150"
            label="劳务企业"
          ></el-table-column>
          <el-table-column
            prop="deptname"
            min-width="120"
            label="参建项目"
          ></el-table-column>
          <el-table-column prop="worknum" label="作业人数"></el-table-column>
          <el-table-column prop="regisnum" label="注册人数"></el-table-column>
          <el-table-column prop="prate" label="占比">
            <template slot-scope="scope">
              <span v-if="scope.row.prate">{{`${scope.row.prate}%`}}</span>
            </template>
          <!-- <el-table-column prop="prate" label="占比" :formatter="formatter"> -->
          </el-table-column>
        </el-table>
      </div>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import "@/assets/js/china.js";
import echarts from "echarts";
import { LabourServicesNewApi } from '@/api'
export default {
  data() {
    return {
      tableData: [],
      tableData2: [],
      date: '',
      pickerOptions: {
        disabledDate(time) {
          return time >Date.now();
        },
      },      
    };
  },
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0,1)",
    });
    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  created() {
    const _date = new Date()
    this.date = `${_date.getFullYear()}-${('0' + _date.getMonth()).substr(-2)}`
    this.initData()
  },
  watch: {
    date(newDate) {
      this.initData();
    },
  },
  methods: {
      //参比数改变字体颜色
     tableRowClassName2({row, rowIndex}) {
       //console.log("rowrowindex",row,rowIndex)
       if(row.prate>=85){
         return 'textcolorRed'
       }else if(row.prate<85 && row.prate>=60){
         return 'textcolorYellow'
       }else if(row.prate<60){
         return 'textcolorGreen'
       }
        // if (rowIndex === 1) {
        //   return 'textcolorRed';
        // } else if (rowIndex === 3) {
        //   return 'textcolorYellow';
        // }
        // return '';
      },
    // 劳务队伍
    async initData() {
      const _date = new Date();
      let arr = await LabourServicesNewApi.fetchLabelteamworkrateData(this.date);
      this.tableData2 = arr.data.right
      this._sortTableData2();
      this.echarts2(arr.data.left);
      this.fetchedLabelteamnumData()
    },
    // 劳务队伍作业人数占比
    async fetchedLabelteamnumData() {
      let arr = await LabourServicesNewApi.fetchedLabelteamnumData(this.date);
      console.log("arr.data.leftleft",arr.data.left)
      this.tableData = arr.data.right
      this.echarts(arr.data.left);
    },
    _sortTableData2() {
      this.tableData2 = this.tableData2.sort((a, b) => (b.data / b.value - a.data / a.value));
    },
    tableRowClassName({ row, rowIndex }) {
      //  console.log("rowrowindex",row,rowIndex)
       if(row.deptidnum==3){
         return 'textcolorRed'
       }else if(row.deptidnum==2){
         return 'textcolorYellow'
       }else if(row.deptidnum==1){
         return 'textcolorGreen'
       }
      // console.log("rowname",row.name)
      // if (row.name > 2) {
      //   return "red-row";
      // } else if (row.name == 2) {
      //   return "yellow-row";
      // } else if (row.name < 2) {
        
      // }
      
    },
    formatter(resRow) {
      var resvalue = Math.floor((resRow.data / resRow.value) * 10000) / 100;
      return isNaN(resvalue) ? "" : resvalue + "%";
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
    openDetails(row) {
      // console.log(row, '-----------')
      this.$router.push({ 
        name: "LabourServicesDetails",
        params: {
          name: row.name
        }
       });
    },
    seeDetails(resRow) {
      this.echarts2(resRow);
    },
    echarts(left) {
      console.log("leftlefteftleft",left)
      let data = []
      for(let i=0; i<left.length; i++){
        data.push(i+1)
      }
      var myChart = echarts.init(document.getElementById("map_l"));
      var option = {
        // color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "2%",
          right: "10%",
          top: "12%",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data,
            axisTick: {
              alignWithLabel: true,
            },
            name: "项目数",
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "劳务企业数",
            splitLine: { show: false }, //去除网格线
            axisLabel: {},
            axisLine: {
              lineStyle: {
                // 设置x轴颜色
                color: "#fff",
                fontSize: 14,
              },
            },
          },
        ],
        series: [
          {
            name: "劳务企业数",
            type: "bar",
            barWidth: "40%",
            data: left,
            itemStyle: {
              normal: {
                color: function(params) {
                  if (params.dataIndex >= 2) {
                    return ["rgb(236, 128, 141)"];
                  } else if (params.dataIndex === 1) {
                    return ["rgb(250, 205, 145)"];
                  } else if (params.dataIndex === 0) {
                    return ["rgb(202, 249, 130)"];
                  }
                  // return colorList[params.dataIndex];
                },
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#fff",
                    fontSize: 12,
                  },
                },
              },
            },
          },
        ],
      };

      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts2(left) {
      console.log("leftleft",left)
      var myChart = echarts.init(document.getElementById("map_2"));
      // var dataOpcton = left;
      var titleList = ["参建人数占大于总人数85%", "参建人数大于总人数60%-85%", "参建人数小于总人数60%"];
      // var dataOpcton = this.tableData2.map((item) => {
      //   var resvalue = Math.floor((item.data / item.value) * 10000) / 100;
      //   if (resvalue >= 85) {
      //     item.color = colorList[0];
      //   } else if (resvalue >= 60 && resvalue < 85) {
      //     item.color = colorList[1];
      //   } else {
      //     item.color = colorList[2];
      //   }
      //   item.proportion = isNaN(resvalue) ? "" : resvalue + "%";
      //   return item;
      // });
      var option = {
        title: {
          text: "劳务企业作业人数占比",
          left: "center",
          textStyle: {
            color: "#fff", //颜色
            fontWeight: "bold", //粗细
            fontSize: 18, //大小
            align: "center", //水平对齐
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          top: 40,
          //data: [left[0].name, left[1].name, left[2].name],
          show: true,
          textStyle: {
            color: "#fff", //颜色
            fontWeight: "bold", //粗细
            fontSize: 12, //大小
          },
        },
        color: ["rgb(236, 128, 141)","rgb(250, 205, 145)","rgb(202, 249, 130)"],
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["45%", "60%"],
            label: {
              fontSize: 16,
              formatter: '{c}个',
            },
            // 后台name返回汉字错误，进行转换，如后台修改后，直接赋值 data: left  即可
            // left: [{name: "参见人数占大于总人数85%", value: 49}, {name: "参见人数占比大于总人数65%-85%", value: 0},…]
            data: left,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            }
          },
        ],
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
  },
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

.el-table .success-row {
  background:"red";
}
.labourServices {
  .head {
    height: 1.05rem;
    background: url(~@/assets/images/head_bg.png) no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    z-index: 100;
    .left {
      position: absolute;
      left: 0;
      top: 0;
    }
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
  .box {
    width: 98%;
    min-width: 1200px;
    margin: 0.1rem auto 0 auto;
    display: flex;
    .map {
      flex: 0 0 50%;
      width: 50%;
      height: 4rem;
      margin-top: 0.6rem;
    }
    .table {
      flex: 1;
      height: 4rem;
      margin-top: 0.1rem;
      .thead {
        width: 100%;
        text-align: center;
        line-height: 0.8rem;
        .tilte {
          color: #ffffff;
          font-size: 24px;
          line-height: 0.3rem;
          margin-left: 0.6rem;
        }
      }
    }
  }
}
</style>
<style>

.el-table .red-row {
  background: rgb(236, 128, 141) !important;
}
.el-table .yellow-row {
  background: rgb(250, 205, 145) !important;
}
.el-table .cyan-row {
  background: rgb(202, 249, 130) !important;
}
</style>
