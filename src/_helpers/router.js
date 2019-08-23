import  Vue  from  'vue'
import  Router  from  'vue-router'
import  Home  from '../views/Home.vue'
import  Login  from '../views/Login.vue'
import  NikoNiko  from '../views/NikoNiko.vue'
import  Test  from '../views/Test.vue'
import  Questions  from '../views/Questions.vue'
import {authService} from "../_services/auth.service";

Vue.use(Router)

const router = new  Router({
    mode:  'history',
    base:  process.env.BASE_URL,
    routes: [
        {
          path:'/test',
          name: 'test',
          component: Test
        },
        {
            path: '/niko-niko',
            name: 'niko-niko',
            component: NikoNiko
        },
        {
            path: '/questions',
            name: 'questions',
            component: Questions
        },
        {
            path:  '/login',
            name:  'login',
            component:  Login
        },
        {
            path: '/rc',
            name: 'rc',
            component: Home
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
    authService.testRoute(to)
    next()
});

export  default  router;