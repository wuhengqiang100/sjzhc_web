<template>
  <div
    class="sidebar-logo-container"
    :class="{'collapse':collapse}"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="logo"
          :src="logo"
          class="sidebar-logo"
        >
        <h1
          v-else
          class="sidebar-title"
        >{{ title }} </h1>
      </router-link>
      <router-link
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/"
      >
        <img
          v-if="logo"
          :src="logo"
          class="sidebar-logo"
        >
        <h1 class="sidebar-title">{{ factoryName }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { getSystemConfigData } from '@/api/systemSet'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      factoryName: '',
      // baseURL: process.env.VUE_APP_BASE_API,

      logo: process.env.VUE_APP_BASE_API + '/static/admin/img/logo1.png'
      // logo: 'https://localhost:9527/assets/logo/1.png'
      // logo: 'E:\kexinwork\sjz\sizhc_web\src\icons\logo/3.png'
    }
  },
  created() {
    // console.log(process.env.VUE_APP_BASE_API),
    //   console.log(this.emptyGif)
    this.getSysConfig()
  },
  methods: {
    // getSysConfig() {
    //   this.factoryName = localStorage.getItem('factoryName')
    // }
    getSysConfig() {
      getSystemConfigData().then(response => {
        this.factoryName = response.systemSet.factoryName
        // localStorage.setItem('factoryName'.this.factoryName)
        // layer.msg('layer集成成功!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
