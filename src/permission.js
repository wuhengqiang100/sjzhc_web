import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getSystemConfigData } from '@/api/systemSet'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// const systemSet = {
//   factoryId: '',
//   factoryCode: '',
//   factoryName: '',
//   ftpIp: '',
//   ftpName: '',
//   ftpPass: '',
//   machineCodeMes: Boolean,
//   operationCodeMes: Boolean,
//   operatorCodeMes: Boolean,
//   productCodeMes: Boolean,
//   workUnitCodeMes: Boolean,
//   machineWasteNoJudge: Boolean,
//   productCartNumFirstId: Boolean,
//   productCartNumFirstDate: Boolean,
//   productCartNumFirstCount: Boolean,
//   productSheetWasterNum: Boolean,
//   productQaCodeName: Boolean,
//   productLocalProductName: Boolean

// }

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo') // 获取用户的个人信息
          await store.dispatch('system/config')// 获取系统的配置信息
          // localStorage.setItem('systemSet', systemSet)

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          getSystemConfigData().then(response => {
            localStorage.setItem('factoryName', response.systemSet.factoryName)
            localStorage.setItem('machineCodeMes', response.systemSet.machineCodeMes)
            localStorage.setItem('operationCodeMes', response.systemSet.operationCodeMes)
            localStorage.setItem('operatorCodeMes', response.systemSet.operatorCodeMes)
            localStorage.setItem('productCodeMes', response.systemSet.productCodeMes)
            localStorage.setItem('workUnitCodeMes', response.systemSet.workUnitCodeMes)
            localStorage.setItem('machineWasteNoJudge', response.systemSet.machineWasteNoJudge)
            localStorage.setItem('productCartNumFirstId', response.systemSet.productCartNumFirstId)
            localStorage.setItem('productCartNumFirstDate', response.systemSet.productCartNumFirstDate)
            localStorage.setItem('productCartNumFirstCount', response.systemSet.productCartNumFirstCount)
            localStorage.setItem('productSheetWasterNum', response.systemSet.productSheetWasterNum)
            localStorage.setItem('productQaCodeName', response.systemSet.productQaCodeName)
            localStorage.setItem('productLocalProductName', response.systemSet.productLocalProductName)
          })
          // console.log(localStorage.getItem('systemSet'))

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
