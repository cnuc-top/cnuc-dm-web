<style lang='stylus'>
</style>
<template>
  <div>{{name}}</div>
</template>

<script>
import { COMPANY_TYPE_DETAIL } from '@/common/const/cnuc'

export default {
  components: {},

  props: {
    data: [String, Number]
  },

  data() {
    return {
    }
  },

  computed: {
    name() {
      return COMPANY_TYPE_DETAIL.find(_ => _.id === this.data)['name']
    }
  },

  mounted() { },

  methods: {}
}
</script>
