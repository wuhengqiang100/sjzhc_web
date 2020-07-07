import request from '@/utils/request'

// 北京防伪监控api
export function fetchListCardTop(query) {
  return request({
    url: '/monitor/cardTop',
    method: 'get',
    params: query
    // baseURL: "http://127.0.0.1:8088"
  })
}
export function fetchListCardBottom(query) {
  return request({
    url: '/monitor/cardBottom',
    method: 'get',
    params: query
  })
}

export function fetchListMachineWarning(query) {
  return request({
    url: '/monitor/warning',
    method: 'get',
    params: query
  })
}

// 南昌大屏监控api

// 获取监控大屏名称
export function getMonitorName(id) {
  return request({
    url: '/monitorNc/monitorName',
    method: 'get',
    params: { id }
  })
}

export function fetchListCardTopNc(query) {
  return request({
    url: '/monitorNc/cardTop',
    method: 'get',
    params: query
  })
}
export function fetchListCardBottomNc(query) {
  return request({
    url: '/monitorNc/cardBottom',
    method: 'get',
    params: query
  })
}

export function fetchListMachineWarningNc(query) {
  return request({
    url: '/monitorNc/warning',
    method: 'get',
    params: query
  })
}

