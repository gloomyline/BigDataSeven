<template>
    <div class="department-outer">
      <div class="zoom-box">
        <zoom-controller v-model="zoom" :min="20" :max="200"></zoom-controller>
      </div>
      <div class="view-box">
        <org-view 
          v-if="data"
          :data="data"
          :zoom-handled="zoomHandled"
        ></org-view>
      </div>
    </div>
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
  name: 'org_tree_page',
  components: {
    OrgView,
    ZoomController
  },
  methods:{
	  goPro(projectId,projectname) {
		this.$router.push({
		  name: 'HumanDetailsNew',
		  params: { projectId: projectId, projectName:projectname},
		})
	  },
  },
  created() {
	  console.log("asdfasdf")
	  HumanNewApi.fetchGetEmpOrganizationData().then((res)=>{
		  this.data= res.data[0]
		  console.log("this.data",this.data)
	  })
  },
  mounted(){
      console.log("viewbo哈哈哈x")
      console.log("view-box",$(".view-box"))
      let btn=$(".org-tree-node-btn")[0]
      console.log("btn77777777777777777",btn)
      btn.click()
    
  },

  data() {
    return {
      data: {
        id: 0,
        label: '中铁大桥局第七工程有限公司',
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
            label: '湖北分公司'
          },
          {
            id: 6,
            label: '城轨分公司'
          },
          {
            id: 77,
            label: '房建分公司'
          },
          {
            id: 98,
            label: '西北分公司'
          },
          {
            id: 114,
            label: '独立项目部'
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
  methods: {
    setDepartmentData(data) {
      data.isRoot = true
      return data
    },

/*    handleMenuClick({ data, key }) {
      console.log("gsdgfsdgf",data, key)
	  //this.goPro(data.id,data.name);
      this.$Message.success({
        duration: 5,
        content: `点击了《${data.label}》节点的'${menuDic[key]}'菜单`
      })
    }, */
    /* getDepartmentData() {
      getOrgData().then(res => {
        const { data } = res
        this.data = data
      })
    } */
  },
  mounted() {
    //this.getDepartmentData()
  }
}
</script>
 

<style>
</style>