import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login1',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/login',
      name: 'login2',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/seat',
      name: 'seat',
      component: () => import('./views/Seat.vue')
    },
    {
      path: '/seat/seatinner/:id',
      name: 'seatinner',
      component: () => import('./views/SeatInner.vue')
    },
    {
      path: '/near',
      name: 'near',
      component: () => import('./views/Near.vue')
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('./views/Info.vue')
    },
    {
      path: '/home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '',
          name: 'home2',
          component: () => import('./views/Home2.vue')
        },
        {
          path: 'recommend',
          name: 'recommend',
          component: () => import('./views/Recommend.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('./views/Profile.vue')
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isBookLogin = localStorage.getItem('isBookLogin')
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isBookLogin ? next() : next('/login')
  }
})

export default router
