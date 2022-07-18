import request from '@/utils/request'

// /area/community
/**
 *小区关键词搜索
 * @param {*} name 搜索的关键词
 * @param {*} id 地区号码
 * @returns
 */
export const getCommunity = (name, id) => {
  return request({
    url: '/area/community',
    method: 'get',
    params: { name, id }
  })
}
