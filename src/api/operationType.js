import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/operationType/list',
    method: 'get',
    params: query
  })
}

export function importOperationType(query) {
  return request({
    url: '/operationType/import',
    method: 'get',
    params: query
  })
}

export function updateUseFlag(id) {
  return request({
    url: '/operationType/updateUseFlag',
    method: 'post',
    params: { id }
  })
}

export function createOperationType(data) {
  return request({
    url: '/operationType/create',
    method: 'post',
    data
  })
}

export function updateOperationType(data) {
  return request({
    url: '/operationType/update',
    method: 'post',
    data
  })
}
export function deleteOperationType(id) {
  return request({
    url: '/operationType/delete',
    method: 'post',
    params: { id }
    // baseURL: "http://127.0.0.1:8088"
  })
}
