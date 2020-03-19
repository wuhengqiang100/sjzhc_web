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
      <!--    <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">
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
      </el-checkbox> -->
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
        :filter-method="filterMethod"
        filter-placeholder="请输入车号"
        :titles="titles"
        :button-texts="['回退', '审核']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="data"
        @change="handleChange"
      >
        <span v-if="option.allowJudge===0" slot-scope="{ option }"><el-tag>{{ option.wipJobs.cartNumber }}</el-tag> &emsp;&emsp;{{ option.wipJobs.cartNumber }}  &emsp;&emsp; {{ option.product.productName }}  &emsp;&emsp; {{ option.operation.operationName }}  &emsp;&emsp; {{ option.infoNumber }}  &emsp;&emsp; {{ option.machineWasterNumber }}  &emsp;&emsp; {{ option.key }}</span>
        <span v-else-if="option.allowJudge===1" slot-scope="{ option }">{{ option.wipJobs.cartNumber }} &emsp;&emsp; {{ option.product.productName }}  &emsp;&emsp; {{ option.operation.operationName }}  &emsp;&emsp;{{ option.infoNumber }}  &emsp;&emsp; {{ option.machineWasterNumber }}  &emsp;&emsp; <el-tag type="success">未分活</el-tag>  &emsp;&emsp; {{ option.key }}</span>
        <span v-else slot-scope="{ option }">{{ option.wipJobs.cartNumber }} &emsp;&emsp; {{ option.product.productName }} &emsp;&emsp; {{ option.operation.operationName }}  &emsp;&emsp; {{ option.infoNumber }}  &emsp;&emsp; {{ option.machineWasterNumber }}  &emsp;&emsp; <el-tag type="danger">已分活</el-tag>  &emsp;&emsp; {{ option.key }}</span>
        <el-button slot="left-footer" class="transfer-footer" size="small">操作左</el-button>
        <el-button slot="right-footer" class="transfer-footer" size="small">操作右</el-button>

      </el-transfer></div>

  </div>
</template>

<script>
import { fetchList, updateMachineCheck } from '@/api/machineCheck'
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
      titles: ['车号   品种 --  工艺 --  检测总数 --  缺陷数量 --  未检数量',
        '车号 --  品种 --  工艺 --  检测总数  -- 缺陷数量  -- 未检数量 --  分活状态'],
      filterMethod(query, item) {
        return item.wipJobs.cartNumber.indexOf(query) > -1
      },
      qaInspectMasterList: [], // 总的核查数据list
      temp: {
        direction: '',
        movedKeys: []
      },
      qaInspectMaster: {
        inspectmId: Number, // 质量表头id
        machineWasterNumber: Number, // 整万错误数量
        infoNumber: Number, // 整万信息数量
        allowJudge: Number, // 产品状态码
        wipProdLogs: {// 生产日志信息
          logId: Number, // 生产日志id
          jobId: Number, // 外键(生产序号)
          operationId: Number, // 生产工序
          machineId: Number, // 生产机器
          workUnitId: Number, // 生产机台
          operatorId: Number, // 操作人
          itemFlag: Number, // 操作标志
          qainfonum: Number, // 信息数量
          qawasternum: Number, // 报错数量
          sminfonum: Number// 识码数量
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
      // this.listLoading = true
      fetchList().then(response => {
        this.qaInspectMasterList = response.qaInspectMasterList
        // this.generateData(this.qaInspectMasterList)// 解析返回的核查数据
        // this.generateData() // 生成data穿梭框数据
        this.qaInspectMasterList.forEach((qa, index) => {
        // this.qaInspectMaster = qa

          // 可以审核
          if (qa.allowJudge === 0) {
            this.data.push({
              key: qa.inspectmId,
              label: qa.product.productName,
              disabled: false,
              machineWasterNumber: qa.machineWasterNumber,
              infoNumber: qa.infoNumber,
              allowJudge: qa.allowJudge,
              wipProdLogs: qa.wipProdLogs,
              wipJobs: qa.wipJobs,
              product: qa.product,
              operation: qa.operation,
              operator: qa.operator,
              machine: qa.machine,
              dicWorkUnits: qa.dicWorkUnits
            })
          }
          // 允许分活
          if (qa.allowJudge === 1) {
            this.value.push(qa.inspectmId)
            this.data.push({
              key: qa.inspectmId,
              label: qa.product.productName,
              disabled: false,
              machineWasterNumber: qa.machineWasterNumber,
              infoNumber: qa.infoNumber,
              allowJudge: qa.allowJudge,
              wipProdLogs: qa.wipProdLogs,
              wipJobs: qa.wipJobs,
              product: qa.product,
              operation: qa.operation,
              operator: qa.operator,
              machine: qa.machine,
              dicWorkUnits: qa.dicWorkUnits
            })
          }
          // 已经分完活,不能回退
          if (qa.allowJudge === 2) {
            this.value.push(qa.inspectmId)
            this.data.push({
              key: qa.inspectmId,
              label: qa.product.productName,
              disabled: true,
              machineWasterNumber: qa.machineWasterNumber,
              infoNumber: qa.infoNumber,
              allowJudge: qa.allowJudge,
              wipProdLogs: qa.wipProdLogs,
              wipJobs: qa.wipJobs,
              product: qa.product,
              operation: qa.operation,
              operator: qa.operator,
              machine: qa.machine,
              dicWorkUnits: qa.dicWorkUnits
            })
          }
        })
        // console.log('data', this.data)
        /*       setTimeout(() => {
          this.listLoading = false
          // console.log('tag', this.data)
        }, 1 * 1000) */
      })
    },
    /**
     * direction:right 审核操作
     * direction:left  回退操作
     * movedKeys改变状态的id值,质量表头id
     */
    handleChange(value, direction, movedKeys) {
      this.temp.direction = direction
      this.temp.movedKeys = movedKeys
      updateMachineCheck(this.temp).then((response) => {
        this.getList()
        this.resetTemp()
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
      })
    },
    // 重置temp实体类变量属性
    resetTemp() {
      this.temp = {
        direction: '',
        movedKeys: []
      }
      this.data = []
      this.value = []
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
