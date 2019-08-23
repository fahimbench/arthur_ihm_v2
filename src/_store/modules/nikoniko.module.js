import { nikonikoService } from '../../_services/nikoniko.service.js'
import {questionsService} from "../../_services/questions.service";

export const nikonikoModule = {
    namespaced: true,
    state: {
        groups:{
            status: '',
            data: {}
        },
        users:{
            status: '',
            data: ''
        }
    },
    getters: {
        getAllGroups: state => state.groups,
        getAllUsers: state => state.users
    },
    mutations: {
        groupsLoading(state){
            state.groups.status = 'loading'
        },
        groupsError(state){
            state.groups.status = 'error'
        },
        groupsSuccess(state, payload){
            state.groups.status = 'success'
            state.groups.data = payload.data
        },
        usersLoading(state){
            state.users.status = 'loading'
        },
        usersError(state){
            state.users.status = 'error'
        },
        usersSuccess(state, payload){
            state.users.data = payload.data
            state.users.status = 'success'
        }
    },
    actions: {
        allGroups({commit}){
            commit('groupsLoading')
            nikonikoService.getAllGroups().then(
                success => {
                    commit('groupsSuccess', success)
                },
                error => {
                    commit('groupsError')
                }
            )
        },
        addGroup({commit, dispatch}, {name, date, ignore, users}){
            commit('groupsLoading')
            nikonikoService.addGroup(name, date, ignore, users).then(
                success => {
                    dispatch('allGroups')
                },
                error => {
                    dispatch('allGroups')
                }
            )
        },
        deleteGroup({commit, dispatch}, {link}){
            commit('groupsLoading')
            nikonikoService.deleteGroup(link).then(
                success => {
                    dispatch('allGroups')
                },
                error => {
                    dispatch('allGroups')
                }
            )
        },
        allUsers({commit}){
            commit('usersLoading')
            nikonikoService.getAllUsers().then(
                success => {
                    commit('usersSuccess', success)
                },
                error => {
                    commit('usersError')
                }
            )
        }

    }
}