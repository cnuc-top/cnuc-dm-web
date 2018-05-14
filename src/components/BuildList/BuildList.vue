<style lang='stylus'>
@require '../../styles/cnuc/var/color.styl';

.build-list {
  .build-item {
    margin-bottom: 24px;
    cursor: pointer;
    border-radius: 2px;
    overflow: hidden;
    transition: 0.15s;
    background: #FFF;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  }
}
</style>
<template>
  <div class="build-list">
    <el-row :gutter="24">
      <el-col :span="8" v-for="(item, index) in data" :key="index">
        <build-item @click="handleClick" :show-mode="showMode" :data="item"></build-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import BuildItem from '@/components/BuildList/BuildItem'
import { BUILD_SHOW_MODE } from '@/common/const/cnuc'

export default {
  components: { BuildItem },

  props: {
    showMode: {
      type: Number,
      default: BUILD_SHOW_MODE.MEDIA
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {
    handleClick(data) {
      this.$emit('click', data)
    }
  }
}
</script>
