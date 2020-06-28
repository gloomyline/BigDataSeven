<template>
  <div class="equipment">
    <div class="head">
      <h1>机械设备</h1>
      <div class="weather">
        <el-button type="primary" size="small" icon="el-icon-arrow-left" round @click="goBack">返回主页面</el-button>
      </div>
    </div>
    <!-- 图表 -->
    <div class="map" id="map_l">
      <!-- <div class="map4" id="map_l"></div> -->
    </div>
    <!-- 表格区域 -->
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">项目机械设备总体情况</span>
      </p>
      <el-table
        @row-click="openDetails"
        :data="tableData1"
        :span-method="equSpanMethod"
        border
        class="e-table"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="index" label="序号" width="120"></el-table-column>
        <el-table-column prop="title" label="片区名称"></el-table-column>
        <el-table-column prop="region" label="项目名称"></el-table-column>
        <el-table-column prop="name" label="机械设备数量"></el-table-column>
        <el-table-column prop="name1" label="大型机械设备数量"></el-table-column>
        <el-table-column prop="name2" label="实施机长负责制设备数量" min-width="150"></el-table-column>
        <el-table-column prop="name3" label="机长人数"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">自有机械设备总体情况</span>
      </p>
      <el-table :data="tableData2" border :span-method="objectSpanMethod" class="e-table">
        <el-table-column prop="state" label="状态" width="120"></el-table-column>
        <el-table-column prop="date" label="整体机械设备"></el-table-column>
        <el-table-column prop="name" label="主要机械设备"></el-table-column>
        <el-table-column prop="name1" label="年度修理计划"></el-table-column>
        <el-table-column prop="name2" label="实际修理"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">自有测量设备总体情况</span>
      </p>
      <el-table :data="tableData3" border :span-method="objectSpanMethod" class="e-table">
        <el-table-column prop="state" label="状态" width="120"></el-table-column>
        <el-table-column prop="date" label="整体测量设备"></el-table-column>
        <el-table-column prop="name" label="主要测量设备"></el-table-column>
        <el-table-column prop="name1" label="年度修理计划"></el-table-column>
        <el-table-column prop="name2" label="实际修理"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">自有试验设备总体情况</span>
      </p>
      <el-table :data="tableData4" :span-method="objectSpanMethod" class="e-table">
        <el-table-column prop="state" label="状态" width="120"></el-table-column>
        <el-table-column prop="date" label="整体试验设备"></el-table-column>
        <el-table-column prop="name" label="主要试验设备"></el-table-column>
        <el-table-column prop="name1" label="年度修理计划"></el-table-column>
        <el-table-column prop="name2" label="实际修理"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">项目大型机械设备分布情况</span>
      </p>
      <el-table :data="tableData" class="e-table">
        <el-table-column type="index" label="序号" width="120"></el-table-column>
        <el-table-column prop label="所在项目"></el-table-column>
        <el-table-column prop label="管理编号"></el-table-column>
        <el-table-column prop label="设备名称"></el-table-column>
        <el-table-column prop label="型号规格"></el-table-column>
        <el-table-column prop label="生产厂家"></el-table-column>
        <el-table-column prop label="设备提供单位"></el-table-column>
        <el-table-column prop label="设备来源"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import "@/assets/js/china.js";
import echarts from "echarts";
export default {
  name: "Equipment",
  data() {
    return {
      tableData1: [
        {
          date: "",
          title: "独立项目",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "9",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 11,
              date: "",
              title: "",
              region: "安九铁路",
              name: "204",
              name1: "9",
              name2: "18",
              name3: "",
              zip: ""
            },
            {
              id: 12,
              date: "待补充",
              title: "",
              region: "江汉七桥",
              name: "52",
              name1: "16",
              name2: "7",
              zip: ""
            },
            {
              id: 16,
              date: "48月",
              title: "",
              region: "中兰客专",
              name: "243",
              name1: "9",
              name2: "11",
              zip: ""
            },
            {
              id: 17,
              date: "",
              title: "",
              region: "西宁昆仑路",
              name: "14",
              name1: "0",
              name2: "0",
              zip: ""
            }
          ]
        },
        {
          date: "",
          title: "城轨分公司",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 14,
              date: "待补充",
              title: "",
              region: "武嘉高速",
              name: "54",
              name1: "4",
              name2: "4",
              zip: ""
            }
          ]
        },
        {
          date: "",
          title: "武汉分公司",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 15,
              region: "武大高速",
              plan: "8458",
              finish: "709",
              rate: "8.4%",
              name: "42",
              name1: "4",
              name2: "0",
              zip: ""
            }
          ]
        },
        {
          date: "",
          title: "湖北分公司",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 11,
              date: "960天",
              title: "",
              region: "童庄河",
              plan: "1,912.00",
              finish: "112",
              rate: "6.70%",
              name: "45",
              name1: "6",
              name2: "6",
              zip: ""
            }
          ]
        },
        {
          date: "",
          title: "西北分公司",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 13,
              date: "",
              title: "",
              region: "潇河大桥",
              name: "13",
              name1: "6",
              name2: "5",
              zip: ""
            }
          ]
        },
        {
          date: "",
          title: "海南项目群",
          region: "-",
          name: "",
          name1: "",
          name2: "",
          name3: "",
          name4: "",
          name5: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 13,
              date: "",
              title: "",
              region: "沈海高速",
              name: "45",
              name1: "3",
              name2: "6",
              zip: ""
            }
          ]
        }
      ],
      tableData: [
        {
          date: "西南片区",
          name: "100",
          address: "东西湖项目"
        },
        {
          date: "西南片区",
          name: "100",
          address: "东西湖项目"
        },
        {
          date: "西南片区",
          name: "100",
          address: "东西湖项目"
        },
        {
          date: "西南片区",
          name: "100",
          address: "东西湖项目"
        }
      ],
      tableData2: [
        {
          state: "在用",
          date: "66",
          name: "16",
          address: "东西湖项目",
          name1: "86",
          name2: "22"
        },
        {
          state: "闲置",
          date: "80",
          name: "17"
        },
        {
          state: "长期闲置",
          date: "7",
          name: "1"
        }
      ],
      tableData3: [
        {
          state: "在用",
          date: "94",
          name: "88",
          address: "东西湖项目",
          name1: "7台",
          name2: "3台"
        },
        {
          state: "闲置",
          date: "10",
          name: "5"
        },
        {
          state: "长期闲置",
          date: "7",
          name: "1"
        }
      ],
      tableData4: [
        {
          state: "在用",
          date: "143",
          name: "126",
          address: "混凝土搅拌站（20万元）",
          name1: "混凝土搅拌站（20万元）",
          name2: "无"
        },
        {
          state: "闲置",
          date: "22",
          name: "1"
        },
        {
          state: "长期闲置",
          date: "8",
          name: "8"
        }
      ]
    };
  },
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)"
    });

    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  mounted() {
    this.$nextTick(() => {
      this.echarts();
    });
  },
  methods: {
    goBack() {
      this.$router.push({ path: "/" });
    },
    openDetails() {
      this.$router.push({ name: "EquipmentDetails" });
    },
    echarts() {
      var myChart = echarts.init(document.getElementById("map_l"));
      var data = [
        {
          name: "荆州",
          value: 127
        },
        {
          name: "宜昌",
          value: 55
        },
        {
          name: "武汉",
          value: 77
        }
      ];
      var geoCoordMap = {
        荆州: [112.239741, 30.335165],
        宜昌: [111.3, 30.7],
        武汉: [114.31, 30.52]
      };
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      var option = {
        // backgroundColor: '#404a59',
        /***  title: {
              text: '实时行驶车辆',
              subtext: 'data from PM25.in',
              sublink: 'http://www.pm25.in',
              left: 'center',
              textStyle: {
                  color: '#fff'
              }
          },**/
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            if (typeof params.value[2] == "undefined") {
              return params.name + " : " + params.value;
            } else {
              return params.name + " : " + params.value[2];
            }
          }
        },

        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false
            }
          },
          roam: false, //禁止其放大缩小
          itemStyle: {
            normal: {
              areaColor: "#4c60ff",
              borderColor: "#002097"
            },
            emphasis: {
              areaColor: "#293fff"
            }
          }
        },
        series: [
          {
            name: "消费金额",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 15;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#ffeb7b"
              }
            }
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });

      myChart.on("click", function(params) {
        $("#box").css("display", "block");
        $("#box").css("position", "relative");
        $("#box-title").html(provinceName);
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 3 || columnIndex === 4) {
        return {
          rowspan: 3,
          colspan: 1
        };
      }
    },
    equSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 6) {
        return {
          rowspan: 15,
          colspan: 1
        };
      }
    }
    // arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 3) {
    //     if (columnIndex === 0) {
    //       return [1, 8];
    //     }
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.equipment {
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
      width: 92%;
      min-width: 800px;
      margin: 0 auto;
    }
  }
}
</style>