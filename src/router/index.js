import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)

const router = new Router({
  base: '',
  routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
    next()
  // if (to.name !== 'login' && !router.app.$cookies.get('status') !== 'logined') {
  //   next({ path: '/login', query: { redirect: to.fullPath } })
  // }
  // else {
  //   next()
  // }

  // if () {
  //   next({
  //     path: '/login',
  //     query: { redirect: to.fullPath } // 把要跳转的地址作为参数传到下一步
  //   })
  // }

  // if (router.app.$cookies.get('status') !== 'logined') {
  //   next({
  //     path: '/login',
  //     query: { redirect: to.fullPath } // 把要跳转的地址作为参数传到下一步
  //   })
  // }
  // else {
  //   next()
  // }
  // if (to.matched.some((record) => record.meta.requiresAuth)) {
  //   if (router.app.$cookies.get('status') !== 'logined') {
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath } // 把要跳转的地址作为参数传到下一步
  //     })
  //   }
  //   else {
  //     next()
  //   }
  // }
  // else {
  //   if (to.query && to.query.redirect) {
  //     if (router.app.$cookies.get('status') === 'logined') {
  //       next({ path: to.query.redirect })
  //     }
  //     else {
  //       next()
  //     }
  //   }
  //   else {
  //     next() // 确保一定要调用 next()
  //   }
  // }
})

export default router
