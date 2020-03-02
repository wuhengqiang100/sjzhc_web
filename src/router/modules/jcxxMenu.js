/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/base',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Base',
  meta: {
    title: '基础信息配置',
    icon: 'table'
  },
  children: [

    {
      path: 'renyuan',
      component: () => import('@/views/base/renyuan'),
      name: 'renyuan',
      meta: { title: '人员管理' }
    },
      {
      path: 'jiedianleibie',
      component: () => import('@/views/base/jiedianleibie'),
      name: 'jiedianleibie',
      meta: { title: '节点类别管理' }
    },
    {
      path: 'jiedian',
      component: () => import('@/views/base/jiedian'),
      name: 'renyuan',
      meta: { title: '节点管理' }
    },
    {
      path: 'pinzhong',
      component: () => import('@/views/base/pinzhong'),
      name: 'pinzhong',
      meta: { title: '品种管理' }
    },
    {
      path: 'shebeileibie',
      component: () => import('@/views/base/shebeileibie'),
      name: 'shebeileibie',
      meta: { title: '设备类别管理' }
    },
    {
      path: 'shebei',
      component: () => import('@/views/base/shebei'),
      name: 'shebei',
      meta: { title: '设备管理' }
    }

  ]
}
export default tableRouter
