import request from '@/utils/request'

/**
 * 获取房屋查询条件
 * @param {*} id 地区id
 * @returns
 */
export const getCondition = (id) => {
  return request({
    url: '/houses/condition',
    method: 'get',
    params: { id }
  })
}
/**
 *
 * @param {*} id 地区的id
 * @param {*} area 地区
 * @param {*} subway 地铁
 * @param {*} rentType 整租
 * @param {*} price 价格
 * @param {*} more 复合查询

 * @returns
 */
export const getFilerRes = (id, area, subway, rentType, price, more) => {
  return request({
    url: '/houses',
    method: 'get',
    params: { id, area, subway, rentType, price, more }
  })
}
