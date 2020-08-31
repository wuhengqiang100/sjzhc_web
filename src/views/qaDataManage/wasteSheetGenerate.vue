/* eslint-disable spaced-comment */
<template>
  <div class="app-container">
    <el-row>
      <el-col :span="10">
        <div class="grid-content">
          <el-row :gutter="20" style="width: 100%">

            <!-- <el-col :span="6"> -->
            <!-- <el-card class="box-card"> -->
            <!--  <div slot="header" class="clearfix">
                  <span>整合数据操作</span>
                  <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                </div> -->
            <!--            <h3>缺陷查询</h3>
            <el-divider content-position="left">缺陷查询</el-divider>
            <el-row>
              <el-col :span="20">
                <el-row>
                  <el-col :span="10">
                    缺陷等级:
                    <el-select v-model="value" filterable placeholder="请选择" class="filter-item" style="width: 100px">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    幅:
                    <el-select v-model="value1" filterable placeholder="请选择" class="filter-item" style="width: 100px;">
                      <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-col>
                  <el-col :span="7">
                    根:
                    <el-select v-model="value2" filterable placeholder="请选择" class="filter-item" style="width: 100px;">
                      <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-col>

                </el-row>

                <el-row>
                  <el-checkbox-group v-model="checkList" filterable class="filter-item">

                    <el-checkbox label="缺陷溢出" />
                    <el-checkbox label="光异" />
                    <el-checkbox label="镂空" />
                    <el-checkbox label="正面缺陷" />
                    <el-checkbox label="背面缺陷" />
                  </el-checkbox-group>
                </el-row>
              </el-col>
              <el-col :span="4">
                <el-row>
                  <el-button v-waves size="mini" style="float: right; " class="filter-item" type="success" icon="el-icon-search" @click="getAlreadyAuditTable">
                    搜索
                  </el-button>
                </el-row>
                <el-row>
                  <el-button size="mini" class="filter-item" style="float: right;" type="success" icon="el-icon-refresh" @click="handleAlreadyReset">
                    重置
                  </el-button>
                </el-row>

              </el-col>
            </el-row> -->
            <!-- <h3>数据操作</h3> -->

            <!-- <el-divider content-position="left">数据操作</el-divider> -->
            <el-row>
              <el-col :span="6">
                <el-row>
                  <el-col :span="16">
                    缺陷合并距离
                  </el-col>
                  <el-col :span="8">
                    <el-button type="warning" size="mini" class="filter-item" icon="el-icon-scissors">整合</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="16">
                    <el-input v-model="input" size="mini" class="filter-item" placeholder="m(码)" style="width:65px;" />
                    <!-- <el-input-number v-model="num" size="mini" class="filter-item" controls-position="right" :min="1" :max="20" @change="handleChange" /> -->

                  </el-col>
                  <el-col :span="8">
                    <el-button type="success" size="mini" class="filter-item" icon="el-icon-scissors">提交</el-button>

                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="1">
                <el-divider direction="vertical" />
              </el-col>

              <el-col :span="17">
                <el-row>
                  <el-col :span="6">
                    起始根
                    <el-input v-model="input" size="mini" class="filter-item" style="width:65px;" />
                    <!-- <el-input-number v-model="num" size="mini" class="filter-item" controls-position="right" :min="1" :max="20" /> -->
                  </el-col>
                  <el-col :span="7">
                    起始码
                    <el-input v-model="input" size="mini" class="filter-item" style="width:65px;" />
                    <!-- <el-input-number v-model="num" size="mini" class="filter-item" controls-position="right" :min="1" :max="20" /> -->
                  </el-col>
                  <el-col :span="7">
                    作废情况
                    <el-input v-model="input" size="mini" class="filter-item" style="width:65px;" />
                    <!-- <el-input v-model="input" size="mini" class="filter-item" style="width:65px;" /> -->
                  </el-col>
                  <el-col :span="4">
                    <el-button style="float: right; " type="success" size="mini" class="filter-item" icon="el-icon-scissors">调整</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    结束根
                    <el-input v-model="input" size="mini" class="filter-item" style="width:65px;" />
                    <!-- <el-input-number v-model="num" size="mini" class="filter-item" controls-position="right" :min="1" :max="20" /> -->
                  </el-col>
                  <el-col :span="7">
                    终止码
                    <el-input v-model="input" size="mini" class="filter-item" style="width:65px;" />
                    <!-- <el-input-number v-model="num" size="mini" class="filter-item" controls-position="right" :min="1" :max="20" /> -->
                  </el-col>
                  <el-col :span="7">
                    作废原因
                    <el-input v-model="input" size="mini" class="filter-item" style="width:65px;" />
                  </el-col>
                  <el-col :span="4">
                    <el-button style="float: right; " type="success" size="mini" class="filter-item" icon="el-icon-scissors">出单</el-button>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>

            <!-- </el-card> -->

            <!-- </el-col> -->
          </el-row>
          <el-row :gutter="20" style="width: 100%">
            <el-table
              ref="tableData"
              :key="tableKeyCan"
              empty-text="整合后才有剔废单数据"
              height="300"
              stripe
              fit
              highlight-current-row
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleAlreadyAuditSelectionChange"
            >
              <el-table-column prop="id" type="selection" width="30" />
              <!-- <el-table-column prop="data1" sortable label="缺陷序号" width="120" class="link-type">
              <template slot-scope="{row}">
                <span class="link-type" @click="handleEditNoteAlready(row)">{{ row.wipJobs.cartNumber }}</span>
              </template>
            </el-table-column> -->
              <el-table-column prop="data1" sortable label="剔废序号" width="80" />
              <!-- <el-table-column prop="data2" sortable label="缺陷等级" width="100" :filters="filterFei" :filter-method="filterHandler">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.data2===1" effect="plain" type="success">轻微废</el-tag>
                  <el-tag v-else-if="scope.row.data2===2" effect="plain">一般废</el-tag>
                  <el-tag v-else-if="scope.row.data2===3" effect="plain" type="danger">严重废</el-tag>
                </template>
              </el-table-column> -->
              <el-table-column prop="data3" sortable label="幅" width="70" :filters="filterFu" :filter-method="filterHandler" />
              <el-table-column prop="data3" sortable label="起始根" width="80" />
              <el-table-column prop="data4" sortable label="结束根" width="80" />
              <el-table-column prop="data5" sortable label="起始码" width="80" />
              <el-table-column prop="data6" sortable label="结束码" width="80" />
              <el-table-column prop="data7" sortable label="质量描述" min-width="80" :filters="filterErrorType" :filter-method="filterHandler" />
            </el-table>
          </el-row>
          <el-row :gutter="20" style="width: 100%">
            <el-table
              ref="tableData1"
              :key="tableKeyCan"
              empty-text="请至少选中一条剔废信息"
              height="440"
              stripe
              fit
              highlight-current-row
              :data="tableData1"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleAlreadyAuditSelectionChange"
            >
              <el-table-column prop="id" type="selection" width="30" />
              <!-- <el-table-column prop="data1" sortable label="缺陷序号" width="120" class="link-type">
              <template slot-scope="{row}">
                <span class="link-type" @click="handleEditNoteAlready(row)">{{ row.wipJobs.cartNumber }}</span>
              </template>
            </el-table-column> -->
              <el-table-column prop="data1" sortable label="缺陷序号" width="80" />
              <el-table-column prop="data2" sortable label="缺陷等级" width="100" :filters="filterFei" :filter-method="filterHandler">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.data2===1" effect="plain" type="success">轻微废</el-tag>
                  <el-tag v-else-if="scope.row.data2===2" effect="plain">一般废</el-tag>
                  <el-tag v-else-if="scope.row.data2===3" effect="plain" type="danger">严重废</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="data3" sortable label="幅" width="70" :filters="[{text: '第一幅', value: '1'}, {text: '第二幅', value: '2'}]" :filter-method="filterHandler" />
              <el-table-column prop="data4" sortable label="根" width="50" />
              <el-table-column prop="data5" sortable label="起始码" width="80" />
              <el-table-column prop="data6" sortable label="结束码" width="80" />
              <el-table-column prop="data7" sortable label="质量描述" min-width="80" :filters="filterErrorType" :filter-method="filterHandler" />
            </el-table>
          </el-row>
        </div>
      </el-col>
      <el-col offset="1" :span="13" class="row-right">
        <div class="grid-content">
          <div id="container" />
          <!-- <div id="container2" /> -->
        </div>

      </el-col>
    </el-row>

  </div>
</template>

<script>

// import { fetchCanAuditList, fetchAlreadyAuditList, saveCanAudit, saveAlreadyAudit, saveNotAudit, saveEditNoteCan, saveEditNoteAlready } from '@/api/machineAudit'
import waves from '@/directive/waves' // waves directive
// import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import { getToken } from '@/utils/auth'
import { Chart } from '@antv/g2'
import button from 'ant-design-vue/lib/button/button'
import { type } from 'jquery'

export default {
  name: 'WasteSheetGenerate',
  // eslint-disable-next-line vue/no-unused-components
  components: { Pagination },
  directives: { waves },
  filters: {},
  data() {
    return {
      filterFei: [{ text: '轻微废', value: 1 }, { text: '一般废', value: 2 }, { text: '严重废', value: 3 }],
      filterFu: [{ text: '第一幅', value: 1 }, { text: '第二幅', value: 2 }, { text: '第三幅', value: 3 }, { text: '第四幅', value: 4 }, { text: '第五幅', value: 5 }, { text: '第六幅', value: 6 }],
      filterErrorType: [{ text: '白斑', value: '白斑' }, { text: '破洞', value: '破洞' }],
      // input: '10',
      tableData: [{
        id: 0,
        data1: '1000',
        data2: 1,
        data3: 2,
        data4: '49',
        data5: '2000',
        data6: '2005',
        data7: '破洞'
      }, {
        id: 1,
        data1: '1001',
        data2: 2,
        data3: 2,
        data4: '49',
        data5: '2000',
        data6: '2005',
        data7: '白斑'
      }, {
        id: 2,
        data1: '1002',
        data2: 3,
        data3: 2,
        data4: '49',
        data5: '2000',
        data6: '2005',
        data7: '白斑'

      }],
      tableData1: [
        {
          id: 0,
          data1: '1000',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '破洞'
        }, {
          id: 1,
          data1: '1001',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 2,
          data1: '1002',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'

        }, {
          id: 3,
          data1: '1003',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'

        }, {
          id: 4,
          data1: '1004',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'

        }, {
          id: 5,
          data1: '1005',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'

        }, {
          id: 6,
          data1: '1006',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'

        }, {
          id: 7,
          data1: '1007',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'

        }, {
          id: 8,
          data1: '1008',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'

        }, {
          id: 9,
          data1: '1009',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'

        }, {
          id: 10,
          data1: '1010',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'

        }, {
          id: 11,
          data1: '1011',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'

        }, {
          id: 12,
          data1: '1012',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'

        }, {
          id: 13,
          data1: '1013',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 13,
          data1: '1014',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 14,
          data1: '1015',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 15,
          data1: '1016',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 16,
          data1: '1017',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 17,
          data1: '1018',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 18,
          data1: '1019',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 19,
          data1: '1020',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 20,
          data1: '1021',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 21,
          data1: '1022',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 22,
          data1: '1023',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 23,
          data1: '1024',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 24,
          data1: '1025',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 25,
          data1: '1026',
          data2: 1,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 26,
          data1: '1027',
          data2: 2,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 27,
          data1: '1028',
          data2: 3,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 28,
          data1: '1029',
          data2: 3,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }, {
          id: 29,
          data1: '1030',
          data2: 2,
          data3: 2,
          data4: '49',
          data5: '2000',
          data6: '2005',
          data7: '白斑'
        }
      ],
      options: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '轻微废'
        }, {
          value: '2',
          label: '一般废'
        }, {
          value: '3',
          label: '严重废'
        }],
      value: '0',
      options1: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        }, {
          value: '5',
          label: '5'
        }],
      value1: '0',
      options2: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '3',
          label: '3'
        }, {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        }, {
          value: '6',
          label: '6'
        }, {
          value: '7',
          label: '7'
        }, {
          value: '8',
          label: '8'
        }, {
          value: '9',
          label: '9'
        },
        {
          value: '10',
          label: '10'
        }, {
          value: '11',
          label: '11'
        }, {
          value: '12',
          label: '12'
        }, {
          value: '13',
          label: '14'
        }, {
          value: '15',
          label: '15'
        }, {
          value: '16',
          label: '16'
        }],
      value2: '0',
      options3: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '缺陷溢出'
        }, {
          value: '2',
          label: '光异'
        }, {
          value: '3',
          label: '镂空'
        }, {
          value: '4',
          label: '正面缺陷'
        }, {
          value: '5',
          label: '背面缺陷'
        }],
      value3: '0',
      checkList: ['缺陷溢出', '光异', '镂空', '正面缺陷', '背面缺陷'],
      num: 1,
      zhenghevalue: true
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.scatterList()
    // this.areaList()
  },
  methods: {
    // 有加载圈的加载数据列表
    getList() {
      this.refresh()
    },
    resetListQuery() {

    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 区间面积图
    areaList() {
      const data = [
        { row: 100, col: [1000, 2000] },
        { row: 200, col: [1000, 2000] }
      ]

      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 500
      })

      chart.scale({
        col: {
          sync: true,
          nice: true
        },
        row: {
          sync: true,
          nice: true
        }
      })
      chart.tooltip({
        shared: true,
        showMarkers: false,
        showCrosshairs: true
      })

      const v1 = chart.createView({
        padding: 32
      })
      v1.data(data)
      v1.scale('col', {
        alias: '温度区间'
      })
      v1.area()
        .position('row*col')

      const v2 = chart.createView({
        padding: 32
      })
      // v2.data(averages)
      v2.axis(false)
      v2.scale('col', {
        alias: '平均温度'
      })
      v2.line().position('row*col')
      v2.point()
        .position('row*col')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1
        })

      chart.render()
    },
    // 散点图
    scatterList() {
      const data = [
        {
          'type': '轻微废',
          'row': 100,
          'col': 1000
        },
        {
          'type': '一般废',
          'row': 200,
          'col': 2000
        },
        {
          'type': '严重废',
          'row': 300,
          'col': 3000
        },
        {
          'type': '轻微废',
          'row': 627,
          'col': 3906
        },
        {
          'type': '一般废',
          'row': 674,
          'col': 9589
        },
        {
          'type': '严重废',
          'row': 660,
          'col': 8876
        }
      ]
      const data1 = [
        { row: 100, col: [800, 3000] },
        { row: 400, col: [800, 3000] }
      ]

      // 入口chart
      const chart = new Chart({
        container: 'container',
        autoFit: true,
        // width:500,
        height: 800,
        padding: [20, 20, 50, 50]
        // appendPadding: [20, 20, 50, 50]
      })

      /*   chart.scale({
        row: { sync: 'value', nice: true },
        col: { sync: 'value', nice: true }
      }) */
      // x轴设置
      chart.axis('row', {
        position: 'bottom',
        nice: true,
        title: {
          style: {
            fill: '#1890ff'
          }
        },
        line: {
          lineWidth: 8 // 设置线的宽度

          // lineDash: [3, 3] // 设置虚线样式
        },
        grid: {
          align: 'center', // 声明网格顶点从两个刻度中间开始，默认从刻度点开始
          type: 'line', // 声明网格的类型，line 表示线，polygon 表示矩形框
          // 当网格类型 type 为 line 时，使用 lineStyle 设置样式
          lineStyle: {
            stroke: '#d9d9d9', // 网格线的颜色
            lineWidth: 1, // 网格线的粗细
            lineDash: [4, 4] // 网格线的虚线配置，第一个参数描述虚线的实部占多少像素，第二个参数描述虚线的虚部占多少像素
          },
          hightLightZero: true, // 默认不高亮0轴
          zeroLineStyle: { // 当且仅当 highLightZero 为 true 时生效
            stroke: '#595959',
            lineDash: [0, 0]
          },
          alternateColor: '#ccc' | ['#f80', '#ccc'], // 当网格类型 type 为 polygon 时，使用 alternateColor 为网格设置交替的颜色，指定一个值则先渲染奇数层，两个值则交替渲染
          hideFirstLine: true, // 是否隐藏第一条网格线，默认为 false
          hideLastLine: false // 是否隐藏最后一条网格线，默认为 false
        }

      })
      chart.scale('row', {
        min: 0,
        max: 996,
        alias: '幅/根',
        type: 'linear', // 度量方式
        values: [0, 166, 332, 498, 664, 830, 996], // x轴度量,根据实际情况更改
        ticks: [0, 166, 332, 498, 664, 830, 996]
      })
      // y轴刻度绘制
      chart.axis('col', {
        position: 'left',
        nice: true,
        title: {
          style: {
            fill: '#1890ff'
          }
        },
        line: {
          lineWidth: 8, // 设置线的宽度
          stroke: 'red', // 设置线的颜色
          lineDash: [3, 3] // 设置虚线样式
        }
      })
      chart.scale('col', {
        alias: '码',
        min: 0,
        max: 10000,
        tickCount: 10,
        type: 'linear'// 度量方式
        // tickCount: 6 // 多少个坐标轴
        // tickInterval: 1000 // 间隔多少
        // ticks: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]
        // formatter: (val) => `￥${val}`
      })
      chart.tooltip({
        shared: true, // 合并数据
        showCrosshairs: true // 展示辅助线
      })

      // 起始位置（左上角）
      chart.guide().text({
        top: true, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
        position: ['start', 'end'], // 文本的起始位置，值为原始数据值，支持 callback
        content: '(m)', // 显示的文本内容
        style: { // 文本的图形样式属性
          fill: '#9BB7EF', // 文本颜色
          fontSize: '12' // 文本大小
        } // 文本的图形样式属性
        // offsetX: -25, // x 方向的偏移量
        // offsetY: -20 // y 方向偏移量
      })
      // 结束位置（右下角）
      chart.guide().text({
        top: true, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
        position: ['end', 'start'], // 文本的起始位置，值为原始数据值，支持 callback
        content: '(幅/根)', // 显示的文本内容
        style: { // 文本的图形样式属性
          fill: '#9BB7EF', // 文本颜色
          fontSize: '12' // 文本大小
        }, // 文本的图形样式属性
        offsetX: -40 // x 方向的偏移量
        // offsetY: -20 // y 方向偏移量
      })

      const v = chart.createView({
        padding: 32
      })

      v.data(data)
      v.scale({
        type: {
          alias: '类型'
        },
        row: {
          alias: '根'
        },
        col: {
          alias: '码'
        }
      })
      v.tooltip({
        showTitle: false,
        showMarkers: false,
        showCrosshairs: true,
        shared: true, // 合并数据项
        follow: true, // tooltip 跟随鼠标
        crosshairs: {
          // 配置 crosshairs 样式
          type: 'xy', // crosshairs 类型
          line: {
            // crosshairs 线样式
            style: {
              stroke: '#565656',
              lineDash: [4]
            }
          }
        }
      })
      v.point()// 点图
        .position('row*col')
        .tooltip('type*row*col')
        // 文本标签配置
        .label('col', {
          layout: { type: 'overlap' }, offset: 0,
          style: {
            fill: 'black',
            stroke: '#fff',
            lineWidth: 2
          }
        })
        // .adjust('dodge')// 重叠的缺陷分组显示开
        .color('type')
        .shape('type', ['circle', 'square', 'triangle'])
        .size(6)
        .style({
          fillOpacity: 0.85
        })

      // 面积图
      const v1 = chart.createView({
        padding: 32
      })
      v1.scale({
        row: {
          alias: '根'
        },
        col: {
          // alias: '码区间',
          nice: true
        }
      })
      v1.tooltip({
        showTitle: false,
        showMarkers: false
      })
      // v1.tooltip(true, {
      //   showTitle: true,
      //   inPlot: false,
      //   showCrosshairs: true,
      //   crosshairs: {
      //     type: 'xy'
      //   },
      //   useHtml: true,

      //   htmlContent: function(title, items) {
      //     return '<div><ul><li>.....</li></ul></div>'
      //   }
      // })
      // v1.tooltip({

      //   // useHtml: true // true or false

      // })
      v1.area()// 面积图
        .position('row*col').tooltip('type*row*col')
      v1.data(data1)
      // chart.interaction('legend-highlight')
      // chart.interaction('tooltip') // 使用交互
      // chart.interaction('element-active')
      // chart.interaction('legend-visible-filter')
      // chart.interaction('active-region')
      // chart.interaction('drag-move')
      // chart.interaction('view-zoom')
      /*       chart.option('slider', {
        start: 0.1,
        end: 0.8,
        trendCfg: {
          isArea: false
        }
      }) */
      chart.render()

      // 捕获缺陷点击事件
      v.on('point:click', (ev) => {
        const lineElement = ev.target.get('element')
        const data = lineElement.getModel().data // 数组
        console.log('点:', data)
      })
      // 捕获剔废面积点击事件
      v1.on('element:click', (ev) => {
        const lineElement = ev.target.get('element')
        const data = lineElement.getModel().data // 数组
        console.log('面积:', data)
      })

      chart.on('dragstart', (ev) => {
        const target = ev.target
        if (target.isShape()) {
          // target 可能是 canvas
          // to do
          console.log('dragstart', ev.target)
        }
      })
    }

  }
}
</script>
<style lang="scss">
.app-container{
  // background-color: #E9EEF3;
  height:auto;
  .el-row {
    height:auto;
  }
}
  .el-row {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    //  max-height: 600px;
    .select_head {
       min-height: 50px;
    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .row-right {
    margin-left: 2em;
    background-color: #f9fafc;
  }

  .el-table th > .cell {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    padding-left: 2px;
    padding-right: 2px;
    width: 100%;
}

.el-table {
  width: 100%;
}
.el-table--mini th, .el-table--mini td {
    padding: 2px 0;
}
.el-table .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 20px;
    padding-left: 2px;
    padding-right: 2px;
}
.el-button--mini {
    padding: 7px 7px;
    font-size: 12px;
    border-radius: 3px;
}
.el-range-editor.el-input__inner {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    // -webkit-box-align: center;
    // -ms-flex-align: center;
    // align-items: center;
    padding: 0px 10px;
}
.el-card {
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    background-color: #fff;
    overflow: hidden;
    color: #303133;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    min-width: 690px;
    // max-width: 753px;
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 20px 0 20px 0;
}
    .el-card__header {
        padding: 4px 5px;
        border-bottom: 1px solid #e6ebf5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .el-card__body {
        padding: 6px 20px;
      .el-divider--vertical {
          display: inline-block;
          width: 1px;
          height: 3em;
          margin: 0 8px;
          vertical-align: middle;
          position: relative;
      }
    }

}
.el-input-number{
  width:65px;
}
.el-input-number__decrease{
  width:8px;
}
.el-input-number__increase{
  width:8px;
}
</style>>

