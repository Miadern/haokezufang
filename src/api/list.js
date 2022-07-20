import request from '@/utils/request'

/**
 * 获取房屋查询条件
 * @param {*} id 地区id
 * @returns
 */
// /houses/condition

export const getCondition = (id) => {
  return request({
    url: '/houses/condition',
    method: 'get',
    params: { id }
  })
}
