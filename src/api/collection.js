import request from '@/utils/request'

export const getCollection = (token) => {
  return request({
    url: '/user/favorites',
    method: 'get',
    headers: {
      Authorization: token
    }
  })
}
