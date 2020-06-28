<template>
  <div class="human-new">
    <el-container style="clear: both">
      <el-header style="height: 8vh;padding: 2vh">
        <h1>人力资源管理</h1>
        <div class="weather">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-arrow-left"
            round
            @click="goBack"
            >返回主页面</el-button>
        </div>
      </el-header>
      <el-container class="container-top" style="height: 31vh;">
        <el-aside width="75%" style="padding-right: 10px;">
          <dv-border-box-10>
            <div
              class="echart-human-details"
              ref="humanDetails"
              style="height: 100%;"
            ></div>
          </dv-border-box-10>
        </el-aside>
        <el-aside width="25%" style="padding-left: 10px;">
          <dv-border-box-10>
            <div
              class="echart-salary-total"
              ref="salaryTotal"
              style="width: 100%;height: 100%;"
            ></div>
          </dv-border-box-10>
        </el-aside>
      </el-container>
      <el-container
        class="container-middle"
        style="height: 31vh;padding-top: 2vh;"
      >
        <dv-border-box-10>
          <div
            class="echart-excute-progress"
            ref="excuteProgress"
            style="height: 100%;"
          ></div>
        </dv-border-box-10>
      </el-container>
      <el-container
        class="container-bottom"
        style="height: 31vh;padding-top: 2vh;"
      >
        <el-aside width="50%" style="padding-right: 10px;">
          <dv-border-box-10>
            <div
              class="echart-group-structure"
              ref="groupStructure"
              style="height: 100%;"
            ></div>
          </dv-border-box-10>
        </el-aside>
        <el-aside width="50%" style="padding-left: 10px;">
          <dv-border-box-10>
            <div
              class="echart-certificate-reserve"
              ref="certificateReserve"
              style="height: 100%;"
            ></div>
          </dv-border-box-10>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import echarts from "echarts";
import groupStructure from "@/assets/js/groupStructureData";
export default {
  name: "HumanNew",
  data() {
    return {
      colors: ["#F38181", "#FCE38A", "#EAFFD0", "#95E1D3"],
    };
  },
  beforeCreate() {
    // const loading = this.$loading({
    //   lock: true,
    //   text: "页面加载中...",
    //   spinner: "el-icon-loading",
    //   background: "rgba(0, 0, 0, 1)",
    // });

    // setTimeout(() => {
    //   loading.close();
    // }, 2000);
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
    echarts() {
      this.drawHumanDetails();
      this.drawSalaryTotal();
      this.drawExcuteProgress();
      this.drawCertificateReserve();
      this.drawGruopStructure();
    },
    drawExcuteProgress() {
      const that = this;
      const excuteProgress = echarts.init(this.$refs.excuteProgress);
      const option = {
        title: {
          text: "各单位经费、产值执行情况",
          x: "20%",
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
            lineHeight: 24,
          },
        },
        tooltip: { trigger: 'axis' },
        legend: {
          x: '50%',
          y: '2%',
          textStyle: { color: 'rgba(255, 255, 255, .6)' },
          data: ["经费开累计划执行比", "开累产值计划完成比例"],
        },
        grid: { top: '16%', left: '3%', right: '4%', bottom: '0%', containLabel: true },
        xAxis: {
          type: 'category',
          boundaryGap: false, //坐标轴两边留白
          data: ['武嘉', '童庄河', '汉江七桥', '地铁八号线', '西三环', '靖远', '中兰', '三金潭', '滨湖路', '香溪', '青山', '威压', '军运会保障', '墨冰湖', '长丰桥', '远安', '三环线北段', '三化', '虎裕河', '建安街', '新武金堤路南段', '武汉至大桥全段'], // departments
          axisLabel: { //坐标轴刻度标签的相关设置。
            interval: 0,
            textStyle: {
              color: 'rgba(255, 255, 255, .6)',
              fontSize: 10,
            },
            rotate: -90,
            formatter: function(params) {
              const provider = 5; // most show charactars
              return params.length > provider ? `${params.substr(0, 5)}...` : params;
            },
          },
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, .2)' }},
        },
        yAxis: [{
          type: 'value',
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, .6)',
              fontSize: 12,
            }
          },
        }],
        series: [{
          name: '经费开累计划执行比',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: that.colors[0],
              lineStyle: {
                color: that.colors[0],
                width: 1
              },
            }
          },
          data: [120, 210, 112, 321, 320, 200, 100, 300, 150, 160, 170, 180, 190, 321, 320, 200, 100, 300, 150, 160, 170, 180,],
        },
        {
          name: '开累产值计划完成比例',
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: that.colors[3],
              lineStyle: {
                color: that.colors[3],
                width: 1
              },
            }
          },
          data: [130, 200, 110, 179, 200, 170, 180, 190, 200, 100, 300, 150, 200, 130, 200, 110, 179, 200, 170, 180, 190, 200,],
        }]
      };
      excuteProgress.setOption(option);
      this._addResizeListener(excuteProgress);
    },
    drawCertificateReserve() {
      const certificateReserve = echarts.init(this.$refs.certificateReserve);
      const option = {
        title: {
          text: "建造师证书及使用情况",
          x: "center",
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
            lineHeight: 32,
          },
          show: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "一类劳务人员",
            type: "bar",
            stack: "outside",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "实际人数",
            type: "bar",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "定聘人数",
            type: "bar",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "局聘",
            type: "bar",
            stack: "outside",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
        ],
      };
      certificateReserve.setOption(option);
      this._addResizeListener(certificateReserve);
    },
    drawSalaryTotal() {
      const salaryTotal = echarts.init(this.$refs.salaryTotal);
      // simulate salary total data
      const option = {
        title: {
          text: "工资总额年度预算执行情况",
          x: "center",
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
            lineHeight: 32,
          },
          show: true,
        },
        color: ["#2f89cf", "#0f63d6", "#0f8cd6", "#0fa0d6", "#0fb4d6"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        grid: {
          top: "10%",
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              {
                value: 78,
                name: "7800万65%",
              },
              { value: 42, name: "4200万35%" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      salaryTotal.setOption(option);
      this._addResizeListener(salaryTotal);
    },
    drawHumanDetails() {
      const elHumanDetails = this.$refs.humanDetails;
      const humanDetails = echarts.init(elHumanDetails);
      // simulate human details data
      const option = {
        title: {
          x: "center",
          text: "各单位人员情况",
          textStyle: {
            color: "#ffffff",
            fontSize: 14,
            lineHeight: 32,
          },
          show: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          x: "center",
          y: "bottom",
          data: ["一类劳务人员", "局聘", "实际人数", "定聘人数"],
          textStyle: { color: 'rgba(255, 255, 255, .6)', fontSize: 12 },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "18%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ['一公司', '二公司', '三公司', '四公司', '测绘公司', '机械设备公司'],
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
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: { color: 'rgba(255, 255, 255, .2)' },
            },
          },
        ],
        series: [
          {
            name: "一类劳务人员",
            type: "bar",
            stack: "outside",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "局聘",
            type: "bar",
            stack: "outside",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "实际人数",
            type: "bar",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "定聘人数",
            type: "bar",
            data: [220, 182, 191, 234, 290, 330, 310],
          }
        ],
      };
      humanDetails.setOption(option);
      this._addResizeListener(humanDetails);
    },
    drawGruopStructure() {
      const groupStructure = echarts.init(this.$refs.groupStructure);

      const struData = [
        {
          name: "中铁大桥局第七工程有限公司",
          children: [
            {
              name: "公司领导",
            },
            {
              name: "机关部门",
              children: [
                {
                  name: "工程管理部",
                  value: 3600,
                },
                {
                  name: "成本管理部",
                  value: 3600,
                },
                {
                  name: "物资管理部",
                  value: 2700,
                },
                {
                  name: "机械管理部",
                  value: 2700,
                },
                {
                  name: "安全质量环保监察部",
                  value: 2700,
                },
                {
                  name: "科技研发中心",
                  value: 2700,
                },
                {
                  name: "专家办公室",
                  value: 2700,
                },
              ],
            },
            {
              name: "武汉分公司",
              children: [
                {
                  name: "上幺教湖",
                  value: 800,
                },
                {
                  name: "三金潭",
                  value: 600,
                },
                {
                  name: "江北涉铁",
                  value: 600,
                },
                {
                  name: "长江主轴桥梁彩化亮化美化工程",
                  value: 600,
                },
                {
                  name: "军运会保障线路路面整治项目部",
                  value: 600,
                },
              ],
            },
          ],
        },
      ];
      const json = {
        series: [
          {
            type: "tree",
            data: struData,
            top: "10%",
            left: "20%",
            bottom: "10%",
            right: "20%",
            symbolSize: [250, 30],
            itemStyle: {
              color: "white",
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
            orient: "horizontal",
            symbol: "roundRect",
          },
        ],
      };

      const json1 = {
        tooltip: {
          //提示框组件
          trigger: "item", //触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
          triggerOn: "mousemove", //提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：
        },
        series: [
          //系列列表
          {
            type: "tree", //树形结构

            data: struData, //上面从flare.json中得到的数据

            top: "1%", //距离上
            left: "25%", //左
            bottom: "1%", //下
            right: "25%", //右的距离
            symbolSize: 7, //标记的大小，就是那个小圆圈，默认7
            label: {
              //每个节点所对应的标签的样式
              normal: {
                position: "left", //标签的位置
                verticalAlign: "middle", //文字垂直对齐方式，默认自动。可选：top，middle，bottom
                align: "right", //文字水平对齐方式，默认自动。可选：top，center，bottom
                fontSize: 12, //标签文字大小
                color: "white"
              },
            },

            leaves: {
              //叶子节点的特殊配置，如上面的树图示例中，叶子节点和非叶子节点的标签位置不同
              label: {
                normal: {
                  position: "right",
                  verticalAlign: "middle",
                  align: "left",
                  color: "white"
                },
              },
            },

            expandAndCollapse: true, //子树折叠和展开的交互，默认打开
            animationDuration: 550, //初始动画的时长，支持回调函数,默认1000
            animationDurationUpdate: 750,
          },
        ],
      };

      groupStructure.setOption(json1);
    },
    _addResizeListener(echartIns) {
      window.addEventListener("resize", () => {
        echartIns.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.human-new {
  height: 100vh;
  padding: 0 10px 20px 10px;
  .el-header {
    text-align: center;
    line-height: 32px;
    font-size: 24px;
    color: #63ecff;
  }
}
</style>
