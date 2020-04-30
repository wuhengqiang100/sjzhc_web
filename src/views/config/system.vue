<template>
  <div class="app-container">
    <el-steps :active="1" finish-status="success" simple style="margin-bottom: 8px">
      <el-step title="选择系统" />
      <el-step title="选择菜单" />
      <el-step title="选择操作权限" />
    </el-steps>
    <div class="filter-container" />
    <el-row>
      <el-col :span="9"><div class="grid-content bg-purple" />
        <el-card class="box-card1" style="overflow-y: scroll;">
          <h2 style="text-align: center;">工厂------------------------->系统</h2>
          <el-col :span="8" style="border-right:2px">
            <el-radio-group v-model="radio1"  size="medium">
              <el-row style="margin-top: 10px;">
                <el-radio-button style="width:97.6px;" label="石家庄"></el-radio-button>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-radio-button style="width:97.6px;"  label="西安"></el-radio-button>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-radio-button style="width:97.6px;" label="北京印钞"></el-radio-button>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-radio-button style="width:97.6px;" label="北京防伪"></el-radio-button>
              </el-row>
            </el-radio-group>
          </el-col>
          <el-col :span="16">
            <el-card style="height: 480px;overflow-y: scroll;">
              <el-radio-group v-model="radio2" size="mini">
              <el-row style="margin-top: 10px;">
                <el-radio label="1" border size="medium">石家庄核查信息综合管理系统</el-radio>
              </el-row>
              <el-row style="margin-top: 10px;">
                <el-radio label="2" border size="medium">北京开窗安全线机检信息系统</el-radio>
              </el-row>
            </el-radio-group>
            </el-card>

          </el-col>
        </el-card>
      </el-col>
      <el-col :span="7" >
        <el-card class="box-card2" style="overflow-y: scroll;">
          <el-tree ref="tree" :data="menuTree" show-checkbox default-expand-all node-key="id" highlight-current :props="defaultProps" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card3" style="overflow-y: scroll;">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;" />
          <el-checkbox-group v-model="checkedcPermiss" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="permiss in cPermissOptions" :key="permiss" :label="permiss">
              {{ permiss }}
            </el-checkbox>
          </el-checkbox-group>
        </el-card></el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchRoleMenus, fetchRoleOwnMenus } from '@/api/sysRole'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'

export default {
  name: 'SystemConfigTable',
  components: { },
  directives: { waves },
  data() {
    return {
      radio1: '1',
      radio2: '1',
      radio3: '1',
      radio4: '1',
      menuTree: [], // 菜单树
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      checkAll: false, // c端权限全选标志
      checkedcPermiss: [], // 端权限已选
      cPermissOptions: [], // c端所有权限
      temp: {
        menuIds: [],
        checkedPermiss: []
      }
    }
  },
  // 初始化获取数据列表
  created() {
    this.getRoleMenus()
    // this.getRoleOwnMenus(this.temp.roleId)
  },
  methods: {
    // 获取所有的menus
    getRoleMenus() {
      fetchRoleMenus().then(response => {
        this.menuTree = response.menuTree
        this.cPermissOptions = response.cPermissOptions
      })
    },
    // 获取所有的menus并设置值
    getRoleOwnMenus(roleId) {
      fetchRoleOwnMenus(roleId).then(response => {
        this.temp.menuIds = response.menuIds
        this.$refs.tree.setCheckedKeys(this.temp.menuIds)
        // this.$refs.tree.setCheckedKeys([3, 7])
        this.checkedcPermiss = response.checkedcPermiss
      })
    },
    // 重置temp实体类变量属性
    resetTemp() {
      this.temp = {
        menuIds: [],
        checkedPermiss: []
      }
      this.checkedPermiss = []
    },
    handleCheckAllChange(val) {
      this.checkedcPermiss = val ? this.cPermissOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cPermissOptions.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cPermissOptions.length
    }
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
    height: 560px;
  }
  .box-card2 {
    width: 90%;
    height: 560px;
    }

  .box-card3 {
    width: 90%;
    height: 560px;
    }
   .el-checkbox-group .el-checkbox{
     margin-bottom: 8px;
   }

</style>
