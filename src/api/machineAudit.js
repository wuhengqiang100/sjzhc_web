import request from '@/utils/request'

// 未审核的数据
export function fetchCanAuditList() {
  return request({
    url: '/machine/canAudit/list',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 未审核的数据
export function fetchAlreadyAuditList() {
  return request({
    url: '/machine/alreadyAudit/list',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 不走核查的数据
export function fetchNotAuditList() {
  return request({
    url: '/machine/notAudit/list',
    method: 'get'
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 审核数据
export function saveCanAudit(data) {
  return request({
    url: '/machine/canAudit/save',
    method: 'post',
    params: { data }
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 回退数据
export function saveAlreadyAudit(data) {
  return request({
    url: '/machine/alreadyAudit/save',
    method: 'post',
    params: { data }
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 全检数据
export function saveNotAudit(data) {
  return request({
    url: '/machine/notAudit/save',
    method: 'post',
    params: { data }
    // baseURL: "http://127.0.0.1:8088"
  })
}

// 回退全检数据
export function returnNotAudit(data) {
  return request({
    url: '/machine/notAudit/return',
    method: 'post',
    params: { data }
    // baseURL: "http://127.0.0.1:8088"
  })
}

