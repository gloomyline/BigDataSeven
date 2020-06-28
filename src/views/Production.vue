<template>
  <div class="production">
    <div class="head">
      <h1>生产管理</h1>
      <!-- <div class="weather">
        <img src="../assets/picture/weather.png" />
        <span>多云转小雨</span>
        <span id="showTime">{{time}}</span>
      </div>-->
    </div>
    <!-- 操作搜索区域 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label>
        <el-input v-model="formInline.user" placeholder="项目"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-arrow-left" @click="goBack">返回主页面</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <!-- <div class="table boxall"> -->
    <div class="table boxall">
      <el-table
        @row-click="openDetails"
        :data="tableData"
        border
        :span-method="arraySpanMethod"
        style="width: 100%;"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <!-- <el-table-column prop="title" label="项目类别"></el-table-column> -->
        <el-table-column prop="name" label="序号" min-width="100"></el-table-column>
        <el-table-column prop="name1" label="工程项目名称"></el-table-column>
        <el-table-column prop="name2" label="建设年限" min-width="130"></el-table-column>
        <el-table-column prop="value1" label="合同价"></el-table-column>
        <el-table-column prop="value2" label="施工产值"></el-table-column>
        <el-table-column prop="value3" label="暂定金"></el-table-column>
        <el-table-column label="5月份">
          <el-table-column prop="value4" label="下达计划"></el-table-column>
          <el-table-column prop="value5" label="完成"></el-table-column>
          <el-table-column prop="value6" label="人均产值"></el-table-column>
          <el-table-column prop="value7" label="人数"></el-table-column>
          <el-table-column prop="value8" label="人均产值占比%"></el-table-column>
          <el-table-column prop="value9" label="人均产值排位"></el-table-column>
          <el-table-column prop="value10" label="完成比例"></el-table-column>
          <el-table-column prop="value11" label="项目类"></el-table-column>
        </el-table-column>
        <el-table-column label="开累">
          <el-table-column prop="value12" label="上期开累完成"></el-table-column>
          <el-table-column prop="value13" label="完成"></el-table-column>
          <el-table-column prop="value14" label="完成比例"></el-table-column>
        </el-table-column>
        <el-table-column label="2020年度">
          <el-table-column prop="value15" label="年度计划暂定"></el-table-column>
          <el-table-column prop="value17" label="上期年累完成"></el-table-column>
          <el-table-column prop="value18" label="完成"></el-table-column>
          <el-table-column prop="value19" label="完成比例"></el-table-column>
        </el-table-column>
        <el-table-column prop="value20" label="年度计划分月产值"></el-table-column>
        <el-table-column prop="value21" label="6月份下达计划"></el-table-column>
        <el-table-column prop="value22" label="2020年6月份主要形象进度" min-width="500"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Production",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          id: "1",
          title: "总计",
          name: "总计",
          name1: "902821",
          name2: "853921",
          value1: "4758",
          value2: "39782",
          value3: "33126",
          value4: "62",
          value5: "531",
          value6: "",
          value7: "",
          value8: "83.3%",
          value9: "",
          value10: "300175",
          value11: "333301",
          value12: "39%",
          value13: "346796",
          value14: "38949",
          value15: "72075",
          value17: "21%",
          value18: "43565",
          value19: "43682",
          value20: "",
          value21: ""
        },
        {
          id: "3",
          title: "自营在建汇总",
          name: "自营在建汇总",
          name1: "642363",
          name2: "593463",
          value1: "4758",
          value2: "24695",
          value3: "21189",
          value4: "49",
          value5: "429",
          value6: "",
          value7: "",
          value8: "85.8%",
          value9: "",
          value10: "217557",
          value11: "238746",
          value12: "40%",
          value13: "217172",
          value14: "26452",
          value15: "47641",
          value17: "22%",
          value18: "28488",
          value19: "28488",
          value20: "",
          value21: "",

          children: [
            {
              title: "自营在建",
              id: 31,
              name: "1",
              name1: "童庄河",
              name2: "2018.05.06-2019.06.08",
              value1: "23853",
              value2: "21695",
              value3: "2158",
              value4: "679",
              value5: "644",
              value6: "32",
              value7: "20",
              value8: "51.6%",
              value9: "8",
              value10: "94.8%",
              value11: "A",
              value12: "18273",
              value13: "18917",
              value14: "87%",
              value15: "5503",
              value17: "1116",
              value18: "1760",
              value19: "32%",
              value20: "607",
              value21: "607",
              value22:
                "桥涵：3#墩主梁7#块、8#块、9#块浇筑完成，斜拉索挂设6对；4#主梁8#块、9#块、10#块浇筑完成，斜拉索挂设6对；5#-6#边主梁浇筑完成；左岸接线：左岸路基挡墙浇筑590m³；左岸路基四级边坡喷锚1500㎡。左岸弃土场箱涵浇筑12m."
            },
            {
              id: 32,
              title: "自营在建",
              date: "2016-05-01",
              name: "2",
              name1: "安九铁路",
              name2: "2018.07.10-2019.11.08",
              value1: "133046",
              value2: "133046",
              value3: "0",
              value4: "2627",
              value5: "2968",
              value6: "28",
              value7: "107",
              value8: "44.5%",
              value9: "10",
              value10: "113.0%",
              value11: "A",
              value12: "66090",
              value13: "69058",
              value14: "52%",
              value15: "42178",
              value17: "5049",
              value18: "8017",
              value19: "19%",
              value20: "4394",
              value21: "4394",
              value22: "7#墩钢箱梁施工。"
            },
            {
              id: 33,
              title: "自营在建",
              name: "3",
              name1: "江汉七桥",
              name2: "2017.04-2020.07",
              value1: "128734",
              value2: "84592",
              value3: "0",
              value4: "2999",
              value5: "2764",
              value6: "44",
              value7: "63",
              value8: "70.3%",
              value9: "4",
              value10: "92.2%",
              value11: "A",
              value12: "58938",
              value13: "61702",
              value14: "73%",
              value15: "27805",
              value17: "4994",
              value18: "7758",
              value19: "28%",
              value20: "2915",
              value21: "2915",
              value22:
                "Ⅰ号出入口：热力割接，完成顶板回填1000方；完成内部结构楼梯及夹层板施工50%。Ⅱ号出入口：顶板回填1500方，完成风亭处围护桩拆除，完成第一、二段站内楼梯及夹层板施工；Ⅲ号出入口：剩余顶板回填1522方，完成围挡拆除及场地移交。Ⅳ号出入口：剩余第三道砼支撑和围檩施工，完成基坑土方开挖见底12000方，完成三段底板和底板防水保护层施工，两段中板及侧墙浇筑施工。"
            },
            {
              id: 34,
              title: "自营在建",
              name: "4",
              name1: "潇河大桥",
              name2: "2020.03.01-2021.05.01",
              value1: "79966",
              value2: "79966",
              value3: "0",
              value4: "7492",
              value5: "8201",
              value6: "107",
              value7: "77",
              value8: "170.7%",
              value9: "1",
              value10: "109.5%",
              value11: "A",
              value12: "52641",
              value13: "60842",
              value14: "76%",
              value15: "36442",
              value17: "9117",
              value18: "17318",
              value19: "48%",
              value20: "7610",
              value21: "7610",
              value22:
                "Ⅰ号出入口：热力割接，完成顶板回填1000方；完成内部结构楼梯及夹层板施工50%。Ⅱ号出入口：顶板回填1500方，完成风亭处围护桩拆除，完成第一、二段站内楼梯及夹层板施工；Ⅲ号出入口：剩余顶板回填1522方，完成围挡拆除及场地移交。Ⅳ号出入口：剩余第三道砼支撑和围檩施工，完成基坑土方开挖见底12"
            },
            {
              id: 35,
              title: "自营在建",
              name: "5",
              name1: "武嘉高速",
              name2: "2017.10-2021.10",
              value1: "53364",
              value2: "50764",
              value3: "2600",
              value4: "4164",
              value5: "3939",
              value6: "79",
              value7: "50",
              value8: "126.3%",
              value9: "2",
              value10: "94.6%",
              value11: "A",
              value12: "13850",
              value13: "17789",
              value14: "35%",
              value15: "40708",
              value17: "3794",
              value18: "7733",
              value19: "19%",
              value20: "6016",
              value21: "6016",
              value22:
                "N10#墩身2节，N12#墩身3节。N13#墩身3节。14#墩身3节，N16#墩身1节。N15#墩围堰封底。N17#墩上塔柱2节。N18#墩墩身3节。N20-N21#墩预留线简支梁，N2-N3#墩预留线简支梁，N8-N9#墩预留线简支梁，N4-N5#墩预留线简支梁。N24#墩身2节。N21-N24#墩0号块1个，2号块2个，3号块2个。"
            },
            {
              id: 36,
              title: "自营在建",
              name: "6",
              name1: "武大高速",
              name2: "2017.11.01-2020.09.30",
              value1: "223400",
              value2: "223400",
              value3: "0",
              value4: "6734",
              value5: "2673",
              value6: "24",
              value7: "112",
              value8: "38.3%",
              value9: "11",
              value10: "39.7%",
              value11: "C",
              value12: "7765",
              value13: "10438",
              value14: "5%",
              value15: "64536",
              value17: "2382",
              value18: "5055",
              value19: "8%",
              value20: "6946",
              value21: "6946",
              value22:
                "钢桁拱制作完成981吨（累计2.7631万吨）；钢桁拱架设完成2325吨（累计1.3702万吨）；吊索塔架安装完成26%（累计31%）；汉口侧拱上吊机安装完成70%；边跨拼装支架拆除30%（累计30%）；汉口侧2台塔吊安装完成；北引桥排水工程完成10%（累计60%）"
            }
          ]
        },
        {
          id: "4",
          title: "联营在建汇总",
          name: "联营在建汇总",
          name1: "38105",
          name2: "38105",
          value1: "0",
          value2: "0",
          value3: "0",
          value4: "0",
          value5: "4",
          value6: "0.0%",
          value7: "12",
          value8: "394.0%",
          value9: "A",
          value10: "3141",
          value11: "3141",
          value12: "8%",
          value13: "9000",
          value14: "0",
          value15: "0",
          value17: "0%",
          value18: "0",
          value19: "0",
          value20: "停工。",
          children: [
            {
              title: "自营在建",
              id: 41,
              name: "7",
              name1: "中南客专",
              name2: "2018.12.29-2019.12.31",
              value1: "13400",
              value2: "12521",
              value3: "879",
              value4: "700",
              value5: "631",
              value6: "21",
              value7: "30",
              value8: "36.3%",
              value9: "7",
              value10: "90.2%",
              value11: "A",
              value12: "9042",
              value13: "9673",
              value14: "77%",
              value15: "4806",
              value17: "447",
              value18: "1078",
              value19: "22%",
              value20: "1134",
              value21: "1198",
              value22:
                "排水工程：雨水管344.50m；雨水井38座；挡墙工程：混凝土墙身及基础1875.16m³；挡墙钢筋40.21t；电力工程：电力排管261.46m；电缆排管直通井1座，箱变1座；桥梁工程：混凝土垫层及承台桥台135.07m³；现浇构件钢筋83.93t；通道工程：通道砼1979.38m³；现浇构件钢筋513.28t；通道卷材防水1163.06m²"
            },
            {
              title: "自营在建",
              id: 42,
              name: "8",
              name1: "西宁昆仑路",
              name2: "2018.3.15-2019.5.9",
              value1: "16882",
              value2: "16882",
              value3: "0",
              value4: "291",
              value5: "287",
              value6: "22",
              value7: "13",
              value8: "38.0%",
              value9: "6",
              value10: "98.5%",
              value11: "A",
              value12: "14752",
              value13: "15039",
              value14: "89%",
              value15: "2287",
              value17: "157",
              value18: "444",
              value19: "19%",
              value20: "563",
              value21: "676",
              value22:
                "ES第一联1-2#跨剩余钢梁箱架设；东西主线桥第三联钢箱梁架设。"
            },
            {
              id: 43,
              title: "自营在建",
              date: "2016-05-01",
              name: "9",
              name1: "G15深海高速",
              name2: "2019.06.01-2020.11.21",
              value1: "79966",
              value2: "79966",
              value3: "0",
              value4: "4996",
              value5: "5262",
              value6: "64",
              value7: "82",
              value8: "110.6%",
              value9: "2",
              value10: "105.3%",
              value11: "A",
              value12: "47379",
              value13: "52641",
              value14: "66%",
              value15: "36442",
              value17: "3855",
              value18: "9117",
              value19: "25%",
              value20: "7492",
              value21: "7492",
              value22:
                "主桥：钢梁安装453.7吨，拱脚安装1376吨，钢拱安装1548.5吨；引桥及匝道：盖梁7座，钢梁厂内制作2004.2吨，钢梁安装5000吨。"
            }
          ]
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

  methods: {
    onSubmit() {
      console.log("submit!");
    },
    openDetails() {
      this.$router.push({ name: "Dispatch" });
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, 11);
      if (row.name == "总计") {
        if (columnIndex === 0) {
          return [1, 3];
        }
      }
      if (row.children) {
        if (columnIndex === 0) {
          return [1, 3];
        }
      }

      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 2, 3];
      //   } else if (columnIndex === 1) {
      //     return [0, 0];
      //   }
      // }
    }
  }
};
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
}
</style>