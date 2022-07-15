import request from '@/utils/request'

export const getSell = (token) => {
  return request({
    url: '/user/houses',
    method: 'get',
    headers: {
      Authorization: token
    }
  })
}
