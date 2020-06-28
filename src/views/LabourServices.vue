<template>
  <div class="labourServices">
    <div class="head">
      <h1>劳务管理</h1>
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
        <span class="tilte">劳务队伍使用数量</span>
      </p>
      <el-table :data="tableData" border class="e-table" @row-click="openDetails">
        <el-table-column type="index" label="序号" width="150"></el-table-column>
        <el-table-column prop="date" label="劳务企业名称"></el-table-column>
        <el-table-column prop="name" label="在建项目使用数量"></el-table-column>
        <el-table-column prop="address" label="使用项目"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import "@/assets/js/china.js";
import echarts from "echarts";
export default {
  name: "LabourServices",
  data() {
    return {
      tableData: [
        {
          date: "桐城市顺康工程劳务有限公司",
          name: "1",
          address: "安九铁路"
        },
        {
          date: "武汉旭鑫源建筑劳务有限公司",
          name: "1",
          address: "安九铁路"
        },
        {
          date: "中铁大桥局集团有限公司基础工程分公司",
          name: "1",
          address: "安九铁路"
        },
        {
          date: "武汉乐成建设工程有限公司",
          name: "1",
          address: "安九铁路"
        },
        {
          date: "鄂州市通达建筑劳务有限公司",
          name: "1",
          address: "安九铁路"
        },
        {
          date: "中煤特殊凿井有限责任公司",
          name: "1",
          address: "安九铁路"
        },
        {
          date: "福建青云建设发展有限公司",
          name: "1",
          address: "安九铁路"
        },
        {
          date: "湖北恒业建筑有限公司",
          name: "1",
          address: "江汉七桥"
        },
        {
          date: "南昌吉锋建筑工程有限公司",
          name: "1",
          address: "江汉七桥"
        },
        {
          date: "湖北同力兄弟建设工程有限公司",
          name: "1",
          address: "江汉七桥"
        },
        {
          date: "中南旗胜建设有限公司",
          name: "1",
          address: "江汉七桥"
        },
        {
          date: "武汉驰建建筑工程有限公司",
          name: "1",
          address: "江汉七桥"
        },
        {
          date: "崇阳天城建筑工程公司",
          name: "1",
          address: "江汉七桥"
        },
        {
          date: "甘肃德隆劳务有限公司",
          name: "1",
          address: "中兰客专项目部"
        },
        {
          date: "甘肃金隆宜路桥建设（集团）有限公司",
          name: "1",
          address: "中兰客专项目部"
        },
        {
          date: "湖北华伟建设工程有限公司",
          name: "1",
          address: "中兰客专项目部"
        },
        {
          date: "武汉联盟建工集团有限公司",
          name: "1",
          address: "中兰客专项目部"
        },
        {
          date: "四川省岳池华涛建筑劳务有限公司",
          name: "1",
          address: "中兰客专项目部"
        },
        {
          date: "陇南信达工程有限公司",
          name: "1",
          address: "中兰客专项目部"
        },
        {
          date: "山西群利建筑劳务有限公司",
          name: "1",
          address: "中兰客专项目部"
        },
        {
          date: "献县鑫锐达新型建材有限公司",
          name: "1",
          address: "中兰客专项目部"
        },
        {
          date: "武汉市云峰市政工程有限公司",
          name: "1",
          address: "中兰客专项目部"
        },
        {
          date: "荆州市国泰路桥建筑劳务有限公司",
          name: "1",
          address: "武嘉高速"
        },
        {
          date: "湖北武桥岩土工程有限公司",
          name: "1",
          address: "武嘉高速"
        },
        {
          date: "武汉义强建筑劳务有限公司",
          name: "1",
          address: "武嘉高速"
        },
        {
          date: "武汉仁信恩劳务工程有限公司",
          name: "1",
          address: "武嘉高速"
        },
        {
          date: "武汉市福柒鑫建筑工程有限公司",
          name: "1",
          address: "武嘉高速"
        },
        {
          date: "湖北益通建设股份有限公司",
          name: "1",
          address: "武嘉高速"
        }
      ]
    };
  },
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0,1)"
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
      this.$router.push({ name: "LabourServicesDetails" });
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
.labourServices {
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
      width: 80%;
      min-width: 800px;
      margin: 0 auto;
    }
  }
}
</style>