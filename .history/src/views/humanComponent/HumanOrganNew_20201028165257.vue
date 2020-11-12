<template>
	<div>
		<tree ref="tree" :ny="ny"></tree>
	</div>
</template>
<script>

	import tree from "../org-tree/index.vue";
	export default {
    // provide:["ny"],
    props:["ny"],
		name:"humanOrganNew",
		components:{
			tree
		},
		mounted(){
      // console.log("$ref tree tree",this.$refs.tree)
    console.log("tree ny",this.ny)
		this.$nextTick(()=>{
                setTimeout(function(){
                    let btn=$(".org-tree-node-btn")[0]
                    btn.click()
                 }, 600);
                
            })
		}
	}
	
</script> 
<style>
 /* ... */
</style>
