import axios from "axios";
import Vue from "vue";

export const nikonikoService = {
    addGroup,
    deleteGroup,
    getAllGroups,
    getAllUsers,
    getAllSendList,
    getAllChartData
}

function addGroup(name, date, dateIgnore, users){
    return new Promise((resolve, reject) => {
        const rwIgnore = dateIgnore.data.map((n) => {
            return {dateStart: n.dateStart, dateEnd: n.dateEnd}
        })
        const rwUsers = users.map((n) => {
            return {id: n.id}
        })
        axios
            .get(process.env.VUE_APP_API_URL+'/api/niko_niko_groups/action?call=createGroupAndUserIfValid',
                {
                    params: {
                        name: name,
                        dateStart: date.start,
                        dateEnd: date.end,
                        dateIgnore: rwIgnore,
                        users: rwUsers
                    }
                })
            .then(
                success => {
                    Vue.toasted.show('Votre groupe à été crée avec succés !', { position: 'bottom-right', type: 'success', theme:'outline', icon: 'sentiment_very_satisfied',  duration : 5000})
                    resolve(success)
                }).catch(
            error => {
                Vue.toasted.show(error.data['hydra:description'], { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                reject(error)
            })
    })
}

function deleteGroup(link){
    return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_API_URL + link)
            .then(
                success => {
                    Vue.toasted.show('Votre groupe à été supprimé avec succés !', { position: 'bottom-right', type: 'success', theme:'outline', icon: 'sentiment_very_satisfied',  duration : 5000})
                    resolve(success)
                })
            .catch(
                error => {
                    Vue.toasted.show('Une erreur est survenu lors de la suppression!', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    reject(error)
                })
    })
}

function getAllGroups(){
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_API_URL+'/api/niko_niko_groups')
            .then(
                success => {
                    resolve(success)
                })
            .catch(
                error => {
                    Vue.toasted.show('Une erreur est survenu lors du chargement de la liste des groupes ...', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    reject(error)
                })
    })
}

function getAllUsers(){
    return new Promise((resolve, reject) => {
        axios
            .get('/api/users.list',{
                params:{
                    token: process.env.VUE_APP_SLACKAPITOKEN
                }
            })
            .then(
                success => {
                    resolve(success)
                })
            .catch(
                error => {
                    Vue.toasted.show('Une erreur est survenu lors du chargement de la liste des users ...', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    reject(error)
                })
    })
}

function getAllSendList(){
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_API_URL+'/api/niko_niko_datas?pagination=true&page=1&order[dateSend]')
            .then(
                success => {
                    resolve(success)
                })
            .catch(
                error => {
                    Vue.toasted.show('Une erreur est survenu lors du chargement de la liste des envois ...', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    reject(error)
                })
    })
}

function getAllChartData(group, dateStart, dateEnd, exp){
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_API_URL+'/api/niko_niko_groups/action?call=getDataGroup', {
                params:{
                    group: group,
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    exp: exp
                }
            })
            .then(
                success => {
                    resolve(success)
                })
            .catch(
                error => {
                    Vue.toasted.show('Une erreur est survenu lors du chargement des données du graphique ...', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    reject(error)
                })
    })
}

