<style lang='stylus'>
.contribute-img {
  width: 125px;
}
</style>
<template>
  <div class="page dm-page">
    <div class="dm-header">
      <el-button type="primary" @click.native.prevent="dialogCreateOpen">添加贡献</el-button>
    </div>
    <div class="dm-main">
      <div class="dm-card">
        <el-table :data="data">
          <el-table-column prop="picUrl" label="图片">
            <template slot-scope="scope">
              <img class="contribute-img" :src="scope.row.picUrl" alt="">
            </template>
          </el-table-column>
          <el-table-column prop="viewDate" label="日期">
          </el-table-column>
          <el-table-column prop="building.name" label="建筑">
          </el-table-column>
          <el-table-column prop="isActive" label="是否通过" width="100">
            <template slot-scope="scope">
              <tag-active :data="scope.row.isActive"></tag-active>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="创建时间">
            <template slot-scope="scope">
              {{scope.row.created_at | dateTime}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click.native.prevent="dialogUpdateOpen(scope.row)" size="small">编辑</el-button>
              <el-button @click.native.prevent="handleContributeDelete(scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-pagination @size-change="handleSizeChange" @current-change="initList" :current-page.sync="page" :page-sizes="[10, 20, 30, 40]" :page-size.sync="limit" :total="total" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <el-dialog :title="rowDialog.title" :visible.sync="rowDialog.visible">
      <el-form :model="rowDialog.form" label-width="100px">

        <el-form-item label="日期">
          <el-date-picker v-model="rowDialog.form.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="rowDialog.form.content"></el-input>
        </el-form-item>

        <el-form-item label="建筑">
          <el-input v-model="rowDialog.form.bid"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-radio-group v-model="rowDialog.form.type">
            <el-radio v-for="item in CONTRIBUTE_TYPE_DETAIL" :key="item.id" :label="item.id" border>{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="图片">
          <dm-upload :src.sync="rowDialog.form.picUrl"></dm-upload>
        </el-form-item>

        <el-form-item label="审核" v-if="rowDialog.mode === DIALOG_MODE.UPDATE">
          <el-checkbox v-model="rowDialog.form.isActive" label="通过审核" border></el-checkbox>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rowDialog.visible = false">取 消</el-button>
        <el-button v-if="rowDialog.mode === DIALOG_MODE.CREATE" type="primary" @click="handleContributeCreate">添 加</el-button>
        <el-button v-if="rowDialog.mode === DIALOG_MODE.UPDATE" type="primary" @click="handleContributeUpdate">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import BTL from '@/common/api/btl'
import { deepClone } from '@/utils/object'
import TagActive from '@/components/Tag/TagActive'
import DmUpload from '@/components/DmUpload/DmUpload'
import { DIALOG_MODE, DIALOG_MODE_DETAIL } from '@/common/const'
import { CONTRIBUTE_FORM } from '@/common/const/form'
import { CONTRIBUTE_TYPE, CONTRIBUTE_TYPE_DETAIL } from '@/common/const/cnuc'

export default {
  components: { TagActive, DmUpload },

  props: {
  },

  data() {
    return {
      DIALOG_MODE,
      CONTRIBUTE_TYPE_DETAIL,
      data: [],
      page: 1,
      limit: 10,
      total: null,
      rowDialog: {
        mode: DIALOG_MODE.CREATE,
        title: null,
        visible: false,
        form: {}
      }
    }
  },

  computed: {},

  mounted() {
    this.initList()
  },

  methods: {
    handleSizeChange(limit) {
      this.limit = limit
      this.initList()
    },

    dialogCreateOpen() {
      this.rowDialog.title = DIALOG_MODE_DETAIL.find(_ => _.id === DIALOG_MODE.CREATE)['title']
      this.rowDialog.mode = DIALOG_MODE.CREATE
      this.rowDialog.form = deepClone(CONTRIBUTE_FORM)
      this.rowDialog.visible = true
    },

    dialogUpdateOpen(data) {
      this.rowDialog.title = DIALOG_MODE_DETAIL.find(_ => _.id === DIALOG_MODE.UPDATE)['title']
      this.rowDialog.mode = DIALOG_MODE.UPDATE
      this.rowDialog.form = deepClone(data)
      this.rowDialog.visible = true
    },

    async handleContributeCreate() {
      const data = this.rowDialog.form
      const ret = await BTL.contributeCreate(data)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.initList()
      setTimeout(() => {
        this.rowDialog.visible = false
      }, 300)
    },

    async handleContributeDelete(data) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await BTL.contributeDelete(data.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.initList()
      })
    },

    async handleContributeUpdate() {
      const data = this.rowDialog.form
      const ret = await BTL.contributeUpdate(data.id, data)
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.initList()
      setTimeout(() => {
        this.rowDialog.visible = false
      }, 300)
    },


    async initList() {
      const { city, page, limit } = this
      const params = {
        page,
        limit
      }

      const { data } = await BTL.contributeList(params)
      const { list, total } = data
      this.data = list
      this.total = total
    }
  }
}
</script>
