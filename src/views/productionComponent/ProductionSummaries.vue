<template lang="html">
  <div class="production-summaries">
    <div class="chartContainerFather">
      <dv-border-box-10 class="chartContainer">
        <div class="chartTitle">公司总体施工情况</div>
        <div class="chartContent">
          <div class="chartContentSon" style="width: 55%;">
            <div class="chartTit"></div>
            <div class="chartCont" id="pieChart"></div>
          </div>
          <div class="chartContentSon" style="width: 45%;">
            <div class="chartTit">施工情况简报</div>
            <div class="chartCont">
              <dv-border-box-10
                class="chartContChild"
                style="margin-bottom:0.1rem"
              >
                <p>
                  公司在建项目总数<span class="sred">{{allCompany.data && (allCompany.data.constructionDigest.isBuilding !== '' ? allCompany.data.constructionDigest.isBuilding : 0)}}</span>个，自营项目<span
                    class="sred"
                    >{{allCompany.data && (allCompany.data.constructionDigest.selfSupport !== '' ? allCompany.data.constructionDigest.selfSupport : 0)}}</span
                  >个，联营项目<span class="sred">{{allCompany.data && (allCompany.data.constructionDigest.jointOperation !== '' ? allCompany.data.constructionDigest.jointOperation : 0)}}</span>个，其中：<span
                    class="sred"
                    >{{allCompany.data && (allCompany.data.constructionDigest.shutDown !== '' ? allCompany.data.constructionDigest.shutDown : 0)}}</span
                  >个停工项目，<span class="sred">{{allCompany.data && (allCompany.data.constructionDigest.newest !== '' ? allCompany.data.constructionDigest.newest : 0)}}</span>个新上项目。
                </p>
              </dv-border-box-10>
              <dv-border-box-10 class="chartContChild">
                <p>
                  <span>{{allCompany.data && (allCompany.data.constructionDigest.month ? allCompany.data.constructionDigest.month : this.month)}}</span>月对<span class="sred">{{allCompany.data && (allCompany.data.constructionDigest.planed !== '' ? allCompany.data.constructionDigest.planed : 0)}}个</span>项目下达计划，<span
                    class="sgreen"
                    >{{allCompany.data && (allCompany.data.constructionDigest.green !== '' ? allCompany.data.constructionDigest.green : 0)}}个项目</span
                  >为<span class="sgreen">绿色管理</span>项目，<span
                    class="syellow"
                    >{{allCompany.data && (allCompany.data.constructionDigest.yellow !== '' ? allCompany.data.constructionDigest.yellow : 0)}}个项目</span
                  >为<span class="syellow">黄色警示</span>项目，<span
                    class="sred"
                    >{{allCompany.data && (allCompany.data.constructionDigest.red !== '' ? allCompany.data.constructionDigest.red : 0)}}个项目</span
                  >为<span class="sred">红色警示</span>项目，<span
                    class="spurple"
                    >{{allCompany.data && (allCompany.data.constructionDigest.purple !== '' ? allCompany.data.constructionDigest.purple : 0)}}个项目</span
                  >无产值。
                </p>
              </dv-border-box-10>
            </div>
          </div>
        </div>
      </dv-border-box-10>
      <dv-border-box-10 class="chartContainer">
        <div class="chartTitle">自营</div>
        <div class="chartContent">
          <div class="chartContentSon triples">
            <div class="chartTit">产值情况（万元）</div>
            <div class="chartCont" id="barChart1"></div>
          </div>
          <div class="chartContentSon triples">
            <div class="chartTit">人均产值排名（万元）</div>
            <dv-capsule-chart :config="rjczConfig" class="chartCont" />
            <!-- <div class="chartCont" id="rowBarChart1"></div> -->
          </div>
          <div class="chartContentSon triples">
            <div class="chartTit">产值排名（万元）</div>
            <dv-capsule-chart :config="czConfig" class="chartCont"></dv-capsule-chart>
          </div>
        </div>
      </dv-border-box-10>
      <dv-border-box-10 class="chartContainer">
        <div class="chartTitle">联营</div>
        <div class="chartContent">
          <div class="chartContentSon triples">
            <div class="chartTit">产值情况（万元）</div>
            <div class="chartCont" id="barChart2"></div>
          </div>
          <div class="chartContentSon triples">
            <div class="chartTit">人均产值排名（万元）</div>
            <dv-capsule-chart :config="rjczConfig2" class="chartCont" />
            <!-- <div class="chartCont" id="rowBarChart2"></div> -->
          </div>
          <div class="chartContentSon triples">
            <div class="chartTit">产值排名（万元）</div>
            <dv-capsule-chart :config="czConfig2" class="chartCont"></dv-capsule-chart>
          </div>
        </div>
      </dv-border-box-10>
    </div>

    <div class="tableContainer">
      <dv-border-box-10 class="tableContainerSon">
        <div class="tableContainerSonTitle">
          工期滞后排名
        </div>
        <div class="scroll-wrap">
          <dv-scroll-board
            :config="config"
            class="tableContainerSonTable"
            @click="onTableClick"
          />  
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>

<script>
  import { productionNewApi  } from '@/api';
  import echarts from "echarts";
  export default {
    data() {
      return {
        pieOption: {
          pieData: []
        },
        arr: [],
        total: 0,
        forminline: {
          user: "",
          region: "",
        },
        DeptArr: [],
        config: {},
        czConfig: {},
        rjczConfig: {},
        czConfig2: {},
        rjczConfig2: {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        },
        allCompany: {},
        month: '',
        newZhb: [],
        zhb: [],
        lagList: [],
        jczConfig2: {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        },
        rjczConfig: {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        },
        seriesData: [
          {
            name: "计划",
            type: "bar",
            data: [],
            // stack: "使用情况",
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 12,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(54,169,206)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
          {
            name: "完成",
            type: "bar",
            data: [30911, 85897, 336029],
            // stack: "使用情况",
            barWidth: "30", //---柱形宽度
            barCategoryGap: "20%", //---柱形间距
            label: {
              //---图形上的文本标签
              show: true,
              position: "top", //---相对位置
              rotate: 0, //---旋转角度
              color: "#ffffff",
              fontSize: 12,
            },
            itemStyle: {
              //---图形形状
              color: "rgb(202,249,130)",
              barBorderRadius: [15, 15, 0, 0],
            },
          },
        ],
      };
    },
    created() {
    },
    activated() {
      this.initData()
      this.getLagList()
      this.selfSupport()
      this.joinSupport()
    },
    mounted() {
      this.$nextTick(() => {
        // const total = 195004 +38109+169481+231123+233597+450515
        // const pieOption = {
        //   pieData: [
        //     { value: 195004, name: "城轨分公司:195004万元（"+Number(195004/total*100).toFixed(2)+'%）' },
        //     { value: 38109, name:  "湖北分公司:38109万元（"+Number(38109/total*100).toFixed(2)+'%）' },
        //     { value: 169481, name: "华北分公司:169481万元（"+Number(169481/total*100).toFixed(2)+'%）' },
        //     { value: 231123, name: "武汉分公司:231123万元（"+Number(231123/total*100).toFixed(2)+'%）' },
        //     { value: 233597, name: "西北分公司:233597万元（"+Number(233597/total*100).toFixed(2)+'%）' },
        //     { value: 450515, name: "房建分公司:450515万元（"+Number(450515/total*100).toFixed(2)+'%）' },
        //   ],
        // };
        // this.drawPieChart("pieChart", pieOption.pieData,'片区公司产值情况');

        // const barChartLYOption = {
        //   xData: ["月度", "年度", "开累"],
        //   legendData: [
        //     {
        //       name: "计划",
        //     },
        //     {
        //       name: "完成",
        //     },
        //   ],
        //   seriesData: [
        //     {
        //       name: "计划",
        //       type: "bar",
        //       data: [50319, 401455, 878069],
        //       // stack: "使用情况",
        //       barWidth: "30", //---柱形宽度
        //       barCategoryGap: "20%", //---柱形间距
        //       label: {
        //         //---图形上的文本标签
        //         show: true,
        //         position: "top", //---相对位置
        //         rotate: 0, //---旋转角度
        //         color: "#ffffff",
        //         fontSize: 12,
        //       },
        //       itemStyle: {
        //         //---图形形状
        //         color: "rgb(54,169,206)",
        //         barBorderRadius: [15, 15, 0, 0],
        //       },
        //     },
        //     {
        //       name: "完成",
        //       type: "bar",
        //       data: [40059, 125792, 347374],
        //       // stack: "使用情况",
        //       barWidth: "30", //---柱形宽度
        //       barCategoryGap: "20%", //---柱形间距
        //       label: {
        //         //---图形上的文本标签
        //         show: true,
        //         position: "top", //---相对位置
        //         rotate: 0, //---旋转角度
        //         color: "#ffffff",
        //         fontSize: 12,
        //       },
        //       itemStyle: {
        //         //---图形形状
        //         color: "rgb(202,249,130)",
        //         barBorderRadius: [15, 15, 0, 0],
        //       },
        //     },
        //   ],
        // };
        // this.drawDoubleBarChart(
        //   "barChart1",
        //   barChartZYOption.xData,
        //   barChartZYOption.legendData,
        //   barChartZYOption.seriesData,
        //   "产值"
        // );

        // this.drawDoubleBarChart(
        //   "barChart2",
        //   barChartLYOption.xData,
        //   barChartLYOption.legendData,
        //   barChartLYOption.seriesData,
        //   "产值"
        // );

        const option1 = {
          yAxis: ["项目一", "项目二", "项目三", "项目四", "项目五", "项目六"],
          seriesData: [500, 600, 700, 800, 900, 1000],
        };

        // 人均产值排名，在项目名称前增加排序，数字为在所有自营或联营项目中进行排名(客户需求)
        

        this.czConfig = {
          data: [
            // {
            //   name: "1-武嘉高速",
            //   value: 11,
            // },
            // {
            //   name: "2-潇河大桥",
            //   value: 94,
            // },
            // {
            //   name: "3-左云十里河桥",
            //   value: 57,
            // },
            // {
            //   name: "14-七号线",
            //   value: 11,
            // },
            // {
            //   name: "15-太原节点改造",
            //   value: 0,
            // },
            // {
            //   name: "16-中北路停车场",
            //   value: 0,
            // },
          ],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "产值",
          showValue: true,
        };

        // 人均产值排名，在项目名称前增加排序，数字为在所有自营或联营项目中进行排名(客户需求)
        this.rjczConfig2 = {
          data: [
            // {
            //   name: "1-黄石宏维天地",
            //   value: 788,
            // },
            // {
            //   name: "2-奥山星城",
            //   value: 788,
            // },
            // {
            //   name: "3-十堰世纪山水一期",
            //   value: 788,
            // },
            // {
            //   name: "23-靖远黄河桥",
            //   value: 79,
            // },
            // {
            //   name: "24-G15沈海高速",
            //   value: 75,
            // },
            // {
            //   name: "25-郧县献珍路",
            //   value: 34,
            // },
          ],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        };

        // 产值排名，在项目名称前增加排序，数字为在所有自营或联营项目中进行排名(客户需求)
        this.czConfig2 = {
          data: [
        //     {
        //       name: "1-黄石宏维天地",
        //       value: 788,
        //     },
        //     {
        //       name: "2-奥山星城",
        //       value: 788,
        //     },
        //     {
        //       name: "3-十堰世纪山水一期",
        //       value: 788,
        //     },
        //     {
        //       name: "23-靖远黄河桥",
        //       value: 79,
        //     },
        //     {
        //       name: "24-G15沈海高速",
        //       value: 75,
        //     },
        //     {
        //       name: "25-郧县献珍路",
        //       value: 34,
        //     },
        //   ],
        //   colors: [
        //     "rgb(202,249,130)",
        //     "rgb(202,249,130)",
        //     "rgb(202,249,130)",
        //     "#e062ae",
        //     "#e062ae",
        //     "#e062ae",
        //   ],
        //   unit: "产值",
        //   showValue: true,
        // };

        // let zhb = [
        //   ["太原节点改造", "434.08%"],
        //   ["常青花园道路改造", "163.98%"],
        //   ["西安西三环", "99.05%"],
        //   ["左云十里河桥", "87.83%"],
        //   ["虎峪河道路改造", "55.61%"],
        //   ["建安街", "47.94%"],
        //   ["芳草路公园停车场", "32.30%"],
        //   ["江汉七桥", "25.45%"],
        //   ["靖远黄河桥", "24.71%"],
        //   ["十堰世纪山水一期", "17.78%"],
        //   ["南桥新城02-10地块", "13.83%"],
        //   ["童庄河", "12.54%"], 
        //   ["理工大学南校区基础设施维修", "2.71%"],
        //   ["奥山星城", "0.82%"],
        //   ["地铁八号线", "-0.25%"],
        //   ["汉中经开区基础设施", "-5.02%"],
        //   ["黄石宏维天地", "-19.71%"],
        //   ["奉贤区庄行镇", "-27.00%"],
        //   ["潇河大桥", "-27.09%"],
        //   ["武嘉高速", "-29.52%"],
        //   ["安九铁路", "-31.49%"],
        //   ["阳逻百瑞景", "-34.90%"],
        //   ["五里界中学", "-36.34%"],
        //   ["南桥新城15-04地块", "-50.27%"],
        //   ["郧县献珍路", "-52.62%"],
        //   ["恩施玺悦", "-53.27%"],
        //   ["中兰客专", "-54.38%"],
        //   ["美兰机场", "-58.86%"],
        //   ["世纪山水小区二期（十堰）", "-61.68%"],
        //   ["海口公交专用线", "-65.89%"],
        //   ["东峰路南延", "-66.46%"],
        //   ["西宁昆仑路", "-67.19%"],
        //   ["新征四路", "-68.13%"],
        //   ["中北路停车场", "-68.67%"],
        //   ["吉首天麓城", "-69.02%"],
        //   ["武大高速", "-71.62%"],
        //   ["新武金堤", "-77.66%"],
        //   ["汉中创智谷", "-80.11%"],
        //   ["神农架", "-80.28%"],
        //   ["汉中创智家园", "-80.37%"],
        //   ["G15沈海高速", "-80.69%"],
        //   ["七号线", "-86.17%"],
        //   ["宜昌世纪山水2区", "-87.93%"],
        // ];

        // const lateRateColors = ['#fb7293', '#ff9f7f', '#ffdb5c', '#9fe6b8',];
        // const lateRateValues = [30, 20, 10, 0];

        // const newZhb = this.zhb.map((item) => {
        //   const rate = Number(item[1].replace(/[\%|-]/g, ''));
        //   console.log(rate, '------')
        //   let color = '';
        //   for(let i = 0; i < lateRateValues.length; i += 1) {
        //     if(rate >= lateRateValues[i]) {
        //       color = lateRateColors[i];
        //       break;
        //     }
        //   }
        //   return [`<span style="color:${color};">${item[0]}</span>`, `<span style="color:${color};">${item[1]}</span>`];
          
        // });

        // this.config = {
        //   header: ["项目", "滞后比"],
        //   data: newZhb,
        //     index: true,
        //   indexHeader: "排名",
        //   columnWidth: [50],
        //   rowNum: 15,
        //   align: ["center"],
        // };
      });
    },
    methods: {
      getDeptNumName() {
        // request home api
        const _date = new Date();
        productionNewApi.fetchGetDeptNumNameData().then(res => {
          if(res && res.data.length > 0 && res.code === '000000') {
            res.data.forEach(item => {
              let obj = {
                name: item.selectName,
                value: item.deptCode
              }
              this.DeptArr.push(obj)
            })
          }
        })
      },
      // 联营
      async joinSupport() {
        const barChartZYOption = {
          xData: ["月度", "年度", "开累"],
          legendData: [
            {
              name: "计划",
            },
            {
              name: "完成",
            },
          ],
          seriesData: this.seriesData
        };
        const _date = new Date();
        let mm = _date.getMonth() < 10 ? `0${_date.getMonth()+1}` : _date.getMonth()+1;
        const res = await productionNewApi.fetchJoinSupportData(`${_date.getFullYear()}-${mm}`);
        this.seriesData.forEach(item => {
          item.data = []
          let data = [Number(res.data.proinfo.monthly.remained).toFixed(2), Number(res.data.proinfo.yearly.remained).toFixed(2), Number(res.data.proinfo.sofar.remained).toFixed(2)]
          let downData = [Number(res.data.proinfo.monthly.finished).toFixed(2), Number(res.data.proinfo.yearly.finished).toFixed(2), Number(res.data.proinfo.sofar.finished).toFixed(2)]
          if(item.name === '计划') {
            this.$set(item, 'data', data)
          }
          if(item.name === '完成') {
            this.$set(item, 'data', downData)
          }
        })
        this.drawDoubleBarChart(
          "barChart2",
          barChartZYOption.xData,
          barChartZYOption.legendData,
          barChartZYOption.seriesData,
          "产值"
        );
        let averagecost = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        }
        if (res && res.data.sixAverage && res.data.sixAverage.length > 0) {
          res.data.sixAverage.forEach((item, index) => {
            let obj = {
              name: item.deptname,
              value: item.cost === null ? 0 : item.cost
            }
            averagecost.data.push(obj)
          })
          this.rjczConfig2 = {...averagecost}
        }
        let sixTotal = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "产值",
          showValue: true,
        }
        if (res && res.data.sixTotal && res.data.sixTotal.length > 0) {
          res.data.sixTotal.forEach((item, index) => {
            let obj = {
              name: item.deptname,
              value: item.cost === null ? 0 : item.cost
            }
            sixTotal.data.push(obj)
          })
          this.czConfig2 = {...sixTotal}
        }
      },
      // 自营
      async selfSupport() {
        const barChartZYOption = {
          xData: ["月度", "年度", "开累"],
          legendData: [
            {
              name: "计划",
            },
            {
              name: "完成",
            },
          ],
          seriesData: this.seriesData
        };
        // request home api
        const _date = new Date();
        let mm = _date.getMonth() < 10 ? `0${_date.getMonth()+1}` : _date.getMonth()+1;
        const res = await productionNewApi .fetchSelfBusinessData(`${_date.getFullYear()}-${mm}`);
        //  产值赋值
        this.seriesData.forEach(item => {
          item.data = []
          let data = [Number(res.data.proinfo.monthly.remained).toFixed(2), Number(res.data.proinfo.yearly.remained).toFixed(2), Number(res.data.proinfo.sofar.remained).toFixed(2)]
          let downData = [Number(res.data.proinfo.monthly.finished).toFixed(2), Number(res.data.proinfo.yearly.finished).toFixed(2), Number(res.data.proinfo.sofar.finished).toFixed(2)]
          if(item.name === '计划') {
            this.$set(item, 'data', data)
          }
          if(item.name === '完成') {
            this.$set(item, 'data', downData)
          }
        })
        //  echarts重新渲染
        this.drawDoubleBarChart(
          "barChart1",
          barChartZYOption.xData,
          barChartZYOption.legendData,
          barChartZYOption.seriesData,
          "产值"
        );
        this.drawDoubleBarChart(
          "barChart2",
          barChartZYOption.xData,
          barChartZYOption.legendData,
          barChartZYOption.seriesData,
          "产值"
        );
        let averagecost = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "人均产值",
          showValue: true,
        }
        res.data.sixAverage.forEach((item, index) => {
          let obj = {
            name: item.deptname+index,
            value: item.cost === null ? 0 : item.cost
          }
          averagecost.data.push(obj)
        })
        this.rjczConfig = {...averagecost}
        let sixTotal = {
          data: [],
          colors: [
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "rgb(202,249,130)",
            "#e062ae",
            "#e062ae",
            "#e062ae",
          ],
          unit: "产值",
          showValue: true,
        }
        res.data.sixTotal.forEach((item, index) => {
          let obj = {
            name: item.deptname,
            value: item.cost === null ? 0 : item.cost
          }
          sixTotal.data.push(obj)
        })
        this.czConfig = {...sixTotal}
      },
      // 滞后list
      async getLagList() {
        // request home api
        const _date = new Date();
        this.month = _date.getMonth()+1;
        let mm = _date.getMonth() < 10 ? `0${_date.getMonth()+1}` : _date.getMonth()+1;
        let res = await productionNewApi  .fetchLagListData(`${_date.getFullYear()}-${mm}`);
        const lateRateColors = ['#fb7293', '#ff9f7f', '#ffdb5c', '#9fe6b8',];
        const lateRateValues = [30, 20, 10, 0];
        let zhb = []
        this.lagList = res.data
        if(res && res.data && res.data.length > 0) {
          res.data.forEach(item => {
            zhb.push([item.name, item.delayrate, item.id])
          })
        }
        const newZhb = zhb.map((item) => {
          const rate = Number(item[1].replace(/[\%|-]/g, ''));
          let color = '';
          for(let i = 0; i < lateRateValues.length; i += 1) {
            if(rate >= lateRateValues[i]) {
              color = lateRateColors[i];
              break;
            }
          }
          return [`<span style="color:${color};">${item[0]}</span>`, `<span style="color:${color};">${item[1]}%</span>`];
        });
        zhb.forEach((item) => {
          // const rate = Number(item[1].replace(/[\%|-]/g, ''));
          // let color = '';
          // for(let i = 0; i < lateRateValues.length; i += 1) {
          //   if(rate >= lateRateValues[i]) {
          //     color = lateRateColors[i];
          //     break;
          //   }
          // }
        });
        this.config = {
          header: ["项目", "滞后比"],
          data: newZhb,
          index: true,
          indexHeader: "排名",
          columnWidth: [50],
          rowNum: 15,
          align: ["center"],
        };
      },
      // 公司总体施工情况，片区+施工情况
      async initData() {
        this.pieOption.pieData = []
        // request home api
        const _date = new Date();
        this.month = _date.getMonth()+1;
        let mm = _date.getMonth() < 10 ? `0${_date.getMonth()+1}` : _date.getMonth()+1;
        this.getDeptNumName()
        this.allCompany = await productionNewApi .fetchProManData(`${_date.getFullYear()}-${mm}`);
        // this.total = this.arr.reduce((n,m) => n + m);
        Object.keys(this.allCompany.data.productionValue).forEach(item => {
          this.arr.push(Number(this.allCompany.data.productionValue[item]))
          this.total = this.arr.reduce((n,m) => n + m);
        })
        if(this.allCompany && this.allCompany.data && this.allCompany.data.productionValue) {
          Object.keys(this.allCompany.data.productionValue).forEach(item => {
            this.DeptArr.forEach(i => {
              if(i.value === item) {
                let str = 0
                if(this.total === 0 || Number(this.allCompany.data.productionValue[item] === 0)) {
                  str = 0
                } else {
                  str = ((this.allCompany.data.productionValue[item] / this.total) * 100).toFixed(2)
                  console.log(this.allCompany.data.productionValue[item], this.total)
                  
                }
                let obj = {
                  value: this.allCompany.data.productionValue[item],
                  name: `${i.name}:${this.allCompany.data.productionValue[item]}(${str}%)`
                }
                this.pieOption.pieData.push(obj)
                this.drawPieChart("pieChart", this.pieOption.pieData,'片区公司产值情况');
              } 
            })
          })
        }
        
      },
      onTableClick(row) {
        let id = ''
        this.lagList && this.lagList.length > 0 && this.lagList.forEach((item, index) => {
          if(row.rowIndex === index) {
            id = item.id,
            name = item.name
          }
        })
        this.$router.push({ 
          name: "DispatchNew",
          params: {
            id
          }
       });
      },
      drawPieChart(id, pieData,seriesName) {
        var myChart = echarts.init(document.getElementById(id));

        var option = {
          color: ["#2f89cf", "#0f63d6", "#0f8cd6", "#0fa0d6", "#0fb4d6","#0fc1d6"],
          tooltip: {
            trigger: "item",
            formatter: (params)=>{
              return seriesName+'<br>'+params.name.slice(0,5)+'：'+params.data.value+'万元（'+ params.percent+"%）"
            },
          },
          grid:{
            top:'50'
          },
          series: [
            {
              name:seriesName,
              type: "pie",
              radius: "65%",
              center: ["50%", "42%"],
              selectedMode: "single",
              data: pieData,
              label: {
                formatter: '{b}',
              },
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

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize", function() {
          myChart.resize();
        });
      },
      drawDoubleBarChart(id, xData, legendData, seriesData, yTitle) {
        var myChart = echarts.init(document.getElementById(id));
        var option = {
          tooltip: {
            trigger: "axis",
          },
          grid: {
            left: '20%',
            bottom: '15%',
          },
          legend: {
            type: "plain", //----图例类型，默认为'plain'，当图例很多时可使用'scroll'
            top: "1%", //----图例相对容器位置,top\bottom\left\right
            textStyle: {
              color: "#fff",
            },
            tooltip: {
              //图例提示框，默认不显示
              show: true,
              color: "red",
            },
            data: legendData,
          },
          xAxis: {
            data: xData,
            show: true, //---是否显示
            position: "bottom", //---x轴位置
            offset: 0, //---x轴相对于默认位置的偏移
            type: "category", //---轴类型，默认'category'
            name: "时间段", //---轴名称
            nameLocation: "end", //---轴名称相对位置
            nameTextStyle: {
              //---坐标轴名称样式
              color: "#fff",
              padding: [5, 0, 0, -5], //---坐标轴名称相对位置
            },
            nameGap: 15, //---坐标轴名称与轴线之间的距离
            //nameRotate:270,     //---坐标轴名字旋转

            axisLine: {
              //---坐标轴 轴线
              show: true, //---是否显示
              //------------------- 线 -------------------------
              lineStyle: {
                color: "#fff",
                width: 1,
                type: "solid",
              },
            },
            axisTick: {
              //---坐标轴 刻度
              show: false, //---是否显示
            },
            axisLabel: {
              //---坐标轴 标签
              show: true, //---是否显示
              inside: false, //---是否朝内
              rotate: 0, //---旋转角度
              margin: 5, //---刻度标签与轴线之间的距离
              //color:'red',        //---默认取轴线的颜色
            },
            splitLine: {
              //---grid 区域中的分隔线
              show: false, //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
              lineStyle: {
                //color:'red',
                //width:1,
                //type:'solid',
              },
            },
            splitArea: {
              //--网格区域
              show: false, //---是否显示，默认false
            },
          },
          yAxis: {
            show: true, //---是否显示
            position: "left", //---y轴位置
            offset: 0, //---y轴相对于默认位置的偏移
            type: "value", //---轴类型，默认'category'
            name: yTitle, //---轴名称
            nameLocation: "end", //---轴名称相对位置value
            nameTextStyle: {
              //---坐标轴名称样式
              color: "#fff",
              padding: [5, 0, 0, 5], //---坐标轴名称相对位置
            },
            nameGap: 15, //---坐标轴名称与轴线之间的距离
            //nameRotate:270,     //---坐标轴名字旋转

            axisLine: {
              //---坐标轴 轴线
              show: true, //---是否显示
              //------------------- 线 -------------------------
              lineStyle: {
                color: "#fff",
                width: 1,
                type: "solid",
              },
            },
            axisTick: {
              //---坐标轴 刻度
              show: false, //---是否显示
            },
            axisLabel: {
              //---坐标轴 标签
              show: true, //---是否显示
              inside: false, //---是否朝内
              rotate: 0, //---旋转角度
              margin: 8, //---刻度标签与轴线之间的距离
              //color:'red',        //---默认取轴线的颜色
            },
            splitLine: {
              //---grid 区域中的分隔线
              show: true, //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
              lineStyle: {
                color: "#666",
                width: 1,
                type: "dashed", //---类型
              },
            },
            splitArea: {
              //--网格区域
              show: false, //---是否显示，默认false
            },
          },
          series: seriesData,
        };
        myChart.setOption(option);
        // window.addEventListener("resize", function() {
        //   myChart.resize();
        // });
      },
      drawHorizontalBarChart(id, category, barData) {
        var myChart = echarts.init(document.getElementById(id));
        var option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            splitLine: { show: false },
            boundaryGap: ["5%", "5%"],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ffffff",
                width: 1,
                type: "solid",
              },
            },
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            type: "category",
            data: category,
            splitLine: { show: false },
            boundaryGap: ["5%", "5%"],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#ffffff",
                width: 1,
                type: "solid",
              },
            },
            axisTick: {
              show: false,
            },
            offset: 10,
            nameTextStyle: {
              fontSize: 15,
            },
          },
          series: [
            {
              name: "数量",
              type: "bar",
              data: barData,
              barWidth: 20,
              barGap: 10,
              smooth: true,
              label: {
                normal: {
                  show: true,
                  position: "right",
                  offset: [5, -2],
                  textStyle: {
                    color: "#ffffff",
                    fontSize: 13,
                  },
                },
              },
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7,
                },
                normal: {
                  barBorderRadius: 7,
                  color: function(params) {
                    var colorList = ["rgba(244,62,113,1)", "rgba(0,160,62,1)"];
                    if (params.dataIndex > 2) {
                      return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: colorList[1] },
                        { offset: 1, color: colorList[1] },
                      ]);
                    } else {
                      return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        { offset: 0, color: colorList[0] },
                        { offset: 1, color: colorList[0] },
                      ]);
                    }
                  },
                },
              },
            },
          ],
        };
        myChart.setOption(option);
      },
    }
  }
</script>

<style lang="scss">
.production-summaries {
  .table {
    margin: 0.4rem;
    margin-top: 0.6rem;
    border: rgba(0, 102, 153, 1) 1px solid;
    padding: 0.6rem;
    background-color: #0c2456 !important;
  }
  .chartContainerFather {
    width: 80%;
    float: left;
    padding: 0 0.1rem 0 0.1rem;
  }
  .tableContainer {
    width: 20%;
    float: right;
    padding: 0 0.1rem 0 0;
    .tableContainerSon {
      height: 9.35rem;
      .tableContainerSonTitle {
        padding: 0.2rem;
        color: #ffffff;
        font-size: 0.2rem;
        font-weight: bold;
      }
      .scroll-wrap {
        height: 8.6rem;
        .tableContainerSonTable {
          width: 90%;
          margin: 0 auto;
        }
      }
    }
  }
  .chartContainer {
    height: 3.05rem;
    margin-bottom: 0.1rem;
    .chartTitle {
      padding: 0.1rem;
      color: #ffffff;
      font-size: 0.2rem;
      font-weight: bold;
    }
    .chartContent {
      .chartContChild {
        height: 1.05rem;
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
      &.triples {
        width: 33%;
      }
      .chartTit {
        padding: 0.01rem;
        color: #ffffff;
        font-size: 0.15rem;
        font-weight: bold;
      }
      .chartCont {
        width: 100%;
        height: 2.3rem;
      }
    }
  }
}
</style>

<style lang="scss">
.dv-capsule-chart {
  .label-column {
    text-align: left;
  }
}
</style>