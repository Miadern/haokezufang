import request from '@/utils/request'

// 查询房源数据
export const getMap = (id) => {
  return request({
    url: '/area/map',
    method: 'get',
    params: { id }
  })
}

// 查询房源
export const getFilerRes = (cityId, start, end) => {
  return request({
    url: '/houses',
    method: 'get',
    params: {
      cityId,
      start,
      end
    }
  })
}
