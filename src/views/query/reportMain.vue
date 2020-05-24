<template>
  <div class="app-container">
    <div class="filter-container">
      车号：
      <el-input
        v-model="listQuery.cartNumber"
        placeholder="请输入车号"
        style="width: 120px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      产品：
      <el-select
        v-model="listQuery.productId"
        filterable
        placeholder="请搜索或者选择"
      >
        <el-option
          v-for="item in productOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          @keyup.enter.native="handleFilter"
        />
      </el-select>

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
    </div>

    <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%;" @sort-change="sortChange">
      <el-table-column label="生产序号" prop="id" sortable="custom" align="center" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.jobId }}</span>
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
      <el-table-column label="生产数量" align="center">
        <template slot-scope="{row}">
          <span>{{ row.prodQuantity }}</span>
        </template>
      </el-table-column>

      <el-table-column label="冠号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.head }}</span>
        </template>
      </el-table-column>
      <el-table-column label="完成标志" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.finishedFlag===0 || row.finishedFlag===1 " effect="dark">生产中</el-tag>
          <el-tag v-else-if="row.finishedFlag===2" effect="dark" type="success">已生成数量</el-tag>
          <el-tag v-else-if="row.finishedFlag===3" effect="dark" type="info">已打印报表</el-tag>
          <el-tag v-else-if="row.finishedFlag===4" effect="dark" type="danger">ocr稽核中</el-tag>
          <el-tag v-else-if="row.finishedFlag===5" effect="dark" type="warning">ocr稽核完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="印码号控核查标志" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.ymhkCheckFlag===-2" effect="dark">没有</el-tag>
          <el-tag v-else-if="row.ymhkCheckFlag===-1" effect="dark" type="success">数据未处理完成</el-tag>
          <el-tag v-else-if="row.ymhkCheckFlag===0" effect="dark" type="info">未生成数据</el-tag>
          <el-tag v-else-if="row.ymhkCheckFlag===1" effect="dark" type="danger">已生成数据</el-tag>
          <el-tag v-else-if="row.ymhkCheckFlag===2" effect="dark" type="warning">已打印</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="印码票面核查标志" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.ympmCheckFlag===-2" effect="dark">没有</el-tag>
          <el-tag v-else-if="row.ympmCheckFlag===-1" effect="dark" type="success">数据未处理完成</el-tag>
          <el-tag v-else-if="row.ympmCheckFlag===0" effect="dark" type="info">未生成数据</el-tag>
          <el-tag v-else-if="row.ympmCheckFlag===1" effect="dark" type="danger">已生成数据</el-tag>
          <el-tag v-else-if="row.ympmCheckFlag===2" effect="dark" type="warning">已打印</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="印码涂布核查标志" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.ymtbCheckFlag===-2" effect="dark">没有</el-tag>
          <el-tag v-else-if="row.ymtbCheckFlag===-1" effect="dark" type="success">数据未处理完成</el-tag>
          <el-tag v-else-if="row.ymtbCheckFlag===0" effect="dark" type="info">未生成数据</el-tag>
          <el-tag v-else-if="row.ymtbCheckFlag===1" effect="dark" type="danger">已生成数据</el-tag>
          <el-tag v-else-if="row.ymtbCheckFlag===2" effect="dark" type="warning">已打印</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="丝印核查标志" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.syCheckFlag===-2" effect="dark">没有</el-tag>
          <el-tag v-else-if="row.syCheckFlag===-1" effect="dark" type="success">数据未处理完成</el-tag>
          <el-tag v-else-if="row.syCheckFlag===0" effect="dark" type="info">未生成数据</el-tag>
          <el-tag v-else-if="row.syCheckFlag===1" effect="dark" type="danger">已生成数据</el-tag>
          <el-tag v-else-if="row.syCheckFlag===2" effect="dark" type="warning">已打印</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="未检数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.WJ }}</span>
        </template>
      </el-table-column>

      <el-table-column label="号控未检" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hkwj }}</span>
        </template>
      </el-table-column>

      <el-table-column label="票面未检" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pmwj }}</span>
        </template>
      </el-table-column>

      <el-table-column label="褶子" align="center">
        <template slot-scope="{row}">
          <span>{{ row.tbzzwj }}</span>
        </template>
      </el-table-column>
      <el-table-column label="涂布未检" align="center">
        <template slot-scope="{row}">
          <span>{{ row.tbwj }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总剔废数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ztfs }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总拆包数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.zcbs }}</span>
        </template>
      </el-table-column>

      <el-table-column label="开始时间" align="center">
        <template v-if="row.startDate !==null" slot-scope="{row}">
          <span>{{ row.startDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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

  </div>
</template>

<script>

import { fetchReportMainList } from '@/api/queryReport'

import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { listOptionReportMain } from '@/api/querySelectOption'

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
      productOption: [],
      dateValue: '',
      listQuery: {
        page: 1,
        limit: 10,
        // useFlag: undefined,
        // importance: undefined,
        cartNumber: undefined,
        productId: undefined,
        finishedFlag: undefined,
        startDate: Date,
        endDate: Date,
        sort: '+id'
      },
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      downloadLoading: false
    }
  },
  // 初始化获取数据列表
  created() {
    this.getSelectOption()// 获取查询的条件options
    this.getList()
  },
  methods: {
    // 有加载圈的加载数据列表
    getList() {
      this.listLoading = true
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchReportMainList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1 * 1000)
      })
    },
    resetListQuery() {
      this.listQuery = {
        page: 1,
        limit: 10,
        // useFlag: undefined,
        // importance: undefined,
        cartNumber: undefined,
        productId: undefined,
        finishedFlag: undefined,
        startDate: Date,
        endDate: Date,
        sort: '+id'
      }
      this.dateValue = ''
    },
    getSelectOption() {
      listOptionReportMain().then(response => {
        this.productOption = response.productOption
      })
    },
    // 立即刷新数据列表
    refreshList() {
      fetchReportMainList(this.listQuery).then(response => {
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

    handleFilter() {
      this.listLoading = true
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
      fetchReportMainList(this.listQuery).then(response => {
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
      this.refreshList()
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
<style lang="less">

</style>
