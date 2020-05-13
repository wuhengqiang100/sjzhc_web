<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search"
                class="right-menu-item" /> -->
        <!--       <el-tooltip class="item" effect="dark" content="大屏监控" placement="bottom-start">
          <big-screen id="bigScreen" class="right-menu-item hover-effect" />
        </el-tooltip> -->
        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->
        <el-tooltip class="item" effect="dark" content="全屏" placement="bottom-start">
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip>
        <el-tooltip content="全局size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            :src="avatar+'?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!--    <router-link to="/profile/index">
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>Dashboard</el-dropdown-item>
          </router-link>
          <a target="_blank"
             href="https://github.com/PanJiaChen/vue-element-admin/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a> -->
          <!--          <a target="_blank"
             @click="dialogFormVisible = true">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-button type="text"
                       @click="centerDialogVisible = true">点击打开 Dialog</el-button>

          </a> -->
          <el-dropdown-item divided>
            <!-- <span>退出</span> -->
            <span
              style="display:block;"
              @click="logout"
            >退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--     <el-dialog title="提示"
               :visible.sync="centerDialogVisible"
               width="30%"
               center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import BigScreen from '@/components/BigScreen'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    // eslint-disable-next-line vue/no-unused-components
    ErrorLog,
    Screenfull,
    SizeSelect,
    // eslint-disable-next-line vue/no-unused-components
    Search,
    // eslint-disable-next-line vue/no-unused-components
    BigScreen
  },
  data() {
    return {
      centerDialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      window.localStorage.clear()
      location.reload()
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
