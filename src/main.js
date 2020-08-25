import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/Initialize.css';
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view';
import { currency } from '@/assets/js/utils.js';
import Vue2OrgTree from 'vue2-org-tree';

import { directive as clickOutside } from 'v-click-outside-x';
import OrgTree from 'v-org-tree';
import 'v-org-tree/dist/v-org-tree.css';
 
Vue.use(OrgTree);
// 下面这个在注册完Vue指令后面
Vue.directive('clickOutside', clickOutside);

Vue.use(Vue2OrgTree);
Vue.use(dataV);
Vue.config.productionTip = false;
var html = document.documentElement;
var width = html.getBoundingClientRect().width;
html.style.fontSize = width / 20 + 'px'; //至于除数20可自行设置

Vue.use(ElementUI);

Vue.prototype.$utils = {
  currency,
}

new Vue({
  router,
  filters: {
    currency,
  },
  render: h => h(App)
}).$mount('#app')
