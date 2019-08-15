import  Vue  from  'vue'
import  Router  from  'vue-router'
import  Home  from '../views/Home.vue'
import  Login  from '../views/Login.vue'
import  NikoNiko  from '../views/Login.vue'
import  Questions  from '../views/Login.vue'
import {authService} from "../_services/auth.service";

Vue.use(Router)

const router = new  Router({
    mode:  'history',
    base:  process.env.BASE_URL,
    routes: [
        {
            path: '/feature',
            children: [
                {
                    path: 'niko-niko',
                    name: 'niko-niko',
                    component: NikoNiko
                },
                {
                    path: 'questions',
                    name: 'questions',
                    component: Questions
                }
            ]
        },
        {
            path:  '/login',
            name:  'login',
            component:  Login
        },
        {
            path:  '/',
            alias: '/home',
            name:  'home',
            component:  Home
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