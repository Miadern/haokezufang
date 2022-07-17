import request from '@/utils/request'
// 请求轮播图
export const getSwiper = () => {
  return request({
    url: '/home/swiper',
    method: 'get'
  })
}
// 请求租房小组
export const getGroups = (area) => {
  return request({
    url: '/home/groups',
    method: 'get',
    params: { area }
  })
}

// 获取本地区信息

export const getMapID = (name) => {
  return request({
    url: '/area/info',
    method: 'get',
    params: { name }
  })
}
