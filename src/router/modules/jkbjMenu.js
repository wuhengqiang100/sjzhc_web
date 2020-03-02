/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/monitorWarn',
  component: Layout,
  redirect: 'noRedirect',
  name: 'monitorWarn',
  meta: {
    title: '机检数据管理',
    icon: 'table'
  },
  children: [

    {
      path: 'baojincanshu',
      component: () => import('@/views/monitorWarn/baojincanshu'),
      name: 'baojincanshu',
      meta: { title: '报警参数调整' }
    },
    {
      path: 'baojinxinxi',
      component: () => import('@/views/monitorWarn/baojinxinxi'),
      name: 'baojinxinxi',
      meta: { title: '报警信息处理' }
    },
    {
      path: 'dapinjiankong',
      component: () => import('@/views/monitorWarn/dapinjiankong'),
      name: 'dapinjiankong',
      meta: { title: '大屏监控报警' }
    }

  ]
}
export default tableRouter
