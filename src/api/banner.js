import request from '@/utils/request'

export function getBanner() {
  return request({
    url: '/api/banner',
    method: 'get',
  })
}

//设置首页标语
export function postBanner(data) {
  return request({
    url: '/api/banner',
    method: 'post',
    data
  })
}

