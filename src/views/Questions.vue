<template>
    <div class="questions">
        <h1 class="text-primary">Questions</h1>
        <div class="blocks">
            <div class="part">
                <div class="title">
                    Classement
                </div>
                <table>
                    <thead>
                        <tr>
                            <td>Joueur</td>
                            <td>Score</td>
                            <td>Dernier enregistrement</td>
                        </tr>
                    </thead>
                    <tbody>

                        <tr :key="item.id" v-for="(item) in allLadders.data['hydra:member']">

                            <td><img :src="allUsers.data['members'].find(x => x.id === item.user).profile.image_24">&nbsp;{{allUsers.data['members'].find(x => x.id === item.user).real_name}}</td>
                            <td>{{ item.score }}</td>
                            <td>{{ item.dateSend }}</td>
                        </tr>

<!--                    {{allUsers.data['members'].find(x => x.id === item.user)}}-->
                    </tbody>
                </table>

            </div>
        </div>
        <div class="blocks">
            <div class="part">
                <div class="title">
                    Ajouter un thème
                </div>
                <form @submit.prevent="sendTheme">
                    <div class="title">Nom du Thème</div>
                    <input type="text" name="name" class="input-text" placeholder="Nom du Thème..." v-model="theme.name">
                    <button class="input-button" name="submitTheme">Envoyer</button>
                </form>
            </div>
            <div class="part">
                <div class="title">
                    Liste des Thèmes ({{ allThemes.data['hydra:totalItems'] }})
                </div>
                <input type="text" class="input-text" v-model="searchTheme" placeholder="chercher thème ...">
                <div class="loader" v-if="allThemes.status !== 'success'" style="display:flex;justify-content:center;align-items:center;position:absolute;background-color: rgba(0,0,0,0.3); height:calc(100% - 70px);width:calc(100% - 70px)">
                    <i class="material-icons md-48 progress-load">
                        sync
                    </i>
                </div>
                <table>
                    <thead>
                    <td col="2">Nom du thème</td>
                    </thead>
                    <tbody v-if="filteredListTheme.length > 0">
                    <template v-for="(item) in filteredListTheme.slice().reverse()" >
                        <tr :key="item.id">
                            <td>{{ item.name }}</td>
                            <td class="delete"><a href="" class="trash" :data-link="item['@id']" @click.prevent="deleteTheme"><i class="material-icons md-24">delete</i></a></td>
                        </tr>
                    </template>
                    </tbody>
                </table>
                <div v-if="filteredListTheme.length === 0">
                    <span>Aucun résultat.</span>
                </div>
            </div>
        </div>
        <div class="blocks">
            <div class="part">
                <div class="title">
                    Ajouter une Question
                </div>
                <form @submit.prevent="sendQuestion">
                    <div class="title">Thème de la question</div>
                    <select name="theme" class="select" v-model="question.theme">
                        <option :key="item.id" :value="item.id" v-for="(item) in allThemes.data['hydra:member']">{{ item.name }}</option>
                    </select>
                    <div class="title">Question à poser</div>
                    <input type="text" class="input-text" placeholder="Quelle est la question à poser ?" v-model="question.text">
                    <div class="title">Après avoir répondu</div>
                    <input type="text" class="input-text" placeholder="Quel texte à afficher après le choix de la réponse" v-model="question.textAfter">
                    <div class="filter-response">
                        <div class="title">Réponse à la question (de 2 à 4)</div>
                        <div class="response">
                            <input type="text" class="input-text" name="response-text" placeholder="Ajouter un choix de réponse...">
                            <select name="select-badorgood" class="select">
                                <option value="" disabled selected hidden>Bonne réponse ?</option>
                                <option value="0">Mauvaise</option>
                                <option value="1">Bonne</option>
                            </select>
                            <button class="input-button formbuttonrestricted" type="button" v-on:click="addResponse">Ok</button>
                        </div>
                        <div class="response-badorgood">
                            <template v-for="(item) in responses">
                                <button :key="item.id" :data-id="item.id" :data-response="item.text" :data-badorgood="item.bog" type="button" v-on:click="deleteEl">
                                    {{ item.text }} ({{ item.bog ? 'Bonne' : 'Mauvaise' }})
                                </button>
                            </template>
                        </div>
                    </div>
                    <button class="input-button" name="submitTheme">Envoyer</button>
                </form>
            </div>
            <div class="part">
                <div class="title">
                    Liste des Questions ({{ allQuestions.data['hydra:totalItems']}})
                </div>
                <input type="text" class="input-text" placeholder="recherche question ..." v-model="searchQuestion">
                <div>
                    <div class="loader" v-if="allQuestions.status !== 'success'" style="display:flex;justify-content:center;align-items:center;position:absolute;background-color: rgba(0,0,0,0.3); height:calc(100% - 70px);width:calc(100% - 70px)">
                        <i class="material-icons md-48 progress-load">
                            sync
                        </i>
                    </div>
                    <table>
                        <thead>
                        <tr>
                        <td colspan="2">Question</td>
                        </tr>
                        </thead>
                        <tbody v-if="filteredListQuestion.length > 0">
                            <tr :key="item.id" v-for="(item) in filteredListQuestion.slice().reverse()" >
                                <td class="data-question">
                                    <div>{{ item.question }}({{ item.questionTheme.name}})</div>
                                </td>
                                <td class="delete">
                                    <a href="" class="trash" :data-link="item['@id']" @click.prevent="deleteQuestion">
                                    <i class="material-icons md-24">delete</i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-if="filteredListQuestion.length === 0">
                        <span>Aucun résultat.</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Vue from 'vue'

    export default {
        data(){
            return {
                theme: {
                    name: ""
                },
                question: {
                    text: "",
                    theme: null,
                    responses: {
                        ai:0,
                        data:[]
                    },
                    textAfter: ""
                },
                searchQuestion: '',
                searchTheme:''
            }
        },
        computed: {
            responses: function(){
                return this.question.responses.data.slice().reverse()
            },
            allThemes: function(){
                return this.$store.getters['questionsModule/allThemes']
            },
            allQuestions: function(){
                return this.$store.getters['questionsModule/allQuestions']
            },
            allLadders: function(){
                return this.$store.getters['questionsModule/allLadders']
            },
            allUsers: function(){
                return this.$store.getters['nikonikoModule/getAllUsers']
            },
            filteredListQuestion() {
                const allQuestions = this.$store.getters['questionsModule/allQuestions'].data['hydra:member'] || []
                return allQuestions.filter(
                    (n) => n.question.toLowerCase().includes(this.searchQuestion.toLowerCase()))
            },
            filteredListTheme() {
                const allThemes = this.$store.getters['questionsModule/allThemes'].data['hydra:member'] || []
                return allThemes.filter(
                    (n) => n.name.toLowerCase().includes(this.searchTheme.toLowerCase()))
            }
        },
        methods:{
            deleteEl: function(e){
                this.question.responses.data = this.question.responses.data.filter(function( obj ) {
                    return obj.id != e.target.dataset.id
                })
            },
            deleteTheme: function(e) {
                this.$store.dispatch('questionsModule/deleteTheme', {link: $(e.target).parent().data("link")})
            },
            sendTheme: function(){
                const { name } = this.theme
                if(!name){
                    Vue.toasted.show('Votre nom de thème est vide ... ', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }
                this.$store.dispatch('questionsModule/addTheme', {name}).then(() => this.theme.name = "")
            },
            addResponse: function(){
                const responseText = $("input[name='response-text']").val()
                const responseBadOrGood = $("select[name='select-badorgood']").val()
                const responseAll = $(".response-badorgood button")
                const arrayBOG = [0,1]
                if(!responseText || !responseBadOrGood){
                    Vue.toasted.show('Il faut remplir les 2 champs pour ajouter une réponse', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }
                if(responseAll.length >= 4){
                    Vue.toasted.show('Vous ne pouvez pas ajouter plus de 4 reponses', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }
                if(!(responseBadOrGood in arrayBOG)){
                    Vue.toasted.show('Une valeur n\'est pas correcte, rafraichissez la page puis réessayer ...' , { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }
                let element = {};
                element.id = this.question.responses.ai++
                element.text = responseText
                element.bog = (responseBadOrGood == 1)
                this.question.responses.data.push(element)
                $("input[name='response-text']").val("")
                $("select[name='select-badorgood']").val("")
            },
            sendQuestion: function(){
                const data = this.question.responses.data
                const newData = data.filter((n) => n.bog === true )

                if(this.question.theme === null){
                    Vue.toasted.show('Vous devez choisir un thème ...' , { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }

                if(this.question.text === ''){
                    Vue.toasted.show('La question est vide ...' , { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }

                if(this.question.textAfter === ''){
                    Vue.toasted.show('Il faut un texte à envoyer pour l\'explication ...' , { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }

                if(data.length < 2 || data.length > 4){
                    Vue.toasted.show('il y a peu ou trop de choix de réponses, vous ne pouvez pas l\'envoyer ...' , { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }

                if( newData.length === 0){
                    Vue.toasted.show('Il faut au moins une bonne réponse ! ' , { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }

                const { theme, text, responses, textAfter } = this.question
                this.$store.dispatch('questionsModule/addQuestion', {theme, text, responses, textAfter}).then(() => {
                    this.question = {
                        text: '',
                        theme: null,
                        responses: {
                            ai: 0,
                            data: []
                        },
                        textAfter: ''
                    }
                })
            },
            deleteQuestion: function(e){
                this.$store.dispatch('questionsModule/deleteQuestion', {link: $(e.target).parent().data("link")})
            }
        },
        mounted() {
            this.$store.dispatch('questionsModule/getAllThemes')
            this.$store.dispatch('questionsModule/getAllQuestions')
            this.$store.dispatch('questionsModule/getAllLadders')
            this.$store.dispatch('nikonikoModule/allUsers')
        }
    }
</script>
