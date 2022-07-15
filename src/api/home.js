import request from '@/utils/request'
// 请求轮播图
export const getSwiper = () => {
  return request({
    url: '/home/swiper',
    method: 'get'
  })
}
// 请求租房小组
export const getGroups = () => {
  return request({
    url: '/home/groups',
    method: 'get',
    params: { area: 'AREA|88cff55c-aaa4-e2e0' }
  })
}
