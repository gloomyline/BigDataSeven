<template>
  <div class="turnover">
    <div class="head">
      <h1>周转材料</h1>
      <div class="weather">
        <el-button type="primary" size="small" icon="el-icon-arrow-left" round @click="goBack">返回主页面</el-button>
      </div>
    </div>
    <!-- 图表 -->
    <div class="map" id="map_l">
      <!-- <div class="map4" id="map_l"></div> -->
    </div>
    <!-- 表格区域 -->
    <div class="goto">
      <a href="http://211.149.184.113:8218/index" target="_blank">链接后台搜索入口</a>
    </div>
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="../assets/images/u563.png" />
        <span class="tilte">周转材料账面清单</span>
      </p>
      <el-table
        @row-click="openDetails"
        :data="tableData"
        style="width: 100%"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="title" label="片区名称" min-width="150"></el-table-column>
        <el-table-column prop="region" label="工程项目名称" min-width="150"></el-table-column>
        <el-table-column label="A类">
          <el-table-column prop="name" label="账面总量" min-width="120"></el-table-column>
          <el-table-column prop="name1" label="账面在用量" min-width="120"></el-table-column>
          <el-table-column prop="name2" label="利用率" min-width="120"></el-table-column>
          <el-table-column label="账面库存总量">
            <el-table-column prop="name3" label="中心库库存" min-width="120"></el-table-column>
            <el-table-column prop="name4" label="现场封存" min-width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="B类">
          <el-table-column prop="name5" label="账面总资产" min-width="120"></el-table-column>
          <el-table-column prop="name6" label="在用资产" min-width="120"></el-table-column>
          <el-table-column prop="name7" label="闲置资产" min-width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="C类">
          <el-table-column label="闲置资产">
            <el-table-column prop="name8" label="可直接调拨使用" min-width="120"></el-table-column>
            <el-table-column prop="name9" label="加工改制后使用" min-width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import "@/assets/js/china.js";
import echarts from "echarts";
export default {
  name: "Turnover",
  data() {
    return {
      tableData: [
        {
          date: "",
          title: "独立项目",
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
          children: [
            {
              id: 11,
              date: "",
              title: "",
              region: "安九铁路",
              name: "6768.765",
              name1: "6768.765",
              name2: "100%",
              name3: "",
              name4: "",
              name5: "26580.473",
              name6: "25516.323",
              name7: "1064.15",
              name8: "",
              name9: "",
              zip: ""
            },
            {
              id: 12,
              date: "待补充",
              title: "",
              region: "江汉七桥",
              plan: "2800",
              finish: "2045",
              rate: "73.0%",
              name: "1003.597",
              name1: "1003.597",
              name2: "100%",
              name3: "",
              name4: "",
              name5: "7829.969",
              name6: "7829.969",
              name7: "0",
              name8: "",
              name9: "",
              zip: ""
            },
            {
              id: 16,
              date: "48月",
              title: "",
              region: "中兰客专",
              plan: "5040",
              finish: "1165",
              rate: "23.1%",
              name: "637.210",
              name1: "637.210",
              name2: "100%",
              name3: "",
              name4: "",
              name5: "9361",
              name6: "9361",
              name7: "0",
              name8: "",
              name9: "",
              zip: ""
            },
            {
              id: 17,
              date: "",
              title: "",
              region: "西宁昆仑路",
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
          name6: "",
          name7: "",
          name8: "",
          name9: "",
          zip: "",
          id: 1,
          children: [
            {
              id: 14,
              date: "待补充",
              title: "",
              region: "武嘉高速",
              plan: "1962",
              finish: "210",
              rate: "10.7%",
              name: "8.773",
              name1: "8.773",
              name2: "100%",
              name3: "",
              name4: "",
              name5: "727.508",
              name6: "727.508",
              name7: "0",
              name8: "",
              name9: "",
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
              date: "42月",
              title: "",
              region: "武大高速",
              plan: "8458",
              finish: "709",
              rate: "8.4%",
              name: "",
              name1: "",
              name2: "",
              name3: "",
              name4: "",
              name5: "31.006",
              name6: "31.006",
              name7: "0",
              name8: "",
              name9: "",
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
              plan: "1455",
              finish: "1888",
              rate: "129.7%",
              name: "1424.226",
              name1: "1424.226",
              name2: "100%",
              name3: "",
              name4: "",
              name5: "3682.559",
              name6: "3682.559",
              name7: "0",
              name8: "",
              name9: "",
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
              name: "106.963",
              name1: "106.963",
              name2: "100%",
              name3: "",
              name4: "",
              name5: "3119.891",
              name6: "3119.891",
              name7: "0",
              name8: "",
              name9: "",
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
              zip: ""
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.echarts();
    });
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
  methods: {
    goBack() {
      this.$router.push({ path: "/" });
    },
    openDetails() {
      this.$router.push({ name: "TurnoverDetails" });
    },
    echarts() {
      var myChart = echarts.init(document.getElementById("map_l"));
      var data = [
        {
          name: "安九铁路",
          value: 7
        },
        {
          name: "江汉七桥",
          value: 6
        },
        {
          name: "中兰客专",
          value: 10
        },
        {
          name: "武嘉高速",
          value: 6
        }
      ];
      var geoCoordMap = {
        安九铁路: [115.886967, 29.99962],
        江汉七桥: [114.216574, 30.58901],
        中兰客专: [104.604889, 36.549597],
        武嘉高速: [114.162682, 30.172122]
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
              return val[2] / 1;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.turnover {
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