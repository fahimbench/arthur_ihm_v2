import  Vue  from  'vue'
import  Router  from  'vue-router'
import  Home  from '../views/Home.vue'
import  Login  from '../views/Login.vue'
import store from '../_store'
import axios from 'axios'
import {authService} from "../_services/auth.service";

Vue.use(Router)

const router = new  Router({
    mode:  'history',
    base:  process.env.BASE_URL,
    routes: [
        {
            path:  '/',
            alias: '/home',
            name:  'home',
            component:  Home
        },
        {
            path: '/test',
            name: 'test',
            template: '<div></div>'
        },
        {
            path:  '/login',
            name:  'login',
            component:  Login
        },
        {
            path: '/*',
            redirect: { name: 'home' }
        }
    ]
})

router.beforeEach((to,from,next) => {
    authService.testRoute(to,from,next)
    next()
});

export  default  router;