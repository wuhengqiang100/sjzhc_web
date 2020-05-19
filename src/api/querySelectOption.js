import request from '@/utils/request'

export function listOptionMachineModel() {
  return request({
    url: '/option/machineModel',
    method: 'post'
  })
}
export function listOptionAuditParameter() {
  return request({
    url: '/option/auditParameter',
    method: 'post'
  })
}
export function listOptionOperator() {
  return request({
    url: '/option/operator',
    method: 'post'
  })
}
export function listOptionErrorType() {
  return request({
    url: '/option/errorType',
    method: 'post'
  })
}
export function listOptionWorkUnit() {
  return request({
    url: '/option/workUnit',
    method: 'post'
  })
}
export function listOptionProduceLog() {
  return request({
    url: '/option/produceLog',
    method: 'post'
  })
}

