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

// /user/houses
/**
 * 发布房屋
 * @param {*} title
 * @param {*} description
 * @param {*} houseImg
 * @param {*} supporting
 * @param {*} price
 * @param {*} size
 * @param {*} floor
 * @param {*} community
 * @returns
 */
export const publishHouse = (
  title,
  description,
  houseImg,
  oriented,
  supporting,
  price,
  roomType,
  size,
  floor,
  community
) => {
  return request({
    url: '/user/houses',
    method: 'post',
    data: {
      title,
      description,
      houseImg,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      community
    }
  })
}

// /houses/image
export const sendImg = (formData) => {
  return request({
    url: '/houses/image',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
