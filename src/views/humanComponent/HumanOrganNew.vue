<template>
	<div>
		<tree></tree>
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
			console.log("treeeee $(.view-box)[0]",$(".view-box"))
			
			// let btn=$(".view-box")[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].childNodes[0]
			this.$nextTick(()=>{
				timer=setTimeout(function(){
					let btn=$(".org-tree-node-btn")[0]
					btn.click()
				 }, 3000);
				
			})
			
			
			
		},
		updated(){
			
		}
	}
	
</script> 
<style>
 /* ... */
</style>
