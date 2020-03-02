/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/machineData',
  component: Layout,
  redirect: 'noRedirect',
  name: 'machineData',
  meta: {
    title: '机检数据管理',
    icon: 'table'
  },
  children: [

    {
      path: 'wenjian',
      component: () => import('@/views/machineData/wenjian'),
      name: 'wenjian',
      meta: { title: '文件管理上传' }
    },
    {
      path: 'lishixinxi',
      component: () => import('@/views/machineData/lishixinxi'),
      name: 'lishixinxi',
      meta: { title: '历史信息追溯' }
    },
    {
      path: 'shujuchaxun',
      component: () => import('@/views/machineData/shujuchaxun'),
      name: 'shujuchaxun',
      meta: { title: '数据查询分析' }
    },
    {
      path: 'teshuzhou',
      component: () => import('@/views/machineData/teshuzhou'),
      name: 'teshuzhou',
      meta: { title: '特殊轴管理' }
    }

  ]
}
export default tableRouter
