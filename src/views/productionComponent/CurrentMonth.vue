<template lang="html">
  <div class="current-month">
    <h2 class="title" style="height: 0.6rem; line-height: 0.6rem; font-size: 0.32rem;color: #fff;">下月项目施工计划</h2>
    <div class="talble-container">
      <el-table
        :data="tableData"
        height="8.6rem"
        border
        @row-click="openDetails"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="项目名称"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="plan"
          label="计划产值"
          min-width="180">
        </el-table-column>
      </el-table>     
    </div>
  </div>
</template>

<script>
  import { productionNewApi } from '@/api';
  export default {
    props: ['ny'],
    data() {
      return {
        month: '',
        year: '',
        tableData: [],
      };
    },
    created() {
      this.fetchPlannmonthData(this.ny)
    },
    watch:{
      ny:function(newValue,oldValue){
        this.fetchPlannmonthData(this.ny);      
      }

  },
    methods: {
      async fetchPlannmonthData() {
        const res = await productionNewApi.fetchPlannmonthData(this.ny);
        this.tableData = res.data;
      },
      openDetails(row){
        console.log("row--------",row)
        let id = ''
        let name = ''
          console.log("this.tableData--------",this.tableData)
          this.tableData && this.tableData.length > 0 && this.tableData.forEach((item, index) => {
            // console.log("indexindex",index)
            console.log("row.name",row.name)
            console.log("item",item)
            if(row.name === item.name) {
              id = item.id
              name = item.name
            }
          })
          this.$router.push({ 
            name: "DispatchNew",
            params: {
              id,
              name,
              ny: this.ny,
            }
        });
      },
    }
  }
</script>

<style lang="scss" scoped></style>