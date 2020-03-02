/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/systemLog',
  component: Layout,
  redirect: 'noRedirect',
  name: 'systemLog',
  meta: {
    title: '系统日志管理',
    icon: 'table'
  },
  children: [

    {
      path: 'yunxinrizhi',
      component: () => import('@/views/systemLog/yunxinrizhi'),
      name: 'yunxinrizhi',
      meta: { title: '运行日志查询' }
    },
    {
      path: 'caozuorizhi',
      component: () => import('@/views/systemLog/caozuorizhi'),
      name: 'caozuorizhi',
      meta: { title: '操作日志查询' }
    }

  ]
}
export default tableRouter
