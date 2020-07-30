<template>
  <div class="app-container">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" size="mini" class="demo-ruleForm" label-position="left">
      <el-tag effect="dark" size="medium">系统配置</el-tag>
      <el-row style="margin-top:20px">
        <el-col :span="6">
          <el-form-item label="系统名称" prop="factoryName"><el-input v-model="ruleForm.factoryName" clearable style="width:200px" /></el-form-item>
          <el-form-item label="系统编码" prop="factoryCode"><el-input v-model="ruleForm.factoryCode" clearable style="width:200px" /></el-form-item>

          <!-- <el-form-item label="Ftp地址" prop="ftpIp"><el-input v-model="ruleForm.ftpIp" clearable style="width:200px" /></el-form-item>
          <el-form-item label="Ftp用户名" prop="ftpName"><el-input v-model="ruleForm.ftpName" clearable style="width:200px" /></el-form-item>
          <el-form-item label="Ftp密码" prop="ftpPass"><el-input v-model="ruleForm.ftpPass" clearable style="width:200px" /></el-form-item> -->
        </el-col>

        <el-col :span="6">
          <!-- <el-form-item label="工厂名称"> -->
          <label style="margin-right:20px;">登陆页背景</label>
          <el-select v-model="factorySelectValue" clearable placeholder="请选择" @change="factorySelectChange()">
            <el-option
              v-for="item in factoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />

          </el-select>
          <div class="layui-upload-list" style="">
            <img id="demo1" :src="factorySelectValue" class="layui-upload-img" style="max-height:200px;">
            <p id="demoText" />
          </div>
          <!-- </el-form-item> -->

        </el-col>
        <el-col :span="12">
          <!-- <el-form-item> -->
          <!-- <button id="test1" type="button" class="layui-btn">上传图片</button> -->
          <el-button type="primary" @click="uploadFactoryBg()">确定<i class="el-icon-upload el-icon--right" /></el-button>
          <el-button id="test1" type="primary">上传<i class="el-icon-upload el-icon--right" /></el-button>
          <div class="layui-upload">

            <div class="layui-upload-list" style="">
              <img id="demo1" class="layui-upload-img" style="max-height:200px;">
              <p id="demoText" />
            </div>
          </div>
          <!-- </el-form-item> -->
        </el-col>
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

        <el-button @click="resetForm('ruleForm')">清空</el-button>
        <el-button @click="getSystemConfig()">重载</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getSystemConfigData, saveSystemConfig, editBg } from '@/api/systemSet'

import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import layer from 'layui-layer'
const machineTypeOptions = []

const factoryOptions = [
  { value: process.env.VUE_APP_BASE_API + '/file/img/loginBg.jpg', label: '默认背景' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/保定钞纸.jpg', label: '保定钞纸' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/北京防伪.jpg', label: '北京防伪' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/北京印钞.jpg', label: '北京印钞' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/成都印钞.jpg', label: '成都印钞' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/广州印钞.jpg', label: '广州印钞' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/昆山钞纸.jpg', label: '昆山钞纸' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/南昌印钞.jpg', label: '南昌印钞' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/南京造币.jpg', label: '南京造币' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/上海印钞.jpg', label: '上海印钞' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/上海造币.jpg', label: '上海造币' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/沈阳造币.jpg', label: '沈阳造币' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/石家庄印钞.jpg', label: '石家庄印钞' },
  { value: process.env.VUE_APP_BASE_API + '/file/img/西安印钞.jpg', label: '西安印钞' }
]

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
      uploadAction: process.env.VUE_APP_BASE_API + '/file/upload',
      // loginbg: 'http://127.0.0.1:8088/file/img/loginBg.jpg',
      factoryOptions,
      factorySelectValue: process.env.VUE_APP_BASE_API + '/file/img/loginBg.jpg',
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
      }
    }
  },
  created() {
    this.getSystemConfig()
  },
  mounted() {
    layui.use('upload', function() {
      var $ = layui.jquery
      var upload = layui.upload
      // 普通图片上传
      // eslint-disable-next-line no-unused-vars
      var uploadInst = upload.render({
        elem: '#test1',
        url: process.env.VUE_APP_BASE_API + '/file/upload', // 改成您自己的上传接口
        before: function(obj) {
          // 预读本地文件示例，不支持ie8
          obj.preview(function(index, file, result) {
            $('#demo1').attr('src', result) // 图片链接（base64）
          })
        },
        done: function(res) {
          // 如果上传失败
          if (res.code === 20000) {
            this.factorySelectValue = ''
            return layer.msg('上传成功')
          } else {
            return layer.msg('上传失败')
          }
        },
        error: function() {
          // 演示失败状态，并实现重传
          // var demoText = $('#demoText')
          // demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>')
          // demoText.find('.demo-reload').on('click', function() {
          //   uploadInst.upload()
          // })
        }
      })
    })
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
    },
    uploadFactoryBg() {
      console.log(this.factorySelectValue)
      editBg(this.factorySelectValue).then(() => {
        this.$notify({
          title: 'Success',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>

<style lang="less">
  .layui-upload {
    min-height: 180px;
    .layui-upload-list {

      .layui-upload-img{
        max-height: 180px;
      }
    }
  }
</style>>

