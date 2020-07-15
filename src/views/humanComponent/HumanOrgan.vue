<template>
  <div class="production">
    <!-- 内容区域 -->
    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartContentSon1">
          <div class="chartTit1">组织机构图</div>
          <div class="chartCont1" id="barChart1" ref="groupStructure"></div>
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import groupStructure from '@/assets/js/groupStructureData'
import { HumanNewApi } from '@/api'

export default {
  name: 'Production',
  data() {
    return {
      formInline: {
        user: '',
        region: '',
      },
    }
  },
  created() {
    this.$nextTick(() => {
      this.initData()
    })
  },

  methods: {
    goBack() {
      this.$router.push({ path: '/' })
    },
    goPro(projectId) {
      this.$router.push({ name: 'HumanDetailsNew', params: { projectId: projectId }})
    },
    async initData() {
      const res = await HumanNewApi.fetchGetEmpOrganizationData()
      if (res && res.code === '000000') {
        this.drawGruopStructure(res.data)
      }
    },
    drawGruopStructure(struData) {
      const groupStructure = echarts.init(this.$refs.groupStructure)
      const option = {
        tooltip: {
          //提示框组件
          trigger: 'item', //触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
          triggerOn: 'mousemove', //提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：
        },
        series: [
          //系列列表
          {
            type: 'tree', //树形结构
            data: struData, //上面从flare.json中得到的数据
            // change the link line from curvy to broken
            edgeShape: 'polyline',
            edgeForkPosition: '60%',
            top: 30,
            bottom: 180,
            left: '10%%', //左
            right: '10%%', //右的距离
            // change the tree orient from default 'horizontal' to 'vertical'
            orient: 'vertical',
            symbol: 'rect',
            symbolSize: 7, //标记的大小，就是那个小圆圈，默认7
            itemStyle: {
              borderWidth: 20,
              color: 'transparent',
              borderColor: 'transparent',
            },
            label: {
              //每个节点所对应的标签的样式
              normal: {
                position: 'top', //标签的位置
                verticalAlign: 'middle', //文字垂直对齐方式，默认自动。可选：top，middle，bottom
                align: 'center', //文字水平对齐方式，默认自动。可选：top，center，bottom
                fontSize: 16, //标签文字大小
                color: '#000',
                distance: -24,
                formatter: function(params) {
                  return params.name === struData[0].name
                    ? params.name
                    : params.name.split('').join('\n')
                },
                // color: "#000",
                padding: [6, 4],
                borderWidth: 1,
                borderColor: '#000',
                backgroundColor: '#fff',
              },
            },
            leaves: {
              //叶子节点的特殊配置，如上面的树图示例中，叶子节点和非叶子节点的标签位置不同
              label: {
                normal: {
                  position: 'bottom',
                  verticalAlign: 'top',
                  align: 'center',
                  color: '#000',
                },
              },
            },
            expandAndCollapse: true, //子树折叠和展开的交互，默认打开
            animationDuration: 550, //初始动画的时长，支持回调函数,默认1000
            animationDurationUpdate: 750,
          },
        ],
      }

      // 单个节点的点击事件
      const clickFun = (param) => {
        if (typeof param.seriesIndex == 'undefined') {
          return
        }
        
        if (param.type == 'click') {
          this.goPro(param.data.id)
        }
      }
      groupStructure.setOption(option)
      groupStructure.on('click', clickFun)

      window.addEventListener('resize', () => {
        groupStructure.resize()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.production {
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
  .demo-form-inline {
    text-align: left;
    margin: 0 0.2rem;
    margin-top: 0.4rem;
    background-color: rgba(15, 30, 75, 0.749019607843137);
  }
  .table {
    margin: 0.4rem;
    margin-top: 0.6rem;
    border: rgba(0, 102, 153, 1) 1px solid;
    padding: 0.6rem;
    background-color: #0c2456 !important;
  }
  .chartContainerFather {
    width: 100%;
    padding: 0 0.2rem 0 0.2rem;
  }
  .chartContainer {
    height: 8rem;
    margin-bottom: 0.1rem;
    .chartContentSon {
      width: 50%;
      height: 100%;
      float: left;
      .chartTit {
        padding: 0.15rem;
        color: #ffffff;
        font-size: 0.3rem;
        font-weight: bold;
      }
      .chartCont {
        width: 100%;
        height: 3.4rem;
      }
    }
    .chartContentSon1 {
      width: 100%;
      height: 100%;
      clear: both;
      .chartTit1 {
        padding: 0.15rem;
        color: #ffffff;
        font-size: 0.3rem;
        font-weight: bold;
      }
      .chartCont1 {
        width: 100%;
        height: 6.4rem;
      }
    }
  }
}
</style>
