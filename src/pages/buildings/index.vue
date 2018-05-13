<style lang='stylus'>
</style>
<template>
  <div class="page">
    <el-container>
      <el-header></el-header>
      <el-main>
        <div class="nb-card">
          <el-table :data="list">
            <el-table-column prop="city" label="城市" width="100">
            </el-table-column>
            <el-table-column prop="name" label="名称">
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
            <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button @click.native.prevent="dialogUpdateOpen(scope.$index)" type="text" size="small">
                  编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>

      </el-main>
    </el-container>
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
              <el-upload class="building-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleBuildingPicSuccess">
                <img v-if="rowDialog.form.picUrl" :src="rowDialog.form.picUrl" class="img">
                <i v-else class="el-icon-plus building-uploader-icon"></i>
              </el-upload>
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
        <el-button type="primary" @click="handleBuildingUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BTL from '@/common/api/btl'
export default {
  components: {},

  data() {
    return {
      list: [],
      city: '上海',
      page: 1,
      rowDialog: {
        title: '编辑',
        visible: false,
        form: {
          name: null,
          width: 0
        }
      }
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      this.list = await BTL.buildingList()
    },
    async handleBuildingPicSuccess() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    async handleBuildingUpdate() {
      const data = this.rowDialog.form
      await BTL.buildingUpdate(data.id, data)
    },
    dialogUpdateOpen(key) {
      this.rowDialog.form = this.list[key]
      this.rowDialog.visible = true

    }
  }
}
</script>
