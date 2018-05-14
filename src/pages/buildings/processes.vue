<style lang='stylus' scoped>
</style>
<template>
  <div class="page dm-page">
    <el-container>
      <el-aside>
        <dm-list :data="list"></dm-list>
      </el-aside>
      <el-main>
        <div class="dm-header">
          <el-radio-group v-model="showMode">
            <el-radio label="1" border v-for="(item, index) in BUILD_SHOW_MODE_DETAIL" :key="item.id" :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </div>
      </el-main>
    </el-container>

    <!-- <div class="dm-main">
        <build-list @click="dialogUpdateOpen" :show-mode="showMode" :data="list"></build-list>
      <el-pagination @size-change="handleSizeChange" @current-change="initList" :current-page.sync="page" :page-sizes="[10, 20, 30, 40]" :page-size.sync="limit" :total="total" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div> -->

    <el-dialog :close-on-click-modal="false" class="dialog-build-svg" :title="rowDialog.title" :visible.sync="rowDialog.visible">
      <build :data="rowDialog.form"></build>

      <el-table :data="rowDialog.form.processes" style="width: 100%">
        <el-table-column prop="viewDate" label="日期"></el-table-column>
        <el-table-column prop="basic" label="基础结构" width="80"></el-table-column>
        <el-table-column prop="layers" label="主体结构" width="80"></el-table-column>
        <el-table-column prop="seconds" label="二次结构" width="80"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleProcessDelete(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>

      </el-table>

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
import DmList from '@/components/DmList/DmList'

export default {
  components: { DmList, Build, BuildList },
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

    handleProcessAdd() {
      this.rowDialog.form.svgfiles.push(deepClone(SVGFILE_FORM))
    },

    async handleProcessCreate(data) {
      const bid = this.rowDialog.form.id
      data.bid = bid
      const ret = await BTL.svgfileCreate(data)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      data.id = ret.id
    },

    async handleProcessDelete(data, index) {
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

    async handleProcessUpdate(data) {
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
