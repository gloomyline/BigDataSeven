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
    <div class="left">
      <el-date-picker
        v-model="ny"
        type="month"
        :picker-options="pickerOptions"
        value-format="yyyy-MM"
        placeholder="选择月">
      </el-date-picker>
    </div>
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
          <span class="unit" style="right: 20px;top: 20px;">单位：万元</span>
          <!-- <div class="boxfoot"></div> -->
        </dv-border-box-1>
        <dv-border-box-1 class="section-box">
          <div class="alltitle" @click="goRouter('LabourServicesNew')">劳务管理</div>
          <div class="allnav" id="echart1"></div>
          <span class="unit" style="right: 20px;top: 10px;">单位：个</span>
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
              <li class="pulll_left counter">{{ manpower.total }}</li>
              <li class="pulll_left counter">{{ manpower.bureau }}</li>
              <li class="pulll_left counter">{{ manpower.firstCate }}</li>
            </ul>
          </div>
          <div class="barbox2">
            <ul class="clearfix">
              <li class="pulll_left">员工总数</li>
              <li class="pulll_left">局聘员工</li>
              <li class="pulll_left">一类劳务人员</li>
            </ul>
          </div>
        </dv-border-box-8 >
        <div class="map" style="padding-top:100px;">
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
          <div class="map-info-wrapper">
            <ul class="map-info">
              <li class="li">在建项目数：{{count}}个</li>
               <li class="li">收尾项目数：{{totalend}}个</li> 
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
          <!-- <div class="allnav" id="financeEchart"></div> -->
          <div class="sb" id="planMap"></div>
          <div class="sb" id="profitMap"></div>
          <!-- <span class="unit" style="right: 30px;top: 10px;">单位：万元</span> -->
        </dv-border-box-1>
        <dv-border-box-1 class="section-box">
          <div class="alltitle" @click="goRouter('EquipmentNew')">设备管理</div>
          <!-- <div class="sbgl-content">
            <dv-active-ring-chart class="sb" :config="sbNumConfig" />
            <dv-active-ring-chart class="sb" :config="sbTypeConfig" />
          </div>-->
          <div class="sb" id="sb1"></div>
          <div class="sb" id="sb2"></div>
          <span class="unit" style="right: 30px;top: 10px;">单位：台</span>
        </dv-border-box-1>
        <dv-border-box-1 class="section-box">
          <div class="alltitle" @click="goRouter('Engineering')">工程经济</div>
          <div class="allnav" id="jj"></div>
          <!-- <div class="sb" id="jj1"></div>
          <div class="sb" id="jj2"></div> -->
          <!-- <div class="sb">1111</div>
          <div class="sb">1222</div>-->
          <span class="unit" style="right: 30px;top: 10px;">单位：万元</span>
        </dv-border-box-1>
      </li>
    </ul>
  </div>
  <div class="back"></div>
</body>
</template>

<script>
import { homeApi } from "@/api";
import "@/assets/js/echarts.min.js";
import $ from "jquery";
import echarts from "echarts";
import allCtyData from "@/assets/js/allCty.json";
import TurnoverDetailsVue from './TurnoverDetails.vue';

export default {
  name: "Home",
  components: {},
  data() {
    return {
      ny:"",
      count:"",
      totalend:"",
      pickerOptions: {
        disabledDate(time) {
            return time >Date.now()
        },
      },
      manpower: {}, // 人力资源
      mapPoint: {},
      mapPointArr: [],
      provinceProJectsArr: [],
    
     
      // equipments
      equipment: {
        bigMain: null,
        otherUsing: null,
        isUnused: null,
        isUsing: null
      },
      economy: null,
      financeVo: null,
      manPower: {
        total: 1033,
        bureau: 646,
        class: 387
      },
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
            value: 155
          },
          {
            name: "其他在场设备",
            value: 125
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
  watch:{
    ny(newValue,oldValue){
      console.log("home ny ",newValue,oldValue)
      if(newValue!==oldValue){
        this.ny=newValue
        this.initData()
        

      }
    }
  },
  methods: {
    async fetchHomeMap() {
      this.mapPointArr = [];
      this.provinceProJectsArr = [];
      this.mapPoint = {};
      const response = await homeApi.fetchHomeMapData();
      console.log("homeMapData",response.data)
      this.homeMapData = response
      response.data.forEach(item => {
        let name = item.name;
        this.count = response.count
        this.totalend=response.data[0]["totalend"]
        // let enddata=response.data[0]
        // this.totalend = enddata.totalend
        if (item.point !== "") {
          let pointX = Number(item.point.split(",")[0]);
          let pointY = Number(item.point.split(",")[1]);
          let pointArr = [];

          pointArr.push(pointX, pointY);
          this.mapPoint[item.name] = pointArr;
          let obj = {
            city: item.city,
            name: item.name,
            dataone: item.cost,
            datatwo: item.com,
            deptId: item.deptId,
            datathree: 0
          };
          this.provinceProJectsArr.push(obj);
        }
      });
      console.log("mapPoint",this.mapPoint)
      console.log("provinceProJectsArr",this.provinceProJectsArr)
      if (
        this.mapPoint !== {} &&
        this.provinceProJectsArr &&
        this.provinceProJectsArr.length > 0
      ) {
        this.echarts(this.mapPoint, this.provinceProJectsArr);
      }
    },
    _initEquipmentData(data) {
      //console.log("data.equipmentVo",data.equipmentVo)
      this.equipment = data.equipmentVo;
      this.echarts_5()
      this.echarts_51()
      
    },
    _initEconomyData(data) {
      // this.economy= {
      //     "06": { //月份
      //       "monthlyPricing": 35015, //每月计价
      //       "cumulativeValuation": 35015, //年度累积计价
      //       "proportion": 21 //开累计价完成比例
      //     },
      //     "07": {
      //       "monthlyPricing": 64753,
      //       "cumulativeValuation": 99768,
      //       "proportion": 23
      //     }
      // }
      this.economy = data.economy; //工程经济数据
      this.echarts_economy();
      
      // this.echarts_61();
      // this.echarts_62();
      console.log(this.economy);
    },
    _initFinanceData(data) {
      this.financeVo = data.financeVo;
      this.echarts_finance1()
      this.echarts_finance2()
      // this.echarts_4();
      // console.log(this.economy);
    },
    async initData() {
      // request home api
      const response = await homeApi.fetchHomeData(this.ny);
       let labour={
        yAxisArr:[],
        seriesData:[]

      }
      console.log("response.data.labour",response.data.labour)
      let labourData=response.data.labour

      for(let i=0;i< labourData.length;i++){
        
        labour.yAxisArr.push(labourData[i].tabName)
        labour.seriesData.push(labourData[i].tabValue)

      }
      this.manpower = response.data.manpower;
      const data = response.data;
      this._initEquipmentData(data);
      this._initEconomyData(data);
      this._initFinanceData(data);
      this.monthConfig.data[0] = 92.02;
      this.yearConfig.data[0] = 72.68;
      this.startConfig.data[0] = 32.54;
      this.judgeColor(this.monthConfig);
      this.judgeColor(this.yearConfig);
      this.judgeColor(this.startConfig);
      this.sbNumConfig.color = ["#27d08a", "#066eab"];
      this.sbTypeConfig.color = ["#2f89cf", "#0f63d6"];
      this.echarts_31(response.data.production.monthly);
      this.echarts_32(response.data.production.yearly);
      this.echarts_33(response.data.production.sofar);
      this.echarts_2(
        response.data.materials.material,
        response.data.materials.rate
      );
      console.log("this.labour", this.labour)
      this.echarts_1(
        labour.yAxisArr,
        labour.seriesData
      );
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
      this.$router.push({ name: resName, params: { ny: this.ny } });
    },

    echarts(pointArr, provinceProJectsArr) {
      var zhongguo = "get/s/data-1562829675575-NZp9nSurz.json";
      var hainan = "get/s/data-1528971693521-r18nZaybm.json";
      var xizang = "get/s/data-1528970391616-BJeoh2JW7.json";
      var zhejiang = "get/s/data-1528970380661-SkH93h1-m.json";
      var yunnan = "get/s/data-1528970362114-r1MK321WQ.json";
      var xinjiang = "get/s/data-1528970349852-H18u22kWX.json";
      var tianjin = "get/s/data-1528970339987-Hk2wnh1ZX.json";
      var sichuan = "get/s/data-1528970319531-Hy_8n3y-m.json";
      var shanxi = "get/s/data-1528970298351-HyzB32JZ7.json";
      var shangxi = "get/s/data-1528970273819-B1cmnnk-Q.json";
      var shanghai = "get/s/data-1528970254015-HJLfhnyWX.json";
      var shangdong = "get/s/data-1528970240242-Byu-hhybX.json";
      var qinghai = "get/s/data-1528970209434-Bytyh3kZ7.json";
      var ningxia = "get/s/data-1528970150882-SJJ2j2yWQ.json";
      var neimenggu = "get/s/data-1528970102554-HyJKo31bQ.json";
      var liaoning = "get/s/data-1528970052404-BJhHihkbQ.json";
      var jilin = "get/s/data-1528970024458-rkeEjhy-Q.json";
      var jiangxi = "get/s/data-1528969991368-BkkMi31Zm.json";
      var jiangsu = "get/s/data-1528969864934-BJ-qchkWQ.json";
      var hunan = "get/s/data-1528969831328-Sykuqh1bX.json";
      var hubei = "get/s/data-1528969822119-Bk8v93kZ7.json";
      var henan = "get/s/data-1528969802719-HyXIqhk-m.json";
      var heilongjiang = "get/s/data-1528969789631-ryLHcnJbm.json";
      var hebei = "get/s/data-1528969737020-HJWMqhy-Q.json";
      var guizhou = "get/s/data-1528969712502-Hy_g92yZQ.json";
      var guangxi = "get/s/data-1528969706270-HJMg5hdata-1528969831328-Sykuqh1bXkWQ.json";
      var guangdong = "get/s/data-1528969700634-BkT1qn1WQ.json";
      var gansu = "get/s/data-1528969694316-BJLkc2yZX.json";
      var chongqing = "get/s/data-1528969687660-r1ey9nkbX.json";
      var aomen = "get/s/data-1528969612486-rJ4qtnyZm.json";
      var anhui = "get/s/data-1528969607452-Hkk5tnJ-Q.json";
      var beijing = "get/s/data-1528969604941-Hk6Ytn1WQ.json";
      var fujian = "get/s/data-1528969599839-S1OFFn1ZQ.json";
      var xianggang = "get/s/data-1528969589857-S1ROthJWm.json";
      var wuhanfengongsi = "get/s/data-1585548193898-oqdhSorMp.json";
      var fangjiangongsi = "get/s/data-fangjiangongsi.json";
      var hubeigongsi = "get/s/data-1528969822119-Bk8v93kZ7.json";
      var huabeigongsi = "get/s/data-huabeigongsi.json";
      var xibeigongsi = "get/s/data-xibeigongsi.json";
      var _this = this
      console.log("我是vue吗",_this)

      var allprovinceData = [
        {
          name: "黑龙江",
          value: 8
        },
        {
          name: "吉林",
          value: 8
        },
        {
          name: "辽宁",
          value: 8
        },
        {
          name: "上海",
          value: 3
        },
        {
          name: "江苏",
          value: 8
        },
        {
          name: "浙江",
          value: 8
        },
        {
          name: "安徽",
          value: 8
        },
        {
          name: "福建",
          value: 8
        },
        {
          name: "江西",
          value: 8
        },
        {
          name: "山东",
          value: 8
        },
        {
          name: "台湾",
          value: 8
        },
        {
          name: "北京",
          value: 8
        },
        {
          name: "天津",
          value: 8
        },
        {
          name: "山西",
          value: 4
        },
        {
          name: "河北",
          value: 8
        },
        {
          name: "内蒙古",
          value: 8
        },
        {
          name: "河南",
          value: 8
        },
        {
          name: "湖北",
          value: 5
        },
        {
          name: "湖南",
          value: 3
        },
        {
          name: "广东",
          value: 8
        },
        {
          name: "广西",
          value: 8
        },
        {
          name: "海南",
          value: 3
        },
        {
          name: "香港",
          value: 8
        },
        {
          name: "澳门",
          value: 8
        },
        {
          name: "重庆",
          value: 8
        },
        {
          name: "四川",
          value: 8
        },
        {
          name: "贵州",
          value: 8
        },
        {
          name: "云南",
          value: 8
        },
        {
          name: "西藏",
          value: 8
        },
        {
          name: "陕西",
          value: 4
        },
        {
          name: "甘肃",
          value: 1
        },
        {
          name: "青海",
          value: 1
        },
        {
          name: "宁夏",
          value: 8
        },
        {
          name: "新疆",
          value: 8
        },
        {
          name: "南海诸岛",
          value: 8
        }
      ];
      var areaProjects = [
        {
          city: "辽宁",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "黑龙江",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "吉林",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "内蒙古",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "山西",
          name: "华北分公司",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "新疆",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "宁夏",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "北京",
          name: "",
          merge: -25.53,
          dataone: 123123,
          datatwo: 123123.01
        },
        {
          city: "武汉",
          name: "武汉分公司",
          merge: -25.53,
          dataone: 123123,
          datatwo: 123123.01
        },
        {
          city: "河北",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "天津",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "山东",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "安徽",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "河南",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "陕西",
          name: "华北分公司",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "甘肃",
          name: "西北分公司",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "青海",
          name: "西北分公司",
          merge: -24.5,
          dataone: 39950025,
          datatwo: 703641592.5
        },
        {
          city: "江苏",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "上海",
          name: "房建分公司",
          merge: -26.06,
          dataone: 11111,
          datatwo: 111111.33
        },
        {
          city: "湖北",
          name: "湖北分公司",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "湖南",
          name: "房建分公司",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "江西",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "四川",
          name: "",
          merge: -22.23,
          dataone: 11111,
          datatwo: 32123.55
        },
        {
          city: "西藏",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "云南",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "重庆",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "贵州",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "福建",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "浙江",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "广东",
          name: "",
          merge: -24.96,
          dataone: 123123,
          datatwo: 123123.15
        },
        {
          city: "深圳",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "广西",
          name: "",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        },
        {
          city: "海南",
          name: "房建分公司",
          merge: (Math.random() * 100).toFixed(2),
          dataone: (Math.random() * 100).toFixed(2),
          datatwo: (Math.random() * 100).toFixed(2)
        }
      ];
      // ssg
      var provinceProJects = provinceProJectsArr;

      echarts.extendsMap = function(id, opt) {
        // 实例
        var chart = this.init(document.getElementById(id));

        var curGeoJson = {};
        var cityMap = {
          中国: zhongguo,
          湖北: hubei,
          陕西: shanxi,
          山西: shangxi,
          甘肃: gansu,
          青海: qinghai,
          上海: shanghai,
          湖南: hunan,
          海南: hainan,
          香港: xianggang,
          澳门: aomen,
          房建分公司: fangjiangongsi,
          西北分公司: xibeigongsi,
          湖北分公司: hubeigongsi,
          武汉分公司: wuhanfengongsi,
          华北分公司: huabeigongsi
        };
        
        var geoCoordMap = pointArr;
        console.log("geoCoordMap------------------",pointArr)
        var levelColorMap = {
          "1": "rgba(241, 109, 115, .8)",
          "2": "rgba(255, 235, 59, .7)",
          "3": "rgba(147, 235, 248, 1)"
        };

        var defaultOpt = {
          mapName: "china", // 地图展示
          goDown: false, // 是否下钻
          bgColor: "#404a59", // 画布背景色
          activeArea: [], // 区域高亮,同echarts配置项
          data: [],
          // 下钻回调(点击的地图名、实例对象option、实例对象)
          callback: function(name, option, instance) {
            console.log("name, option, instance",name, option, instance)
          }
        };
        if (opt) opt = this.util.extend(defaultOpt, opt);

        // 层级索引
        var name = [opt.mapName];
        var idx = 0;
        var pos = {
          leftPlus: 115,
          leftCur: 150,
          left: 198,
          top: 50
        };

        var line = [
          [0, 0],
          [8, 11],
          [0, 22]
        ];
        // style
        var style = {
          font: '18px "Microsoft YaHei", sans-serif',
          textColor: "#eee",
          lineColor: "rgba(147, 235, 248, .8)"
        };

        var handleEvents = {
          /**
           * i 实例对象
           * o option
           * n 地图名
           **/
          resetOption: function(i, o, n) {
            //var breadcrumb = this.createBreadcrumb(n);
            var breadcrumb = null;
            if (n == "武汉") {
              breadcrumb = this.createBreadcrumb("武汉分公司");
            } else if (n == "山西" || n == "陕西" || n == "华北分公司") {
              breadcrumb = this.createBreadcrumb(n);
            } else if (n == "湖北" || n == "湖北分公司") {
              breadcrumb = this.createBreadcrumb(n);
            } else if (
              n == "上海" ||
              n == "湖南" ||
              n == "海南" ||
              n == "房建分公司"
            ) {
              breadcrumb = this.createBreadcrumb(n);
            } else if (n == "甘肃" || n == "青海" || n == "西北分公司") {
              breadcrumb = this.createBreadcrumb(n);
            }
            if (breadcrumb !== null) {
              breadcrumb.left = 265;
            }

            var j = name.indexOf(n);
            var l = o.graphic.length;
            if (j < 0) {
              o.graphic.push(breadcrumb);
              o.graphic[0].children[0].shape.x2 = 170;
              o.graphic[0].children[1].shape.x2 = 170;
              if (o.graphic.length > 2) {
                var cityData = [];
                var cityJson;
                for (var x = 0; x < opt.data.length; x++) {
                  if (n === opt.data[x].city) {
                    $([opt.data[x]]).each(function(index, data) {
                      cityJson = {
                        city: data.city,
                        name: data.name,
                        value: data.value,
                        crew: data.crew,
                        company: data.company,
                        position: data.position,
                        region: data.region,
                        merge: data.merge,
                        dataone: data.dataone,
                        datatwo: data.datatwo,
                        deptId: data.deptId
                      };
                      cityData.push(cityJson);
                    });
                  }
                }
                if (cityData != null) {
                  o.series[0].data = handleEvents.initSeriesData(cityData);
                } else {
                  o.series[0].data = [];
                }
              }
              name.push(n);
              idx++;
            } else {
              o.graphic.splice(j + 2, l);
              if (o.graphic.length <= 2) {
                o.graphic[0].children[0].shape.x2 = 60;
                o.graphic[0].children[1].shape.x2 = 60;
                //o.series[0].data = handleEvents.initSeriesData(opt.data);
                o.series[0].data = [];
              }
              name.splice(j + 1, l);
              idx = j;
              pos.leftCur -= pos.leftPlus * (l - j - 1);
            }

            o.geo.map = n;
            o.geo.zoom = 0.4;
            i.clear();
            i.setOption(o);
            chart.dispatchAction({
              type: "showTip",
              seriesIndex: 0,
              dataIndex: 0
            });
            this.zoomAnimation();
            opt.callback(n, o, i);
          },

          /**
           * name 地图名
           **/
          createBreadcrumb: function(name) {
            var cityToPinyin = {
              中国: "zhongguo",
              上海: "shanghai",
              河北: "hebei",
              山西: "shangxi",
              内蒙古: "neimenggu",
              辽宁: "liaoning",
              吉林: "jilin",
              黑龙江: "heilongjiang",
              江苏: "jiangsu",
              浙江: "zhejiang",
              安徽: "anhui",
              福建: "fujian",
              江西: "jiangxi",
              山东: "shangdong",
              河南: "henan",
              湖北: "hubei",
              湖南: "hunan",
              广东: "guangdong",
              广西: "guangxi",
              海南: "hainan",
              四川: "sichuan",
              贵州: "guizhou",
              云南: "yunnan",
              西藏: "xizang",
              陕西: "shanxi",
              甘肃: "gansu",
              青海: "qinghai",
              宁夏: "ningxia",
              新疆: "xinjiang",
              北京: "beijing",
              天津: "tianjin",
              重庆: "chongqing",
              香港: "xianggang",
              澳门: "aomen",
              西北分公司: "xibeigongsi",
              房建分公司: "fangjiangongsi",
              湖北分公司: "hubeigongsi",
              武汉分公司: "wuhanfengongsi",
              华北分公司: "huabeigongsi"
            };

            var breadcrumb = {
              type: "group",
              id: name,
              left: pos.leftCur + pos.leftPlus,
              top: pos.top + 3,
              children: [
                {
                  type: "polyline",
                  left: -90,
                  top: -5,
                  shape: {
                    points: line
                  },
                  style: {
                    stroke: "#fff",
                    key: name
                    // lineWidth: 2,
                  },
                  onclick: function() {
                    var name = this.style.key;
                    handleEvents.resetOption(chart, option, name);
                  }
                },
                {
                  type: "text",
                  left: -68,
                  top: "middle",
                  style: {
                    text: name,
                    textAlign: "center",
                    fill: style.textColor,
                    font: style.font
                  },
                  onclick: function() {
                    var name = this.style.text;
                    //handleEvents.resetOption(chart, option, name);
                  }
                },
                {
                  type: "text",
                  left: -68,
                  top: 10,
                  style: {
                    name: name,
                    text: cityToPinyin[name]
                      ? cityToPinyin[name].toUpperCase()
                      : "",
                    textAlign: "center",
                    fill: style.textColor,
                    font: '12px "Microsoft YaHei", sans-serif'
                  },
                  onclick: function() {
                    // console.log(this.style);
                    var name = this.style.name;
                    //handleEvents.resetOption(chart, option, name);
                  }
                }
              ]
            };

            pos.leftCur += pos.leftPlus;

            return breadcrumb;
          },

          // 设置effectscatter
          initSeriesData: function(data) {
            console.log(data, '------------------------------------', geoCoordMap)
            var temp = [];
            for (var i = 0; i < data.length; i++) {
              var geoCoord = geoCoordMap[data[i].name];
              if (geoCoord) {
                temp.push({
                  city: data[i].city,
                  name: data[i].name,
                  value: geoCoord.concat(data[i].value),
                  merge: data[i].merge,
                  dataone: data[i].dataone,
                  datatwo: data[i].datatwo,
                  deptId: data[i].deptId
                });
              }
            }
            return temp;
          },
          zoomAnimation: function() {
            var count = null;
            var zoom = function(per) {
              if (!count) count = per;
              count = count + per;
              // console.log(per,count);
              chart.setOption({
                geo: {
                  zoom: count
                }
              });
              if (count < 1)
                window.requestAnimationFrame(function() {
                  zoom(0.2);
                });
            };
            window.requestAnimationFrame(function() {
              zoom(0.2);
            });
          }
        };

        var option = {
          backgroundColor: "",
          tooltip: {
            show: true,
            alwaysShowContent: true,
            backgroundColor: "rgba(50,50,50,0.7)",
            hideDelay: 1000,
            triggerOn: "mousemove",
            enterable: true,
            // position: ["60%", "70%"]
          },
          graphic: [
            {
              type: "group",
              left: pos.left,
              top: pos.top - 4,
              children: [
                {
                  type: "line",
                  left: 0,
                  top: -20,
                  shape: {
                    x1: 0,
                    y1: 0,
                    x2: 60,
                    y2: 0
                  },
                  style: {
                    stroke: style.lineColor
                  }
                },
                {
                  type: "line",
                  left: 0,
                  top: 20,
                  shape: {
                    x1: 0,
                    y1: 0,
                    x2: 60,
                    y2: 0
                  },
                  style: {
                    stroke: style.lineColor
                  }
                }
              ]
            },
            {
              id: name[idx],
              type: "group",
              left: pos.left + 2,
              top: pos.top,
              children: [
                {
                  type: "polyline",
                  left: 90,
                  top: -12,
                  shape: {
                    points: line
                  },
                  style: {
                    stroke: "transparent",
                    key: name[0]
                  },
                  onclick: function() {
                    var name = this.style.key;
                    handleEvents.resetOption(chart, option, name);
                  }
                },
                {
                  type: "text",
                  left: 0,
                  top: "middle",
                  style: {
                    text: "中国",
                    textAlign: "center",
                    fill: style.textColor,
                    font: style.font
                  },
                  onclick: function() {
                    option.tooltip.formatter = function(
                      params,
                      ticket,
                      callback
                    ) {
                      return (
                        "大区名称：" +
                        params.data.name +
                        "大区" +
                        "<br/>" +
                        "年累容量：" +
                        params.data.merge +
                        "/MW" +
                        "<br/>" +
                        "未开工容量：" +
                        params.data.dataone +
                        "/MW" +
                        "<br/>" +
                        "在建容量：" +
                        params.data.datatwo +
                        "/MW"

                      );
                    };
                    option.series[1].data = allprovinceData;
                    opt.data = areaProjects;
                    handleEvents.resetOption(chart, option, "china");
                  }
                },
                {
                  type: "text",
                  left: 0,
                  top: 10,
                  style: {
                    text: "China",
                    textAlign: "center",
                    fill: style.textColor,
                    font: '12px "Microsoft YaHei", sans-serif'
                  },
                  onclick: function() {
                    option.tooltip.formatter = function(
                      params,
                      ticket,
                      callback
                    ) {
                      return (
                        "大区名称：" +
                        params.data.name +
                        "大区" +
                        "<br/>" +
                        "年累容量：" +
                        params.data.merge +
                        "/MW" +
                        "<br/>" +
                        "未开工容量：" +
                        params.data.dataone +
                        "/MW" +
                        "<br/>" +
                        "在建容量：" +
                        params.data.datatwo +
                        "/MW"
                      );
                    };
                    option.series[1].data = allprovinceData;
                    opt.data = areaProjects;
                    handleEvents.resetOption(chart, option, "china");
                  }
                }
              ]
            }
          ],
          geo: {
            map: opt.mapName,
            roam: true,
            zoom: 1,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff"
                }
              },
              emphasis: {
                textStyle: {
                  color: "#fff"
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: "rgba(255, 255, 255, .5)",
                borderWidth: 1,
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(147, 235, 248, .5)" // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: "rgba(255, 255, 255, .5)",
                // shadowColor: 'rgba(255, 255, 255, 1)',
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10
              },
              emphasis: {
                areaColor: "rgba(249,157,51, .9)",
                borderWidth: 0
              }
            },
            regions: opt.activeArea.map(function(item) {
              if (typeof item !== "string") {
                return {
                  name: item.name,
                  itemStyle: {
                    normal: {
                      areaColor: item.areaColor || "#389BB7"
                    }
                  },
                  label: {
                    normal: {
                      show: item.showLabel,
                      textStyle: {
                        color: "#fff"
                      }
                    }
                  }
                };
              } else {
                return {
                  name: item,
                  itemStyle: {
                    normal: {
                      borderColor: "#91e6ff",
                      areaColor: "#389BB7"
                    }
                  }
                };
              }
            })
          },
          visualMap: {
            min: 0,
            max: 11,
            left: "3%",
            bottom: "10%",
            showLabel: !0,
            calculable: false,
            show: false,
            itemWidth: "20",
            itemHeight: "16",
            inRange: {
              color: [
                "#ffffff",
                "rgba(159,202,70,1)", //yidaiyilu
                "rgba(225,131,46,1)", //changjiangsanjiao
                "rgba(231,210,99,1)", //jingjinji
                "rgba(2,201,251,1)", //dawanqu
                "rgba(50,100,236,1)", //chengyujingjiqu
                "#4bbdd6",
                "#ff6f5b",
                "#F4D5B1",
                "#ADE1E3",
                "#F4B387",
                "#F0F3F4"
              ]
            },
            outOfRange: {
              color: ["rgba(48,59,175,1)"]
            },
            pieces: [
              {
                value: 3,
                label: "房建分公司",
                color: "rgba(231,210,99,1)"
              },
              {
                value: 5,
                label: "湖北分公司",
                color: "rgba(160,32,240,1)"
              },
              {
                value: 4,
                label: "华北分公司",
                color: "rgba(2,201,251,1)"
              },
              {
                value: 1,
                label: "西北分公司",
                color: "rgba(159,202,70,1)"
              },
              {
                value: 2,
                label: "武汉分公司",
                color: "rgba(160,32,240,1)"
              },
              {
                value: 6,
                label: "城轨分公司",
                color: "rgba(160,32,240,1)"
              }
            ],
            show: !0,
            textStyle: {
              color: "rgba(150,173,255,1)",
              fontSize: "20"
            }
          },
          //地图数据信息
          series: [
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              showEffectOn: "render",
              rippleEffect: {
                period: 15,
                scale: 4,
                brushType: "fill"
              },
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: "#FABC61",
                  shadowBlur: 10,
                  shadowColor: "#333"
                }
              },
              data: handleEvents.initSeriesData(opt.data)
            },
            {
              name: "map",
              type: "map",
              mapType: "china",
              geoIndex: 0,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data: allprovinceData,
              tooltip: {
                trigger: "item",
                triggerOn: "mousemove",
                backgroundColor: "rgba(0,0,0,.8)",
                borderColor: "#3574c8",
                borderWidth: "2",
                // extraCssText:
                //   "padding:10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
                show: true,
                formatter: function(params){
                  console.log("params.data",params.data)
                  console.log("formatter.homeMapData",_this.homeMapData.data)
                  // console.log('prams.tooltip',params.data.name)
                  let homeMapData = _this.homeMapData.data
                  let data =[]
                  let companydata = []
                  for (var i=0;i<homeMapData.length;i++){
                    // console.log("homeMapData[i].city",homeMapData[i].city)
                    if(params.data.name==homeMapData[i].city){
                      data.push(homeMapData[i])
                    }
                  }
                  if(data.length){
                    let temp = data[0].com
                    companydata.push({company:data[0].com,comContent:data[0].comContent})
                    for(var j=1;j<data.length;j++){
                      if(temp!=data[j].com){
                        temp = data[j].com
                        companydata.push({company:data[j].com,comContent:data[j].comContent})
                      }
                    }
                  }
                  let companystr =""
                  if(companydata.length){
                    for (var k=0;k<companydata.length;k++){
                      companystr +=`${companydata[k].company}:${companydata[k].comContent}<br>`
                    }
                  }
                  return companystr
                  
                }
                // formatter: function(params) {
                //   var res;
                //   if (params.value > 0) {
                //     res = params.data.value2 + "<br/>";
                //     res += params.data.value3;
                //   } else {
                //     res = "";
                //   }
                //   return res;
                // }
              }
            }
          ]
        };

         chart.setOption(option);
        // 添加事件
        
        chart.on("click", function(params) {
          console.log("事件事件params-----",params)
          var _self = this;
          var cityDot = "";
          var city = params.name;
          if (city == "甘肃" || city == "青海") {
            params.name = city;
          } else if (city == "武汉") {
            params.name = city;
          } else if (city == "上海" || city == "湖南" || city == "海南") {
            params.name = city;
          } else if (city == "湖北") {
            params.name = city;
          } else if (city == "山西" || city == "陕西") {
            params.name = city;
          }
          if (opt.goDown && params.name !== name[idx]) {
            if (cityMap[params.name]) {
              var url = cityMap[params.name];
              $.get(url, function(response) {
                curGeoJson = response;
                echarts.registerMap(params.name, response);
                console.log("点击进入省registerMap",response )

                option.series[1].data = allCtyData;
                option.tooltip.formatter = function(params, ticket, callback) {
                  return (
                    "分公司：" +
                    params.data.datatwo +
                    "<br/>" +
                    "项目名称：" +
                    params.data.name +
                    "<br/>" +
                    "总产值：" +
                    params.data.dataone +
                    ""
                  );
                };
                opt.data = provinceProJects;
                handleEvents.resetOption(_self, option, params.name);
              });
            }
            // }
            
          }
          console.log("params.deptId",params.data.deptId,"name:params.name",params.name,"_this.ny",_this.ny)
          _this.$router.push({ 
              name: "DispatchNew",
              params: {
                id:params.data.deptId,
                name:params.name,
                ny: _this.ny
              }
          }).catch(data => {});
        });
      // 湖北 dataIndex: 17
      // 湖南 dataIndex: 18   海南  dataIndex: 21  上海 dataIndex: 3
      // 陕西  dataIndex: 29  山西 dataIndex: 13
      // 青海 dataIndex: 31     甘肃 dataIndex: 30
      
      
      

      var playlist = [17,18,29,31]
      var playlistarr = [17,[18,21,2],[29,13],[31,30]]
      let num=0
      var timer=setInterval(function(){ 
          chart.dispatchAction({
              type: 'hideTip',
              dataIndex: 17,
          })
          chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 1,
              dataIndex: 17,
          })
          chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 1,
              dataIndex:  18,
          })
          chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 1,
              dataIndex:  21,
          })
          chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 1,
              dataIndex: 3,
          })
          chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 1,
              dataIndex: 29,
          })
          chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 1,
              dataIndex: 13,
          })
          chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 1,
              dataIndex: 31,
          })
          chart.dispatchAction({
              type: 'downplay',
              seriesIndex: 1,
              dataIndex: 30,
          })
          
          let playlistnum =  playlist[num]
        //   for (var i in playlistarr[num]){
        //     console.log("我的playlistarr",playlistarr[num][i])
        //     chart.dispatchAction({
        //       type: 'downplay',
        //       // 可选，系列 index，可以是一个数组指定多个系列
        //       seriesIndex: 1,
        //       // 可选，系列名称，可以是一个数组指定多个系列
        //       // seriesName: string|Array,
        //       // 可选，数据的 index
        //       dataIndex: playlistarr[num][i],
        //   })
         
        //  }
          
          console.log("num",num)
          switch (playlistnum) {
          case 17:
               chart.dispatchAction({
                  type: "highlight",
                  dataIndex:17
              });

              chart.dispatchAction({
                    type: "showTip",
                    // name: "青海"
                    seriesIndex:1,
                    dataIndex:17,
                    position:[0,0]
              });
              break;
          case 18:
               chart.dispatchAction({
                  type: "highlight",
                  dataIndex:18
              });
               chart.dispatchAction({
                  type: "highlight",
                  dataIndex:21
              });
              chart.dispatchAction({
                  type: "highlight",
                  dataIndex:3
              });
              chart.dispatchAction({
                    type: "showTip",
                    // name: "青海"
                    seriesIndex:1,
                    dataIndex:18,
                    position:[0,0]
              });
              break;
          case 29:
              chart.dispatchAction({
                  type: "highlight",
                  dataIndex:29
              });
              chart.dispatchAction({
                  type: "highlight",
                  dataIndex:13
              });
              chart.dispatchAction({
                    type: "showTip",
                    seriesIndex:1,
                    dataIndex:29,
                    position:[0,0]
              });
              break;
          case 31:
               chart.dispatchAction({
                  type: "highlight",
                  dataIndex:31
              });
               chart.dispatchAction({
                  type: "highlight",
                  dataIndex:30
              });
              chart.dispatchAction({
                    type: "showTip",
                    // name: "青海"
                    seriesIndex:1,
                    dataIndex:30,
                    position:[0,0]
              });
              break;
         
        }  
        num++
        if(num == 4){
          num =0
        }
      }, 3000);
      
      chart.on("mouseover", function(params) {
        var city = params.name;
        if (city == "甘肃" || city == "青海") {
          chart.dispatchAction({
            type: "highlight",
            name: "甘肃"
          });
          chart.dispatchAction({
            type: "highlight",
            name: "青海"
          });
        }
        if (city == "武汉") {
          chart.dispatchAction({
            type: "highlight",
            name: "武汉"
          });
        }
        if (city == "上海" || city == "湖南" || city == "海南") {
          chart.dispatchAction({
            type: "highlight",
            name: "上海"
          });
          chart.dispatchAction({
            type: "highlight",
            name: "湖南"
          });
          chart.dispatchAction({
            type: "highlight",
            name: "海南"
          });
        }
        if (city == "湖北") {
          chart.dispatchAction({
            type: "highlight",
            name: "湖北"
          });
        }
        if (city == "山西" || city == "陕西") {
          chart.dispatchAction({
            type: "highlight",
            name: "山西"
          });
          chart.dispatchAction({
            type: "highlight",
            name: "陕西"
          });
        }
      });
      chart.on("mouseout", function(params) {
        var city = params.name;
        if (city == "甘肃" || city == "青海") {
          chart.dispatchAction({
            type: "downplay",
            name: "甘肃"
          });
          chart.dispatchAction({
            type: "downplay",
            name: "青海"
          });
        }
        if (city == "武汉") {
          chart.dispatchAction({
            type: "downplay",
            name: "武汉"
          });
        }
        if (city == "上海" || city == "湖南" || city == "海南") {
          chart.dispatchAction({
            type: "downplay",
            name: "上海"
          });
          chart.dispatchAction({
            type: "downplay",
            name: "湖南"
          });
          chart.dispatchAction({
            type: "downplay",
            name: "海南"
          });
        }
        if (city == "湖北") {
          chart.dispatchAction({
            type: "downplay",
            name: "湖北"
          });
        }
        if (city == "山西" || city == "陕西") {
          chart.dispatchAction({
            type: "downplay",
            name: "山西"
          });
          chart.dispatchAction({
            type: "downplay",
            name: "陕西"
          });
        }
      });
      chart.setMap = function(mapName) {
        var _self = this;
        if (mapName.indexOf("市") < 0) mapName = mapName + "市";
        var citySource = cityMap[mapName];
        if (citySource) {
          var url = "./map/" + citySource + ".json";
          $.get(url, function(response) {
            curGeoJson = response;
            echarts.registerMap(mapName, response);
            handleEvents.resetOption(_self, option, mapName);
          });
        }
      };
        // return chart;
      };

     var _this=this;
    console.log("vuethis",_this)
     $.getJSON(zhongguo, function(geoJson) {
        echarts.registerMap("china", geoJson);
        var myChart = echarts.extendsMap("map_1", {
          mapName: "china", // 地图名
          text: "by:wxw",
          goDown: true, // 是否下钻
          // 下钻回调
          callback: function(name, option, instance) {
            console.log("name ",name, "option",option, "instance",instance);
          
          },
          // 数据展示
          data: areaProjects
        });
      });
     
    },
    echarts_1(yAxisArr,seriesData) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echart1"));

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#dddc6b"
            }
          },
          formatter:"{b}:{c}"
        },
        // legend: {
        // data: [
        //   "在用劳务企业数量",
        //   "今年办理准入队伍数量",
        //   "公司劳务企业数量"
        // ],
        // textStyle: {
        //     color: "rgba(255,255,255,.5)",
        //     fontSize: "12"
        //   }
        // },
        grid: {
          x:"70%",
          y:"10%",
          left: "3%",
          top: "10%",
          right: "5%",
          bottom: "0",
          containLabel: true
        },

        xAxis: [
          {
            type: "value",
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
            splitLine: {
                show: true,
                lineStyle:{
                  color: ['#315070'],
                  width: 1,
                  type: 'solid'
              }
        　　}

          },
          // {
          //   axisPointer: { show: false },
          //   axisLine: { show: false },
          //   position: "bottom",
          //   offset: 20
          // }
        ],

        yAxis: [
          {
            type: "category",
            data:yAxisArr,
            axisTick: { show: false },
            splitLine: {
                show: true,
                lineStyle:{
                  color: ['#315070'],
                  width: 1,
                  type: 'solid'
              }
        　　},
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
            name: "数量",
            type: "bar",
            data:seriesData,
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: true,
            
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
                // borderColor: "rgba(221, 220, 107, .1)",
                label: {
                  show: true
                },
                borderWidth: 12
              }
            },
            
          },
          
          
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    },
    echarts_2(type, rate) {
      let typeA = type.typeA;
      let typeB = type.typeB;
      let typeC = type.typeC;
      let rateA = (Number(rate.typeA) * 100).toFixed(2);
      let rateB = (Number(rate.typeB) * 100).toFixed(2);
      let rateC = (Number(rate.typeC) * 100).toFixed(2);
      // let typeB = type.typeB
      // let typeC = type.typeC
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echart2"));
      var option = (option = {
        color: ["#2f89cf", "#27d08a", "#e62d2d", "#0fa0d6", "#0fb4d6"],
        title: [
          {
            text: `A类利用率${rateA}%    B类利用率${rateB}%    C类利用率${rateC}%`,
            x: "center",
            y: "bottom",
            textStyle: {
              color: "#fff",
              fontSize: "12"
            }
          },
          {
            text: "单位：吨",
            x: "80%",
            textStyle: { color: "#ffffff", fontSize: 12, fontWeight: 300 }
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
          data: ["在用","闲置", "封存"]
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          splitLine: {
                show: true,
                lineStyle:{
                  color: ['#315070'],
                  width: 1,
                  type: 'solid'
              }
        　　}
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
          data: ["C类", "B类", "A类"],
          
        },
        series: [
          {
            name: "在用",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideLeft",
              formatter: function(params) {
                return Number(params.data) > 0 ? params.data : "";
              }
            },
            data: [typeC.isUsing, typeB.isUsing, typeA.isUsing]
          },
          {
            name: "闲置",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "insideLeft",
              formatter: function(params) {
                return Number(params.data) > 0 ? params.data : "";
              }
            },
            data: [typeC.isUnused, typeB.isUnused, typeA.isUnused]
          },
          {
            name: "封存",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "right",
              distance: 20,
              formatter: function(params) {
                return Number(params.data) > 0 ? params.data : "";
              }
            },
            data: ["", "", typeA.isSealed]
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
      const self = this;
      console.log("this equipment",this.equipment)
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
          // position: function(p) {
          //   //其中p为当前鼠标的位置
          //   return [p[0] + 10, p[1] - 10];
          // }
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
            label: { show: false },
            labelLine: { show: true },
            data: [
              { value: self.equipment.bigMain , name: "大型主要设备" },
              { value: self.equipment.otherUsing , name: "其他在场设备" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} : {c}",
                  position: "inner"
                },
                //labelLine: { show: true }
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
      const myChart = echarts.init(document.getElementById("sb2"));

      const self = this;
      const option = {
        title: [
          {
            text: "自有主要机械设备使用情况",
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
                value: self.equipment.isUsing ,
                name: "在用"
              },
              { value: self.equipment.isUnused , name: "空闲" }
            ],
            label: {
              show: true,
              formatter: "{b} : {c}\n({d}%)",
              padding: 7,
              height:15,
              align: 'left',
              lineHeight:14,
              position: "inner",
            //   formatter(v) {//此方法为核心代码，解决问题
              
            //     let text = Math.round(v.percent)+'%' + '' + v.name
            //     if(text.length <= 8)
            //     {
            //         return text;
            //     }else if(text.length > 8 && text.length <= 16){
            //         return text = `${text.slice(0,8)}\n${text.slice(8)}`
            //     }else if(text.length > 16 && text.length <= 24){
            //         return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16)}`
            //     }else if(text.length > 24 && text.length <= 30){
            //         return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24)}`
            //     }else if(text.length > 30){
            //         return text = `${text.slice(0,8)}\n${text.slice(8,16)}\n${text.slice(16,24)}\n${text.slice(24,30)}\n${text.slice(30)}`
            //     }
            // }
              
            },
            labelLine: {
              show:true,
              length:2,
              
              length2:0 ,
            } ,
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: true,
            //       formatter: "{b} : {c} ({d}%)",
            //       position: "outside"
            //     },
            //     labelLine: { show: true }
            //   }
            // },
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
    //财务预算营业收入图表
    // <div class="sb" id="planMap"></div>
    // <div class="sb" id="profitMap"></div>
    echarts_finance1(){
      var myChart = echarts.init(document.getElementById("planMap"));
      console.log("this.financeVo.planMap",this.financeVo)
      let planMapData = this.financeVo.planMap
      //console.log("planMapData",planMapData)
      let xAxisarr =[]
      let total= []
      let undone= []
      let completed = []
      let percent = []

      for (var item in planMapData ){
        xAxisarr.push(planMapData[item].type)
        completed.push(planMapData[item].completed)
        undone.push(planMapData[item].undone)
        total.push(planMapData[item].total)
        percent.push(planMapData[item].percent)
       
       }
       console.log("percent",percent)
      var option = {
        legend: {
          data: ['实际完成', '已完成'],
          textStyle: {
            color: "rgba(255,255,255,.6)"
          }
        },
        color: ["#2f89cf", "#27d08a", "#e62d2d", "#0fa0d6", "#0fb4d6"],
        grid: {
          top:'20%',
          left: '5%',
          right: '5%',
          bottom: '3%',
          containLabel: true,
          
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisarr,
            axisLabel:{
              lineStyle:{
                 color: "rgba(255,255,255,.2)"
              },
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12
              }
            },
            axisLine: {
              //设置地名及x轴线条颜色
              show: true,
              lineStyle: {
                  color: "rgba(255,255,255,.2)"
              }
           },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel:{
              lineStyle:{
                 color: "rgba(255,255,255,.2)"
              },
              textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                  }
            },
            
            axisLine: {
              //设置地名及x轴线条颜色
              show: true,
              lineStyle: {
                  color: "rgba(255,255,255,.2)"
              }
           },
            splitLine: {
                  // show: false,
                  lineStyle:{
                    color: ['#315070'],
                    width: 1,
                    type: 'solid'
                }
          　　}
         
          },
          

        ],
        series: [
          {
              name: '总完成',
              type: 'bar',
              barGap: '-100%',
              // stack: "num",
              data: total,
              label:{
                position: ['120%', '50%'],
                show:true,
              //  formatter: function(params) {
              //   //  console.log("我的参数",params)
              
              //   //  console.log("params.dataIndex",total[params.dataIndex])
              //    var finishpercent = percent[params.dataIndex]
              //    return `${params.data}(${finishpercent}%)`
              //   return `${params.data}(${finishpercent}%)`
              //  }
              },
              barWidth : 30
 
          },
          {
              name: '实际完成',
              type: 'bar',
              stack: "num",
              data: completed,
              label:{
                position:"inside",
                color:"#fff",
                position:"inside",
                show:true,
                // formatter:"{c}亿元"
                formatter: function(params) {
                //  console.log("我的参数",params)
              
                //  console.log("params.dataIndex",total[params.dataIndex])
                 var finishpercent = percent[params.dataIndex]
                 return `${params.data}(${finishpercent}%)`
                return `${params.data}(${finishpercent}%)`
               }
              },
              barWidth : 30

          },
          {
              name: '未完成',
              type: 'bar',
              stack: "num",
              data: undone,
              label:{
                color:"#fff",
                position:"inside",
                show:true,
                formatter:"{c}亿元"
              },
              barWidth : 30

          },
          
          
          
          
        ]
      }
      
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
       
    },
    //财务预算营业利润图表
    echarts_finance2(){
       var myChart = echarts.init(document.getElementById("profitMap"));
       let profitMapData = this.financeVo.profitMap
      console.log("profitMapData",profitMapData)
      let xAxisarr =[]
      let total= []
      let completed = []
      let percent = []

      for (var item in profitMapData ){
        xAxisarr.push(profitMapData[item].type)
        completed.push(profitMapData[item].completed)
        total.push(profitMapData[item].total)
        percent.push(profitMapData[item].percent)
       
       }
       console.log("percent",percent)
      var option = {
        legend: {
          data: ['实际完成', '已完成'],
          textStyle: {
            color: "rgba(255,255,255,.6)"
          }
        },
        color: ["#2f89cf", "#27d08a", "#e62d2d", "#0fa0d6", "#0fb4d6"],
        grid: {
            left: '5%',
            right: '5%',
            bottom: '3%',
            top:'20%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisarr,
            axisLabel:{
              lineStyle:{
                 color: "rgba(255,255,255,.2)"
              },
              textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: 12
              }
            },
            axisLine: {
              //设置地名及x轴线条颜色
              show: true,
              lineStyle: {
                  color: "rgba(255,255,255,.2)"
              }
           },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel:{
              lineStyle:{
                 color: "rgba(255,255,255,.2)"
              },
              textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                  }
            },
            
            axisLine: {
              //设置地名及x轴线条颜色
              show: true,
              lineStyle: {
                  color: "rgba(255,255,255,.2)"
              }
           },
            splitLine: {
                  // show: false,
                  lineStyle:{
                    color: ['#315070'],
                    width: 1,
                    type: 'solid'
                }
          　　}
         
          },
          

        ],
        series: [
          {
              name: '实际完成',
              type: 'bar',
              data: total,
              label:{
                color:"#fff",
                position:"top",
                show:true,
                formatter:"{c}万元"
              },
              barWidth : 30

          },
          {
              name: '已完成',
              type: 'bar',
              barGap: '-100%',
              data: completed,
              label:{
                position:"inside",
                show:true,
               formatter: function(params) {
                //  console.log("我的参数",params)
              
                //  console.log("params.dataIndex",total[params.dataIndex])
                 var finishpercent = percent[params.dataIndex]
                return `${params.data}(${finishpercent}%)`
               }
              },
              barWidth : 30
 
          },
          
          
          
        ]
      }
      
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
       
    },
    //财务预算
    // echarts_4() {
    //   // 基于准备好的dom，初始化echarts实例
    //   var myChart = echarts.init(document.getElementById("echart4"));

    //   let xData = [];
    //   let series = {
    //     balance: [],
    //     earning: [],
    //     profits: [],
    //     stock: []
    //   };

    //   this.financeVo.forEach((financeVo, index) => {
    //     xData.push(index + 1);
    //     series.balance.push(financeVo.balance);
    //     series.earning.push(financeVo.earning);
    //     series.profits.push(financeVo.profits);
    //     series.stock.push(financeVo.stock);
    //   });

    //   var option = {
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         lineStyle: {
    //           color: "#dddc6b"
    //         }
    //       }
    //     },
    //     legend: {
    //       data: ["营业收入", "营业利润", "两金余额", "货币存量"],
    //       textStyle: {
    //         color: "rgba(255,255,255,.5)",
    //         fontSize: "8"
    //       }
    //     },
    //     grid: {
    //       x:"30%",
    //       left: "20",
    //       top: "30%",
    //       right: "30",
    //       bottom: "0",
    //       containLabel: true
    //     },

    //     xAxis: [
    //       {
    //         type: "category",
    //         boundaryGap: false,
    //         axisLabel: {
    //           textStyle: {
    //             color: "rgba(255,255,255,.6)",
    //             fontSize: 12
    //           }
    //         },
    //         axisLine: {
    //           lineStyle: {
    //             color: "rgba(255,255,255,.2)"
    //           }
    //         },

    //         data: xData
    //       },
    //       {
    //         axisPointer: { show: false },
    //         axisLine: { show: false },
    //         position: "bottom",
    //         offset: 20
    //       }
    //     ],

    //     yAxis: [
    //       {
    //         type: "value",
    //         axisTick: { show: false },
    //         axisLine: {
    //           lineStyle: {
    //             color: "rgba(255,255,255,.1)"
    //           }
    //         },
    //         axisLabel: {
    //           textStyle: {
    //             color: "rgba(255,255,255,.6)",
    //             fontSize: 12
    //           }
    //         },

    //         splitLine: {
    //           lineStyle: {
    //             color: "rgba(255,255,255,.1)"
    //           }
    //         }
    //       }
    //     ],
    //     series: [
    //       {
    //         name: "营业收入",
    //         type: "line",
    //         smooth: true,
    //         symbol: "circle",
    //         symbolSize: 5,
    //         showSymbol: true,
    //         lineStyle: {
    //           normal: {
    //             color: "#0184d5",
    //             width: 2
    //           }
    //         },
    //         areaStyle: {
    //           normal: {
    //             color: new echarts.graphic.LinearGradient(
    //               0,
    //               0,
    //               0,
    //               1,
    //               [
    //                 {
    //                   offset: 0,
    //                   color: "rgba(1, 132, 213, 0.4)"
    //                 },
    //                 {
    //                   offset: 0.8,
    //                   color: "rgba(1, 132, 213, 0.1)"
    //                 }
    //               ],
    //               false
    //             ),
    //             shadowColor: "rgba(0, 0, 0, 0.1)"
    //           }
    //         },
    //         itemStyle: {
    //           normal: {
    //             color: "#0184d5",
    //             borderColor: "rgba(221, 220, 107, .1)",
    //             label: {
    //               show: true
    //             },
    //             borderWidth: 12
    //           }
    //         },
    //         data: series.earning
    //       },
    //       {
    //         name: "营业利润",
    //         type: "line",
    //         smooth: true,
    //         symbol: "circle",
    //         symbolSize: 5,
    //         showSymbol: true,
    //         lineStyle: {
    //           normal: {
    //             color: "#00d887",
    //             width: 2
    //           }
    //         },
    //         areaStyle: {
    //           normal: {
    //             color: new echarts.graphic.LinearGradient(
    //               0,
    //               0,
    //               0,
    //               1,
    //               [
    //                 {
    //                   offset: 0,
    //                   color: "rgba(0, 216, 135, 0.4)"
    //                 },
    //                 {
    //                   offset: 0.8,
    //                   color: "rgba(0, 216, 135, 0.1)"
    //                 }
    //               ],
    //               false
    //             ),
    //             shadowColor: "rgba(0, 0, 0, 0.1)"
    //           }
    //         },
    //         itemStyle: {
    //           normal: {
    //             color: "#00d887",
    //             borderColor: "rgba(221, 220, 107, .1)",
    //             borderWidth: 12,
    //             label: {
    //               show: true
    //             }
    //           }
    //         },
    //         data: series.profits
    //       },
    //       {
    //         name: "两金余额",
    //         type: "line",
    //         smooth: true,
    //         symbol: "circle",
    //         symbolSize: 5,
    //         showSymbol: true,
    //         lineStyle: {
    //           normal: {
    //             color: "red",
    //             width: 2
    //           }
    //         },
    //         areaStyle: {
    //           normal: {
    //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //               {
    //                 offset: 0,
    //                 color: "rgba(0, 216, 135, 0.4)"
    //               },
    //               {
    //                 offset: 0.8,
    //                 color: "rgba(0, 216, 135, 0.1)"
    //               }
    //             ]),
    //             shadowColor: "rgba(0, 0, 0, 0.1)"
    //           }
    //         },
    //         itemStyle: {
    //           normal: {
    //             color: "red",
    //             borderColor: "rgba(221, 220, 107, .1)",
    //             borderWidth: 12,
    //             label: {
    //               show: true
    //             }
    //           }
    //         },
    //         data: series.balance
    //       },
    //       {
    //         name: "货币存量",
    //         type: "line",
    //         smooth: true,
    //         symbol: "circle",
    //         symbolSize: 5,
    //         showSymbol: true,
    //         lineStyle: {
    //           normal: {
    //             color: "yellow",
    //             width: 2
    //           }
    //         },
    //         areaStyle: {
    //           normal: {
    //             color: new echarts.graphic.LinearGradient(
    //               0,
    //               0,
    //               0,
    //               1,
    //               [
    //                 {
    //                   offset: 0,
    //                   color: "rgba(0, 216, 135, 0.4)"
    //                 },
    //                 {
    //                   offset: 0.8,
    //                   color: "rgba(0, 216, 135, 0.1)"
    //                 }
    //               ],
    //               false
    //             ),
    //             shadowColor: "rgba(0, 0, 0, 0.1)"
    //           }
    //         },
    //         itemStyle: {
    //           normal: {
    //             color: "yellow",
    //             borderColor: "rgba(221, 220, 107, .1)",
    //             borderWidth: 12,
    //             label: {
    //               show: true
    //             }
    //           }
    //         },
    //         data: series.stock
    //       }
    //     ]
    //   };

    //   // 使用刚指定的配置项和数据显示图表。
    //   myChart.setOption(option);
    //   window.addEventListener("resize", function() {
    //     myChart.resize();
    //   });
    // },
    echarts_economy(){
      var myChart = echarts.init(document.getElementById("jj"));  
      console.log("this.economyeconomy",this.economy)
      let economyData = this.economy
      let xAxis_arr = Object.keys(this.economy)
      
      let monthlyPricing = []
      let cumulativeValuation=[]
      let proportion=[]
      for(var i in economyData){
        //console.log("econmyData[i]",economyData[i])
        monthlyPricing.push(economyData[i].monthlyPricing)
        cumulativeValuation.push(economyData[i].cumulativeValuation)
        proportion.push(economyData[i].proportion)
      }

      
      console.log("xAxis_arr",xAxis_arr)
      var option = {
        grid: {
            left: '5%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            hideDelay: '300'
        },
         color: ["#2f89cf", "#27d08a", "#e62d2d", "#0fa0d6", "#0fb4d6"],
        legend: {
            show:true,
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: 12
            }
        },
          xAxis: {
              type: 'category',
              data: xAxis_arr,
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
              splitLine: {
                  show: false,
                  lineStyle:{
                    color: ['#315070'],
                    width: 1,
                    type: 'solid'
                }
          　　}
              
          },
          yAxis: [
            {
              type: 'value',
              axisLabel:{
                width:100
              },
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
              splitLine: {
                  show: false,
                  lineStyle:{
                    color: ['#315070'],
                    width: 1,
                    type: 'solid'
                }
          　　}
            },
            {
              type: 'value',
              // name: '完成比例',
              min: 60,
              max: 90,
              interval: 5,
              axisLabel: {
                formatter: '{value} %',
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
              splitLine: {
                  show: true,
                  lineStyle:{
                    color: "rgba(255,255,255,.1)",
                    width: 1,
                    type: 'solid'
                }
          　　}         
            }
          ],
          series: [{
              name:"每月计价",
              data: monthlyPricing,
              type: 'bar'
          },
          { 
              name:"年度累积计价",
              data:  cumulativeValuation,
              type: 'bar'
          },
          {
              name:"开累计价完成比例",
              data: proportion,
              yAxisIndex:1,
              type: 'line'
          }]
      };
      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });

    },
    // echarts_61() {
    //   // 基于准备好的dom，初始化echarts实例
    //   // 绘制左侧面
    //   const CubeLeft = echarts.graphic.extendShape({
    //     shape: {
    //       x: 0,
    //       y: 0,
    //       w: 0
    //     },
    //     buildPath: function(ctx, shape) {
    //       // 会canvas的应该都能看得懂，shape是从custom传入的
    //       const xAxisPoint = shape.xAxisPoint;
    //       const c0 = [shape.x - shape.w, shape.y];
    //       const c1 = [shape.x - 13 - shape.w, shape.y - 13];
    //       const c2 = [xAxisPoint[0] - 13 - shape.w, xAxisPoint[1] - 13];
    //       const c3 = [xAxisPoint[0] - shape.w, xAxisPoint[1]];
    //       ctx
    //         .moveTo(c0[0], c0[1])
    //         .lineTo(c1[0], c1[1])
    //         .lineTo(c2[0], c2[1])
    //         .lineTo(c3[0], c3[1])
    //         .closePath();
    //     }
    //   });
    //   // 绘制右侧面
    //   const CubeRight = echarts.graphic.extendShape({
    //     shape: {
    //       x: 0,
    //       y: 0,
    //       w: 0
    //     },
    //     buildPath: function(ctx, shape) {
    //       const xAxisPoint = shape.xAxisPoint;
    //       const c1 = [shape.x - shape.w, shape.y];
    //       const c2 = [xAxisPoint[0] - shape.w, xAxisPoint[1]];
    //       const c3 = [xAxisPoint[0] - shape.w + 18, xAxisPoint[1] - 9];
    //       const c4 = [shape.x - shape.w + 18, shape.y - 9];
    //       ctx
    //         .moveTo(c1[0], c1[1])
    //         .lineTo(c2[0], c2[1])
    //         .lineTo(c3[0], c3[1])
    //         .lineTo(c4[0], c4[1])
    //         .closePath();
    //     }
    //   });
    //   // 绘制顶面
    //   const CubeTop = echarts.graphic.extendShape({
    //     shape: {
    //       x: 0,
    //       y: 0,
    //       w: 0
    //     },
    //     buildPath: function(ctx, shape) {
    //       const c1 = [shape.x - shape.w, shape.y];
    //       const c2 = [shape.x - shape.w + 18, shape.y - 9];
    //       const c3 = [shape.x - shape.w + 5, shape.y - 22];
    //       const c4 = [shape.x - shape.w - 13, shape.y - 13];
    //       ctx
    //         .moveTo(c1[0], c1[1])
    //         .lineTo(c2[0], c2[1])
    //         .lineTo(c3[0], c3[1])
    //         .lineTo(c4[0], c4[1])
    //         .closePath();
    //     }
    //   });
    //   // 注册三个面图形
    //   echarts.graphic.registerShape("CubeLeft", CubeLeft);
    //   echarts.graphic.registerShape("CubeRight", CubeRight);
    //   echarts.graphic.registerShape("CubeTop", CubeTop);

    //   const MAX = [this.economy.valulation.charge];
    //   const VALUE = [this.economy.valulation.output];
    //   let percent = parseInt((VALUE / MAX) * 100);
    //   var myChart = echarts.init(document.getElementById("jj1"));

    //   var option = {
    //     color: ["red", "#49BEE5"],

    //     grid: {
    //       y: "40%",
    //       left: "8%",
    //       right: "0",
          
    //       bottom: "0",
    //       containLabel: true
    //     },
    //     legend: {
    //       data: ["产值", "计价"],
    //       textStyle: {
    //         //图例文字的样式
    //         color: "#999",
    //         fontSize: 12
    //       }
    //     },

    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         type: "shadow"
    //       },
    //       formatter: "{a0}: {c0}<br />{a1}: {c1}"
    //       // formatter: {function(params, ticket, callback) {
    //       //   const item = params[0];
    //       //   const item1 = params[1];
    //       //   return (
    //       //     item1.name +
    //       //     "<br/>产值：" +
    //       //     item.value +
    //       //     "<br/>计价：" +
    //       //     item1.value
    //       //   );}
    //       // }
    //     },
    //     xAxis: {
    //       type: "category",
    //       show: true,
    //       data: [`开累计价完成比${percent}%`],
    //       axisLine: {
    //         show: true,
    //         lineStyle: {
    //           color: "rgba(255,255,255,.1)",
    //           width: 1,
    //           type: "solid"
    //         }
    //       },
    //       // offset: 25,
    //       // axisLabel:{
    //       //   show:true
    //       // },
    //       // axisTick: {
    //       //   show: true,
    //       //   length: 9,
    //       //   alignWithLabel: true,
    //       //   lineStyle: {
    //       //     color: "#7DFFFD"
    //       //   }
    //       // },
    //       axisLabel: {
    //         interval: 0,
    //         // rotate:50,
    //         show: true,
    //         splitNumber: 15,
    //         textStyle: {
    //           color: "rgba(255,255,255,.6)",
    //           fontSize: "12"
    //         }
    //       }
    //     },
    //     yAxis: [
    //       {
    //         type: "value",
    //         axisLabel: {
    //           //formatter: '{value} %'
    //           show: true,
    //           textStyle: {
    //             color: "rgba(255,255,255,.6)",
    //             fontSize: "8"
    //           }
    //         },
    //         axisTick: {
    //           show: false
    //         },
    //         axisLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "rgba(255,255,255,.1	)",
    //             width: 1,
    //             type: "solid"
    //           }
    //         },
    //         splitLine: {
    //           lineStyle: {
    //             color: "rgba(255,255,255,.1)"
    //           }
    //         }
    //       }
    //     ],
    //     series: [
    //       {
    //         name: "产值",
    //         type: "custom",
    //         renderItem: function(params, api) {
    //           const location = api.coord([api.value(0), api.value(1)]);
    //           return {
    //             type: "group",
    //             children: [
    //               {
    //                 type: "CubeLeft",
    //                 shape: {
    //                   api,
    //                   x: location[0],
    //                   y: location[1],
    //                   w: 25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: "rgba(255,0,0,.7)"
    //                 }
    //               },
    //               {
    //                 type: "CubeRight",
    //                 shape: {
    //                   api,
    //                   x: location[0],
    //                   y: location[1],
    //                   w: 25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: "rgba(255,0,0,.7)"
    //                 }
    //               },
    //               {
    //                 type: "CubeTop",
    //                 shape: {
    //                   api,
    //                   x: location[0],
    //                   y: location[1],
    //                   w: 25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: "rgba(255,0,0,.7)"
    //                 }
    //               }
    //             ]
    //           };
    //         },
    //         data: MAX
    //       },
    //       {
    //         name: "计价",
    //         type: "custom",
    //         renderItem: (params, api) => {
    //           const location = api.coord([api.value(0), api.value(1)]);
    //           return {
    //             type: "group",
    //             children: [
    //               {
    //                 type: "CubeLeft",
    //                 shape: {
    //                   api,
    //                   xValue: api.value(0),
    //                   yValue: api.value(1),
    //                   x: location[0],
    //                   y: location[1],
    //                   w: -25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                     {
    //                       offset: 0,
    //                       color: "#3B80E2"
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#49BEE5"
    //                     }
    //                   ])
    //                 }
    //               },
    //               {
    //                 type: "CubeRight",
    //                 shape: {
    //                   api,
    //                   xValue: api.value(0),
    //                   yValue: api.value(1),
    //                   x: location[0],
    //                   y: location[1],
    //                   w: -25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                     {
    //                       offset: 0,
    //                       color: "#3B80E2"
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#49BEE5"
    //                     }
    //                   ])
    //                 }
    //               },
    //               {
    //                 type: "CubeTop",
    //                 shape: {
    //                   api,
    //                   xValue: api.value(0),
    //                   yValue: api.value(1),
    //                   x: location[0],
    //                   y: location[1],
    //                   w: -25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                     {
    //                       offset: 0,
    //                       color: "#3B80E2"
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#49BEE5"
    //                     }
    //                   ])
    //                 }
    //               }
    //             ]
    //           };
    //         },
    //         data: VALUE
    //       },
    //       {
    //         type: "bar",
    //         barWidth: 40,
    //         label: {
    //           normal: {
    //             show: true,
    //             position: "top",
    //             fontSize: 16,
    //             color: "#fff",
    //             offset: [2, -25]
    //           }
    //         },
    //         itemStyle: {
    //           color: "transparent"
    //         },
    //         tooltip: {},
    //         data: MAX
    //       },
    //       {
    //         type: "bar",
    //         barWidth: 40,
    //         label: {
    //           normal: {
    //             show: true,
    //             position: "top",
    //             fontSize: 16,
    //             color: "#fff",
    //             offset: [2, -25]
    //           }
    //         },
    //         itemStyle: {
    //           color: "transparent"
    //         },
    //         tooltip: {},
    //         data: VALUE
    //       }
    //     ]
    //   };

    //   // 使用刚指定的配置项和数据显示图表。
    //   myChart.setOption(option);
    //   window.addEventListener("resize", function() {
    //     myChart.resize();
    //   });
    // },
    // echarts_62() {
    //   // 基于准备好的dom，初始化echarts实例
    //   // 绘制左侧面
    //   const CubeLeft = echarts.graphic.extendShape({
    //     shape: {
    //       x: 0,
    //       y: 0,
    //       w: 0
    //     },
    //     buildPath: function(ctx, shape) {
    //       // 会canvas的应该都能看得懂，shape是从custom传入的
    //       const xAxisPoint = shape.xAxisPoint;
    //       const c0 = [shape.x - shape.w, shape.y];
    //       const c1 = [shape.x - 13 - shape.w, shape.y - 13];
    //       const c2 = [xAxisPoint[0] - 13 - shape.w, xAxisPoint[1] - 13];
    //       const c3 = [xAxisPoint[0] - shape.w, xAxisPoint[1]];
    //       ctx
    //         .moveTo(c0[0], c0[1])
    //         .lineTo(c1[0], c1[1])
    //         .lineTo(c2[0], c2[1])
    //         .lineTo(c3[0], c3[1])
    //         .closePath();
    //     }
    //   });
    //   // 绘制右侧面
    //   const CubeRight = echarts.graphic.extendShape({
    //     shape: {
    //       x: 0,
    //       y: 0,
    //       w: 0
    //     },
    //     buildPath: function(ctx, shape) {
    //       const xAxisPoint = shape.xAxisPoint;
    //       const c1 = [shape.x - shape.w, shape.y];
    //       const c2 = [xAxisPoint[0] - shape.w, xAxisPoint[1]];
    //       const c3 = [xAxisPoint[0] - shape.w + 18, xAxisPoint[1] - 9];
    //       const c4 = [shape.x - shape.w + 18, shape.y - 9];
    //       ctx
    //         .moveTo(c1[0], c1[1])
    //         .lineTo(c2[0], c2[1])
    //         .lineTo(c3[0], c3[1])
    //         .lineTo(c4[0], c4[1])
    //         .closePath();
    //     }
    //   });
    //   // 绘制顶面
    //   const CubeTop = echarts.graphic.extendShape({
    //     shape: {
    //       x: 0,
    //       y: 0,
    //       w: 0
    //     },
    //     buildPath: function(ctx, shape) {
    //       const c1 = [shape.x - shape.w, shape.y];
    //       const c2 = [shape.x - shape.w + 18, shape.y - 9];
    //       const c3 = [shape.x - shape.w + 5, shape.y - 22];
    //       const c4 = [shape.x - shape.w - 13, shape.y - 13];
    //       ctx
    //         .moveTo(c1[0], c1[1])
    //         .lineTo(c2[0], c2[1])
    //         .lineTo(c3[0], c3[1])
    //         .lineTo(c4[0], c4[1])
    //         .closePath();
    //     }
    //   });
    //   // 注册三个面图形
    //   echarts.graphic.registerShape("CubeLeft", CubeLeft);
    //   echarts.graphic.registerShape("CubeRight", CubeRight);
    //   echarts.graphic.registerShape("CubeTop", CubeTop);

    //   const MAX = [this.economy.claim.planed];
    //   const VALUE = [this.economy.claim.finished];
    //   let percent = parseInt((VALUE / MAX) * 100);
    //   var myChart = echarts.init(document.getElementById("jj2"));

    //   var option = (option = {
    //     color: ["red", "#49BEE5"],
    //     legend: {
    //       data: ["计划", "完成"],
    //       textStyle: {
    //         //图例文字的样式
    //         color: "#999",
    //         fontSize: 12
    //       }
    //     },
    //     tooltip: {
    //       trigger: "axis",
    //       axisPointer: {
    //         type: "shadow"
    //       },
    //       formatter: function(params, ticket, callback) {
    //         const item = params[0];
    //         const item1 = params[1];
    //         return (
    //           item1.name +
    //           "<br/>计划：" +
    //           item.value +
    //           "<br/>完成：" +
    //           item1.value
    //         );
    //       }
    //     },
    //     grid: {
    //       y:"40%",
    //       left: "8%",
    //       right: "0",
    //       bottom: "0",
    //       containLabel: true
    //     },
    //     xAxis: {
    //       type: "category",
    //       data: [`变更索赔完成率${percent}%`],
    //       axisLine: {
    //         show: true,
    //         lineStyle: {
    //           color: "rgba(255,255,255,.1)",
    //           width: 1,
    //           type: "solid"
    //         }
    //       },
    //       // offset: 25,
    //       // axisTick: {
    //       //   show: false,
    //       //   length: 9,
    //       //   alignWithLabel: true,
    //       //   lineStyle: {
    //       //     color: "#7DFFFD"
    //       //   }
    //       // },
    //       axisLabel: {
    //         interval: 0,
    //         // rotate:50,
    //         show: true,
    //         splitNumber: 15,
    //         textStyle: {
    //           color: "rgba(255,255,255,.6)",
    //           fontSize: "12"
    //         }
    //       }
    //     },
    //     yAxis: [
    //       {
    //         type: "value",
    //         axisLabel: {
    //           //formatter: '{value} %'
    //           show: true,
    //           textStyle: {
    //             color: "rgba(255,255,255,.6)",
    //             fontSize: "8"
    //           }
    //         },
    //         axisTick: {
    //           show: false
    //         },
    //         axisLine: {
    //           show: true,
    //           lineStyle: {
    //             color: "rgba(255,255,255,.1	)",
    //             width: 1,
    //             type: "solid"
    //           }
    //         },
    //         splitLine: {
    //           lineStyle: {
    //             color: "rgba(255,255,255,.1)"
    //           }
    //         }
    //       }
    //     ],
    //     series: [
    //       {
    //         name: "计划",
    //         type: "custom",
    //         renderItem: function(params, api) {
    //           const location = api.coord([api.value(0), api.value(1)]);
    //           return {
    //             type: "group",
    //             children: [
    //               {
    //                 type: "CubeLeft",
    //                 shape: {
    //                   api,
    //                   x: location[0],
    //                   y: location[1],
    //                   w: 25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: "rgba(255,0,0,.7)"
    //                 }
    //               },
    //               {
    //                 type: "CubeRight",
    //                 shape: {
    //                   api,
    //                   x: location[0],
    //                   y: location[1],
    //                   w: 25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: "rgba(255,0,0,.7)"
    //                 }
    //               },
    //               {
    //                 type: "CubeTop",
    //                 shape: {
    //                   api,
    //                   x: location[0],
    //                   y: location[1],
    //                   w: 25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: "rgba(255,0,0,.7)"
    //                 }
    //               }
    //             ]
    //           };
    //         },
    //         data: MAX
    //       },
    //       {
    //         name: "完成",
    //         type: "custom",
    //         renderItem: (params, api) => {
    //           const location = api.coord([api.value(0), api.value(1)]);
    //           return {
    //             type: "group",
    //             children: [
    //               {
    //                 type: "CubeLeft",
    //                 shape: {
    //                   api,
    //                   xValue: api.value(0),
    //                   yValue: api.value(1),
    //                   x: location[0],
    //                   y: location[1],
    //                   w: -25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                     {
    //                       offset: 0,
    //                       color: "#3B80E2"
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#49BEE5"
    //                     }
    //                   ])
    //                 }
    //               },
    //               {
    //                 type: "CubeRight",
    //                 shape: {
    //                   api,
    //                   xValue: api.value(0),
    //                   yValue: api.value(1),
    //                   x: location[0],
    //                   y: location[1],
    //                   w: -25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                     {
    //                       offset: 0,
    //                       color: "#3B80E2"
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#49BEE5"
    //                     }
    //                   ])
    //                 }
    //               },
    //               {
    //                 type: "CubeTop",
    //                 shape: {
    //                   api,
    //                   xValue: api.value(0),
    //                   yValue: api.value(1),
    //                   x: location[0],
    //                   y: location[1],
    //                   w: -25,
    //                   xAxisPoint: api.coord([api.value(0), 0])
    //                 },
    //                 style: {
    //                   fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //                     {
    //                       offset: 0,
    //                       color: "#3B80E2"
    //                     },
    //                     {
    //                       offset: 1,
    //                       color: "#49BEE5"
    //                     }
    //                   ])
    //                 }
    //               }
    //             ]
    //           };
    //         },
    //         data: VALUE
    //       },
    //       {
    //         type: "bar",
    //         barWidth: 40,
    //         label: {
    //           normal: {
    //             show: true,
    //             position: "top",
    //             fontSize: 16,
    //             color: "#fff",
    //             offset: [2, -25]
    //           }
    //         },
    //         itemStyle: {
    //           color: "transparent"
    //         },
    //         tooltip: {},
    //         data: MAX
    //       },
    //       {
    //         type: "bar",
    //         barWidth: 40,
    //         label: {
    //           normal: {
    //             show: true,
    //             position: "top",
    //             fontSize: 16,
    //             color: "#fff",
    //             offset: [2, -25]
    //           }
    //         },
    //         itemStyle: {
    //           color: "transparent"
    //         },
    //         tooltip: {},
    //         data: VALUE
    //       }
    //     ]
    //   });

    //   // 使用刚指定的配置项和数据显示图表。
    //   myChart.setOption(option);
    //   window.addEventListener("resize", function() {
    //     myChart.resize();
    //   });
    // },
    echarts_31(monthly) {
      let finished = Number(monthly.finished).toFixed(2);
      let remained = Number(monthly.remained).toFixed(2);
      let sum = Number(finished) + Number(remained);
      const self = this;
      let str = 0;
      let rendercolor = "red";
      if (isNaN(Number(monthly.finished) / Number(monthly.remained))) {
        str = 0;
      } else {
        str = ((Number(monthly.finished) / sum) * 100).toFixed(1);

        if (str >= 90) {
          rendercolor = "green";
        } else if (str < 90 && str >= 70) {
          rendercolor = "yellow";
        } else if (str < 70) {
          rendercolor = "red";
        }
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("fb1"));
      var option = {
        title: [
          {
            text: "当月完成产值",
            left: "center",
            textStyle: {
              // color: "#57D1C9",
              color: "#ff0000",
              fontSize: "15"
            }
          },
          {
            text: `${str}%`,
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
          data: ["完成"],
          selectedMode: false, // disable symbol selected mode
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          },
          formatter: function(params) {

            return params === "完成" ? `${params}:${parseInt(finished)}` : "";
          }
        },
        series: [
          {
            name: "当月完成产值",
            type: "pie",
            center: ["50%", "42%"],
            radius: ["40%", "60%"],
            color: [`${rendercolor}`, "#066eab"],
            label: { show: true },
            labelLine: { show: true },
            data: [
              { value: finished, name: "完成" },
              { value: monthly.remained, name: "剩余" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  formatter: function(params) {
                    if (params.name === "完成") {
                      return (
                        params.name +
                        "：" +
                        self.$utils.currency(params.data.value)
                      );
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
    echarts_32(monthly) {
      let finished = Number(monthly.finished).toFixed(2);
      let remained = Number(monthly.remained).toFixed(2);
      let sum = Number(finished) + Number(remained);
      let str = 0;
      let rendercolor = "red";
      if (isNaN(Number(monthly.finished) / Number(monthly.remained))) {
        str = 0;
      } else {
        str = ((Number(monthly.finished) / sum) * 100).toFixed(1);
        if (str >= 90) {
          rendercolor = "green";
        } else if (str < 90 && str >= 70) {
          rendercolor = "yellow";
        } else if (str < 70) {
          rendercolor = "red";
        }
      }
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
            text: `${str}%`,
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
          data: ["完成"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          },
          selectedMode: false,
          formatter: function(params) {
            return params === "完成" ? `${params}:${parseInt(finished)}` : "";
          }
        },
        series: [
          {
            name: "年累产值完成比例",
            type: "pie",
            center: ["50%", "42%"],
            radius: ["40%", "60%"],
            color: [`${rendercolor}`, "#066eab"],
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: finished, name: "完成" },
              { value: monthly.remained, name: "剩余" }
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
    echarts_33(monthly) {
      let finished = Number(monthly.finished).toFixed(2);
      let remained = Number(monthly.remained).toFixed(2);
      let sum = Number(finished) + Number(remained);
      let str = 0;
      let rendercolor = "red";
      if (isNaN(Number(monthly.finished) / Number(monthly.remained))) {
        str = 0;
      } else {
        str = ((Number(monthly.finished) / sum) * 100).toFixed(1);
        if (str >= 90) {
          rendercolor = "green";
        } else if (str < 90 && str >= 70) {
          rendercolor = "yellow";
        } else if (str < 70) {
          rendercolor = "red";
        }
      }

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
            text: `${str}%`,
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
          data: ["完成"],
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: "12"
          },
          selectedMode: false,
          formatter: function(params) {
            return params === "完成" ? `${params}:${parseInt(finished)}` : "";
          }
        },
        series: [
          {
            name: "开累完成产值比例",
            type: "pie",
            center: ["50%", "42%"],
            radius: ["40%", "60%"],
            color: [`${rendercolor}`, "#066eab"],
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: finished, name: "完成" },
              { value: monthly.remained, name: "剩余" }
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
  async mounted() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)"
    });
    await this.initData();
    loading.close();
    this.$nextTick(() => {
      // this.echarts_1();
      this.echarts_5();
      this.echarts_51();
      // this.echarts();
    });
  },
  created() {
    const _date = new Date();
    let mm =_date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth();
    this.ny = `${_date.getFullYear()}-${mm}`;
    this.fetchHomeMap();
    // this.initData();
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
.head {
  position:relative;
}
.head .left {
  position:absolute;
  width:100px;
  z-index:999
}
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
.map-info-wrapper{
  position:absolute;
  /* top:0; */
  right:0;
  bottom:0;
  z-index:999;
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

