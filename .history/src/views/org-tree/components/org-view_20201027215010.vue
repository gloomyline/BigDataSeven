<template>
  <div
    ref="dragWrapper"
    class="org-tree-drag-wrapper"
    @mousedown="mousedownView"
    @contextmenu="handleDocumentContextmenu"
  >
    <div class="org-tree-wrapper" :style="orgTreeStyle">
      <v-org-tree
        v-if="data"
        :data="data"
        @on-node-click="handleNodeClick"
		@on-expand="onExpand"
        :collapsable="true"
		:render-content="renderContent"
		:horizontal="false"
		:expandAll="expandAll"
      ></v-org-tree>
    </div>
  </div>
</template>
<script>
import { on, off } from '@/api/tools'
import Vue from 'vue'
import OrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
Vue.use(OrgTree)

const menuList = [
  {
    key: 'edit',
    label: '编辑'
  },
  {
    key: 'detail',
    label: '查看'
  },
  {
    key: 'new',
    label: '新增'
  },
  {
    key: 'delete',
    label: '删除'
  }
]
export default {
  name: 'OrgView',
  props: {
    zoomHandled: {
      type: Number,
      default: 1
    },
    data: Object,
    ny
  },
  data () {
    return {
	  expandAll:false,
      currentContextMenuId: '',
      orgTreeOffsetLeft: 0,
      orgTreeOffsetTop: 0,
      initPageX: 0,
      initPageY: 0,
      oldMarginLeft: 0,
      oldMarginTop: 0,
      canMove: false,
    }
  },
  created() {
  },
  computed: {
    orgTreeStyle () {
      return {
        transform: `translate(-50%, -50%) scale(${this.zoomHandled}, ${
          this.zoomHandled
        })`,
        marginLeft: `${this.orgTreeOffsetLeft}px`,
        marginTop: `${this.orgTreeOffsetTop}px`
      }
    }
  },
  methods: {
	  onExpand(e,data) {
			this.clickShowTag(event);
	 },
  clickShowTag(event){
      const { pageX, pageY } = event
      console.log("event")
      if(pageX == 0 )return;
      // this.initPageX = window.pageXOffset+document.body.clientWidth/2
      // this.initPageY = window.pageYOffset+document.body.clientHeight/2
      this.orgTreeOffsetLeft = document.body.clientWidth/2 - pageX
      // this.orgTreeOffsetTop = pageY -this.initPageY
      // this.oldMarginLeft = this.orgTreeOffsetLeft
      // this.oldMarginTop = this.orgTreeOffsetTop
    },
	     /**
	      * 获取顶部div的距离
	      */
	     getParentTop (e) {
	       var offset = e.offsetTop
	       if (e.offsetParent != null) {
	         offset += this.getParentTop(e.offsetParent)
	       }
	       return offset
	     },
	     /**
	      * 获取左侧div的距离
	      */
	     getParentLeft (e) {
	       var offset = e.offsetLeft
	       if (e.offsetParent != null) {
	         offset += this.getParentLeft(e.offsetParent)
	       }
	       return offset
	     },
	 collapse(list) {
	   var _this = this;
	   list.forEach(function(child) {
		 if (child.expand) {
		   child.expand = false;
		 }
		 child.children && _this.collapse(child.children);
	   });
	 },
	  myToggleExpand(data, val) {
	      var _this = this;
	      if (Array.isArray(data)) {
	          data.forEach(function(item) {
	            _this.$set(item, "expand", val);
	            if (item.children) {
	              _this.myToggleExpand(item.children, val);
	            }
	          });
	      } else {
	          this.$set(data, "expand", val);
	          if (data.children) {
	            _this.myToggleExpand(data.children, val);
	          }
	      }
	  },
	  expandChange() {
	    this.myToggleExpand(this.data, this.expandAll);
	  },
    goPro(id,name,ny) {
      this.$router.push({
        name: 'HumanDetailsNew',
        params: { id: id, name:name,ny:this.ny},
      })
    },
    handleNodeClick (e, data, expand) {
    console.log("e, data, expand",data);
    console.log("我跳转了11111111111111111111111111111111")
    console.log("porjecgtid",data.id,data.label)
		this.goPro(data.id, data.label);
    },
    contextmenu (data, $event) {
      let event = $event || window.event
      event.preventDefault
        ? event.preventDefault()
        : (event.returnValue = false)
      this.currentContextMenuId = data.id
    },
    setDepartmentData (data) {
      data.isRoot = true
      this.departmentData = data
    },
    mousedownView (event) {
      this.canMove = true
      this.initPageX = event.pageX
      this.initPageY = event.pageY
      this.oldMarginLeft = this.orgTreeOffsetLeft
      this.oldMarginTop = this.orgTreeOffsetTop
      on(document, 'mousemove', this.mousemoveView)
      on(document, 'mouseup', this.mouseupView)
    },
    mousemoveView (event) {
      if (!this.canMove) return
      const { pageX, pageY } = event
      this.orgTreeOffsetLeft = this.oldMarginLeft + pageX - this.initPageX
      this.orgTreeOffsetTop = this.oldMarginTop + pageY - this.initPageY
    },
    mouseupView () {
      this.canMove = false
      off(document, 'mousemove', this.mousemoveView)
      off(document, 'mouseup', this.mouseupView)
    },
    handleDropdownClick (event) {
      event.stopPropagation()
    },
    handleDocumentContextmenu () {
      this.canMove = false
    },
    handleContextMenuClick (data, key) {
      this.$emit('on-menu-click', { data, key })
    },
	renderContent(h, data) {
	   return data.label;
	}
  },
  watch: {
	  expandAll: function expandAll(status) {
	    this.myToggleExpand(this.data, status);
	  }
  },
  mounted () {
    on(document, 'mousedown', this.mousedownView)
    on(document, 'contextmenu', this.handleDocumentContextmenu)
  },
  beforeDestroy () {
    off(document, 'mousedown', this.mousedownView)
    off(document, 'contextmenu', this.handleDocumentContextmenu)
  }
}
</script>
<style>
</style>