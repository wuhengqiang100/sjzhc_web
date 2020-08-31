/* eslint-disable spaced-comment */
<template>
  <div class="app-container">
    <div id="container" />

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
    scatterList() {
      const data = [
        { time: 1246406400000, temperature: [14.3, 27.7] },
        { time: 1246492800000, temperature: [14.5, 27.8] },
        { time: 1246579200000, temperature: [15.5, 29.6] },
        { time: 1246665600000, temperature: [16.7, 30.7] },
        { time: 1246752000000, temperature: [16.5, 25.0] },
        { time: 1246838400000, temperature: [17.8, 25.7] },
        { time: 1246924800000, temperature: [13.5, 24.8] },
        { time: 1247011200000, temperature: [10.5, 21.4] },
        { time: 1247097600000, temperature: [9.2, 23.8] },
        { time: 1247184000000, temperature: [11.6, 21.8] },
        { time: 1247270400000, temperature: [10.7, 23.7] },
        { time: 1247356800000, temperature: [11.0, 23.3] },
        { time: 1247443200000, temperature: [11.6, 23.7] },
        { time: 1247529600000, temperature: [11.8, 20.7] },
        { time: 1247616000000, temperature: [12.6, 22.4] },
        { time: 1247702400000, temperature: [13.6, 19.6] },
        { time: 1247788800000, temperature: [11.4, 22.6] },
        { time: 1247875200000, temperature: [13.2, 25.0] },
        { time: 1247961600000, temperature: [14.2, 21.6] },
        { time: 1248048000000, temperature: [13.1, 17.1] },
        { time: 1248134400000, temperature: [12.2, 15.5] },
        { time: 1248220800000, temperature: [12.0, 20.8] },
        { time: 1248307200000, temperature: [12.0, 17.1] },
        { time: 1248393600000, temperature: [12.7, 18.3] },
        { time: 1248480000000, temperature: [12.4, 19.4] },
        { time: 1248566400000, temperature: [12.6, 19.9] },
        { time: 1248652800000, temperature: [11.9, 20.2] },
        { time: 1248739200000, temperature: [11.0, 19.3] },
        { time: 1248825600000, temperature: [10.8, 17.8] },
        { time: 1248912000000, temperature: [11.8, 18.5] },
        { time: 1248998400000, temperature: [10.8, 16.1] }
      ]

      const averages = [
        { time: 1246406400000, temperature: 21.5 },
        { time: 1246492800000, temperature: 22.1 },
        { time: 1246579200000, temperature: 23 },
        { time: 1246665600000, temperature: 23.8 },
        { time: 1246752000000, temperature: 21.4 },
        { time: 1246838400000, temperature: 21.3 },
        { time: 1246924800000, temperature: 18.3 },
        { time: 1247011200000, temperature: 15.4 },
        { time: 1247097600000, temperature: 16.4 },
        { time: 1247184000000, temperature: 17.7 },
        { time: 1247270400000, temperature: 17.5 },
        { time: 1247356800000, temperature: 17.6 },
        { time: 1247443200000, temperature: 17.7 },
        { time: 1247529600000, temperature: 16.8 },
        { time: 1247616000000, temperature: 17.7 },
        { time: 1247702400000, temperature: 16.3 },
        { time: 1247788800000, temperature: 17.8 },
        { time: 1247875200000, temperature: 18.1 },
        { time: 1247961600000, temperature: 17.2 },
        { time: 1248048000000, temperature: 14.4 },
        { time: 1248134400000, temperature: 13.7 },
        { time: 1248220800000, temperature: 15.7 },
        { time: 1248307200000, temperature: 14.6 },
        { time: 1248393600000, temperature: 15.3 },
        { time: 1248480000000, temperature: 15.3 },
        { time: 1248566400000, temperature: 15.8 },
        { time: 1248652800000, temperature: 15.2 },
        { time: 1248739200000, temperature: 14.8 },
        { time: 1248825600000, temperature: 14.4 },
        { time: 1248912000000, temperature: 15 },
        { time: 1248998400000, temperature: 13.6 }
      ]

      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 500
      })

      chart.scale({
        temperature: {
          sync: true,
          nice: true
        },
        time: {
          type: 'time',
          mask: 'MM-DD',
          nice: true,
          tickInterval: 24 * 3600 * 1000 * 2
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
      v1.scale('temperature', {
        alias: '温度区间'
      })
      v1.area()
        .position('time*temperature')

      const v2 = chart.createView({
        padding: 32
      })
      v2.data(averages)
      v2.axis(false)
      v2.scale('temperature', {
        alias: '平均温度'
      })
      v2.line().position('time*temperature')
      v2.point()
        .position('time*temperature')
        .size(4)
        .shape('circle')
        .style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1
        })

      chart.render()
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

