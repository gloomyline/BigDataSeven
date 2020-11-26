<template>
<div>
   <div class="chartTit1"> 职称情况</div> 
    <div id ="main" style ="height:500px;width:100%;margin:auto"></div> 
    
</div>

</template>
<script>
import { HumanNewApi  } from '@/api';
import echarts from "echarts";
export default {
    data(){
        return{
          professional:{}

        }
    },
      created(){
        this.getProfessionalTitle();
    },
   methods: {
        async getProfessionalTitle(){
        const res = await HumanNewApi.fetchprofessionalData();
        console.log(res)
        this.professional = res
        
        //console.log("this.professional",this.professional);
        this.plot(this.professional)
        },

        plot(data){
             var subject =[];
            var zgjgcs =[];
            var gjgcs =[];
            var gcs =[];
            var zg =[];
            var jsy =[];
            var gc = data.gc;
            var jj = data.jj;
            var kj =data.kj;
            var zgl = data.zg;
            var gr = data.gr;
            for(var i in data.rstj){
                zgjgcs.push(data.rstj[i].zgjgcs);
                gjgcs.push(data.rstj[i].gjgcs);
                gcs.push(data.rstj[i].gcs);
                zg.push(data.rstj[i].zg);
                jsy.push(data.rstj[i].jsy);
                subject.push(i);
                
            }
            var myChart = echarts.init(document.getElementById('main'));
          

           
            // 指定图表的配置项和数据
            var option = {
                    
                    color:['#76a0de','#abd8df','#54a2d5','#34a471','#ffb500'],
                    tooltip:{
                        show:true,
                        trigger :'axis',
                      formatter: function (params, ticket, callback) {
                        var str =""
                        params.forEach(item => {
                           if(item.axisValue == "工程类"){
                                 if(gc[item.seriesIndex] != undefined){
                                     str += `${gc[item.seriesIndex]} ${item.value} <br />`
                                }
                            } else if(item.axisValue =="经济类"){
                                if(jj[item.seriesIndex] != undefined){
                                    str += `${jj[item.seriesIndex]} ${item.value} <br />`
                                }
                            }else if(item.axisValue =="政工类"){
                                  if(zgl[item.seriesIndex] != undefined){
                                    str += `${zgl[item.seriesIndex]} ${item.value} <br />`
                                }
                          }else if(item.axisValue =="会计类"){
                                  if(kj[item.seriesIndex] != undefined){
                                    str += `${kj[item.seriesIndex]} ${item.value} <br />`
                                }
                            }else if(item.axisValue =="工人类"){
                                  if(gr[item.seriesIndex] != undefined){
                                    str += `${gr[item.seriesIndex]} ${item.value} <br />`
                                }
                            } 
                        })
                        
                        return ` ${params[0].axisValue} <br /> ${str} `
                      },
                    },
                    xAxis: {
                        type: 'category',
                        data: subject,
                        nameTextStyle: {
                            color: "rgba(255, 255,255, 1)",
                            borderColor: "rgba(255, 255, 255, 1)"
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255, 255, 255, 1)"
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                          nameTextStyle: {
                            color: "rgba(255, 255,255, 1)",
                            borderColor: "rgba(255, 255, 255, 1)"
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255, 255, 255, 1)"
                            }
                        }
                    },
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {
                            
                            type: 'bar',
                            stack:"smail",
                            data:zgjgcs
                        },
                        {
                            
                            type: 'bar',
                            stack:"smail",
                            data:gjgcs
                        },
                        {
                           
                            type: 'bar',
                            stack:"smail",
                            data:gcs
                        },
                        {
                            
                            type: 'bar',
                            stack:"smail",
                            data:zg
                        },
                        {
                            
                            type: 'bar',
                            data:jsy
                        },
                    ]
                }
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener('resize', () => {
                myChart.resize();
            });
        }
    },
}
</script>
<style scoped>
 .chartTit1 {
        padding: 0.15rem;
        color: #ffffff;
        font-size: 0.2rem;
        font-weight: bold;
      }
</style>