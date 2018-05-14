<style lang='stylus'>
</style>
<template>
  <div class="dm-list">
    <ul>
      <li class="dm-list-item" v-for="item in data" :key="item.id">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    data: Array
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
