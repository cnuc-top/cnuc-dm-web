<style lang='stylus' scoped>
</style>
<template>
  <div class="page dm-page">
    <div class="dm-header">
      <el-radio-group v-model="showMode">
        <el-radio label="1" border v-for="(item, index) in BUILD_SHOW_MODE_DETAIL" :key="item.id" :label="item.id">{{item.name}}</el-radio>
      </el-radio-group>
    </div>
    <div class="dm-main">
      <div class="">
        <build-list @click="dialogUpdateOpen" :show-mode="showMode" :data="list"></build-list>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="initList" :current-page.sync="page" :page-sizes="[10, 20, 30, 40]" :page-size.sync="limit" :total="total" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>

    <el-dialog :close-on-click-modal="false" class="dialog-build-svg" :title="rowDialog.title" :visible.sync="rowDialog.visible">
      <build :data="rowDialog.form"></build>
      <el-tabs @tab-add="handleSvgfileAdd" tab-position="left">
        <el-tab-pane v-for="(item, index) in svgfiles" :key="index" :name="index + ''" :label="item.name">
          <el-form label-position="left" :model="rowDialog.form" label-width="60px">
            <el-form-item label="内容">
              <el-input type="textarea" v-model="item.content"></el-input>
            </el-form-item>
            <el-form-item label="颜色">
              <el-color-picker v-model="item.fill" show-alpha :predefine="predefineColors"></el-color-picker>
            </el-form-item>
            <el-form-item label="类型">
              <el-radio-group v-model="item.type">
                <el-radio v-for="item in SVGFILE_TYPE_DETAIL" :key="item.id" :label="item.id" border>{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleSvgfileAdd">添加</el-button>
              <el-button v-if="!item.id" type="primary" @click="handleSvgfileCreate(item)">确定</el-button>
              <el-button v-if="item.id" type="primary" @click="handleSvgfileUpdate(item)">更新</el-button>
              <el-button v-if="item.id" @click="handleSvgfileDelete(item, index)">删除</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="rowDialog.visible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BTL from '@/common/api/btl'
import { deepClone } from '@/utils/object'
import { BUILD_SHOW_MODE, BUILD_SHOW_MODE_DETAIL, SVGFILE_TYPE_DETAIL, SVG_FILL_COLORS } from '@/common/const/cnuc'
import { DIALOG_MODE } from '@/common/const'
import { SVGFILE_FORM } from '@/common/const/form'
import Build from '@/components/Build/Build'
import BuildList from '@/components/BuildList/BuildList'

export default {
  components: { Build, BuildList },
  data() {
    return {
      showMode: BUILD_SHOW_MODE.STRUCTURE,
      BUILD_SHOW_MODE_DETAIL,
      DIALOG_MODE,
      SVGFILE_TYPE_DETAIL,
      predefineColors: SVG_FILL_COLORS,
      city: '',
      list: [],
      page: 1,
      limit: 10,
      total: null,
      rowDialog: {
        mode: DIALOG_MODE.CREATE,
        title: '编辑',
        visible: false,
        form: {}
      }
    }
  },

  computed: {
    svgfiles() {
      const { svgfiles } = this.rowDialog.form
      if (svgfiles) {
        svgfiles.forEach((item, index) => {
          const typeName = SVGFILE_TYPE_DETAIL.find(_ => _.id === item.type)['name']
          item['name'] = `${typeName}-${item.id || 'new'}`
        })
        return svgfiles
      }
    }
  },

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

    handleSvgfileAdd() {
      this.rowDialog.form.svgfiles.push(deepClone(SVGFILE_FORM))
    },

    async handleSvgfileCreate(data) {
      const bid = this.rowDialog.form.id
      data.bid = bid
      const ret = await BTL.svgfileCreate(data)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      data.id = ret.id
    },

    async handleSvgfileDelete(data, index) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await BTL.svgfileDelete(data.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.svgfiles.splice(index, 1)
      })
    },

    async handleSvgfileUpdate(data) {
      const ret = await BTL.svgfileUpdate(data.id, data)
      this.$message({
        message: '修改成功',
        type: 'success'
      })
    },

    dialogUpdateOpen(data) {
      this.rowDialog.mode = DIALOG_MODE.UPDATE
      data = deepClone(data)
      this.rowDialog.form = data
      this.rowDialog.visible = true
    }
  }
}
</script>
