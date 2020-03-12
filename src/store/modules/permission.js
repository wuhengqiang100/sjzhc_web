import { constantRoutes } from '@/router'
import Layout from '@/layout'
import request from '@/utils/request'
// eslint-disable-next-line no-unused-vars
import product from '@/views/base/product'
// eslint-disable-next-line no-unused-vars
import operation from '@/views/base/operation'
// eslint-disable-next-line no-unused-vars
import machine from '@/views/base/machine'
// eslint-disable-next-line no-unused-vars
import dataupLog from '@/views/log/dataupLog'
// eslint-disable-next-line no-unused-vars
import operationLog from '@/views/log/operationLog'
// eslint-disable-next-line no-unused-vars
import machineLog from '@/views/log/machineLog'
// eslint-disable-next-line no-unused-vars
import produceLog from '@/views/log/produceLog'
// eslint-disable-next-line no-unused-vars
import check from '@/views/machine/check'
// eslint-disable-next-line no-unused-vars
import template from '@/views/machine/template'
// eslint-disable-next-line no-unused-vars
import menu from '@/views/system/menu'
// eslint-disable-next-line no-unused-vars
import role from '@/views/system/role'
// eslint-disable-next-line no-unused-vars
import user from '@/views/system/user'

/* export const asyncRoutes = [
  {
    path: '/base',
    component: Layout,
    redirect: 'noRedirect',
    name: 'base',
    meta: {
      title: '基础信息配置',
      icon: 'table'
    },
    children: [
      {
        path: 'product',
        component: () => import('@/views/base/product'),
        name: 'product',
        meta: { title: '产品信息管理' }
      },
      {
        path: 'operation',
        component: () => import('@/views/base/operation'),
        name: 'operation',
        meta: { title: '工序信息管理' }
      },
      {
        path: 'machine',
        component: () => import('@/views/base/machine'),
        name: 'machine',
        meta: { title: '设备信息管理' }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    redirect: 'noRedirect',
    name: 'log',
    meta: {
      title: '核查信息管理',
      icon: 'component'
    },
    children: [

      {
        path: 'dataup',
        component: () => import('@/views/log/dataup'),
        name: 'dataup',
        meta: { title: '上传日志查询' }
      },
      {
        path: 'operation',
        component: () => import('@/views/log/operation'),
        name: 'operation',
        meta: { title: '操作日志查询' }
      },
      {
        path: 'machine',
        component: () => import('@/views/log/machine'),
        name: 'machine',
        meta: { title: '设备日志查询' }
      },
      {
        path: 'produce',
        component: () => import('@/views/log/produce'),
        name: 'produce',
        meta: { title: '生产日志查询' }
      }

    ]
  },
  {
    path: '/machine',
    component: Layout,
    redirect: 'noRedirect',
    name: 'machine',
    meta: {
      title: '机检信息管理',
      icon: 'guide'
    },
    children: [
      {
        path: 'check',
        component: () => import('@/views/machine/check'),
        name: 'check',
        meta: { title: '机检信息审核' }
      },
      {
        path: 'template',
        component: () => import('@/views/machine/template'),
        name: 'template',
        meta: { title: '机检模板管理' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'noRedirect',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'documentation'
    },
    children: [
      {
        path: 'menu',
        component: () => import('@/views/system/menu'),
        name: 'menu',
        meta: { title: '菜单管理' }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role'),
        name: 'role',
        meta: { title: '角色管理' }
      },
      {
        path: 'user',
        component: () => import('@/views/system/user'),
        name: 'user',
        meta: { title: '用户管理' }
      }

    ]
  },
  { path: '*', redirect: '/404', hidden: true }
] */
export const asyncRoutes = [
  /*  {
    'path': '/base',
    'component': Layout,
    'redirect': 'noRedirect',
    'name': 'Base',
    'meta': {
      'title': '基础信息配置',
      'icon': 'table'
    },
    'children': [
      {
        'path': 'product',
        'component': () => import('@/views/base/product'),
        'name': 'product',
        'meta': { 'title': '产品信息管理' }
      },
      {
        'path': 'operation',
        'component': () => import('@/views/base/operation'),
        'name': 'operation',
        'meta': { 'title': '工序信息管理' }
      },
      {
        'path': 'machine',
        'component': () => import('@/views/base/machine'),
        'name': 'machine',
        'meta': { 'title': '设备信息管理' }
      }
    ]
  },
  {
    path: '/base',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Base',
    meta: {
      title: '基础信息配置',
      icon: 'table'
    },
    children: [{
      path: 'product',
      component: () => import('@/views/base/product'),
      name: 'product',
      meta: {
        title: '产品信息管理'
      }
    }, {
      path: 'operation',
      component: () => import('@/views/base/operation'),
      name: 'operation',
      meta: {
        title: '工序信息管理'
      }
    }, {
      path: 'machine',
      component: () => import('@/views/base/machine'),
      name: 'machine',
      meta: {
        title: '设备信息管理'
      }
    }]
  } */
]

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

export function getAsyncRoutes() {
  return request({
    url: '/common/menu',
    method: 'post',
    baseURL: 'http://127.0.0.1:8088'
  })
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        getAsyncRoutes().then((res) => {
          // accessedRoutes = asyncRoutes || []
          accessedRoutes = res.asyncRoutes || []
          accessedRoutes.forEach((route) => {
            if (route.component === 'Layout') {
              route.component = Layout
            }
            route.children.forEach((child) => {
              // const componentStr = child.component
              // 基础信息菜单
              if (child.component === 'product') {
                child.component = product
              }
              if (child.component === 'operation') {
                child.component = operation
              }
              if (child.component === 'machine') {
                child.component = machine
              }
              if (child.component === 'dataupLog') {
                child.component = dataupLog
              }
              if (child.component === 'operationLog') {
                child.component = operationLog
              }
              if (child.component === 'machineLog') {
                child.component = machineLog
              }
              if (child.component === 'produceLog') {
                child.component = produceLog
              }
              if (child.component === 'check') {
                child.component = check
              }
              if (child.component === 'template') {
                child.component = template
              }
              if (child.component === 'menu') {
                child.component = menu
              }
              if (child.component === 'role') {
                child.component = role
              }
              if (child.component === 'user') {
                child.component = user
              }
            })
          })
          console.log('新菜单', accessedRoutes)
          console.log('输出的json', res.asyncRoutes)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        console.log('筛选路由', '根据角色筛选路由')
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
