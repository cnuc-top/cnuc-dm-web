<style lang='stylus'>
</style>
<template>
  <div class="page dm-page">
    <div class="dm-header">
      <el-button type="primary" @click="dialogCreateOpen">添加公司</el-button>
    </div>
    <div class="dm-main">
      <el-table :data="data" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80">></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            <company-type :data="scope.row.type"></company-type>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="dialogUpdateOpen(scope.row)" size="small">编辑</el-button>
            <el-button @click="handleCompanyDelete(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="rowDialog.title" :visible.sync="rowDialog.visible">
      <el-form :model="rowDialog.form" label-width="100px">
        <el-form-item label="名称">
          <el-input v-model="rowDialog.form.name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="rowDialog.form.type">
            <el-radio v-for="item in COMPANY_TYPE_DETAIL" :key="item.id" :label="item.id" border>{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="官网">
          <el-input v-model="rowDialog.form.webUrl"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rowDialog.visible = false">取 消</el-button>
        <el-button v-if="rowDialog.mode === DIALOG_MODE.CREATE" type="primary" @click="handleCompanyCreate">添 加</el-button>
        <el-button v-if="rowDialog.mode === DIALOG_MODE.UPDATE" type="primary" @click="handleCompanyUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BTL from '@/common/api/btl'
import { deepClone } from '@/utils/object'
import { DIALOG_MODE, DIALOG_MODE_DETAIL } from '@/common/const'
import { COMPANY_TYPE_DETAIL } from '@/common/const/cnuc'
import { COMPANY_FORM } from '@/common/const/form'
import CompanyType from '@/components/Company/CompanyType'

export default {
  components: { CompanyType },

  props: {
    info: Object
  },

  data() {
    return {
      DIALOG_MODE,
      COMPANY_TYPE_DETAIL,
      data: [],
      rowDialog: {
        visible: false,
        mode: null,
        title: null,
        form: {}
      }
    }
  },

  computed: {},

  mounted() {
    this.initList()
  },

  methods: {
    async initList() {
      this.data = await BTL.companyList()
    },

    dialogCreateOpen() {
      this.rowDialog.title = DIALOG_MODE_DETAIL.find(_ => _.id === DIALOG_MODE.CREATE)['title']
      this.rowDialog.mode = DIALOG_MODE.CREATE
      this.rowDialog.form = deepClone(COMPANY_FORM)
      this.rowDialog.visible = true
    },

    dialogUpdateOpen(data) {
      this.rowDialog.title = DIALOG_MODE_DETAIL.find(_ => _.id === DIALOG_MODE.UPDATE)['title']
      this.rowDialog.mode = DIALOG_MODE.UPDATE
      this.rowDialog.form = deepClone(data)
      this.rowDialog.visible = true
    },

    async handleCompanyCreate() {
      const data = this.rowDialog.form
      data.bid = this.id
      const ret = await BTL.companyCreate(data)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.rowDialog.visible = false
      this.initList()
    },

    async handleCompanyDelete(data) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await BTL.companyDelete(data.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.initList()
      })
    },

    async handleCompanyUpdate() {
      const data = this.rowDialog.form
      const ret = await BTL.companyUpdate(data.id, data)
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.rowDialog.visible = false
      this.initList()
    },


  }
}
</script>
