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
