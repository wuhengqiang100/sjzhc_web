import request from '@/utils/request'

// 获取系统配置
export function getSystemConfigData(query) {
  return request({
    url: '/system/systemSet/get',
    method: 'get',
    params: query
  })
}

export function saveSystemConfig(data) {
  return request({
    url: '/system/systemSet/save',
    method: 'post',
    data
    // baseURL: "http://127.0.0.1:8088"
  })
}

