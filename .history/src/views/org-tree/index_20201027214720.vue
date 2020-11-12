<template>
  <!-- <Card shadow style="height: 100%;width: 100%;overflow:hidden"> -->
    <div class="department-outer">
      <div class="zoom-box">
        <zoom-controller v-model="zoom" :min="20" :max="200"></zoom-controller>
      </div>
      <div class="view-box">
        <org-view
          v-if="data"
          :data="data"
          :zoom-handled="zoomHandled"
		   :horizontal="horizontal"
		   :collapsable="collapsable"

        ></org-view>
      </div>
    </div>
 <!-- </Card> -->
</template>
 
<script>
import OrgView from './components/org-view.vue'
import ZoomController from './components/zoom-controller.vue'
//import { getOrgData } from '@/api/data'
//import { Message } from 'element-ui';

import { HumanNewApi } from '@/api'

import './index.less'
const menuDic = {
  edit: '编辑部门',
  detail: '查看部门',
  new: '新增子部门',
  delete: '删除部门'
}
export default {
  props:["ny"],
  name: 'org_tree_page',
  components: {
    OrgView,
    ZoomController
  },
  beforeCreate () {
	  HumanNewApi.fetchGetEmpOrganizationData().then((res)=>{
		  this.data= res.data[0]
	  })
  },
  data() {
	return {
		expandAll: true,
		horizontal: false,
		collapsable: true,
		data: {
			id: 0,
			label: '大桥局七公司',
			expand: true,
			children: [
				{
				id: 2,
				label: '武汉分公司',
			  },
			  {
				id: 3,
				label: '华北分公司',
			  },
			  {
				id: 4,
				label: '湖北分公司',
			  },
			  {
				id: 6,
				label: '城轨分公司',
			  },
			  {
				id: 77,
				label: '房建分公司',
			  },
			  {
				id: 98,
				label: '西北分公司',
			  },
			  {
				id: 114,
				label: '独立项目部',
			  }
			]
		  },
		  zoom: 100
		}
	},
  computed: {
    zoomHandled() {
      return this.zoom / 100
    }
  },
  mounted () {
  },
  methods:{
  }
}
</script>
 

<style>
</style>