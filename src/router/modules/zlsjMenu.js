/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/qualityData',
  component: Layout,
  redirect: 'noRedirect',
  name: 'qualityData',
  meta: {
    title: '质量数据操作',
    icon: 'table'
  },
  children: [

    {
      path: 'rengongbulu',
      component: () => import('@/views/qualityData/rengongbulu'),
      name: 'rengongbulu',
      meta: { title: '人工补录' }
    },
    {
      path: 'tifeidanshengcheng',
      component: () => import('@/views/qualityData/tifeidanshengcheng'),
      name: 'tifeidanshengcheng',
      meta: { title: '剔费单生产' }
    },
    {
      path: 'tifeidanguanli',
      component: () => import('@/views/qualityData/tifeidanguanli'),
      name: 'tifeidanguanli',
      meta: { title: '剔费单管理' }
    },
    {
      path: 'pianzhengjiance',
      component: () => import('@/views/qualityData/pianzhengjiance'),
      name: 'pianzhengjiance',
      meta: { title: '偏振检测' }
    }

  ]
}
export default tableRouter
