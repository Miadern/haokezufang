import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home')
      },
      {
        path: '/profile',
        component: () => import('@/views/profile')
      },
      {
        path: '/list',
        component: () => import('@/views/list')
      },
      {
        path: '/news',
        component: () => import('@/views/news')
      }
    ]
  },
  {
    path: '/city',
    component: () => import('@/views/city')
  },

  {
    path: '/login',
    component: () => import('@/views/Login')
  },

  {
    path: '/collection',
    component: () => import('@/views/collection')
  },
  {
    path: '/sell',
    component: () => import('@/views/sell')
  },
  {
    path: '/city',
    component: () => import('@/views/city')
  },
  {
    path: '/houseInfo',
    component: () => import('@/views/houseInfo')
  },
  {
    path: '/publish',
    component: () => import('@/views/publish')
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/map',
    component: () => import('@/views/map')
  }
]

const router = new VueRouter({
  routes
})

export default router
