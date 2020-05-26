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
          <el-tag v-if="row.ymhkCheckFlag===-2" effect="dark">没有数据</el-tag>
          <el-tag v-else-if="row.ymhkCheckFlag===-1" effect="dark" type="success">数据未处理完成</el-tag>
          <el-tag v-else-if="row.ymhkCheckFlag===0" effect="dark" type="info">未生成数据</el-tag>
          <el-tag v-else-if="row.ymhkCheckFlag===1" effect="dark" type="danger">已生成数据</el-tag>
          <el-tag v-else-if="row.ymhkCheckFlag===2" effect="dark" type="warning">已打印</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="印码票面核查标志" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.ympmCheckFlag===-2" effect="dark">没有数据</el-tag>
          <el-tag v-else-if="row.ympmCheckFlag===-1" effect="dark" type="success">数据未处理完成</el-tag>
          <el-tag v-else-if="row.ympmCheckFlag===0" effect="dark" type="info">未生成数据</el-tag>
          <el-tag v-else-if="row.ympmCheckFlag===1" effect="dark" type="danger">已生成数据</el-tag>
          <el-tag v-else-if="row.ympmCheckFlag===2" effect="dark" type="warning">已打印</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="印码涂布核查标志" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.ymtbCheckFlag===-2" effect="dark">没有数据</el-tag>
          <el-tag v-else-if="row.ymtbCheckFlag===-1" effect="dark" type="success">数据未处理完成</el-tag>
          <el-tag v-else-if="row.ymtbCheckFlag===0" effect="dark" type="info">未生成数据</el-tag>
          <el-tag v-else-if="row.ymtbCheckFlag===1" effect="dark" type="danger">已生成数据</el-tag>
          <el-tag v-else-if="row.ymtbCheckFlag===2" effect="dark" type="warning">已打印</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="丝印核查标志" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.syCheckFlag===-2" effect="dark">没有数据</el-tag>
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
      <el-table-column label="操作" fixed="right" align="center" min-width="218px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleQa(row)"> 缺陷 </el-button>
          <el-button size="mini" type="danger" @click="handleNck(row)">未检</el-button>

        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 缺陷详细信息-->
    <el-dialog title="缺陷详细信息" :visible.sync="dialogQaVisible" width="90%" top="5vh">
      <div class="filter-container">
        <!-- 生产序号：
        <el-input v-model="listQueryQa.jobId" placeholder="请输入生产序号" style="width: 120px;" class="filter-item" @keyup.enter.native="getListQa" /> -->
        大张号：
        <el-input v-model="listQueryQa.sheetNum" placeholder="请输入大张号" style="width: 120px;" class="filter-item" @keyup.enter.native="getListQa" />
        印码号：
        <el-input v-model="listQueryQa.codeNum" placeholder="请输入印码" style="width: 120px;" class="filter-item" @keyup.enter.native="getListQa" />
        工序：
        <el-select v-model="listQueryQa.operationId" filterable placeholder="请搜索或者选择">
          <el-option v-for="item in operationOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="getListQa" />
        </el-select>
        产品：
        <el-select v-model="listQueryQa.productId" filterable placeholder="请搜索或者选择">
          <el-option v-for="item in productOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="getListQa" />
        </el-select>
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getListQa">
          搜索
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="handleReset">
          重置
        </el-button>
      </div>
      <el-table :key="tableKey" v-loading="listLoadingQa" :data="listQa" border fit highlight-current-row style="width: 100%;height:700px;overflow-y: scroll;" @sort-change="sortChange">
        <el-table-column label="生产序号">
          <template slot-scope="{row}">
            <span>{{ row.jobId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工序" align="center">
          <template slot-scope="{row}">
            <span>{{ row.operationName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品" align="center">
          <template slot-scope="{row}">
            <span>{{ row.productName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="大张号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.sheetNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="印码号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.codeNum }}</span>
          </template>
        </el-table-column>

        <el-table-column label="千位" align="center">
          <template slot-scope="{row}">
            <span>{{ row.thousandIndex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="百位" align="center">
          <template slot-scope="{row}">
            <span>{{ row.hundredIndex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开位" align="center">
          <template slot-scope="{row}">
            <span>{{ row.convertNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="路数" align="center">
          <template slot-scope="{row}">
            <span>{{ row.routeNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="判费类型" align="center">
          <template slot-scope="{row}">
            <el-tag v-if="row.itemFlag===2" effect="dark">判废</el-tag>
            <el-tag v-else-if="row.itemFlag===3" effect="dark" type="success">审核费</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="未检原因" align="center">
          <template slot-scope="{row}">
            <el-tag v-if="row.errFlag===1" effect="dark">普通未检</el-tag>
            <el-tag v-else-if="row.errFlag===2" effect="dark" type="success">机检大张废</el-tag>
            <el-tag v-else-if="row.errFlag===9" effect="dark" type="info">判费大张废</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="图像" align="center">
          <template slot-scope="{row}">
            <!-- <span>{{ row.imageBlob }}</span> -->
            <!-- <image :src=" row.file " /> -->
            <img :src="row.filePath" style="width:50%;height:50%" @click="handleLookAt(row)">
          </template>
        </el-table-column>
        <el-table-column label="错误原因" align="center">
          <template slot-scope="{row}">
            <span>{{ row.errorNote }}</span>
          </template>
        </el-table-column>
        <el-table-column label="判废大张废标志" align="center">
          <template slot-scope="{row}">
            <span>{{ row.sheetWasterFlag }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="totalQa>0" :total="totalQa" :page.sync="listQueryQa.page" :limit.sync="listQueryQa.limit" @pagination="getListQa" />
    </el-dialog>
    <!--未检信息信息-->
    <el-dialog title="未检详细信息" :visible.sync="dialogNckVisible" width="90%" top="5vh">
      <div class="filter-container">
        <!-- 生产序号：
        <el-input v-model="listQueryNck.jobId" placeholder="请输入生产序号" style="width: 120px;" class="filter-item" @keyup.enter.native="getListNck" /> -->
        大张号：
        <el-input v-model="listQueryNck.sheetNum" style="width: 120px;" class="filter-item" @keyup.enter.native="getListNck" />
        印码号：
        <el-input v-model="listQueryNck.codeNum" placeholder="请输入印码" style="width: 120px;" class="filter-item" @keyup.enter.native="getListNck" />
        工序：
        <el-select v-model="listQueryNck.operationId" filterable placeholder="请搜索或者选择">
          <el-option v-for="item in operationOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="getListNck" />
        </el-select>
        产品：
        <el-select v-model="listQueryNck.productId" filterable placeholder="请搜索或者选择">
          <el-option v-for="item in productOption" :key="item.value" :label="item.label" :value="item.value" @keyup.enter.native="getListNck" />
        </el-select>

        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getListNck">
          搜索
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-refresh" @click="handleReset">
          重置
        </el-button>
      </div>
      <el-table :key="tableKey" v-loading="listLoadingNck" :data="listNck" border fit highlight-current-row style="width: 100%;height:700px;overflow-y: scroll;" @sort-change="sortChange">
        <el-table-column label="生产序号">
          <template slot-scope="{row}">
            <span>{{ row.jobId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工序" align="center">
          <template slot-scope="{row}">
            <span>{{ row.operationName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品" align="center">
          <template slot-scope="{row}">
            <span>{{ row.productName }}</span>
          </template>
        </el-table-column>

        <!--    <el-table-column label="未检id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.nckId }}</span>
        </template>
      </el-table-column> -->

        <el-table-column label="大张号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.sheetNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="印码号" align="center">
          <template slot-scope="{row}">
            <span>{{ row.codeNum }}</span>
          </template>
        </el-table-column>

        <el-table-column label="千位" align="center">
          <template slot-scope="{row}">
            <span>{{ row.thousandIndex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="百位" align="center">
          <template slot-scope="{row}">
            <span>{{ row.hundredIndex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="未检原因" align="center">
          <template slot-scope="{row}">
            <el-tag v-if="row.errFlag===1" effect="dark">普通未检</el-tag>
            <el-tag v-else-if="row.errFlag===2" effect="dark" type="success">机检大张废</el-tag>
            <el-tag v-else-if="row.errFlag===9" effect="dark" type="info">判费大张废</el-tag>
          </template>
        </el-table-column>

      </el-table>
      <pagination v-show="totalNck>0" :total="totalNck" :page.sync="listQueryNck.page" :limit.sync="listQueryNck.limit" @pagination="getListNck" />
    </el-dialog>
    <el-dialog title="缺陷原图" :visible.sync="centerDialogVisible" width="20%" center>
      <img :src="filePath" @click="centerDialogVisible = false">
      <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
    </el-dialog>
  </div>
</template>

<script>

import { fetchReportMainList, fetchReportQaList, fetchReportNckList } from '@/api/queryReport'
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
      listQa: null,
      listNck: null,
      total: 0,
      totalQa: 0,
      totalNck: 0,
      listLoading: false,
      listLoadingQa: true,
      listLoadingNck: true,
      centerDialogVisible: false,
      productOption: [],
      operationOption: [],
      dateValue: [],
      filePath: '',
      defaultValue: [new Date() - 2, new Date()],
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
      listQueryQa: {
        page: 1,
        limit: 10,
        jobId: undefined,
        sheetNum: undefined,
        codeNum: undefined,
        productId: undefined,
        operationId: undefined,
        startDate: Date,
        endDate: Date,
        sort: '+id'
      },
      listQueryNck: {
        page: 1,
        limit: 10,
        jobId: undefined,
        sheetNum: undefined,
        codeNum: undefined,
        productId: undefined,
        operationId: undefined,
        startDate: Date,
        endDate: Date,
        sort: '+id'
      },
      useFlagOptions, // 启用状态
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      downloadLoading: false,
      dialogQaVisible: false,
      dialogNckVisible: false
    }
  },
  // 初始化获取数据列表
  created() {
    this.getSelectOption()// 获取查询的条件options
    // this.getList()
  },
  mounted: function() {
    var myDate = new Date()
    myDate.setDate(myDate.getDate() - 2)
    this.dateValue = [myDate, new Date()]
    // this.timeNow = myDate.toLocaleDateString()
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
    handleQa(row) {
      this.filePath = ''

      this.listQueryQa.jobId = row.jobId
      this.dialogQaVisible = true
      this.filePath = row.filePath
      this.getListQa()
    },
    getListQa() {
      this.listLoadingQa = true
      fetchReportQaList(this.listQueryQa).then(response => {
        this.listQa = response.data.items
        this.totalQa = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoadingQa = false
        }, 1 * 1000)
      })
      // this.resetListQueryQa()
    },
    handleLookAt(row) {
      this.filePath = ''
      this.temp = Object.assign({}, row) // copy obj
      this.filePath = row.filePath
      this.centerDialogVisible = true
    },
    handleNck(row) {
      this.listQueryNck.jobId = row.jobId
      this.dialogNckVisible = true
      this.getListNck()
    },
    getListNck() {
      this.listLoadingNck = true
      fetchReportNckList(this.listQueryNck).then(response => {
        this.listNck = response.data.items
        this.totalNck = response.data.total
        setTimeout(() => {
          this.listLoadingNck = false
        }, 1 * 1000)
        // this.resetListQueryNck()
      })
    },
    resetListQueryQa() {
      this.listQueryQa = {
        page: 1,
        limit: 10,
        jobId: undefined,
        sheetNum: undefined,
        codeNum: undefined,
        productId: undefined,
        operationId: undefined,
        startDate: Date,
        endDate: Date,
        sort: '+id'
      }
    }, resetListQueryNck() {
      this.listQueryNck = {
        page: 1,
        limit: 10,
        jobId: undefined,
        sheetNum: undefined,
        codeNum: undefined,
        productId: undefined,
        operationId: undefined,
        startDate: Date,
        endDate: Date,
        sort: '+id'
      }
    },

    resetListQuery() {
      var myDate = new Date()
      myDate.setDate(myDate.getDate() - 2)
      this.dateValue = [myDate, new Date()]
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
    },
    getSelectOption() {
      listOptionReportMain().then(response => {
        this.productOption = response.productOption
        this.operationOption = response.operationOption
      })
    },
    // 立即刷新数据列表
    refreshList() {
      if (this.dateValue !== '') {
        this.listQuery.startDate = parseTime(this.dateValue[0])
        this.listQuery.endDate = parseTime(this.dateValue[1])
      }
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
