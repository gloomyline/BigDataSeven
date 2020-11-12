<template>
  <div class="labourServicesDetails">
    <div class="head">
      <h1>{{htitle}}详情</h1>
      <div class="weather">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          round
          @click="goBack('-1')"
        >返回</el-button>
      </div>
    </div>

    <!-- 表格区域 -->
	
	<template  v-if="isdataOnly">
		<!-- 
		<ul id ="table">
			<li><div class="title">企业:</div><div class="conent">ubCompanyName</div></li>
			<li><div class="title">企业:</div><div class="conent">ubCompanyName</div></li>
			
			
		</ul> -->
		<table id="tableone">
			<tbody>
				
				<tr>
					<td>企业</td>
					<td>{{data[0].subCompanyName}}</td>
					<td>分包类别</td>
					<td>{{data[0].subType}}</td>
					<td>是否合格</td>
					<td>{{data[0].qualified}}</td>
				</tr>
				<tr>
					<td>资信等级</td>
					<td>{{data[0].creditRating}}</td>
					<td>法定代表人姓名</td>
					<td>{{data[0].legalPerson}}</td>
					<td>委托代理人姓名</td>
					<td>{{data[0].client}}</td>
				</tr>
				<tr>
					<td>联系电话</td>
					<td>{{data[0].tel}}</td>
					<td>准入证号</td>
					<td>{{data[0].groupAdmitNo}}</td>
					<td>准入时间</td>
					<td>{{data[0].groupAdmitTime}}</td>
				</tr>
				<tr>
					<td>推荐项目部</td>
					<td>{{data[0].recommendDept}}</td>
					<td>项目推荐人</td>
					<td>{{data[0].recommendPerson}}</td>
					<td>注册资本金(万元)</td>
					<td>{{data[0].registeredCapital}}</td>
				</tr>
				<tr>
					<td>统一社会信用代码</td>
					<td>{{data[0].creditCode}}</td>
					<td>安全生产许可证</td>
					<td>{{data[0].securityLicense}}</td>
					<td>资质证书编号</td>
					<td>{{data[0].qualificationNo}}</td>
				</tr>
				<tr>
					<td>分包作业范围</td>
					<td>{{data[0].subRange}}</td>
					<td>考核等级</td>
					<td>{{data[0].checkRating}}</td>
					<td>最近年审时间</td>
					<td>{{data[0].yearCarefulTime}}</td>
				</tr>
				<tr>
					<td>备注</td>
					<td>{{data[0].remark}}</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
		    
		    
	</template>
		
	<template v-else>
		<el-table 
		  :data="data"
		  row-key="id"
		  default-expand-all
		  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
		>
		
		<el-table-column prop="creditRating" label='资信等级' width=""></el-table-column>
		<el-table-column prop="legalPerson" label='法定代表人姓名' width=""></el-table-column>
		<el-table-column prop="client" label='委托代理人姓名' width=""></el-table-column>
		<el-table-column prop="tel" label='联系电话' width=""></el-table-column>
		<el-table-column prop="groupAdmitNo" label='准入证号' width=""></el-table-column>
		<el-table-column prop="groupAdmitTime" label='准入时间' width=""></el-table-column>
		<el-table-column prop="recommendDept" label='推荐项目部' width=""></el-table-column>
		<el-table-column prop="recommendPerson" label='项目推荐人' width=""></el-table-column>
		<el-table-column prop="registeredCapital" label='注册资本金(万元)' width=""></el-table-column>
		<el-table-column prop="creditCode" label='统一社会信用代码' width=""></el-table-column>
		<el-table-column prop="securityLicense" label='安全生产许可证' width=""></el-table-column>
		<el-table-column prop="qualificationNo" label='资质证书编号' width=""></el-table-column>
		<el-table-column prop="subRange" label='分包作业范围' width=""></el-table-column>
		<el-table-column prop="checkRating" label='考核等级' width=""></el-table-column>
		<el-table-column prop="yearCarefulTime" label='最近年审时间' width=""></el-table-column>
		<el-table-column prop="remark" label='备注' width=""></el-table-column>
		</el-table>
	</template>
	
<!--    <div class="table boxall">
      <p class="thead">
        <img class="img" src="@/assets/images/u563.png" />
        <span class="tilte">项目在用劳务企业月报表（2020年X月）</span>
      </p>
      <el-table
        :data="data"
        row-key="id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="name" label="序号" width="150"></el-table-column>
        <el-table-column prop="title" label="劳务分包企业名称" min-width="120"></el-table-column>
        <el-table-column prop="title1" label="集团准入证号" min-width="100"></el-table-column>
        <el-table-column prop="region" label="合同额（万元）"></el-table-column>
        <el-table-column prop="date" label="劳务人员数量（人）"></el-table-column>
        <el-table-column prop="date" label="其中骨干人员（人）"></el-table-column>
        <el-table-column prop="date" label="其它人员（人）"></el-table-column>
        <el-table-column prop="date" label="作业内容"></el-table-column>
      </el-table>
      <div class="boxfoot"></div>
    </div> -->
	
	
  </div>
</template>
<script>
import btnList from "@/components/BtnList.vue";
import { LabourServicesNewApi } from '@/api'
export default {
  name: "LabourServicesDetails",
  components: {
    btnList
  },
  created() {
	  // let params = {
		 // subconid : this.$route.params.subconid 
	  // };
	  let {page,limit,subconid} = this.$route.params;
  	  LabourServicesNewApi.fetchlabourconstructiondetailData(page,limit,subconid).then((res)=>{
  		  this.data= res.data;
		  if(this.data.length ==1){
			  this.isdataOnly =true
		  }
  		  console.log("this.data",this.data)
  	  })
  },
  data() {
    return {
	htitle:this.$route.params.comname,
	isdataOnly:false,
	data:[],
      tableData2: [
        {
          title: "安九铁路湖北段AJZQ-3标项目部",
          title1: "",
          region: "",
          date: "",
          id: "1",
          name: "",
          children: [
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "11",
              name: "1"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "12",
              name: "2"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "13",
              name: "3"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "14",
              name: "4"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "15",
              name: "5"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "16",
              name: "6"
            },
            {
              title: "",
              title1: "",
              region: "",
              date: "",
              id: "17",
              name: "8"
            }
          ]
        }
      ]
    };
  },
  mounted() {
  },
  beforeCreate() {
    const loading = this.$loading({
      lock: true,
      text: "页面加载中..",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 1)"
    });

    setTimeout(() => {
      loading.close();
    }, 2000);
  },
  methods: {
    goBack(res) {
      if (res) {
        this.$router.go(-1);
      } else {
        this.$router.push({ path: "/" });
      }
    },
    equSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 11) {
        return {
          rowspan: 666,
          colspan: 1
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
table#tableone {
	margin:20px auto;
	width:90%;
	color:#fff;
	border:1px solid #888;
	border-collapse:collapse;
}
table#tableone tr td{
	background:#0C2456;
	height:60px;
	font-size:14px;
	border:1px solid #888;
}

table#tableone tr td:nth-child(odd){
	background:#0C2456;
	font-size:16px;
}
.labourServicesDetails {
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