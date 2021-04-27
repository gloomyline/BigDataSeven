<template>
  <div id="app" >
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.layui-layer.layui-layer-page{
   background: #07329A !important;
}
.layui-layer .layui-layer-title{
  //  background: rgba(196, 125, 125, 0.1) !important;
    background: #072F8F !important;
   color:#fff;
   font-weight: bold;
   font-size:0.3rem;
}


// .layui-layer-setwin{
// background:#f00  !important;
// }
// .layui-layer-ico{
// background-size: cover;
//   background:url("./assets/images/layer_close.png") no-repeat !important;
// }
.layui-layer-setwin .layui-layer-close1 {
	    background-position: -179px -31px !important;
	cursor: pointer
}
.layui-layer-setwin a {
position: absolute !important;
width: 32px !important;
height: 40px !important;
 _overflow: hidden !important;
 
}
.layui-layer-setwin {
  
    right: 50px!important;
    top: 6px!important;
   
}
</style>
