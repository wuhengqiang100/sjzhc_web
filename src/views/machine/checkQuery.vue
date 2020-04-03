<template>
  <div class="app-container">
    <div class="filter-container">
      车号：<el-input v-model="listQuery.cartNumber" placeholder="请输入车号" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      产品：<el-input v-model="listQuery.productName" placeholder="请输入产品名称" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      工序：<el-input v-model="listQuery.operationName" placeholder="请输入工序名称" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      设备：<el-input v-model="listQuery.machineName" placeholder="请输入设备名称" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      机台：<el-input v-model="listQuery.workUnitName" placeholder="请输入机台名称" style="width: 120px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <div class="filter-item">
        <el-date-picker
          v-model="dateValue"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:01', '23:59:59']"
          value-format="yyyy-MM-dd HH:mm:ss"
          @keyup.enter.native="handleFilter"
        />
      </div>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="handleReset">
        重置
      </el-button>
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
      <el-table-column label="生产日志id" prop="id" sortable="custom" align="center" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.logId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生产车号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cartNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="产品名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工序名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.operationName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.machineName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机台名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.workUnitName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="信息数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.qainfonum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报错数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.qawasternum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="识码数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sminfonum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="整万错误数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.machineWasterNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="整万信息数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.infoNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="人员名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.operatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template v-if="row.startDate !==null" slot-scope="{row}">
          <span>{{ row.startDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template v-if="row.endDate !==null" slot-scope="{row}">
          <span>{{ row.endDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <!--       <el-table-column label="操作" fixed="right" align="center" min-width="218px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-if="row.useFlag" size="mini" type="warning" @click="handleModifyUseFlag(row,false)">禁用</el-button>
          <el-button v-else size="mini" type="success" @click="handleModifyUseFlag(row,true)">启用</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>

        </template>
      </el-table-column> -->
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>

import { fetchCheckQueryList } from '@/api/verifyLog'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const machineTypeOptions = []

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
  name: 'ProduceLogTable',
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
      dateValue: '',
      listQuery: {
        page: 1,
        limit: 10,
        cartNumber: undefined,
        productName: undefined,
        operationName: undefined,
        machineName: undefined,
        workUnitName: undefined,
        startDate: '',
        endDate: '',
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        logId: Number, // 生产日志id
        itemFlag: Number, // 操作标志
        qainfonum: Number, // 信息数量
        qawasternum: Number, // 报错数量
        sminfonum: Number, // 识码数量
        jobId: Number, // 基础生产信息主键id
        cartNumber: '', // 生产车号（大万编号）
        startDate: new Date(),
        endDate: new Date(),
        productId: Number, // 产品id
        productName: '', // 产品名称
        operationId: Number, // 工序id
        operationName: '', // 工序名称
        operatorId: Number, // 人员序号
        operatorName: '', // 人员名称
        machineId: Number, // 设备主键id
        machineName: '', // 设备名称
        workUnitId: Number, // 机台主键
        workUnitName: '', // 机台名称
        inspectmId: Number, // 主键
        machineWasterNumber: Number, // 整万错误数量
        infoNumber: Number// 整万信息数量

      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改生产日志',
        create: '添加生产日志'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // type: [{ required: true, message: 'type is required', trigger: 'change' }],
        // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        machineCode: [{ required: true, message: '请填写生产日志code', trigger: 'blur' }],
        machineName: [{ required: true, message: '请填写生产日志name', trigger: 'blur' }],
        startDate: [{ type: 'date', required: true, message: '请填写开始时间', trigger: 'change' }]
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
      fetchCheckQueryList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    refreshList() {
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchCheckQueryList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
      })
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
        machineId: undefined,
        machineCode: '',
        machineName: '',
        useFlag: true,
        startDate: new Date(),
        endDate: '',
        note: '',
        imageModelNum: '',
        imageModelPath: ''
      }
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        limit: 10,
        // useFlag: undefined,
        // importance: undefined,
        cartNumber: undefined,
        productName: undefined,
        operationName: undefined,
        machineName: undefined,
        workUnitName: undefined,
        startDate: '',
        endDate: '',
        sort: '+id'
      }
    },
    handleFilter() {
      this.listLoading = true
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchCheckQueryList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    handleReset() {
      this.resetListQuery()
      this.getList()
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
  .el-dialog .el-form .el-form-item .el-input{
    width: 300px;
  }
</style>
