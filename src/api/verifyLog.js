import request from '@/utils/request'

// 上传日志查询
export function fetchDataUpList(query) {
  return request({
    url: '/log/dataup',
    method: 'get',
    params: query,
    baseURL: 'http://127.0.0.1:8088'
  })
}
// 操作日志查询
export function fetchOperationList(query) {
  return request({
    url: '/log/operation',
    method: 'get',
    params: query,
    baseURL: 'http://127.0.0.1:8088'
  })
}
// 设备日志查询
export function fetchMachineList(query) {
  return request({
    url: '/log/machine',
    method: 'get',
    params: query,
    baseURL: 'http://127.0.0.1:8088'
  })
}
// 生产日志查询
export function fetchProduceList(query) {
  return request({
    url: '/log/produce',
    method: 'get',
    params: query,
    baseURL: 'http://127.0.0.1:8088'
  })
}
// 核查综合查询
export function fetchCheckQueryList(data) {
  return request({
    url: '/log/CheckQuery',
    method: 'post',
    data,
    baseURL: 'http://127.0.0.1:8088'
  })
}

