import VueRouter from 'vue-router'
import Enter from '../pages/Enter/index.vue'
import Barrage from '../pages/Barrage/index.vue'

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
router.beforeEach((to,from,next)=>{
    if(to.path.indexOf('/barrage')!=-1){
        if(sessionStorage.getItem('TOKEN'))next()
        else next('/enter')
    }
    else if(to.path=='/enter')next()
    
})


export default router