import request from '@/utils/request'

export const getInfo = (token) => {
  return request({
    url: '/user',
    method: 'get',
    headers: {
      Authorization: token
    }
  })
}
