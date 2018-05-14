<style lang='stylus'>
</style>
<template>
  <div class="page page-dm">
    <div class="dm-main">
      <el-row :gutter="24">
        <el-col :span="8">
          <div class="dm-card">
            <build :process="process" :data="data"></build>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="dm-card">
            <el-tabs v-model="activeName">
              <el-tab-pane label="进度管理" name="进度管理">
                <processes :data="processes" :info="info"></processes>
              </el-tab-pane>
              <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import BTL from '@/common/api/btl'
import Build from '@/components/Build/Build'
import Processes from './processes'
export default {
  components: { Build, Processes },

  props: {
  },

  data() {
    return {
      id: null,
      data: null,
      info: {},
      processes: [],
      process: {},
      activeName: '进度管理',
    }
  },

  computed: {},

  mounted() {
    this.id = this.$route.params.id
    this.init()
  },

  methods: {
    async init() {
      const data = await BTL.buildingId(this.id)
      const { processes } = data
      this.processes = processes
      this.data = data
      this.info = data
    }
  }
}
</script>
