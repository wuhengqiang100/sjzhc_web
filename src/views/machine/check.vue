/* eslint-disable spaced-comment */
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <div style="text-align: justify;width:100%;  justify-content: space-between" /> -->
      <el-row>
        <el-col :span="11">
          <el-card class="box-card" style="height:850px;overflow-y: scroll;">
            <div slot="header" class="clearfix">
              <span><el-tag effect="dark">待审核车次</el-tag></span>
              <span>
                <el-date-picker
                  v-model="dateValue1"
                  style="float: right; padding: 3px 0"
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:01', '23:59:59']"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="getCanAuditTable"
                />
              </span>
            </div>
            <el-table ref="multipleCanAudiTable" fit highlight-current-row :data="canAuditTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleCanAuditSelectionChange">
              <el-table-column type="selection" width="40" />
              <el-table-column prop="wipJobs.cartNumber" label="车号" width="60" />
              <el-table-column prop="product.productName" label="品种" width="75" />
              <el-table-column prop="operation.operationName" label="工艺" width="80" />
              <el-table-column prop="infoNumber" label="检测张数" width="80" />
              <el-table-column prop="machineWasterNumber" label="机检数量" width="80" />
              <el-table-column prop="noCheckNum" label="未检数" width="70" />
              <el-table-column prop="judgeWasterNumber" label="判废数" width="70" />
              <el-table-column prop="lastUpdateTime" label="日期" width="140" />
              <!-- <el-table-column prop="allowJudge" label="状态" width="80" /> -->
              <el-table-column label="状态" width="80">
                <template>
                  <el-tag effect="dark"> 待审核   </el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <div style="margin-top: 20px">
            <!-- <el-button @click="toggleCanAuditSelection([canAuditTable[1], canAuditTable[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleCanAuditSelection()">取消选择</el-button> -->
            手动刷新
            <el-button @click="refresh">刷新数据</el-button>

            自动刷新
            <el-button>
              <el-switch v-model="switchWalue" active-color="#13ce66" inactive-color="#ff4949" @change="changeSwitch" />
            </el-button>

          </div>
        </el-col>
        <el-col :span="2" style="display:flex">
          <div style="margin-top:200px;" class="button-class">

            <el-row style="margin-top:10px;margin-left:25px">
              <el-button type="primary" @click="handleAudit()">审核<i class="el-icon-arrow-right el-icon--right" /></el-button>
            </el-row>
            <el-row style="margin-top:10px;margin-left:25px">
              <el-button type="success" icon="el-icon-arrow-left" @click="handleReturn()">回退</el-button>
            </el-row>
            <el-row style="margin-top:60px">
              <el-input v-model="temp.note" type="textarea" :rows="2" placeholder="请输入说明" />
            </el-row>
            <el-row style="margin-top:100px;margin-left:25px">
              <el-button type="warning" @click="handleNotAudit()">全检<i class="el-icon-arrow-right el-icon--right" /></el-button>
            </el-row>
            <el-row style="margin-top:10px;margin-left:25px">
              <el-button type="danger" icon="el-icon-arrow-left" @click="handleReturnAbandon()">回退</el-button>
            </el-row>

          </div>

        </el-col>
        <el-col :span="11">
          <el-row>
            <el-card class="box-card" style="height:430px;overflow-y: scroll;">
              <div slot="header" class="clearfix">
                <span><el-tag effect="dark" type="success">已审核车次</el-tag></span>
                <span>
                  <el-date-picker
                    v-model="dateValue2"
                    style="float: right; padding: 3px 0"
                    type="datetimerange"
                    align="right"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:01', '23:59:59']"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="getAlreadyAuditTable"
                  />
                </span>
              </div>

              <el-table ref="multipleAlreadyAuditTable" fit highlight-current-row :data="alreadyAuditTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleAlreadyAuditSelectionChange">
                <el-table-column type="selection" width="40" />
                <el-table-column prop="wipJobs.cartNumber" label="车号" width="60" />
                <el-table-column prop="product.productName" label="品种" width="75" />
                <el-table-column prop="operation.operationName" label="工艺" width="80" />
                <el-table-column prop="infoNumber" label="检测张数" width="80" />
                <el-table-column prop="machineWasterNumber" label="机检数量" width="80" />
                <el-table-column prop="noCheckNum" label="未检数" width="70" />
                <el-table-column prop="judgeWasterNumber" label="判废数" width="70" />
                <el-table-column prop="lastUpdateTime" label="日期" width="140" />
                <el-table-column label="状态" width="80">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.allowJudge===1" effect="dark" type="success">已审核</el-tag>
                    <el-tag v-else effect="dark" type="info">已分活</el-tag>

                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-row>
          <el-row style="margin-top:20px">
            <el-card class="box-card" style="height:430px;overflow-y: scroll;">
              <div slot="header" class="clearfix">
                <span><el-tag effect="dark" type="warning">全检车次</el-tag></span>
                <span>
                  <el-date-picker
                    v-model="dateValue3"
                    style="float: right; padding: 3px 0"
                    type="datetimerange"
                    align="right"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:01', '23:59:59']"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="getNotAuditTable"
                  />
                </span>
              </div>
              <el-table ref="multipleNotAudiTable" fit highlight-current-row :data="notAuditTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleReturnNotAuditSelectionChange">
                <el-table-column type="selection" width="40" />
                <el-table-column prop="wipJobs.cartNumber" label="车号" width="60" />
                <el-table-column prop="product.productName" label="品种" width="75" />
                <el-table-column prop="operation.operationName" label="工艺" width="80" />
                <el-table-column prop="infoNumber" label="检测张数" width="80" />
                <el-table-column prop="machineWasterNumber" label="机检数量" width="80" />
                <el-table-column prop="noCheckNum" label="未检数" width="70" />
                <el-table-column prop="judgeWasterNumber" label="判废数" width="70" />
                <el-table-column prop="lastUpdateTime" label="日期" width="140" />
                <el-table-column label="状态" width="80">
                  <template>
                    <el-tag effect="dark" type="warning">全检</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-row>

        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>

import { fetchCanAuditList, fetchAlreadyAuditList, fetchNotAuditList, saveCanAudit, saveAlreadyAudit, saveNotAudit, returnNotAudit } from '@/api/machineAudit'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import { getToken } from '@/utils/auth'

export default {
  name: 'MachineCheckTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      // 可以审核
      canAuditTable: [],
      // 已经审核(包括已经审核,和已经分活等)
      alreadyAuditTable: [],
      // 不走核查
      notAuditTable: [],
      multipleCanAuditTableSelection: [],
      multipleAlreadyAuditTableSelection: [],
      multipleNotAuditTableSelection: [],

      canAuditData: [],
      alreadyAuditData: [],
      notAuditData: [],
      switchWalue: false,
      dateValue1: '',
      dateValue2: '',
      dateValue3: '',
      listQuery: {
        startDate: Date,
        endDate: Date
      },
      temp: {
        data: [],
        note: ''
      }
    }
  },
  created() {
    this.getList()
  },
  mounted() {
  },
  methods: {
    // 有加载圈的加载数据列表
    getList() {
      this.refresh()
    },

    resetListQuery() {
      this.listQuery = {
        startDate: Date,
        endDate: Date
      }
    },
    resetTemp() {
      this.temp = {
        data: [],
        note: ''
      }
    },
    refresh() {
      this.getCanAuditTable()
      this.getAlreadyAuditTable()
      this.getNotAuditTable()
    },

    // 获取可以审核的数据
    getCanAuditTable(time) {
      this.resetListQuery()
      if (this.dateValue1 !== '') {
        this.listQuery.startDate = parseTime(time[0])
        this.listQuery.endDate = parseTime(time[1])
      }
      fetchCanAuditList(this.listQuery).then(response => {
        this.canAuditTable = response.canAuditTable
      })
    },

    // 获取已经审核的数据
    getAlreadyAuditTable(time) {
      this.resetListQuery()
      if (this.dateValue2 !== '') {
        this.listQuery.startDate = parseTime(time[0])
        this.listQuery.endDate = parseTime(time[1])
      }
      fetchAlreadyAuditList(this.listQuery).then(response => {
        this.alreadyAuditTable = response.alreadyAuditTable
      })
    },

    // 获取不走审核的数据
    getNotAuditTable(time) {
      this.resetListQuery()
      if (this.dateValue3 !== '') {
        this.listQuery.startDate = parseTime(time[0])
        this.listQuery.endDate = parseTime(time[1])
      }
      fetchNotAuditList(this.listQuery).then(response => {
        this.notAuditTable = response.notAuditTable
      })
    },

    // 可以审核
    handleCanAuditSelectionChange(val) {
      this.multipleCanAuditTableSelection = val
    },
    handleAudit() {
      for (let index = 0; index < this.multipleCanAuditTableSelection.length; index++) {
        this.canAuditData[index] = this.multipleCanAuditTableSelection[index].inspectmId
        console.log('inspectid', this.multipleCanAuditTableSelection[index].inspectmId)
      }
      this.temp.data = this.canAuditData
      saveCanAudit(this.temp).then(response => {
        this.canAuditData = []
        this.multipleCanAuditTableSelection = []
        this.resetTemp()
        this.getCanAuditTable()
        this.getAlreadyAuditTable()
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    handleNotAudit() {
      for (let index = 0; index < this.multipleCanAuditTableSelection.length; index++) {
        this.canAuditData[index] = this.multipleCanAuditTableSelection[index].inspectmId
      }
      this.temp.data = this.canAuditData
      saveNotAudit(this.temp).then(response => {
        this.canAuditData = []
        this.multipleCanAuditTableSelection = []
        this.resetTemp()

        this.getCanAuditTable()
        this.getNotAuditTable()
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    // 已经审核
    handleAlreadyAuditSelectionChange(val) {
      this.multipleAlreadyAuditTableSelection = val
    },
    handleReturn() {
      let noAllowReturn = 0
      for (let index = 0; index < this.multipleAlreadyAuditTableSelection.length; index++) {
        if (this.multipleAlreadyAuditTableSelection[index].disabled) {
          noAllowReturn += 1
        }

        this.alreadyAuditData[index] = this.multipleAlreadyAuditTableSelection[index].inspectmId
      }
      if (noAllowReturn > 0) {
        this.$notify({
          title: '注意',
          message: '已分活的车次不能回退',
          type: 'info',
          duration: 2000
        })
        return
      }
      this.temp.data = this.alreadyAuditData
      saveAlreadyAudit(this.temp).then(response => {
        this.alreadyAuditData = []
        this.multipleAlreadyAuditTableSelection = []
        this.resetTemp()

        this.getCanAuditTable()
        this.getAlreadyAuditTable()
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },

    // 回退全检
    handleReturnNotAuditSelectionChange(val) {
      this.multipleNotAuditTableSelection = val
      console.log(this.multipleNotAuditTableSelection)
    },

    handleReturnAbandon() {
      for (let index = 0; index < this.multipleNotAuditTableSelection.length; index++) {
        this.notAuditData[index] = this.multipleNotAuditTableSelection[index].inspectmId
      }
      this.temp.data = this.notAuditData

      returnNotAudit(this.temp).then(response => {
        this.notAuditData = []
        this.multipleNotAuditTableSelection = []
        this.resetTemp()

        this.getCanAuditTable()// 考虑要不要删
        this.getNotAuditTable()
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },

    changeSwitch() {
      console.log(this.switchWalue)
      if (this.switchWalue) {
        // 开启自动刷新功能
        this.interval = setInterval(() => {
          this.refresh() // 定时刷新获取数据
        }, 2 * 2000)
      } else {
        clearInterval(this.interval)
      }
    }
  }
}
</script>
<style lang="scss">
  .el-card__header {
    padding: 5px 20px;
    border-bottom: 1px solid #e6ebf5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>>

