import request from '@/utils/request'
// 获取城市列表
export const getCity = (level) => {
  return request({
    url: '/area/city',
    method: 'get',
    params: { level }
  })
}
