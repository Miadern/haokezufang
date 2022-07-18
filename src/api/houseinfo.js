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

/**
 * 获取商品收藏状态
 * @param {*} id 商品ID
 * @returns
 */
/// user/favorites
export const doYouFavorites = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'get'
  })
}

/**
 * 添加商品收藏状态
 * @param {*} id 商品ID
 * @returns
 */
/// user/favorites
export const doYouFavoritesAdd = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'post'
  })
}

/**
 * 删除商品收藏
 * @param {*} id 商品ID
 * @returns
 */
/// user/favorites
export const doYouFavoritesDel = (id) => {
  return request({
    url: `/user/favorites/${id}`,
    method: 'delete'
  })
}
