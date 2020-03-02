/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/systemManage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'systemManage',
  meta: {
    title: '系统管理',
    icon: 'table'
  },
  children: [

    {
      path: 'role',
      component: () => import('@/views/systemManage/role'),
      name: 'role',
      meta: { title: '角色管理' }
    },
    {
      path: 'user',
      component: () => import('@/views/systemManage/user'),
      name: 'user',
      meta: { title: '用户管理' }
    }

  ]
}
export default tableRouter
