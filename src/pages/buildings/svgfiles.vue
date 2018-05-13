<style lang='stylus' scoped>
</style>
<template>
  <div class="page dm-page">
    <div class="dm-header">

    </div>
    <div class="dm-main">
      <div class="">
        <build-list :data="list"></build-list>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="initList" :current-page.sync="page" :page-sizes="[10, 20, 30, 40]" :page-size.sync="limit" :total="total" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <el-dialog :title="rowDialog.title" :visible.sync="rowDialog.visible">
      <el-form :model="rowDialog.form" label-width="100px">
        <el-row>
          <el-col :span="12">

          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rowDialog.visible = false">取 消</el-button>
        <el-button v-if="rowDialog.mode === DIALOG_MODE.CREATE" type="primary" @click="handleSvgFilesCreate">添 加</el-button>
        <el-button v-if="rowDialog.mode === DIALOG_MODE.UPDATE" type="primary" @click="handleSvgFilesUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BTL from '@/common/api/btl'
import { deepClone } from '@/utils/object'
import { DIALOG_MODE, DIALOG_MODE_DETAIL } from '@/common/const'
import { BUILD_INFO } from '@/common/const/form'
import BuildList from '@/components/BuildList/BuildList'

export default {
  components: { BuildList },
  data() {
    return {
      DIALOG_MODE,
      city: '',
      list: [],
      page: 1,
      limit: 10,
      total: null,
      rowDialog: {
        mode: DIALOG_MODE.CREATE,
        title: null,
        visible: false,
        form: BUILD_INFO
      }
    }
  },

  computed: {},

  mounted() {
    this.initList()
  },

  methods: {
    async initList() {
      const { city, page, limit } = this
      const params = {
        city,
        page,
        limit
      }
      const { data } = await BTL.buildingList(params)
      const { list, total } = data
      this.list = list
      this.total = total
    },

    handleSizeChange(limit) {
      this.limit = limit
      this.initList()
    },

    async handleSvgFilesCreate() {
      const data = this.rowDialog.form
      const ret = await BTL.buildingCreate(data)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.initList()
      setTimeout(() => {
        this.rowDialog.visible = false
      }, 300)
    },

    async handleSvgFilesUpdate() {
      const data = this.rowDialog.form
      const ret = await BTL.buildingUpdate(data.id, data)
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.initList()
      setTimeout(() => {
        this.rowDialog.visible = false
      }, 300)
    },

    dialogCreateOpen() {
      this.rowDialog.title = DIALOG_MODE_DETAIL.find(_ => _.id === DIALOG_MODE.CREATE)['title']
      this.rowDialog.mode = DIALOG_MODE.CREATE

      console.log(deepClone(BUILD_INFO))
      this.rowDialog.form = deepClone(BUILD_INFO)
      this.rowDialog.visible = true
    },

    dialogUpdateOpen(key) {
      this.rowDialog.title = DIALOG_MODE_DETAIL.find(_ => _.id === DIALOG_MODE.UPDATE)['title']
      this.rowDialog.mode = DIALOG_MODE.UPDATE
      this.rowDialog.form = deepClone(this.list[key])
      this.rowDialog.visible = true
    }
  }
}
</script>
