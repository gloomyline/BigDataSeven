<template>
  <div class="dispatch">
    <div class="head">
      <h1>武嘉项目部生产明细</h1>
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack(false)"
          >返回</el-button
        >
      </div>
    </div>
    
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">项目简介</span>
      </p>
      <div class="chartContent">
          <div class="chartContentSon">
            <img style="max-height:100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593346438644&di=53dc449845b342b41a056b0ea9a95485&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1410%2F20%2Fc1%2F39878059_39878059_1413773506307.jpg" class="image">
          </div>
          <div class="chartContentSon">
            <img style="max-height:100%" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593346438644&di=53dc449845b342b41a056b0ea9a95485&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1410%2F20%2Fc1%2F39878059_39878059_1413773506307.jpg" class="image">
          </div>
        </div>

    </div>

    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">计划完成情况</span>
      </p>

      <div class="chartBox">
        <div class="sy" id="fb1"></div>
        <div class="sy" id="fb2"></div>
        <div class="sy" id="fb3"></div>
      </div>
      <div class="boxfoot"></div>
    </div>
    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">项目施组及专项方案评审情况</span>
      </p>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="施组及专项方案名称"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="region"
          label="审批状态"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="附件"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="计划评审时间"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="date"
          label="评审时间"
          min-width="150"
        ></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import btnList from "@/components/BtnList.vue";

export default {
  components: {
    btnList,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          title: "西南片区",
          region: "安九铁路",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          title: "西南片区",
          region: "安九铁路",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          title: "西南片区",
          region: "安九铁路",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          title: "西南片区",
          region: "安九铁路",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.echarts_31();
      this.echarts_32();
      this.echarts_33();
    });
  },
  beforeCreate() {
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
  methods: {
    goBack(res) {
      if (res) {
        this.$router.push({ path: "/" });
      } else {
        this.$router.go(-1);
      }
    },
    echarts_31() {
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
          top: "85%",
          itemWidth: 10,
          itemHeight: 10,
          data: ["完成", "剩余"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          }
        },
        series: [
          {
            name: "当月完成产值",
            type: "pie",
            center: ["50%", "50%"],
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
                  show: true,
                  //"{b} : {c}",
                  formatter: function(params) {
                    console.log("params");
                    console.log(params);
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
    echarts_32() {
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
          top: "85%",
          itemWidth: 10,
          itemHeight: 10,
          data: ["完成", "剩余"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          }
        },
        series: [
          {
            name: "年累产值完成比例",
            type: "pie",
            center: ["50%", "50%"],
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
                  show: true,
                  //"{b} : {c}",
                  formatter: function(params) {
                    console.log("params");
                    console.log(params);
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
          top: "85%",
          itemWidth: 10,
          itemHeight: 10,
          data: ["完成", "剩余"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          }
        },
        series: [
          {
            name: "开累完成产值比例",
            type: "pie",
            center: ["50%", "50%"],
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
                  show: true,
                  formatter: function(params) {
                    console.log("params");
                    console.log(params);
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
  },
};
</script>

<style lang="scss" scoped>
.white{

  margin-bottom: 30px;
  h1{
    font-size: 30px;
  }
  p{
    font-size: 18px;
    text-align: left;
    text-indent: 25px;
    line-height: 25p;
  }
}
.dispatch {
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
  .img-box {
    width: 92%;
    min-width: 1000px;
    margin: 0 auto;
    .img {
      width: 100%;
      height: 100%;
      min-height: 360px;
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
    .chartBox {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      width: 100%;
      .sy {
        height: 2.65rem;
      }
    }
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
    .chartContent {
      height: 3.2rem;
      .chartContChild {
        height: 1.3rem;
        // line-height: 1.2rem;
        width: 90%;
        margin: 0 auto;
        font-size: 0.2rem;
        font-weight: bold;
        color: #ffffff;
        p {
          padding: 0.2rem;
          padding-top: 0.35rem;
          span.sred {
            // font-size: 0.3rem;
            color: red;
          }
          span.sgreen {
            // font-size: 0.3rem;
            color: green;
          }
          span.syellow {
            // font-size: 0.3rem;
            color: yellow;
          }
          span.spurple {
            // font-size: 0.3rem;
            color: purple;
          }
        }
      }
    }
    .chartContentSon {
      width: 50%;
      height: 100%;
      float: left;
      .chartTit {
        padding: 0.1rem;
        color: #ffffff;
        font-size: 0.15rem;
        font-weight: bold;
      }
      .chartCont {
        width: 100%;
        height: 2.8rem;
      }
    }
  }
}
// .boxall{

// }
</style>
