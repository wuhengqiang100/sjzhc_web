<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <!-- <h2 class="brand-info__text">工厂名称</h2>
          <p class="brand-info__intro">工厂简介</p> -->
        </div>
        <div class="login-main login-container">

          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
            <div class="title-container">
              <h3 class="animated wobble title">
                <img :src="logo" class="sidebar-logo">{{ factoryName }}
              </h3>
            </div>
            <el-tabs v-model="activeName" stretch="true" @tab-click="handleClick">
              <el-tab-pane label="账户登陆" name="first">
                <el-form-item prop="username">
                  <span class="svg-container">
                    <svg-icon icon-class="user" />
                  </span>
                  <el-input ref="username" v-model="loginForm.username" clearable placeholder="请输入用户名" name="username" type="text" tabindex="1" autocomplete="on" />
                </el-form-item>
                <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                  <el-form-item prop="password">
                    <span class="svg-container">
                      <svg-icon icon-class="password" />
                    </span>
                    <el-input
                      :key="passwordType"
                      ref="password"
                      v-model="loginForm.password"
                      clearable
                      :type="passwordType"
                      placeholder="请输入密码"
                      name="password"
                      tabindex="2"
                      autocomplete="on"
                      @keyup.native="checkCapslock"
                      @blur="capsTooltip = false"
                      @keyup.enter.native="handleLogin"
                    />
                    <span class="show-pwd" @click="showPwd">
                      <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                  </el-form-item>
                </el-tooltip>
                <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>
              </el-tab-pane>
              <!--       <el-tab-pane label="刷卡登陆" name="second">
                  <el-form-item prop="userId">
                    <span class="svg-container">
                      <svg-icon icon-class="user" />
                    </span>
                    <el-input clearable
                      ref="userId"
                      v-model="userId"
                      placeholder="userId"
                      name="userId"
                      type="text"
                      autocomplete="on"
                    />
                  </el-form-item>
                </el-tab-pane>-->
            </el-tabs>
          </el-form>
          <div class="centerDownload">
            <p>推荐使用:  <a :href="firefoxDowbload">火狐浏览器</a>  <a :href="flashDowbload">火狐Flash插件</a></p>
            <!--    <p><button type="button" class="layui-btn">
              <i class="layui-icon">&#xe608;</i> 添加
            </button></p> -->
          </div>
          <div class="footer">
            <img :src="kexinLogo" class="footerLogo"><span>Copyright ©2008-2020 <a href="http://www.cbpm-kexin.com/" target="_black">深圳市中钞科信金融科技有限公司</a> 版权所有</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getUUID } from '@/utils'
// import { validUsername } from '@/utils/validate'
// import layer from 'layui-layer'
import SocialSign from './components/SocialSignin'
import { getSystemConfigData } from '@/api/systemSet'

export default {
  name: 'Login',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SocialSign
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!validUsername(value)) {
      //   callback(new Error('请输入正确的用户名称'))
      // } else {
      callback()
      // }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('密码不少于4个字符'))
      } else {
        callback()
      }
    }
    return {
      factoryName: '',
      logo: process.env.VUE_APP_BASE_API + '/static/admin/img/logo1.png',
      kexinLogo: process.env.VUE_APP_BASE_API + '/static/admin/img/kexin.png',
      firefoxDowbload: process.env.VUE_APP_BASE_API + '/file/download?id=1',
      flashDowbload: process.env.VUE_APP_BASE_API + '/file/download/?id=2',
      loginBg: '',
      loginForm: {
        // username: 'admin',
        // password: '111111'
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      activeName: 'first',
      userId: null

    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // this.getCaptcha()

    this.getSysConfig()
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    getSysConfig() {
      getSystemConfigData().then(response => {
        this.factoryName = response.systemSet.factoryName
        this.loginBg = process.env.VUE_APP_BASE_API + response.systemSet.loginBg
        localStorage.setItem('factoryName'.this.factoryName)
        // layer.msg('layer集成成功!')
      })
    },
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= 'a' && key <= 'z') ||
          (!shiftKey && key >= 'A' && key <= 'Z')
        ) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    // 切换登陆方式
    handleClick(tab, event) {
      console.log(this.activeName)
      // 快捷登陆
      if (this.activeName === 'second') {
        this.$refs.userId.focus()
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">

  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(38, 50, 56, .3);
    overflow: hidden;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url(http://127.0.0.1:8088/file/img/loginBg.jpg);
      background-size: cover;
    }
    .site-content__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: transparent;
    }
    .site-content {
      min-height: 100%;
      padding: 30px 500px 30px 30px;
    }
    .brand-info {
      margin: 220px 100px 0 90px;
      color: #fff;
    }
    .brand-info__text {
      margin:  0 0 22px 0;
      font-size: 48px;
      font-weight: 400;
      text-transform : uppercase;
    }
    .brand-info__intro {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: .6;
    }
    .login-main {
      position: absolute;
      top: 0;
      right: 0;
      // padding: 150px 60px 180px;
      width: 470px;
      min-height: 100%;
      background-color: #fff;
    }
    .login-title {
      font-size: 16px;
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 100%;
      margin-top: 38px;
    }
  }

  /* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: rgb(70, 66, 66);
$cursor: #fff;
.sidebar-logo {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin-right: 20px;
}
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    // color: black;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

$bg: #2d3a4b;
$dark_gray: #363a3b;
$light_gray: rgb(58, 53, 53);

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .tabItem {
      text-align: center;
      font-size: 50px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: black;
      // color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
  .centerDownload{
    margin-top: 20px;
    margin-left:40px;
    float: left;
  }
  .footer {
    position:absolute;
    float: left;
    margin-top: 340px;
    margin-left: 10px;
    .footerLogo {
      width: 20%;
      height:20%;
    }
    span {
      margin-top:120px;
      font-size: 12px;
    }
  }
}
</style>

