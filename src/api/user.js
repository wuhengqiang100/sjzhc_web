import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/common/login',
    method: 'post',
    data,
    baseURL: 'http://127.0.0.1:8088'
  })
}

export function getInfo(token) {
  return request({
    url: '/common/info',
    method: 'get',
    params: { token },
    baseURL: 'http://127.0.0.1:8088'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
