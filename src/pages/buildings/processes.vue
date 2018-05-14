<template>
  <div>
    <el-table @row-click="handleProcessPreview" :data="data" style="width: 100%">
      <el-table-column prop="viewDate" label="日期"></el-table-column>
      <el-table-column prop="basic" label="基础结构" width="80"></el-table-column>
      <el-table-column prop="layers" label="主体结构" width="80"></el-table-column>
      <el-table-column prop="seconds" label="二次结构" width="80"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="dialogUpdateOpen(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleProcessDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dm-table-footer">
      <el-button @click="dialogCreateOpen">添加进度</el-button>
    </div>
    <el-dialog :title="rowDialog.title" :visible.sync="rowDialog.visible">
      <el-form :model="rowDialog.form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="日期">
              <el-date-picker v-model="rowDialog.form.date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="基础结构">
              <el-slider :min="0" :max="100" v-model="rowDialog.form.basic"></el-slider>
            </el-form-item>
            <el-form-item label="主体结构">
              <el-slider :min="0" :max="info.layers" v-model="rowDialog.form.layers"></el-slider>
            </el-form-item>
            <el-form-item label="二次结构">
              <el-slider :min="0" :max="info.layers" v-model="rowDialog.form.seconds"></el-slider>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rowDialog.visible = false">取 消</el-button>
        <el-button v-if="rowDialog.mode === DIALOG_MODE.CREATE" type="primary" @click="handleProcessCreate">添 加</el-button>
        <el-button v-if="rowDialog.mode === DIALOG_MODE.UPDATE" type="primary" @click="handleProcessUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BTL from '@/common/api/btl'
import { deepClone } from '@/utils/object'
import { DIALOG_MODE, DIALOG_MODE_DETAIL } from '@/common/const'
import { PROCESS_FORM } from '@/common/const/form'

export default {
  components: {  },
  props: {
    data: Array,
    info: Object
  },

  data() {
    return {
      DIALOG_MODE,
      rowDialog: {
        mode: null,
        title: '编辑',
        visible: false,
        form: {}
      }
    }
  },

  computed: {},

  mounted() { },

  methods: {
    init() {
      this.$emit('update')
    },

    handleProcessAdd() {
      this.rowDialog.form.svgfiles.push(deepClone(SVGFILE_FORM))
    },

    dialogCreateOpen() {
      this.rowDialog.title = DIALOG_MODE_DETAIL.find(_ => _.id === DIALOG_MODE.CREATE)['title']
      this.rowDialog.mode = DIALOG_MODE.CREATE
      this.rowDialog.form = deepClone(PROCESS_FORM)
      this.rowDialog.visible = true
    },

    dialogUpdateOpen(data) {
      this.rowDialog.title = DIALOG_MODE_DETAIL.find(_ => _.id === DIALOG_MODE.UPDATE)['title']
      this.rowDialog.mode = DIALOG_MODE.UPDATE
      this.rowDialog.form = deepClone(data)
      this.rowDialog.visible = true
    },

    async handleProcessCreate() {
      const data = this.rowDialog.form
      data.bid = this.id
      const ret = await BTL.processCreate(data)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.rowDialog.visible = false
      this.init()
    },

    async handleProcessDelete(data) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await BTL.processDelete(data.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.init()
      })
    },

    async handleProcessUpdate() {
      const data = this.rowDialog.form
      const ret = await BTL.processUpdate(data.id, data)
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.rowDialog.visible = false
      this.init()
    },

    handleProcessPreview(data) {
      console.log(this.data)
      this.process = data
    }
  }
}
</script>
