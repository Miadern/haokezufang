import request from '@/utils/request'
/**
 * 获取房屋ID
 * @param {*} id
 * @returns
 */
// /houses/{id}
export const getHouseInfo = (id) => {
  return request({
    url: `/houses/${id}`,
    method: 'get'
  })
}

/// user/favorites
export const doYouFavorites = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'get'
  })
}
