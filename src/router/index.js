import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePageVue from '@/views/HomePage.vue'


Vue.use(VueRouter)

// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    // 访问根路径重定向到/home
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomePageVue
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('../views/CateGory.vue')
  },

  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchFor.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserView.vue')
  }

]
const router = new VueRouter({
  routes
})

export default router
