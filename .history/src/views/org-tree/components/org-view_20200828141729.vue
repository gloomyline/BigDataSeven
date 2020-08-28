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
         collapsable
		:render-content="renderContent"
		@on-expand="onExpand"
      ></v-org-tree>
    </div>
  </div>
</template>
 
<script>
import { on, off } from '@/api/tools'

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
    data: Object
  },
  data () {
    return {
      currentContextMenuId: '',
      orgTreeOffsetLeft: 0,
      orgTreeOffsetTop: 0,
      initPageX: 0,
      initPageY: 0,
      oldMarginLeft: 0,
      oldMarginTop: 0,
      canMove: false
    }
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
    goPro(projectId,projectname) {
      this.$router.push({
        name: 'HumanDetailsNew',
        params: { projectId: projectId, projectName:projectname},
      })
    },
    handleNodeClick (e, data, expand) {
		console.log("e, data, expand",data);
		this.goPro(data.id,data.label);
      //expand()
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
	},
	onExpand(e, data) {
		debugger
	  if ("expand" in data) {
		  debugger;
		data.expand = !data.expand;
		if (!data.expand && data.children) {
		  this.collapse(data.children);
		}
	  } else {
		this.$set(data, "expand", true);
	  }
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
	expandChange() {
	  this.toggleExpand(this.data, this.expandAll);
	},
	toggleExpand(data, val) {
	  var _this = this;
	  if (Array.isArray(data)) {
		data.forEach(function(item) {
		  _this.$set(item, "expand", val);
		  if (item.children) {
			_this.toggleExpand(item.children, val);
		  }
		});
	  } else {
		this.$set(data, "expand", val);
		if (data.children) {
		  _this.toggleExpand(data.children, val);
		}
	  }
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