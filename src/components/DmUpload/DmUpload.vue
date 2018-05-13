<style lang='stylus'>
.building-uploader {
  position: relative;
  width: 100%;
  padding-bottom: 66.666%;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  overflow: hidden;

  .el-upload {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
    }

    i {
      color: #dcdfe6;
      font-size: 30px;
    }
  }
}
</style>
<template>
  <el-upload :data="{ token }" :action="UPLOAD_URL" :show-file-list="false" :on-success="handleSuccess">
    <img v-if="src" :src="src" class="img">
    <i v-else class="el-icon-plus building-uploader-icon"></i>
  </el-upload>
</template>

<script>

import { UPLOAD_URL, CDN_URL } from '@/common/const'
import BTL from '@/common/api/btl'

export default {
  props: {
    src: String
  },
  components: {},

  data() {
    return {
      UPLOAD_URL,
      token: null,
    }
  },

  computed: {},

  async mounted() {
    const { uploadToken } = await BTL.uploadToken()
    this.token = uploadToken
  },

  methods: {
    handleSuccess(res) {
      const { hash } = res
      const picUrl = `${CDN_URL}/${hash}`
      this.$emit('update:src', picUrl)
    }
  }
}
</script>
