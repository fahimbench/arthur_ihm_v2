import axios from 'axios'
import Vue from 'vue'
import { nikonikoService } from './nikoniko.service'


export const questionsService = {
    addTheme,
    getAllThemes,
    deleteTheme,
    addQuestion,
    deleteQuestion,
    getAllQuestions,
    getAllLadders
}

function addTheme(name){
    return new Promise((resolve, reject) => {
        axios
            .post(process.env.VUE_APP_API_URL+'/api/question_themes',
                {
                    name: name,
                })
            .then(
                success => {
                    Vue.toasted.show('Votre thème à été crée avec succés !', { position: 'bottom-right', type: 'success', theme:'outline', icon: 'sentiment_very_satisfied',  duration : 5000})
                    resolve(success)
                })
            .catch(
                error => {
                    Vue.toasted.show('Une erreur est survenu, réessayer !', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    reject(error)
                })
    })
}
function deleteTheme(link){
    return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_API_URL + link)
            .then(
                success => {
                    Vue.toasted.show('Votre thème à été supprimé avec succés !', { position: 'bottom-right', type: 'success', theme:'outline', icon: 'sentiment_very_satisfied',  duration : 5000})
                    resolve(success)
                })
            .catch(
                error => {
                    Vue.toasted.show('Une erreur est survenu lors de la suppression!', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    reject(error)
                })
    })
}
function getAllThemes(){
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_API_URL+'/api/question_themes')
            .then(
                success => {
                    resolve(success)
                })
            .catch(
                error => {
                    Vue.toasted.show('Une erreur est survenu lors du chargement de la liste des thèmes ...', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    reject(error)
                })
    })
}

function addQuestion(theme, text, responses, textAfter){
    return new Promise((resolve, reject) => {
            axios
                .post(process.env.VUE_APP_API_URL+'/api/question_datas',
                    {
                        questionTheme: '/api/question_themes/'+ theme,
                        question: text,
                        answers: JSON.stringify(responses.data),
                        resultText: textAfter
                    })
                .then(
                    success => {
                        Vue.toasted.show('Votre question à été crée avec succés !', { position: 'bottom-right', type: 'success', theme:'outline', icon: 'sentiment_very_satisfied',  duration : 5000})
                        resolve(success)
                    })
                .catch(
                    error => {
                        Vue.toasted.show('Une erreur est survenu, réessayer !', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                        reject(error)
                    })

    })
}

function deleteQuestion(link){
    return new Promise((resolve, reject) => {
        axios
            .delete(process.env.VUE_APP_API_URL + link)
            .then(
                success => {
                    Vue.toasted.show('Votre question à été supprimé avec succés !', { position: 'bottom-right', type: 'success', theme:'outline', icon: 'sentiment_very_satisfied',  duration : 5000})
                    resolve(success)
                })
            .catch(
                error => {
                    Vue.toasted.show('Une erreur est survenu lors de la suppression de la question !', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    reject(error)
                })
    })
}

function getAllQuestions(){
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_API_URL+'/api/question_datas')
            .then(
                success => {
                    resolve(success)
                })
            .catch(
                error => {
                    Vue.toasted.show('Une erreur est survenu lors du chargement de la liste des questions ...', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    reject(error)
                })
    })
}

function getAllLadders(){
    return new Promise((resolve, reject) => {
        axios
            .get(process.env.VUE_APP_API_URL+'/api/question_ladders/action?call=getLadders')
            .then(
                success => {
                    resolve(success)
                })
            .catch(
                error => {
                    Vue.toasted.show('Une erreur est survenu lors du chargement de la liste du classement ...', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    reject(error)
                })
    })
}