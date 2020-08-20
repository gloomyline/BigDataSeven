<template>
    <div>
    </div>
</template>
<script>
import { scrollBoard } from '@jiaminghi/data-view'
export default {
  name:'ExScrollBoard',
  mixins:[scrollBoard],
  props:{
    beforeChange:{
      type:Function,
      default:()=> Promise.resolve(true)
    }
  }
}
</script>