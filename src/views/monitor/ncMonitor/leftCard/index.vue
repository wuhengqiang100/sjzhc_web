<template>
  <div id="data-view">
    <dv-full-screen-container>

      <top-header />

      <div class="main-content">
        <!-- <digital-flop /> -->
        <!-- <decora /> -->
        <div class="block-left-right-content">
          <!-- <ranking-board /> -->
          <div style="width:100%">
            <cardsTop />
            <span style="margin-top:2%" />
            <!-- <cardsBottom /> -->
          </div>
          <!-- <div style="width:25%">
            <scroll-board />
          </div> -->

          <!-- <div class="block-top-bottom-content">
             <div class="block-top-content">
              <rose-chart />

              <water-level-chart />

              <scroll-board />
            </div>

            <cards />
            <scroll-board />
          </div> -->
          <!-- <scroll-board /> -->
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import topHeader from './topHeader'
// import digitalFlop from './digitalFlop'
// import rankingBoard from './rankingBoard'
// import roseChart from './roseChart'
// import waterLevelChart from './waterLevelChart'
// import scrollBoard from './scrollBoard'
import cardsTop from './cardsTop'
import cardsBottom from './cardsBottom'
import decora from './decora'
import screenfull from 'screenfull'
export default {
  name: 'DataView',
  components: {
    topHeader,
    // digitalFlop,
    // rankingBoard,
    // roseChart,
    // waterLevelChart,
    // scrollBoard,
    cardsTop,
    // eslint-disable-next-line vue/no-unused-components
    cardsBottom,
    // eslint-disable-next-line vue/no-unused-components
    decora
  },
  data() {
    return {
      isFullscreen: false
    }
  },
  created() {
    this.toggleFullscreen()
  },
  mounted() {
    window.onresize = () => {
      // 全屏下监控是否按键了ESC
      if (!this.checkFull()) {
        // 全屏下按键esc后要执行的动作
        this.isFullscreen = false
      }
    }
  },
  methods: {
    getId() {
      console.log(this.$route.params.id)
    },
    toggleFullscreen() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    /**
     * 全屏事件
     */
    screenfull() {
      if (!screenfull.enabled) {
        this.$message({
          message: 'Your browser does not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
      this.isFullscreen = true
    },
    /**
     * 是否全屏并按键ESC键的方法
     */
    checkFull() {
      var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
        isFull = false
      }
      return isFull
    }

  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url("./img/bg.png");
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .block-left-right-content {
    flex: 1;
    display: flex;
    margin-top: 10px;
  }

  .block-top-bottom-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
  }

  .block-top-content {
    height: 100%;
    display: flex;
    flex-grow: 0;
    box-sizing: border-box;
    // padding-bottom: 20px;
  }
}
</style>
