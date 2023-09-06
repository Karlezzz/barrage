import VueRouter from 'vue-router'
import Enter from '../pages/Enter/index.vue'
import Barrage from '../pages/Barrage/index.vue'
import store from '@/store/index'

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/enter'
    },
    {
      name: 'enter',
      path: '/enter',
      component: Enter
    },
    {
      name: 'barrage',
      path: '/barrage/:roomId',
      component: Barrage,

    },

  ]
})
router.beforeEach((to, from, next) => {
  // if (to.path.indexOf('/barrage') !== -1) {
  //   // if (localStorage.getItem('TOKEN')) next()
  //   // else next('/enter')
  //   next('/enter')
  // }
  // else if (to.path == '/enter') next()

  if (to.path === '/enter' || localStorage.getItem('TOKEN')) {
    next()
  } else {
    const { name, params: { roomId } } = to
    if (name === 'barrage') {
      store.commit('enter/SETROOMCODE', roomId)
    }
    next('/enter')
  }

})


export default router
