import axios from 'axios'
import store from "../_store";
import router from "../_helpers/router";
import Vue from "vue"

export const authService = {
    login,
    logout,
    testRoute,
    reload
}

/**
 * Identifie un utilisateur avec username et password
 * passer un remember pour garder un refresh token en localStorage
 * @param username
 * @param password
 * @param remember
 * @returns {Promise<unknown>}
 */
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
                Vue.toasted.show('Nom d\'utilisateur ou mot de passe incorrect', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                reject(err)
            })
    })
}

/**
 * Permet de vérifier que le token est toujours valide à chaque chargement de route
 * @param accessToken
 * @returns {Promise<unknown>}
 */
function reload(accessToken){
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken.token
        axios.post(process.env.VUE_APP_API_URL + '/me')
            .then(() => {
                resolve()
            })
            .catch(() => {
                reject()
            });
    })
}

/**
 * Permet de vérifier si le refresh token est valide
 * @param refreshToken
 * @returns {Promise<unknown>}
 */
function reloadRemember(refreshToken){
    return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_API_URL+'/login_refresh',
            {
                refresh_token: refreshToken,
            })
            .then((success) => {
                localStorage.setItem('user', JSON.stringify(success.data))
                resolve(success)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

/**
 * Appelle les actions pour chaque cas de route
 * @param to
 */
function testRoute(to){
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path)
    const accessToken = JSON.parse(localStorage.getItem('user'))

    if(!!store.getters['authModule/authStatus'] && !accessToken){
        store.dispatch('authModule/logout', true)
    }else if(!accessToken && authRequired){
        store.dispatch('authModule/logout', true)
    }else if(!!accessToken && !authRequired){
        store.dispatch('authModule/logout', true)
    }else if(!!accessToken && authRequired){
        store.dispatch('authModule/reload', {accessToken})
    }
}

/**
 * Déconnecte, on passe type à true quand on veut une déconnexion sans vérification du refresh token
 * @param type
 */
function logout(type){
    if(!type && !!JSON.parse(localStorage.getItem('user')).refresh_token){
        reloadRemember(JSON.parse(localStorage.getItem('user')).refresh_token)
            .then(() => {
                router.push('/rc')
                router.push('/')
                Vue.toasted.show('Un problème est survenu avec votre jeton de connection et heureusement que votre session a été concervé ...', { position: 'bottom-right', type: 'info', theme:'outline', icon: 'sentiment_very_satisfied',  duration : 8000})
            })
            .catch(() => {
                deleteInfos()
                if (router.currentRoute.path !== '/login') {
                    router.push('/login')
                    Vue.toasted.show('Un problème est survenu, vous avez été déconnecté ...', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                }
            })
    } else {
        deleteInfos();
        if (router.currentRoute.path !== '/login') {
            router.push('/login')
            Vue.toasted.show('vous avez été déconnecté avec succés !', { position: 'bottom-right', type: 'success', theme:'outline', icon: 'sentiment_very_satisfied',  duration : 5000})

        }
    }
}

/**
 * Supprime le header d'authorization d'axios et supprime l'objet du localStorage
 */
function deleteInfos(){
    if (axios.defaults.headers.common['Authorization']) {
        delete axios.defaults.headers.common['Authorization']
    }
    if (localStorage.getItem('user')) {
        localStorage.removeItem('user')
    }
}