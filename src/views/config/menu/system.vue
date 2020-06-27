<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" size="mini" class="demo-ruleForm" label-position="left">
      <el-tag effect="dark" size="medium">系统配置</el-tag>
      <el-row style="margin-top:20px">
        <el-col :span="6">
          <el-form-item label="系统名称" prop="factoryName"><el-input v-model="ruleForm.factoryName" clearable style="width:250px" /></el-form-item>
          <el-form-item label="系统编码" prop="factoryCode"><el-input v-model="ruleForm.factoryCode" clearable style="width:250px" /></el-form-item>
          <!-- <el-form-item label="Ftp地址" prop="ftpIp"><el-input v-model="ruleForm.ftpIp" clearable style="width:200px" /></el-form-item>
          <el-form-item label="Ftp用户名" prop="ftpName"><el-input v-model="ruleForm.ftpName" clearable style="width:200px" /></el-form-item>
          <el-form-item label="Ftp密码" prop="ftpPass"><el-input v-model="ruleForm.ftpPass" clearable style="width:200px" /></el-form-item> -->
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light" /></el-col>
      </el-row>
      <el-tag type="success" size="medium" effect="dark">属性显示状态</el-tag>
      <el-row style="margin-top:20px">
        <el-col :span="6">
          <el-form-item label="设备mesCode" prop="machineCodeMes"><el-switch v-model="ruleForm.machineCodeMes" /></el-form-item>
          <el-form-item label="工序mesCode" prop="operationCodeMes"><el-switch v-model="ruleForm.operationCodeMes" /></el-form-item>
          <el-form-item label="人员mesCode" prop="operatorCodeMes"><el-switch v-model="ruleForm.operatorCodeMes" /></el-form-item>
          <el-form-item label="产品mesCode" prop="productCodeMes"><el-switch v-model="ruleForm.productCodeMes" /></el-form-item>
          <el-form-item label="机台mesCode" prop="workUnitCodeMes"><el-switch v-model="ruleForm.workUnitCodeMes" /></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="机器严重废标志" prop="machineWasteNoJudge"><el-switch v-model="ruleForm.machineWasteNoJudge" /></el-form-item>
          <el-form-item label="产品首字母id" prop="productCartNumFirstId"><el-switch v-model="ruleForm.productCartNumFirstId" /></el-form-item>
          <el-form-item label="产品首字母使用日期" prop="productCartNumFirstDate"><el-switch v-model="ruleForm.productCartNumFirstDate" /></el-form-item>
          <el-form-item label="产品首字母使用次数" prop="productCartNumFirstCount"><el-switch v-model="ruleForm.productCartNumFirstCount" /></el-form-item>
          <el-form-item label="产品大张废" prop="productSheetWasterNum"><el-switch v-model="ruleForm.productSheetWasterNum" /></el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品防重号系统名称" prop="productQaCodeName"><el-switch v-model="ruleForm.productQaCodeName" /></el-form-item>
          <el-form-item label="产品本地系统名称" prop="productLocalProductName"><el-switch v-model="ruleForm.productLocalProductName" /></el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getSystemConfigData, saveSystemConfig } from '@/api/systemSet'

import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const machineTypeOptions = []

// eslint-disable-next-line no-unused-vars
const useFlagOptions = [
  { key: '0', display_name: '禁用' },
  { key: '1', display_name: '启用' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = machineTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'SystemTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      ruleForm: {
        factoryId: '',
        factoryCode: '',
        factoryName: '',
        ftpIp: '',
        ftpName: '',
        ftpPass: '',
        machineCodeMes: Boolean,
        operationCodeMes: Boolean,
        operatorCodeMes: Boolean,
        productCodeMes: Boolean,
        workUnitCodeMes: Boolean,
        machineWasteNoJudge: Boolean,
        productCartNumFirstId: Boolean,
        productCartNumFirstDate: Boolean,
        productCartNumFirstCount: Boolean,
        productSheetWasterNum: Boolean,
        productQaCodeName: Boolean,
        productLocalProductName: Boolean

      },
      rules: {
        factoryName: [{ required: true, message: '请输入系统名称', trigger: 'blur' }],
        factoryCode: [{ required: true, message: '请输入系统编码', trigger: 'blur' }]
        /*    region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ] */
      }
    }
  },
  created() {
    this.getSystemConfig()
  },
  methods: {
    getSystemConfig() {
      getSystemConfigData().then(response => {
        this.ruleForm = response.systemSet
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveSystemConfig(this.ruleForm).then(() => {
            // this.getSystemConfig()
            location.reload()
            this.$notify({
              title: 'Success',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

