<template>
  <div class="app-container">
    <el-steps :active="1" finish-status="success" simple style="margin-bottom: 8px">
      <el-step title="选择系统" />
      <el-step title="选择菜单" />
      <el-step title="选择操作权限" />
    </el-steps>
    <div class="filter-container" />
    <el-row>
      <el-col :span="8"><div class="grid-content bg-purple" />
        <el-card class="box-card1" />
        <!-- <el-cascader-panel class="box-card1" :options="options" /> -->
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple" />
        <el-card class="box-card2">
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple" />
        <el-card class="box-card3">
          <div v-for="o in 4" :key="o" class="text item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card></el-col>
    </el-row>
  </div>
</template>

<script>

import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'

export default {
  name: 'SystemConfigTable',
  components: { },
  directives: { waves },
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
  width: 220px;
}
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card1 {
    width: 90%;
    height: 520px;
  }
  .box-card2 {
    width: 90%;
      height: 520px;
  }
  .box-card3 {
    width: 90%;
      height: 520px;
  }
</style>
