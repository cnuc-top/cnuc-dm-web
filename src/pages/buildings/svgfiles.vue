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

    <el-dialog class="dialog-build-svg" :title="rowDialog.title" :visible.sync="rowDialog.visible">
      <build :data="rowDialog.form"></build>
      <el-tabs @tab-add="handleAddSvgFile" @tab-remove="handleRemoveSvgFile" editable tab-position="left">
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
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button @click="rowDialog.visible = false">取 消</el-button>
        <el-button v-if="rowDialog.mode === DIALOG_MODE.UPDATE" type="primary" @click="handleSvgFilesUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BTL from '@/common/api/btl'
import { deepClone } from '@/utils/object'
import { BUILD_SHOW_MODE, BUILD_SHOW_MODE_DETAIL, SVGFILE_TYPE_DETAIL } from '@/common/const/cnuc'
import { DIALOG_MODE } from '@/common/const'
import { BUILD_INFO, SVGFILE_FORM } from '@/common/const/form'
import Build from '@/components/Build/Build'
import BuildList from '@/components/BuildList/BuildList'

export default {
  components: { Build, BuildList, BUILD_SHOW_MODE, BUILD_SHOW_MODE_DETAIL },
  data() {
    return {
      showMode: BUILD_SHOW_MODE.STRUCTURE,
      BUILD_SHOW_MODE_DETAIL,
      DIALOG_MODE,
      SVGFILE_TYPE_DETAIL,
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      city: '',
      list: [],
      page: 1,
      limit: 10,
      total: null,
      rowDialog: {
        mode: DIALOG_MODE.CREATE,
        title: '编辑',
        visible: false,
        form: BUILD_INFO
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

  watch: {

    svgfiles(val) {
      console.log(val)
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

    async handleSvgFilesCreate() {
      // const {oDa} = this.rowDialog.form
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
      const svgfiles = this.rowDialog.form
      const ret = await BTL.buildingUpdate(data.id, data)

      return
      this.$message({
        message: '修改成功',
        type: 'success'
      })
      this.initList()
      setTimeout(() => {
        this.rowDialog.visible = false
      }, 300)
    },

    handleAddSvgFile() {
      this.rowDialog.form.svgfiles.push(deepClone(SVGFILE_FORM))
    },

    handleRemoveSvgFile(name) {
      this.rowDialog.form.svgfiles.find(deepClone(SVGFILE_FORM))
    },


    handleRemoveSvgFile(index) {
      const { svgfiles } = this
      svgfiles.splice(index, 1)
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
