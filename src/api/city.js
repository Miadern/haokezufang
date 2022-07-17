import request from '@/utils/request'
// 获取城市列表
export const getCity = (level) => {
  return request({
    url: '/area/city',
    method: 'get',
    params: { level }
  })
}

// /area/hot

export const getCityhot = () => {
  return request({
    url: '/area/hot',
    method: 'get'
  })
}
