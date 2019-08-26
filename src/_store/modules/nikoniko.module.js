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
            data: {}
        },
        sendList:{
            status: '',
            data: {}
        },
        chartData:{
            status: '',
            participants: [],
            scoreNull: [],
            scoreBlank: [],
            data: {
                type: 'line',
                data: {
                    labels:[],
                    datasets: [
                        {
                            data: [],
                            backgroundColor: [
                                'rgba(0,0,0,0)'
                            ],
                            borderColor: [
                                '#47b784',
                            ],
                            borderWidth: 3
                        }
                    ]
                },
                options: {
                    legend: false,
                    responsive: true,
                    lineTension: 1,
                    title: {
                        display: true,
                        text: ''
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min:0,
                                max:100,
                            }
                        }]
                    }
                }
            }
        }
    },
    getters: {
        getAllGroups: state => state.groups,
        getAllUsers: state => state.users,
        getAllSendList: state => state.sendList,
        getAllChartData: state => state.chartData
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
        },
        sendListLoading(state){
            state.sendList.status = 'loading'
        },
        sendListError(state){
            state.sendList.status = 'error'
        },
        sendListSuccess(state, payload){
            state.sendList.data = payload.data
            state.sendList.status = 'success'
        },
        chartDataLoading(state){
            state.chartData.status = 'loading'
        },
        chartDataError(state){
            state.chartData.status = 'error'
        },
        chartDataSuccess(state, payload){
            state.chartData.data.data.labels = JSON.parse(payload.data).data.labels
            state.chartData.data.data.datasets[0].data = JSON.parse(payload.data).data.data
            state.chartData.data.options.title.text = JSON.parse(payload.data).data.text.toUpperCase()
            state.chartData.participants = JSON.parse(payload.data).data.participants
            state.chartData.scoreNull = JSON.parse(payload.data).data.abstention
            state.chartData.scoreBlank = JSON.parse(payload.data).data.blank
            state.chartData.status = 'success'
        }
    },
    actions: {
        async allGroups({commit}){
            commit('groupsLoading')
            await nikonikoService.getAllGroups().then(
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
        },
        allSendList({commit}){
            commit('sendListLoading')
            nikonikoService.getAllSendList().then(
                success => {
                    commit('sendListSuccess', success)
                },
                error => {
                    commit('sendListError')
                }
            )
        },
        async allChartData({commit}, {group, dateStart, dateEnd, exp}){
            commit('chartDataLoading')
            await nikonikoService.getAllChartData(group, dateStart, dateEnd, exp).then(
                success => {
                        commit('chartDataSuccess', success)
                },
                error => {
                    commit('chartDataError')
                }
            )
        }
    }
}