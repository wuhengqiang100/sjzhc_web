<template>

  <div id="cards">

    <div v-for="(card, key, index) in cards" :key="index" class="card-item">
      <!-- <el-row> -->
      <div class="card-header">
        <div class="card-header-left">
          <dv-decoration-11 v-if="card.status==0" class="card-title">{{ card.title }}</dv-decoration-11>
          <dv-decoration-11 v-if="card.status==1" class="card-title1">{{ card.title }}</dv-decoration-11>
          <dv-decoration-11 v-if="card.status==2" class="card-title2">{{ card.title }}</dv-decoration-11>
        </div>
        <div class="card-header-right">
          <dv-decoration-1 style="width:160px;height:40px;" :color="['red', 'green']" dur="9" />
        </div>
      </div>
      <!-- <dv-charts class="ring-charts" :option="card.ring" /> -->
      <div class="card-content">

        <el-row :gutter="10">
          <el-col :span="11">
            <el-row class="row-class main-value" type="flex" justify="center">
              <el-col :span="8">产品名称</el-col>
              <el-col :span="12"><span>{{ card.productName }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">卷轴号</el-col>
              <el-col :span="12"><span>{{ card.rollNum }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">机速</el-col>
              <el-col :span="12"><span>{{ card.machineSpeed }}</span></el-col>
            </el-row>
            <el-row class="row-class compare-value" type="flex" justify="center">
              <el-col :span="8">当前米数</el-col>
              <el-col :span="12"><span>{{ card.curLenth }}</span></el-col>
            </el-row>
          </el-col>
          <el-col :span="13">
            <el-col>
              <el-row class="row-class compare-value" type="flex" justify="center">
                <el-col :span="7">状态</el-col>
                <el-col :span="13">
                  <span v-if="card.status==0">未开机</span>
                  <span v-if="card.status==1">生产中</span>
                  <span v-if="card.status==2">设备异常</span>
                </el-col>
              </el-row>
              <el-row class="row-class compare-value" type="flex" justify="center">
                <el-col :span="7">开始时间</el-col>
                <el-col :span="13"><span style="font-size:12px">{{ card.startDate }}</span></el-col>
              </el-row>
              <el-row class="row-class compare-value" type="flex" justify="center">
                <el-col :span="7">结束时间</el-col>
                <el-col :span="13"><span style="font-size:12px">{{ card.endDate }}</span></el-col>
              </el-row>
              <el-row class="row-class compare-value" type="flex" justify="center">
                <el-col :span="8">总长度</el-col>
                <el-col :span="12"><span>10000</span></el-col>
              </el-row>
            </el-col>
          </el-col>
        </el-row>
        <el-row style="margin-top:5px;margin-bottom:5px;">
          <el-col style="margin-left:20px" :span="3">生产进度</el-col>
          <el-col :span="19"><el-progress style="margin-left:30px" :percentage="50" status="success" /></el-col>
        </el-row>
      </div>

      <div class="card-footer">
        <dv-charts class="left" :option="option" style="height:200px" />
        <dv-decoration-2 :reverse="true" style="width:5px;height:180px;" />
        <dv-capsule-chart :config="config1" style="width:200px;height:150px;margin-top:30px" />

        <!-- <dv-active-ring-chart :config="config" style="width:200px;height:200px" /> -->
        <!-- <dv-decoration-2 :reverse="true" style="width:5px;height:200px;" /> -->
        <!-- <dv-active-ring-chart :config="config" style="width:200px;height:200px" /> -->

      </div>
      <dv-decoration-2 style="width:470.4px;height:5px;" />

    </div>
  </div>
</template>

<script>
import { fetchListCardTop } from '@/api/monitor'

export default {
  name: 'CardsTop',
  components: {
    // LabelTag
  },
  data() {
    return {
      cards: [],
      monitorList: [],
      option: {
        series: [
          {
            type: 'pie',
            data: [
              { name: '缺陷1', value: 93 },
              { name: '缺陷2', value: 66 },
              { name: '缺陷3', value: 52 },
              { name: '缺陷4', value: 34 },
              { name: '缺陷5', value: 22 }
            ],
            radius: ['45%', '65%'],
            insideLabel: {
              show: false
            },
            outsideLabel: {
              labelLineEndLength: 10,
              formatter: '{percent}%\n{name}',
              style: {
                fontSize: 14,
                fill: '#fff'
              }
            }
          }
        ],
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b']
      },
      config: {
        data: [
          {
            name: '缺陷1',
            value: 55
          },
          {
            name: '缺陷2',
            value: 120
          },
          {
            name: '缺陷3',
            value: 78
          },
          {
            name: '缺陷4',
            value: 66
          },
          {
            name: '缺陷5',
            value: 80
          }
        ],
        digitalFlopStyle: {
          fontSize: 14,
          fill: '#fff'
        }
      },
      config1: {
        data: [
          {
            name: '轻微废',
            value: 200
          },
          {
            name: '一般废',
            value: 67
          },
          {
            name: '严重废',
            value: 55
          }
        ],
        colors: ['#96bfff', '#32c5e9', '#e690d1'],
        showValue: true
      }

    }
  },
  created() {

  },
  mounted() {
    const { createData } = this

    createData()

    setInterval(this.createData, 3000)
  },
  methods: {
    createCharts() {

    },
    createData() {
      // const { randomExtend } = this
      fetchListCardTop().then(response => {
        this.monitorList = response.monitorList

        this.cards = new Array(this.monitorList.length).fill(0).map((foo, i) => ({
          // title: '设备' + (i + 1),
          rollNum: this.monitorList[i].rollNum,
          productName: this.monitorList[i].productName,
          // templateName: this.monitorList[i].templateName,
          shiftTeam: this.monitorList[i].shiftTeam,
          startDate: this.monitorList[i].startDate,
          endDate: this.monitorList[i].endDate,
          curLenth: this.monitorList[i].curLenth,
          // totalNum: this.monitorList[i].totalNum,
          // goodNum: this.monitorList[i].goodNum,
          // doubtNum: this.monitorList[i].doubtNum,
          // wasteNum: this.monitorList[i].wasteNum,
          // goodRate: this.monitorList[i].goodRate,
          machineSpeed: this.monitorList[i].machineSpeed,
          machineId: this.monitorList[i].machineId,
          machineName: this.monitorList[i].machineName,
          status: this.monitorList[i].status,

          title: this.monitorList[i].machineName
          /*  total: {
            // number: [randomExtend(9500, 10000)],
            number: [this.monitorList[i].totalNum],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#ea6027',
              fontWeight: 'bold'
            }
          },
          num: {
            // number: [randomExtend(8500, 9500)],
            number: [this.monitorList[i].goodNum],
            content: '{nt}',
            textAlign: 'right',
            style: {
              fill: '#26fcd8',
              fontWeight: 'bold'
            }
          },
          ring: {
            series: [
              {
                type: 'gauge',
                startAngle: -Math.PI / 2,
                endAngle: Math.PI * 1.5,
                arcLineWidth: 13,
                radius: '80%',
                data: [
                  // { name: '好品率', value: randomExtend(80, 100) }
                  { name: '好品率', value: this.toPercent(this.monitorList[i].goodRate) }
                ],
                axisLabel: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                pointer: {
                  show: false
                },
                backgroundArc: {
                  style: {
                    stroke: '#224590'
                  }
                },
                details: {
                  show: true,
                  formatter: '好品率{value}%',
                  style: {
                    fill: '#1ed3e5',
                    fontSize: 16
                  }
                }
              }
            ],
            color: ['#03d3ec']
          } */
        }))
      })
    },
    randomExtend(minNum, maxNum) {
      if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
      } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      }
    },
    toPercent(point) {
      var str = Number(point * 100).toFixed(1)
      // str += '%'
      return str
    }
  }
}
</script>

<style lang="less">

.card-title {
  min-width: 160px;
    max-width: 250px;

  height: 48px;
}
.card-title1 {
  min-width: 160px;
    max-width: 250px;

  height: 48px;
  background-color: royalblue;
}
.card-title2 {
  min-width: 160px;
  max-width: 250px;
  height: 48px;
  background-color: red;
}
.question-number {
  color: #91463c;
}
.error-number {
  color: red;
}
.row-class {
  margin-bottom: 10px;
}
.main-value {
  font-weight: bold;
  line-height: 20px;

  font-size: 12px;

  span {
    font-size: 20px;
    color: #00c0ff;
    margin-left: 22px;
  }
}

.compare-value {
  height: 22px;
  line-height: 24px;
  font-size: 16px;

  span {
    margin-left: 22px;
  }
}
/* .el-row {
    // position:absolute;
    // -webkit-box-sizing: border-box;
    // box-sizing: border-box;
} */
#cards {
  display: flex;
  // justify-content: space-between;
  justify-content: flex-start;
  height: 45%;

/*   .card-item {
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, 0.5);
    width: 33%;
    margin-right: 0.5%;
    display: flex;
    flex-direction: column;
  }
 */
  .card-item {
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, 0.5);
    width: 24.5%;
    margin-right: 0.5%;
    display: flex;
    flex-direction: column;
  }
  .card-header {
    display: flex;
    height: 20%;
    align-items: center;
    justify-content: space-between;

    .card-header-left {
      font-size: 16px;
      font-weight: bold;
      padding-left: 20px;
    }

    .card-header-right {
      padding-right: 20px;
      font-size: 24px;
      color: #03d3ec;
    }
  }
  .card-content {
    height: 45%;
  }
  .main-content {
    height: 45%;
  }
  .ring-charts {
    height: 150px;
    width: 150px;
  }
  .row-bg {
    padding: 10px 0;
  }

  .card-footer {
    height: 50%;
    display: flex;
    align-items: left;
    // justify-content: space-around;
    // justify-content: space-between;
    justify-content: flex-start;
    .left {
      flex: 1;
      // padding-bottom: 20px;
      // padding-right: 20px;
      box-sizing: border-box;
    }
  }

  .card-footer-item {
    padding: 5px 10px 0px 10px;
    box-sizing: border-box;
    width: 40%;
    background-color: rgba(6, 30, 93, 0.7);
    border-radius: 3px;

    .footer-title {
      font-size: 15px;
      margin-bottom: 5px;
    }

    .footer-detail {
      font-size: 20px;
      color: #1294fb;
      display: flex;
      font-size: 18px;
      align-items: center;

      .dv-digital-flop {
        margin-right: 5px;
      }
    }
  }
}

</style>
