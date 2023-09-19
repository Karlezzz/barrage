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
      path: '/barrage/:roomCode/:classRoomId',
      component: Barrage,

    },

  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/enter' || sessionStorage.getItem('BARRAGEFLAG')) {
    next()
  } else {
    const { name, params: { roomCode, classRoomId } } = to
    if (name === 'barrage') {
      store.commit('enter/SETROOMCODE', roomCode)
      store.commit('enter/SETCLASSROOMID', classRoomId)
      sessionStorage.setItem('roomCode',roomCode)
      sessionStorage.setItem('classRoomId',classRoomId)
    }
    next('/enter')
  }
})


export default router
