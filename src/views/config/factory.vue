<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        clearable
        placeholder="请输入登录名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-select
        v-model="listQuery.useFlag"
        clearable
        placeholder="启用状态"
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in useFlagOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-refresh"
        @click="handleReset"
      >
        重置
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
      <!--     <el-button class="filter-item" style="margin-left: 10px;" type="warning" icon="el-icon-download" @click="handleCreate">
        导入
      </el-button> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="登陆id"
        prop="id"
        sortable="custom"
        align="center"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.loginId }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="登陆名"
        align="center"
        min-width="120px"
      >
        <template slot-scope="{row}">
          <span
            class="link-type"
            @click="handleUpdate(row)"
          >{{ row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="登陆密码"
        min-width="200px"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.loginPass }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{ row.operator.operatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="工作状态"
        align="center"
      >
        <template slot-scope="{row}">
          <el-tag
            v-if="row.userInWork"
            type="success"
          >
            在线
          </el-tag>
          <el-tag
            v-else
            type="danger"
          >
            离线
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="启用状态"
        align="center"
      >
        <template slot-scope="{row}">
          <el-tag
            v-if="row.useFlag"
            type="success"
          >
            启用
          </el-tag>
          <el-tag
            v-else
            type="danger"
          >
            禁用
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="218px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >
            修改
          </el-button>
          <el-button
            v-if="row.useFlag"
            size="mini"
            type="warning"
            @click="handleModifyUseFlag(row,false)"
          >禁用</el-button>
          <el-button
            v-else
            size="mini"
            type="success"
            @click="handleModifyUseFlag(row,true)"
          >启用</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(row)"
          >删除</el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="55%"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        size="mini"
        label-width="100px"
        style="width: 650px; margin-left:45px;"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="用户名称"
              prop="operatorId"
            >
              <!-- <el-input clearable v-model="temp.operatorId"
                        type="text"
                        placeholder="请输入用户id" /> -->
              <el-select
                v-model="temp.operatorId"
                clearable
                filterable
                placeholder="请搜索或者选择"
              >
                <el-option
                  v-for="item in operatorOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>

            <el-form-item
              label="登陆名"
              prop="loginName"
            >
              <el-input
                v-model="temp.loginName"
                clearable
                type="text"
                placeholder="请输入登陆名"
              />
            </el-form-item>
            <el-form-item
              label="登陆密码"
              prop="loginPass"
            >
              <el-input
                v-model="temp.loginPass"
                clearable
                type="password"
                placeholder="请输入登陆密码"
              />
            </el-form-item>

            <el-form-item
              label="工作状态"
              prop="userInWork"
            >
              <el-switch
                v-model="temp.userInWork"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>
            <el-form-item
              label="启用状态"
              prop="useFlag"
            >
              <el-switch
                v-model="temp.useFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </el-form-item>

          </el-col>
          <el-col
            :span="9"
            :offset="3"
          >
            <el-form-item
              label="用户角色"
              prop="roleIds"
            >
              <el-checkbox-group
                v-model="checkedRoles"
                size="small"
              >
                <ul>
                  <li>
                    <el-checkbox
                      v-for="role in roleOptions"
                      :key="role"
                      :label="role"
                    >{{ role }}</el-checkbox>
                  </li>
                </ul>
                <!-- <el-checkbox label="备选项2" border /> -->
              </el-checkbox-group>
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          返回
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogPvVisible"
      title="Reading statistics"
    >
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="key"
          label="Channel"
        />
        <el-table-column
          prop="pv"
          label="Pv"
        />
      </el-table>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogPvVisible = false"
        >Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { fetchList, fetchPv, createLoginUser, updateLoginUser, updateUseFlag, deleteLoginUser, fetchRoleList, fetchUserOwnRole } from '@/api/loginUser'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const roleOptions = []

const useFlagOptions = [
  { key: '0', display_name: '禁用' },
  { key: '1', display_name: '启用' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = roleOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'LoginUserTable',
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
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        useFlag: undefined,
        // importance: undefined,
        title: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      operatorOption: [],
      checkedRoles: [], // 已选的角色
      roleOptions: [], // 所有的角色
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        loginId: undefined,
        operatorId: '',
        loginName: '',
        loginPass: '',
        userInWork: true,
        useFlag: true,
        checkedRole: []
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改账户',
        create: '添加账户'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        loginName: [{ required: true, message: '请填写登陆名', trigger: 'blur' }],
        loginPass: [{ required: true, message: '请填写登陆密码', trigger: 'blur' }]
        // startDate: [{ type: 'date', required: true, message: '请填写开始时间', trigger: 'change' }]
        // endDate: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }]

      },
      downloadLoading: false
    }
  },
  // 初始化获取数据列表
  created() {
    this.getList()
  },
  methods: {
    // 有加载圈的加载数据列表
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    getRoles() {
      fetchRoleList().then(response => {
        // console.log('tag', response.data)
        // this.roleList = response.roleList
        // console.log('tag', this.roleOptions)
        this.operatorOption = response.operatorOption
        this.roleOptions = response.roleOptions
      })
    },
    // 获取所有的menus并设置值
    getRoleOwnMenus(userId) {
      fetchUserOwnRole(userId).then(response => {
        // this.temp.roleIds = response.roleIds

        this.checkedRoles = response.checkedRoles
      })
    },
    // 立即刷新数据列表
    refreshList() {
      this.listQuery.page = 1
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 500)
      })
    },
    // 用户禁用启用操作
    handleModifyUseFlag(row, useFlag) {
      updateUseFlag(row.loginId).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.refreshList()
      })

      row.status = status
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    // id排序操作
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    // 重置temp实体类变量属性
    resetTemp() {
      this.temp = {
        loginId: undefined,
        operatorId: '',
        loginName: '',
        loginPass: '',
        userInWork: true,
        useFlag: true,
        checkedRole: []

      }
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        limit: 20,
        useFlag: undefined,
        // importance: undefined,
        title: undefined,
        sort: '+id'
      }
    },
    handleReset() {
      this.resetListQuery()
      this.getList()
    },
    // 监听create dialog事件
    handleCreate() {
      this.resetTemp()
      // 获取所有的角色
      this.getRoles()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 添加操作
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        // date格式化
        this.temp.startDate = parseTime(this.temp.startDate)
        if (this.temp.endDate !== '') {
          this.temp.endDate = parseTime(this.temp.endDate)
        }

        if (valid) {
          this.temp.checkedRole = this.checkedRoles
          // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createLoginUser(this.temp).then(() => {
            this.refreshList()
            // this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 监听修改 update dialog事件
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.getRoles()// 获取角色
      // 获取已拥有的角色
      // console.log('tag', this.temp)
      this.getRoleOwnMenus(this.temp.operatorId)//
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 修改操作
    updateData() {
      // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
      this.temp.checkedRole = this.checkedRoles
      updateLoginUser(this.temp).then(() => {
        this.refreshList()
        // this.list.unshift(this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    // 监听删除dialog事件
    handleDelete(row) {
      this.$confirm('您确定要删除该数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLoginUser(row.loginId).then(() => {
          this.refreshList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>

<style scoped>
.el-dialog .el-form .el-form-item .el-input {
  width: 220px;
}
</style>
