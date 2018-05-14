<style lang='stylus'>
</style>
<template>
  <div>
    <el-table @row-click="handleProcessPreview" :data="data" style="width: 100%">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名称" width="80"></el-table-column>
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
              <el-date-picker v-model="rowDialog.form.date" type="date" placeholder="选择日期">
              </el-date-picker>
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
import { DIALOG_MODE, DIALOG_MODE_DETAIL } from '@/common/const'

export default {
  components: {},

  props:{
    info: Object
  },

  data() {
    return {
    }
  },

  computed: {},

  mounted() {


  },

  methods: {}
}
</script>
