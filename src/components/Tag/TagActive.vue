<style lang='stylus'>
</style>
<template>
  <div>
    <el-tag v-if="data" type="success">通过</el-tag>
    <el-tag v-else type="info">未通过</el-tag>
  </div>
</template>

<script>
export default {
  components: {},

  props:{
    data: Boolean
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() {},

  methods: {}
}
</script>
