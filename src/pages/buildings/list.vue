<style lang='stylus' scoped>
</style>
<template>
  <div class="page dm-page">
    <div class="dm-header">
      <el-button type="primary" @click="dialogCreateOpen">添加</el-button>
    </div>
    <div class="dm-main">
      <div class="dm-card">
        <el-table :data="list">
          <el-table-column prop="id" label="ID" width="100">
          </el-table-column>
          <el-table-column prop="city" label="城市" width="100">
          </el-table-column>
          <el-table-column prop="name" label="名称">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
          <el-table-column prop="height" label="高度" width="180">
            <template slot-scope="scope">
              <span>
                {{ scope.row.height }} 米
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="layers" label="层数" width="180">
            <template slot-scope="scope">
              <span>
                {{ scope.row.layers }} 层
              </span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click.native.prevent="dialogUpdateOpen(scope.$index)" size="small">
                编辑
              </el-button>
              <router-link :to="'/buildings/buildings/' + scope.row.id">
                <el-button type="primary" size="small">进入</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="initList" :current-page.sync="page" :page-sizes="[10, 20, 30, 40]" :page-size.sync="limit" :total="total" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <el-dialog :title="rowDialog.title" :visible.sync="rowDialog.visible">
      <el-form :model="rowDialog.form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称">
              <el-input v-model="rowDialog.form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="CODE">
              <el-input v-model="rowDialog.form.code" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="封面图">
              <dm-upload class="building-uploader" :src.sync="rowDialog.form.picUrl"></dm-upload>
            </el-form-item>
            <el-form-item label="城市">
              <el-input v-model="rowDialog.form.city" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="rowDialog.form.address" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="宽度（米）">
              <el-input-number v-model="rowDialog.form.width" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="高度（米）">
              <el-input-number v-model="rowDialog.form.height" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="层数（层）">
              <el-input-number v-model="rowDialog.form.layers" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rowDialog.visible = false">取 消</el-button>
        <el-button v-if="rowDialog.mode === DIALOG_MODE.CREATE" type="primary" @click="handleBuildingCreate">添 加</el-button>
        <el-button v-if="rowDialog.mode === DIALOG_MODE.UPDATE" type="primary" @click="handleBuildingUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BTL from '@/common/api/btl'
import { deepClone } from '@/utils/object'
import { DIALOG_MODE, DIALOG_MODE_DETAIL } from '@/common/const'
import { BUILD_INFO } from '@/common/const/form'
import DmUpload from '@/components/DmUpload/DmUpload'
export default {
  components: { DmUpload },
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

    async handleBuildingCreate() {
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

    async handleBuildingUpdate() {
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
