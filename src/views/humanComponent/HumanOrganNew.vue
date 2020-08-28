<template>
	<div>
		<tree ref="tree"></tree>
	</div>
</template>
<script>
	import tree from "../org-tree/index.vue";
	export default {
		name:"humanOrganNew",
		components:{
			tree
		},
		mounted(){

			this.$nextTick(()=>{
                setTimeout(function(){
                    let btn=$(".org-tree-node-btn")[0]
                    btn.click()
                 }, 400);
                
            })

		}
	}
	
</script> 
<style>
 /* ... */
</style>
