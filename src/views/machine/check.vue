<template>
  <div class="app-container">
    <div class="filter-container">
      <!--      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select> -->
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download">
        Export
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;">
        reviewer
      </el-checkbox>
    </div>

    <!--  <p style="text-align: center; margin: 0 0 20px">使用 render-content 自定义数据项</p>
    <div style="text-align: center">
      <el-transfer
        v-model="value"
        style="text-align: left; display: inline-block"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :render-content="renderFunc"
        :titles="['Source', 'Target']"
        :button-texts="['到左边', '到右边']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="data"
        @change="handleChange"
      >
        <el-button slot="left-footer" class="transfer-footer" size="small">操作</el-button>
        <el-button slot="right-footer" class="transfer-footer" size="small">操作</el-button>
      </el-transfer>
    </div> -->
    <!-- <p style="text-align: center; margin: 50px 0 20px">使用 scoped-slot 自定义数据项</p> -->
    <div style="text-align: center;min-width:100%;">

      <el-transfer
        v-model="value"
        style="text-align: left; display: inline-block"
        filterable
        :titles="titles"
        :button-texts="['回退', '审核']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="data"
        @change="handleChange"
      >
        <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
        <el-button slot="left-footer" class="transfer-footer" size="small">操作</el-button>
        <el-button slot="right-footer" class="transfer-footer" size="small">操作</el-button>

      </el-transfer></div>

  </div>
</template>

<script>
import { fetchList } from '@/api/machineCheck'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'MachineCheckTable',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination },
  directives: { waves },
  filters: {
  },
  data() {
    /*  const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    } */
    return {
      data: [],
      value: [],
      qaInspectMasterList: [],
      qaInspectMaster: {
        inspectmId: undefined,
        allowJudge: Number, // 产品状态码
        wipProdLogs: {// 生产日志信息
          logId: Number// 生产日志id
        },
        wipJobs: {// 基础生产信息
          jobId: Number, // 基础生产信息id
          cartNumber: Number // 车号
        },
        product: {// 产品种类信息
          productId: Number, // 产品id
          productCode: '', // 产品code
          productName: '' // 产品name
        },
        operation: {// 产品工序信息
          operationId: Number, // 工序id
          operationCode: '', // 工序code
          operationName: '' // 工序name
        },
        operator: {// 操作员信息
          operatorId: Number, // 人员id
          operatorCode: '', // 人员code
          operatorName: '' // 人员name
        },
        machine: {// 机器信息
          machineId: Number, // 机器id
          machineCode: '', // 机器code
          machineName: '' // 机器name
        },
        dicWorkUnits: {// 操作台信息
          workUnitId: Number, // 操作台id
          workUnitCode: '', // 操作台code
          workUnitName: '' // 操作台name
        }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 有加载圈的加载数据列表
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        // Just to simulate the time of the request
        this.titles = response.titles
        this.value = response.qaInspectDatas.value
        // this.data = response.qaInspectDatas.qaInspectTransfer
        console.log('tag', this.value)
        this.data = response.qaInspectMasterList
        /*         const data = []
        qaInspectTransfers.forEach((qa, index) => {
          data.push({
            label: qa.label,
            key: qa.key,
            disabled: qa.disabled
          })
        })
        this.data = data */
        console.log('tag', this.data)
        setTimeout(() => {
          this.listLoading = false
          console.log('tag', this.data)
        }, 1 * 1000)
      })
    },
    /*   generateData(a) {
      const data = []
      qaInspectTransfer.forEach((qa, index) => {
        data.push({
          label: qa.label,
          key: qa.key,
          disabled: qa.disabled
        })
      })
      return data
    }, */
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    }
  }
}
</script>
<style>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
  .el-transfer-panel{
    min-width: 570px;
    width: auto;
  }
  .el-transfer-panel__body {
    height: 500px;
  }
  .el-transfer-panel__list.is-filterable {
    height: 480px;
    padding-top: 0;
}
</style>
