import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/production',
    name: 'Production',
    component: () => import( /* webpackChunkName: "production" */ '../views/Production.vue')
  },
  {
    path: '/productionNew',
    name: 'ProductionNew',
    component: () => import( /* webpackChunkName: "production" */ '../views/ProductionNew.vue')
  },
  {
    path: '/equipmentNew',
    name: 'EquipmentNew',
    component: () => import( /* webpackChunkName: "production" */ '../views/EquipmentNew.vue')
  },
  // {
  //   path: '/bigMainEquipment',
  //   name: 'bigMainEquipment',
  //   component: () => import( /* webpackChunkName: "production" */ '../views/Equipment/bigMainEquipment.vue')
  // },
  {
    path: '/labourServices',
    name: 'LabourServices',
    component: () => import( /* webpackChunkName: "labourServices" */ '../views/LabourServices.vue')
  },
  {
    path: '/labourServicesNew',
    name: 'LabourServicesNew',
    component: () => import( /* webpackChunkName: "labourServices" */ '../views/LabourServicesNew.vue')
  },
  {
    path: '/turnoverNew',
    name: 'TurnoverNew',
    component: () => import( /* webpackChunkName: "turnover" */ '../views/TurnoverNew.vue')
  },
  {
    path: '/turnover',
    name: 'Turnover',
    component: () => import( /* webpackChunkName: "turnover" */ '../views/Turnover.vue')
  },
  {
    path: '/human',
    name: 'Human',
    component: () => import( /* webpackChunkName: "human" */ '../views/Human.vue')
  },
  {
    path: '/humannew',
    name: 'HumanNew',
    component: () => import( /* webpackChunkName: "human" */ '../views/HumanNew.vue')
  },
  {
    path: '/finance',
    name: 'Finance',
    component: () => import( /* webpackChunkName: "finance" */ '../views/Finance.vue')
  },
  {
    path: '/districtBudgetDetail',
    name: 'DistrictBudgetDetail',
    component: () => import( /* webpackChunkName: "humanDetails" */ '../views/details/DistrictBudgetDetail.vue')
  },
  {
    path: '/equipment',
    name: 'Equipment',
    component: () => import( /* webpackChunkName: "equipment" */ '../views/Equipment.vue')
  },
  {
    path: '/engineering',
    name: 'Engineering',
    component: () => import( /* webpackChunkName: "engineering" */ '../views/Engineering.vue')
  },
  {
    path: '/EngineeringDetail/:deptId/:ny/:projectName',
    name: 'EngineeringDetail',
    component: () => import( /* webpackChunkName: "dispatch" */ '../views/details/EngineeringDetail.vue')
  },
  {
    path: '/EngineeringTableDetail/:deptId/:projectName',
    name: 'EngineeringTableDetail',
    component: () => import( /* webpackChunkName: "dispatch" */ '../views/details/EngineeringTableDetail.vue')
  },
  {
    path: '/dispatch',
    name: 'Dispatch',
    component: () => import( /* webpackChunkName: "dispatch" */ '../views/details/Dispatch.vue')
  },
  {
    path: '/dispatchNew/:id/:name/:ny',
    name: 'DispatchNew',
    component: () => import( /* webpackChunkName: "dispatch" */ '../views/details/DispatchNew.vue')
  },
  {
    path: '/LabourProjectDetails/:id/:name/:ny',
    name: 'LabourProjectDetails',
    component: () => import( /* webpackChunkName: "dispatch" */ '../views/details/LabourProjectDetails.vue')
  },
  {
    path: '/humanDetails',
    name: 'HumanDetails',
    component: () => import( /* webpackChunkName: "humanDetails" */ '../views/details/HumanDetails.vue')
  },
  {
    path: '/HumanInfoDetail',
    name: 'HumanInfoDetail',
    component: () => import( /* webpackChunkName: "HumanInfoDetail" */ '../views/details/HumanInfoDetail.vue')
  },

  //可调配人员名单个人信息详情
  {
    // path:'/HumanPersonInfoDetail/:deptId/:deptName/:projectname/:job',
    path:'/HumanPersonInfoDetail',
    name:'HumanPersonInfoDetail',
    component: () => import( /* webpackChunkName: "HumanInfoDetail" */ '../views/details/HumanPersonInfoDetail.vue')
  },
  


  {
    path: '/humanDetailsNew/:id/:name/:ny',
    name: 'HumanDetailsNew',
    component: () => import( /* webpackChunkName: "HumanDetails" */ '../views/details/HumanDetailsNew.vue')
  },
  {
    path: '/turnoverDetails/:id/:name/:ny',
    name: 'TurnoverDetails',
    props: true,
    component: () => import( /* webpackChunkName: "turnoverDetails" */ '../views/details/TurnoverDetails.vue')
  },
  {
    path: '/equipmentDetails',
    name: 'EquipmentDetails',
    component: () => import( /* webpackChunkName: "equipmentDetails" */ '../views/details/EquipmentDetails.vue')
  },
  {
    path: '/bigEquipmentDetails/:id/:name/:ny',
    name: 'BigEquipmentDetails',
    component: () => import( /* webpackChunkName: "equipmentDetails" */ '../views/details/BigEquipmentDetails.vue')
  },
  {
    path: '/tzEquipmentDetails',
    name: 'TZEquipmentDetails',
    component: () => import( /* webpackChunkName: "equipmentDetails" */ '../views/details/TZEquipmentDetails.vue')
  },
  {
    path: '/BigMainEquipmentDetails',
    name: 'BigMainEquipmentDetails',
    component: () => import( /* webpackChunkName: "equipmentDetails" */ '../views/details/BigMainEquipmentDetails.vue')
  },
  {
    path: '/labourServicesDetails',
    name: 'LabourServicesDetails',
    component: () => import( /* webpackChunkName: "labourServicesDetails" */ '../views/details/LabourServicesDetails.vue')
  },
  {
    path: '/labourSubconsByLevelDetail',
    name: 'LabourSubconsByLevelDetail',
    component: () => import( /* webpackChunkName: "labourServicesDetails" */ '../views/details/LabourSubconsByLevelDetail.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router