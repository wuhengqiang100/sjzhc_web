/* eslint-disable vue/no-unused-components */
<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="网站菜单" style="width:100%;min-height:540px">
        <BMenu />
      </el-tab-pane>
      <el-tab-pane label="操作权限" style="width:100%;min-height:540px">
        <CMenu />
      </el-tab-pane>
      <el-tab-pane label="工厂配置" style="width:100%;min-height:540px">
        <CMenu />
      </el-tab-pane>
      <el-tab-pane label="系统配置" style="width:100%;min-height:540px">
        <CMenu />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>

import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import BMenu from '@/views/config/menu/bMenu'
import CMenu from '@/views/config/menu/cMenu'

export default {
  name: 'MenuTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination, BMenu, CMenu },
  directives: { waves },
  filters: {

  },
  data() {
    return {
    }
  },
  // 初始化获取数据列表
  created() {

  },
  methods: {
  }
}
</script>

<style scoped>
  .el-dialog .el-form .el-form-item .el-input {
    width: 300px;
  }
</style>
