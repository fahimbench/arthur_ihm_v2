import { authService } from '../../_services/auth.service'
import router from "../../_helpers/router";
import axios from "axios";
import store from "../index";
//import router from "../../_helpers/router";

export const authModule = {
    namespaced: true,
    state: {
        status: JSON.parse(localStorage.getItem('user')),
        token: '',
        remember: '',
        user: {}

    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status
    },
    mutations: {
        loginRequest(state) {
            state.status = 'loading'
        },
        loginSuccess(state, payload) {
            state.status = 'success'
            state.token = payload.token
            state.remember = payload.remember
            state.user = payload.user
        },
        loginFailure(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
            state.remember = ''
            state.user = {}
        }
    },
    actions:{
        login({commit}, {username, password, remember}){
            commit('loginRequest')
            authService.login(username, password, remember).then(
                success => {
                    let refresh = (success.refresh_token) ? success.refresh_token : ''
                    commit('loginSuccess', { token: success.token, remember: refresh, user: {name:'test1'}})
                    router.push('/')
                },
                error => {
                    commit('loginFailure')
                }
            )
        },
        reload({commit, dispatch}, {accessToken, next}){
            commit('loginRequest')

            axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem('user')).token

            axios.post(process.env.VUE_APP_API_URL+'/me')
                .then((success)=>{
                    let refresh = (accessToken.refresh_token) ? accessToken.refresh_token : ''
                    commit('loginSuccess', { token: accessToken.token, remember: refresh, user: {name:'test1'}})
                    if(next !== undefined){
                        next()
                    }
                })
                .catch((err) => {
                    commit('loginFailure')
                    dispatch('logout')
                });
        },
        logout({commit}){
            commit('logout')
            authService.logout()
        }
    }
}

