<template>
<body class="home">
  <!-- <div class="canvas" style="opacity: .2">
    <iframe frameborder="0" src="js/index.html" style="width: 100%; height: 100%"></iframe>
  </div>-->
  <!-- <div class="loading" v-show="isShowLoad">
    <div class="loadbox">
      <img src="../assets/picture/loading.gif" /> 页面加载中...
    </div>
  </div>-->
  <div class="head">
    <h1>七公司宏观成本管理大数据</h1>
    <dv-decoration-5 class="header-svg"></dv-decoration-5>
    <div class="weather">
      <img src="../assets/picture/weather.png" />
      <span>多云转小雨</span>
      <span id="showTime">{{time}}</span>
    </div>
  </div>
  <div class="mainbox">
    <ul class="clearfix">
      <li>
        <dv-border-box-1 class="section-box">
          <div class="alltitle" @click="goRouter('ProductionNew')">
            生产管理
            <!-- <dv-decoration-3 style="margin:0 40%;width:20%;height:30px;" /> -->
          </div>

          <div class="sy" id="fb1"></div>
          <!-- <div class="content">
            <a class="block " :class="[judgeColor(monthConfig)]" href="">当月完成产值</a>
            <a class="block " :class="[judgeColor(yearConfig)]" href="">年累完成产值</a>
            <a class="block " :class="[judgeColor(startConfig)]" href="">开累完成产值</a>
            <dv-water-level-pond :config="monthConfig" class="sy"  />
            <dv-water-level-pond :config="yearConfig" class="sy"  />
            <dv-water-level-pond :config="startConfig" class="sy"  />
          </div>-->

          <div class="sy" id="fb2"></div>
          <div class="sy" id="fb3"></div>
          <!-- <div class="boxfoot"></div> -->
        </dv-border-box-1>
        <dv-border-box-1 class="section-box">
          <div class="alltitle" @click="goRouter('LabourServicesNew')">劳务管理</div>
          <div class="allnav" id="echart1"></div>
          <!-- <div class="boxfoot"></div> -->
        </dv-border-box-1>
        <dv-border-box-1 class="section-box">
          <div class="alltitle" @click="goRouter('TurnoverNew')">周转材料</div>
          <div class="allnav" id="echart2"></div>
          <!-- <div class="boxfoot"></div> -->
        </dv-border-box-1>
      </li>
      <li>
        <dv-border-box-8 class="bar">
          <div class="barbox" @click="goRouter('HumanNew')">
            <div class="alltitle" @click="goRouter('HumanNew')">人力资源管理</div>
            <ul class="clearfix">
              <li class="pulll_left counter">1035</li>
              <li class="pulll_left counter">649</li>
              <li class="pulll_left counter">386</li>
            </ul>
          </div>
          <div class="barbox2">
            <ul class="clearfix">
              <li class="pulll_left">员工总数</li>
              <li class="pulll_left">局聘员工</li>
              <li class="pulll_left">一类劳务人员</li>
            </ul>
          </div>
        </dv-border-box-8>
        <div class="map">
          <div class="map1">
            <img src="../assets/picture/lbx.png" />
          </div>
          <div class="map2">
            <img src="../assets/picture/jt.png" />
          </div>
          <div class="map3">
            <img src="../assets/picture/map.png" />
          </div>
          <div class="map4" id="map_1"></div>
          <div>
            <ul class="map-info">
              <li class="li">在建项目数：5</li>
              <li class="li">收尾项目数：2</li>
            </ul>
          </div>
        </div>

        <div id="box" v-show="isShow" @click="goRouter('Dispatch')">
          <span id="box-title" class="alltitle">项目总数17</span>
          <span id="box-content" class="box-content">项目1&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span id="box-content" class="box-content">完成50%</span>
          <br />
          <span id="box-content" class="box-content">项目2&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span id="box-content" class="box-content">完成50%</span>
          <br />
          <span id="box-content" class="box-content">项目3&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span id="box-content" class="box-content">完成50%</span>
        </div>
      </li>
      <li>
        <dv-border-box-1 class="section-box">
          <div class="alltitle" @click="goRouter('Finance')">财务预算管理</div>
          <div class="allnav" id="echart4"></div>
        </dv-border-box-1>
        <dv-border-box-1 class="section-box">
          <div class="alltitle" @click="goRouter('EquipmentNew')">设备管理</div>
          <!-- <div class="sbgl-content">
            <dv-active-ring-chart class="sb" :config="sbNumConfig" />
            <dv-active-ring-chart class="sb" :config="sbTypeConfig" />
          </div>-->
          <div class="sb" id="sb1"></div>
          <div class="sb" id="sb2"></div>
        </dv-border-box-1>
        <dv-border-box-1 class="section-box">
          <div class="alltitle" @click="goRouter('Engineering')">工程经济</div>
          <div class="allnav" id="echart6"></div>
        </dv-border-box-1>
      </li>
    </ul>
  </div>
  <div class="back"></div>
</body>
</template>

<script>
import "@/assets/js/echarts.min.js";
import "@/assets/js/china.js";
import echarts from "echarts";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      time: null,
      isShow: false,
      isShowLoad: false,
      greenColor: "#27d08a",
      yellowColor: "#EEE685",
      redColor: "#EE6A50",
      monthConfig: {
        data: [0],
        shape: "round"
      },
      yearConfig: {
        data: [0],
        shape: "round"
      },
      startConfig: {
        data: [0],
        shape: "round"
      },
      sbNumConfig: {
        data: [
          {
            name: "大型设备",
            value: 255
          },
          {
            name: "其他在场设备",
            value: 67
          }
        ],
        color: [],
        digitalFlopStyle: {
          fontSize: 16
        }
      },
      sbTypeConfig: {
        data: [
          {
            name: "在用",
            value: 98
          },
          {
            name: "空闲",
            value: 250
          }
        ],
        color: [],
        digitalFlopStyle: {
          fontSize: 16
        }
      }
    };
  },
  methods: {
    initData() {
      this.monthConfig.data[0] = 92.02;
      this.yearConfig.data[0] = 72.68;
      this.startConfig.data[0] = 32.54;
      this.judgeColor(this.monthConfig);
      this.judgeColor(this.yearConfig);
      this.judgeColor(this.startConfig);
      this.sbNumConfig.color = ["#27d08a", "#066eab"];
      this.sbTypeConfig.color = ["#2f89cf", "#0f63d6"];
    },
    judgeColor(config) {
      if (config.data[0] >= 90) {
        config.colors = [this.greenColor, this.greenColor];
        return "green";
      } else if (70 <= config.data[0]) {
        config.colors = [this.yellowColor, this.yellowColor];
        return "yellow";
      } else {
        config.colors = [this.redColor, this.redColor];
        return "red";
      }
    },
    goRouter(resName) {
      this.$router.push({ name: resName });
    },

    echarts() {
      var _this = this;
      var myChart = echarts.init(document.getElementById("map_1"));
      var mapName = "china";
      var data = [
        { name: "武汉分公司", value: 200 },
        { name: "宜昌分公司", value: 92 },
        { name: "华北分公司", value: 114 },
        { name: "城轨分公司", value: 109 }
      ];

      var geoCoordMap = {
        武汉分公司: [114.216574, 30.58901],
        宜昌分公司: [111.325897, 30.720298],
        华北分公司: [116.486482, 40.096652],
        城轨分公司: [101.836336, 36.583651]
      };
      var toolTipData = [
        {
          name: "武汉分公司",
          value: [
            { name: "文科", value: 12 },
            { name: "理科", value: 12 }
          ]
        },
        {
          name: "宜昌分公司",
          value: [
            { name: "文科", value: 47 },
            { name: "理科", value: 45 }
          ]
        },
        {
          name: "华北分公司",
          value: [
            { name: "文科", value: 57 },
            { name: "理科", value: 57 }
          ]
        },
        {
          name: "城轨分公司",
          value: [
            { name: "文科", value: 57 },
            { name: "理科", value: 52 }
          ]
        }
      ];

      /*获取地图数据*/
      myChart.showLoading();
      var mapFeatures = echarts.getMap(mapName).geoJson.features;
      myChart.hideLoading();
      mapFeatures.forEach(function(v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });

      var max = 480,
        min = 9; // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20;

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
        tooltip: {
          position: [0, -20,],
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: "#000",
            decoration: "none"
          },
          // position: function (point, params, dom, rect, size) {
          //   return [point[0], point[1]];
          // },
          formatter: function(params) {
            var tipHtml = "";
            tipHtml =
              '<div style="width:200px;height:120px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
              '<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">' +
              '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' +
              "</i>" +
              '<span style="margin-left:10px;color:#fff;font-size:16px;">' +
              params.name +
              "</span>" +
              "</div>" +
              '<div style="padding:10px;text-align:center;">' +
              '<p style="color:#fff;font-size:12px;">' +
              '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' +
              "</i>" +
              "项目1：" +
              '<span style="color:#f48225;margin:0 6px;">' +
              "30%" +
              "</span>" +
              "完成" +
              "</p>" +
              '<p style="color:#fff;font-size:12px;">' +
              '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' +
              "</i>" +
              "项目2：" +
              '<span style="color:#f4e925;margin:0 6px;">' +
              "50%" +
              "</span>" +
              "完成" +
              "</p>" +
              '<p style="color:#fff;font-size:12px;">' +
              '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' +
              "</i>" +
              "项目3：" +
              '<span style="color:#f4e925;margin:0 6px;">' +
              "50%" +
              "</span>" +
              "完成" +
              "</p>" +
              "</div>" +
              "</div>";
            // setTimeout(function() {
            //   tooltip(params.name);
            // }, 10);
            return tipHtml;
          }
        },
        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#023677",
              borderColor: "#1180c7"
            },
            emphasis: {
              areaColor: "#4499d0"
            }
          }
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#fff"
              }
            }
          },
          // {
          //   type: "map",
          //   map: mapName,
          //   geoIndex: 0,
          //   aspectScale: 0.75, //长宽比
          //   showLegendSymbol: false, // 存在legend时显示
          //   label: {
          //     normal: {
          //       show: true
          //     },
          //     emphasis: {
          //       show: false,
          //       textStyle: {
          //         color: "#fff"
          //       }
          //     }
          //   },
          //   roam: true,
          //   itemStyle: {
          //     normal: {
          //       areaColor: "#031525",
          //       borderColor: "#3B5077"
          //     },
          //     emphasis: {
          //       areaColor: "#2B91B7"
          //     }
          //   },
          //   animation: false,
          //   data: data
          // },
          {
            name: "点",
            type: "scatter",
            coordinateSystem: "geo",
            zlevel: 6
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data
                .sort(function(a, b) {
                  return b.value - a.value;
                })
                .slice(0, 10)
            ),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "left",
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "yellow",
                shadowBlur: 10,
                shadowColor: "yellow"
              }
            },
            zlevel: 1
          }
        ]
      };

      var index = 0; //播放所在下标
      var showTip = setInterval(function() {
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: index
        });
        index++;
        if (index >= option.series[0].data.length) {
          index = 0;
        }
      }, 2000);

      myChart.on("mouseover", function(params) {
        clearInterval(showTip);
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: params.dataIndex
        });
      });

      myChart.on("mouseout", function(params) {
        showTip && clearInterval(showTip);
        showTip = setInterval(function() {
          myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: index
          });
          index++;
          if (index >= option.series[0].data.length) {
            index = 0;
          }
        }, 2000);
      });

      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_1() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echart1"));

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#dddc6b"
            }
          }
        },
        legend: {
          data: [
            "在用劳务队伍数量（个）",
            "今年办理准入队伍数量（个）",
            "公司劳务队伍数量（个）"
          ],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          }
        },
        grid: {
          left: "20",
          top: "50",
          right: "30",
          bottom: "10",
          containLabel: true
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.2)"
              }
            },

            data: ["01", "02", "03", "04", "05", "06"]
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: "bottom",
            offset: 20
          }
        ],

        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)"
              }
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12
              }
            },

            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)"
              }
            }
          }
        ],
        series: [
          {
            name: "在用劳务队伍数量（个）",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                color: "#0184d5",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(1, 132, 213, 0.4)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(1, 132, 213, 0.1)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            },
            itemStyle: {
              normal: {
                color: "#0184d5",
                borderColor: "rgba(221, 220, 107, .1)",
                label: {
                  show: true
                },
                borderWidth: 12
              }
            },
            data: [50, 62, 88, 98, 98, 98, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "今年办理准入队伍数量（个）",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                color: "#00d887",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 216, 135, 0.4)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 216, 135, 0.1)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            },
            itemStyle: {
              normal: {
                color: "#00d887",
                borderColor: "rgba(221, 220, 107, 0.1)",
                borderWidth: 12,
                label: {
                  show: true
                }
              }
            },
            data: [12, 21, 26, 32, 32, 32, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "公司劳务队伍数量（个）",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                color: "#EE6A50",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(238,106,80, 0.4)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(238,106,80, 0.1)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(238,106,80, 0.1)"
              }
            },
            itemStyle: {
              normal: {
                color: "#EE6A50",
                borderColor: "rgba(238,106,80, 0.1)",
                borderWidth: 12,
                label: {
                  show: true
                }
              }
            },
            data: [12, 28, 35, 50, 60, 62, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echart2"));
      var option = (option = {
        color: ["#2f89cf", "#27d08a", "#e62d2d", "#0fa0d6", "#0fb4d6",],
        title: [
          {
            text: "A类利用率94%    B类利用率78%    C类利用率80%",
            x: "center",
            y: "bottom",
            textStyle: {
              color: "#fff",
              fontSize: "12"
            }
          },
          {
            text: '单位：吨',
            x: '80%',
            textStyle: { color: '#ffffff', fontSize: 12, fontWeight: 300, }
          }
        ],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          },
          data: ["闲置", "在用", "封存"]
        },
        grid: {
          top: '20%',
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          axisLabel: {
            //formatter: '{value} %'
            show: true,
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12"
            }
          },
          axisTick: { show: false },
          type: "category",
          data: ["C类", "B类", "A类", ]
        },
        series: [
          {
            name: "在用",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
              formatter: function(params) {
                return Number(params.data) > 0 ? params.data : '';
              },
            },
            data: [320, 302, 301]
          },
          {
            name: "闲置",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
              formatter: function(params) {
                return Number(params.data) > 0 ? params.data : '';
              },
            },
            data: [120, 132, 101],
          },
          {
            name: "封存",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight",
              formatter: function(params) {
                return Number(params.data) > 0 ? params.data : '';
              },
            },
            data: [0, 0, 220]
          }
        ]
      });

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_5() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("sb1"));
      var option = {
        title: [
          {
            text: "项目机械设备总体情况",
            x: "center",
            y: "top",
            textStyle: {
              color: "#27d08a",
              fontSize: "14"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          position: function(p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
          }
        },
        legend: {
          top: "75%",
          itemWidth: 10,
          itemHeight: 10,
          data: ["大型主要设备", "其他在场设备"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          }
        },
        series: [
          {
            name: "机械设备",
            type: "pie",
            center: ["50%", "42%"],
            radius: ["30%", "45%"],
            color: ["#fb3232", "#066eab"],
            label: { show: true },
            labelLine: { show: true },
            data: [
              { value: 255, name: "大型主要设备" },
              { value: 67, name: "其他在场设备" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} : {c}",
                  position: "inner"
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_51() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("sb2"));

      var option = {
        title: [
          {
            text: "自有机械设备使用情况",
            x: "center",
            y: "top",
            textStyle: {
              color: "#2f89cf",
              fontSize: "14"
            }
          }
        ],
        color: ["#27d08a", "#0f63d6", "#0f8cd6", "#0fa0d6", "#0fb4d6"],
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{b} : {c} ({d}%)"
        // },

        series: [
          {
            type: "pie",
            radius: "45%",
            center: ["50%", "42%"],
            selectedMode: "single",
            data: [
              {
                value: 98,
                name: "在用"
              },
              { value: 250, name: "空闲" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} : {c} ({d}%)",
                  position: "inner"
                },
                labelLine: { show: true }
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_4() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echart4"));

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#dddc6b"
            }
          }
        },
        legend: {
          top: "0%",
          data: [
            "营业收入（万元）",
            "营业利润（万元）",
            "两金余额（万元）",
            "货币存量（万元）"
          ],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "8"
          }
        },
        grid: {
          left: "20",
          top: "30",
          right: "30",
          bottom: "10",
          containLabel: true
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.2)"
              }
            },

            data: ["01", "02", "03", "04", "05", "06"]
          },
          {
            axisPointer: { show: false },
            axisLine: { show: false },
            position: "bottom",
            offset: 20
          }
        ],

        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)"
              }
            },
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12
              }
            },

            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)"
              }
            }
          }
        ],
        series: [
          {
            name: "营业收入（亿）",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                color: "#0184d5",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(1, 132, 213, 0.4)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(1, 132, 213, 0.1)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            },
            itemStyle: {
              normal: {
                color: "#0184d5",
                borderColor: "rgba(221, 220, 107, .1)",
                label: {
                  show: true
                },
                borderWidth: 12
              }
            },
            data: [73, 79, 116, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "营业利润（亿）",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                color: "#00d887",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 216, 135, 0.4)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 216, 135, 0.1)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            },
            itemStyle: {
              normal: {
                color: "#00d887",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
                label: {
                  show: true
                }
              }
            },
            data: [1, 1.5, 1, 1.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "两金余额（亿）",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
              normal: {
                color: "red",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(0, 216, 135, 0.4)"
                  },
                  {
                    offset: 0.8,
                    color: "rgba(0, 216, 135, 0.1)"
                  }
                ]),
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            },
            itemStyle: {
              normal: {
                color: "red",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12,
                label: {
                  show: true
                }
              }
            },
            data: [0, 0, 27, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "货币存量（亿）",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: "yellow",
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 216, 135, 0.4)"
                    },
                    {
                      offset: 0.8,
                      color: "rgba(0, 216, 135, 0.1)"
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            },
            itemStyle: {
              normal: {
                color: "yellow",
                borderColor: "rgba(221, 220, 107, .1)",
                borderWidth: 12
              }
            },
            data: [0, 0, -13, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_6() {
      // 基于准备好的dom，初始化echarts实例
      // 绘制左侧面
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
          w: 0
        },
        buildPath: function(ctx, shape) {
          // 会canvas的应该都能看得懂，shape是从custom传入的
          const xAxisPoint = shape.xAxisPoint;
          const c0 = [shape.x - shape.w, shape.y];
          const c1 = [shape.x - 13 - shape.w, shape.y - 13];
          const c2 = [xAxisPoint[0] - 13 - shape.w, xAxisPoint[1] - 13];
          const c3 = [xAxisPoint[0] - shape.w, xAxisPoint[1]];
          ctx
            .moveTo(c0[0], c0[1])
            .lineTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .closePath();
        }
      });
      // 绘制右侧面
      const CubeRight = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
          w: 0
        },
        buildPath: function(ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c1 = [shape.x - shape.w, shape.y];
          const c2 = [xAxisPoint[0] - shape.w, xAxisPoint[1]];
          const c3 = [xAxisPoint[0] - shape.w + 18, xAxisPoint[1] - 9];
          const c4 = [shape.x - shape.w + 18, shape.y - 9];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        }
      });
      // 绘制顶面
      const CubeTop = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
          w: 0
        },
        buildPath: function(ctx, shape) {
          const c1 = [shape.x - shape.w, shape.y];
          const c2 = [shape.x - shape.w + 18, shape.y - 9];
          const c3 = [shape.x - shape.w + 5, shape.y - 22];
          const c4 = [shape.x - shape.w - 13, shape.y - 13];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        }
      });
      // 注册三个面图形
      echarts.graphic.registerShape("CubeLeft", CubeLeft);
      echarts.graphic.registerShape("CubeRight", CubeRight);
      echarts.graphic.registerShape("CubeTop", CubeTop);

      const MAX = [300, 200];
      const VALUE = [200, 150];
      var myChart = echarts.init(document.getElementById("echart6"));

      var option = (option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(params, ticket, callback) {
            const item = params[0];
            const item1 = params[1];
            return item1.name + "<br/>计划：" + item.value + "<br/>完成：" + item1.value;
          }
        },
        xAxis: {
          type: "category",
          data: ["开累计价（亿元）", "年度变更索赔（亿元）"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.1)",
              width: 1,
              type: "solid"
            }
          },
          offset: 25,
          axisTick: {
            show: false,
            length: 9,
            alignWithLabel: true,
            lineStyle: {
              color: "#7DFFFD"
            }
          },
          axisLabel: {
            interval: 0,
            // rotate:50,
            show: true,
            splitNumber: 15,
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12"
            }
          }
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              //formatter: '{value} %'
              show: true,
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
              }
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)"
              }
            }
          }
        ],
        series: [
          {
            name: "计划",
            type: "custom",
            renderItem: function(params, api) {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      x: location[0],
                      y: location[1],
                      w: 25,
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: "rgba(47,102,192,.27)"
                    }
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      x: location[0],
                      y: location[1],
                      w: 25,
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: "rgba(59,128,226,.27)"
                    }
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      x: location[0],
                      y: location[1],
                      w: 25,
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: "rgba(72,156,221,.27)"
                    }
                  }
                ]
              };
            },
            data: MAX
          },
          {
            name: "完成",
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      w: -25,
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#3B80E2"
                        },
                        {
                          offset: 1,
                          color: "#49BEE5"
                        }
                      ])
                    }
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      w: -25,
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#3B80E2"
                        },
                        {
                          offset: 1,
                          color: "#49BEE5"
                        }
                      ])
                    }
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      w: -25,
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#3B80E2"
                        },
                        {
                          offset: 1,
                          color: "#49BEE5"
                        }
                      ])
                    }
                  }
                ]
              };
            },
            data: VALUE
          },
          {
            type: "bar",
            barWidth: 40,
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 16,
                color: "#fff",
                offset: [2, -25]
              }
            },
            itemStyle: {
              color: "transparent"
            },
            tooltip: {},
            data: MAX
          },
          {
            type: "bar",
            barWidth: 40,
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 16,
                color: "#fff",
                offset: [2, -25]
              }
            },
            itemStyle: {
              color: "transparent"
            },
            tooltip: {},
            data: VALUE
          }
        ]
      });

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_31() {
      const self = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("fb1"));
      var option = {
        title: [
          {
            text: "当月完成产值",
            left: "center",
            textStyle: {
              color: "#57D1C9",
              fontSize: "15"
            }
          },
          {
            text: "94.2%",
            top: "37%",
            left: "center",
            textStyle: {
              color: "#57D1C9",
              fontSize: "14"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          position: function(p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
          }
        },
        legend: {
          top: "70%",
          itemWidth: 10,
          itemHeight: 10,
          data: ["完成",],
          selectedMode: false, // disable symbol selected mode
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          },
          formatter: function(params) {
            return (params === '完成' ? `${params}:${self.$utils.currency(43126)}` : '');
          },
        },
        series: [
          {
            name: "当月完成产值",
            type: "pie",
            center: ["50%", "42%"],
            radius: ["40%", "60%"],
            color: ["#57D1C9", "#066eab"],
            label: { show: true },
            labelLine: { show: true },
            data: [
              { value: 43126, name: "完成" },
              { value: 2656, name: "剩余" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  formatter: function(params) {
                    if (params.name === "完成") {
                      return params.name + "：" + self.$utils.currency(params.data.value);
                    } else {
                      return "";
                    }
                  },
                  position: "inner"
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_32() {
      const self = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("fb2"));
      var option = {
        title: [
          {
            text: "年累完成产值",
            left: "center",
            textStyle: {
              color: "#FFE869",
              fontSize: "15"
            }
          },
          {
            text: "74.46%",
            top: "37%",
            left: "center",
            textStyle: {
              color: "#FFE869",
              fontSize: "14"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          position: function(p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
          }
        },
        legend: {
          top: "70%",
          itemWidth: 10,
          itemHeight: 10,
          data: ["完成",],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          },
          selectedMode: false,
          formatter: function(params) {
            return (params === '完成' ? `${params}:${self.$utils.currency(72075)}` : '');
          },
        },
        series: [
          {
            name: "年累产值完成比例",
            type: "pie",
            center: ["50%", "42%"],
            radius: ["40%", "60%"],
            color: ["#FFE869", "#066eab"],
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: 72075, name: "完成" },
              { value: 24721, name: "剩余" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  //"{b} : {c}",
                  formatter: function(params) {
                    if (params.name === "完成") {
                      return params.name + "：" + params.data.value;
                    } else {
                      return "";
                    }
                  },
                  position: "inner"
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_33() {
      const self = this;
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("fb3"));
      var option = {
        title: [
          {
            text: "开累完成产值",
            left: "center",
            textStyle: {
              color: "#EE6A50",
              fontSize: "15"
            }
          },
          {
            text: "39%",
            top: "37%",
            left: "center",
            textStyle: {
              color: "#EE6A50",
              fontSize: "14"
            }
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          position: function(p) {
            //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
          }
        },
        legend: {
          top: "70%",
          itemWidth: 10,
          itemHeight: 10,
          data: ["完成",],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          },
          selectedMode: false,
          formatter: function(params) {
            return (params === '完成' ? `${params}:${self.$utils.currency(333301)}` : '');            
          },
        },
        series: [
          {
            name: "开累完成产值比例",
            type: "pie",
            center: ["50%", "42%"],
            radius: ["40%", "60%"],
            color: [
              "#EE6A50",
              "#066eab",
              "#0682ab",
              "#0696ab",
              "#06a0ab",
              "#06b4ab",
              "#06c8ab",
              "#06dcab",
              "#06f0ab"
            ],
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: 333301, name: "完成" },
              { value: 520620, name: "剩余" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  formatter: function(params) {
                    if (params.name === "完成") {
                      return params.name + "：" + params.data.value;
                    } else {
                      return "";
                    }
                  },
                  position: "inner"
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    geTime() {
      var dt = new Date();
      var y = dt.getFullYear();
      var mt = dt.getMonth() + 1;
      var day = dt.getDate();
      var h = dt.getHours(); //获取时
      var m = dt.getMinutes(); //获取分
      var s = dt.getSeconds(); //获取秒
      this.time =
        y + "年" + mt + "月" + day + "-" + h + "时" + m + "分" + s + "秒";
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.echarts_1();
      this.echarts_2();
      this.echarts_4();
      this.echarts_31();
      this.echarts_32();
      this.echarts_33();
      this.echarts_5();
      this.echarts_51();
      this.echarts_6();
      this.echarts();
    });
  },
  created() {
    this.initData();
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)"
    });
    setTimeout(() => {
      loading.close();
    }, 2000);
    this.timerId = setInterval(() => {
      this.geTime();
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timerId);
  }
};
</script>

<style lang="css" >
@import "../assets/css/comon0.css";
</style>
<style lang="css" scoped >
.block {
  display: block;
}
.content {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 15px;
}
.content a {
  width: 30%;
  font-size: 15px;
  line-height: 40px;
  font-weight: 900;
}
.green {
  color: #27d08a;
}
.yellow {
  color: #eee685;
}
.red {
  color: #ee6a50;
}
.map-info {
  text-align: left;
  text-indent: 40px;
  color: white;
  font-size: 14px;
}
.map-info .li {
  line-height: 20px;
}

.header-svg {
  width: 50vw;
  height: 40px;
  margin: 0 25vw;
  position: absolute;
  top: 55px;
}
.section-box {
  height: 3.4rem;
  margin-bottom: 0.1rem;
}
.section-box .sy,
.allnav,
.sb {
  height: 2.65rem;
}
/* .section-box .sy{
  width: 1.5rem;
  height: 1.5rem;
} */
.boxall:before,
.boxall:after {
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  content: "";
  border-top: 2px solid #02a6b5;
  top: 0;
}

.boxall:before,
.boxfoot:before {
  border-left: 2px solid #02a6b5;
  left: 0;
}

.boxall:after,
.boxfoot:after {
  border-right: 2px solid #02a6b5;
  right: 0;
}
.dv-border-box-8.bar {
  height: 2.2rem;
}

.boxfoot:before,
.boxfoot:after {
  position: absolute;
  width: 0.1rem;
  height: 0.1rem;
  content: "";
  border-bottom: 2px solid #02a6b5;
  bottom: 0;
}
</style>

