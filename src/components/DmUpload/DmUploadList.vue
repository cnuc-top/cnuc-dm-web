<style lang='stylus'>

</style>
<template>
  <el-upload
    class="upload-demo"
    :data="{ token }"
    :action="UPLOAD_URL"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :limit="9"
    list-type="picture"
    multiple
  >
    <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</template>

<script>

import { UPLOAD_URL, CDN_URL } from '@/common/const'
import BTL from '@/common/api/btl'

export default {
  props: {
    list: Array
  },
  components: {},

  data() {
    return {
      UPLOAD_URL,
      token: null,
      //  fileList: [{name: 'food.jpeg', url: ''}]
    }
  },

  computed: {},

  async mounted() {
    const { uploadToken } = await BTL.uploadToken()
    this.token = uploadToken
  },

  methods: {
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    async handleSuccess(res, file) {
      const { hash } = res
      const url = `${CDN_URL}/${hash}`
      const { size } = file

      const data = {
        hash,
        url,
        size
      }

      const { id } = await BTL.attachmentsCreate(data)
      this.list.push(id)
    }
  }
}
</script>
