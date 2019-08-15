import axios from 'axios'
import store from "../_store";
import router from "../_helpers/router";

export const authService = {
    login,
    logout,
    testRoute
}

function login(username, password, remember){
    return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_API_URL+'/login_check',
                {
                    username: username,
                    password: password
                })
            .then(response => {
                if(remember){
                    localStorage.setItem('user', JSON.stringify(response.data))
                }else{
                    localStorage.setItem('user', JSON.stringify({'token': response.data.token}))
                }
                axios.defaults.headers.common['Authorization'] = "Bearer "+  response.data.token;
                resolve(JSON.parse(localStorage.getItem('user')))
            })
            .catch((err) => {
                store.dispatch('authModule/logout')
                reject(err)
            })
    })
}

function testRoute(to,from,next){
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path)
    const accessToken = JSON.parse(localStorage.getItem('user'))

    if (!!accessToken && authRequired){
        store.dispatch('authModule/reload', {accessToken, next})
    }

    if(!accessToken && authRequired){

        if(next === undefined){
            router.push('/login')
        }else{
            next('/login')
        }

    }else if(!!accessToken && !authRequired){
        store.dispatch('authModule/logout')
    }
}

function logout(){

    if(axios.defaults.headers.common['Authorization']){
        delete axios.defaults.headers.common['Authorization']
    }
    if(localStorage.getItem('user')){
        localStorage.removeItem('user')
    }
    if(router.currentRoute.path !== '/login'){
        router.push('/login')
    }
}