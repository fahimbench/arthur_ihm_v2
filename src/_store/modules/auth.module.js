import { authService } from '../../_services/auth.service'
import router from "../../_helpers/router";
import jwtDecode from "jwt-decode"

export const authModule = {
    namespaced: true,
    state: {
        status: '',
        token: (JSON.parse(localStorage.getItem('user'))) ? JSON.parse(localStorage.getItem('user')).token : '',
        remember: '',
        user: {}

    },
    getters: {
        isLoggedIn: state => !!state.token,
        remember: state => state.remember,
        authUsername: state => state.user.username,
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
        login({commit, dispatch}, {username, password, remember}){
            commit('loginRequest')
            authService.login(username, password, remember).then(
                success => {
                    let refresh = (success.refresh_token) ? success.refresh_token : ''
                    let decode = jwtDecode(success.token);
                    commit('loginSuccess', { token: success.token, remember: refresh, user: {username: decode.username}})
                    router.push('/')
                },
                error => {
                    dispatch('logout')
                    commit('loginFailure')
                }
            )
        },
        reload({commit, dispatch}, {accessToken}){
            commit('loginRequest')
            authService.reload(accessToken).then(
                success => {
                    let refresh = (accessToken.refresh_token) ? accessToken.refresh_token : ''
                    let decode = jwtDecode(accessToken.token);
                    commit('loginSuccess', { token: accessToken.token, remember: refresh, user: {username:decode.username}})
                },
                error => {
                    dispatch('logout')
                    commit('loginFailure')
                }
            )
        },
        logout({commit}, type){
            commit('logout')
            authService.logout(type)
        }
    }
}

