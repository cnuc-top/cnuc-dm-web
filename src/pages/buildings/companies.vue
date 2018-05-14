<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="companies.name" label="名称"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <company-type :data="scope.row.companies.type"></company-type>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleCompanyDelete(scope.row)" type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dm-table-footer">
      <el-autocomplete v-model="companyName" :fetch-suggestions="querySearch" @select="handleSelect" placeholder="请输入内容">
        <template slot-scope="{ item }">
          <div class="name">{{ item.name }}</div>
        </template>
      </el-autocomplete>

      <el-button @click="handleCompanyCreate">添加公司</el-button>
    </div>
  </div>
</template>

<script>
import BTL from '@/common/api/btl'
import { DIALOG_MODE, DIALOG_MODE_DETAIL } from '@/common/const'
import CompanyType from '@/components/Company/CompanyType'

export default {
  components: { CompanyType },

  props: {
    info: Object,
    data: Array
  },

  data() {
    return {
      companyAll: [],
      companyName: '',
      companyId: ''
    }
  },

  computed: {},

  mounted() {
    this.initList()
  },

  methods: {
    init() {
      this.$emit('update')
    },
    async initList() {
      this.companyAll = await BTL.companyList()
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },

    querySearch(queryString, cb) {
      var restaurants = this.companyAll
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },

    async handleCompanyDelete(data) {
      await BTL.buildingCompaniesDelete(data.id)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      this.init()
    },

    handleSelect(data) {
      this.companyName = data.name
      this.companyId = data.id
    },

    async handleCompanyCreate() {
      const id = this.companyId
      const bid = this.info.id
      const ret = await BTL.buildingCompaniesCreate(bid, { id })
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.init()
    },

  }
}
</script>
