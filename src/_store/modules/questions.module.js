import { questionsService } from '../../_services/questions.service'
export const questionsModule = {
    namespaced: true,
    state:{
        themes: {
            status: '',
            data: {}
        },
        questions: {
            status: '',
            data: {}
        },
        ladders: {
            status: '',
            data: {}
        }
    },
    getters:{
        allThemes: state => state.themes,
        allQuestions: state => state.questions,
        allLadders: state => state.ladders
    },
    mutations:{
        themeLoading(state){
            state.themes.status = 'loading'
        },
        themeError(state){
            state.themes.status = 'error'
        },
        themeAllSuccess(state, payload){
            state.themes.data = payload.data
            state.themes.status = 'success'
        },
        questionLoading(state){
            state.questions.status = 'loading'
        },
        questionError(state){
            state.questions.status = 'error'
        },
        questionAllSuccess(state, payload){
            state.questions.data = payload.data
            state.questions.status = 'success'
        },
        ladderLoading(state){
            state.ladders.status = 'loading'
        },
        ladderError(state){
            state.ladders.status = 'error'
        },
        ladderAllSuccess(state, payload){
            state.ladders.data = payload.data
            state.ladders.status = 'success'
        }
    },
    actions:{
        addQuestion({commit, dispatch}, {theme, text, responses, textAfter}){
            commit('questionLoading')
            questionsService.addQuestion(theme, text,responses, textAfter).then(
                success => {
                    dispatch('getAllQuestions')
                },
                error => {
                    dispatch('getAllQuestions')
                }
            )
        },
        deleteQuestion({commit, dispatch}, {link}){
            commit('questionLoading')
            questionsService.deleteQuestion(link).then(
                success => {
                    dispatch('getAllQuestions')
                },
                error => {
                    dispatch('getAllQuestions')
                }
            )
        },
        getAllQuestions({commit, dispatch}){
            commit('questionLoading')
            questionsService.getAllQuestions().then(
                success => {
                    commit('questionAllSuccess', success)
                },
                error => {
                    commit('questionError')
                }
            )
        },
        addTheme({commit, dispatch}, {name}){
            commit('themeLoading')
            questionsService.addTheme(name).then(
                success => {
                    dispatch('getAllThemes')
                },
                error => {
                    dispatch('getAllThemes')
                }
            )
        },
        deleteTheme({commit, dispatch}, {link}){
            commit('themeLoading')
            questionsService.deleteTheme(link).then(
                success => {
                    dispatch('getAllThemes')
                },
                error => {
                    dispatch('getAllThemes')
                }
            )
        },
        getAllThemes({commit, dispatch}){
            commit('themeLoading')
            questionsService.getAllThemes().then(
                success => {
                    commit('themeAllSuccess', success)
                },
                error => {
                    commit('themeError')
                }
            )
        },
        getAllLadders({commit, dispatch}){
            commit('ladderLoading')
            questionsService.getAllLadders().then(
                success => {
                    commit('ladderAllSuccess', success)
                },
                error => {
                    commit('ladderError')
                }
            )
        }
    }
}