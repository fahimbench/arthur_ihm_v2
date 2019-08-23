<template>
    <div class="home">
        <modal name="groups-infos" v-if="modal !== ''" :scrollable="true" height="auto" @before-open="beforeOpenGroups">
            <div class="modal-title">
                {{ modal.content.name }}
            </div>
            <div class="modal-content">
                <div class="modal-date-start-end">
                    {{modal.content.dateStart}} - {{ modal.content.dateEnd }}
                </div>
                <div class="modal-date-ignored">
                    <ul>
                        <li :key="item.id" v-for="item in modal.content.dateIgnore ">{{ item.dateStart }} au {{ item.dateEnd }}</li>
                    </ul>
                </div>
                <div class="modal-nikoniko-users">
                    <ul>
                        <li :key="item.id" v-for="item in modal.content.users">{{ item }}</li>
                    </ul>
                </div>
            </div>
        </modal>
        <h1 class="text-primary">Niko Niko</h1>
        <div class="blocks">
            <div class="part">
                <div class="title">
                    Graphique
                </div>
            </div>
        </div>
        <div class="blocks">
            <div class="part" >
                <div class="title">
                    Ajouter un groupe
                </div>
                <form @submit.prevent="sendGroup">
                    <div class="title">Nom du groupe</div>
                    <input type="text" class="input-text" name="" placeholder="Nom du groupe..." v-model="groups.name">
                    <div class="filter-group">
                        <div class="title">Apprenant à ajouter</div>
                        <div class="select-users">
                            <multiselect v-model="groups.users" placeholder="Choisir des apprenants..." :multiple="true"  label="real_name" track-by="real_name" :options="allUsers" :option-height="104" :show-labels="false">
                                <template slot="tag" scope="props" >
                                  <span class="multiselect__tag">
                                    <span><img :src="props.option.profile.image_24"></span>
                                    <span>{{props.option.real_name}}</span>
                                      <i aria-hidden="true" tabindex="1" @click="props.remove(props.option)" class="multiselect__tag-icon"></i>
                                  </span>
                                </template>
                                <template slot="singleLabel" slot-scope="props">
                                    <img class="option__image" :src="props.option.profile.image_24">
                                    <span class="option__title">{{ props.option.real_name }}</span>
                                </template>
                                <template slot="option" slot-scope="props">
                                    <img class="option__image" :src="props.option.profile.image_24">
                                    <span class="option__title">{{ props.option.real_name }}</span>
                                    <span class="option__small"> #{{ props.option.id }}</span>
                                </template>
                            </multiselect>
                        </div>
                    </div>
                    <div class="date-start-end">
                        <div class="title">Début et fin de la formation</div>
                        <div class="date-start-end-choice">
                            <input type="date" name="date-start" class="input-date" v-model="groups.date.start">
                            <input type="date" name="date-end" class="input-date" v-model="groups.date.end">
                        </div>
                    </div>
                    <div class="filter-date-ignore">
                        <div class="title">Intervals ignorés</div>
                        <div class="date-ignore">
                            <input type="date" name="date-start-ignore" class="input-date">
                            <input type="date" name="date-end-ignore" class="input-date">
                            <button name="submit-ignore" class="input-button formbuttonrestricted" type="button" v-on:click="addDateIgnore">Ok</button>
                        </div>
                        <div class="ignored">
                            <template v-for="(item) in dateIgnore">
                                <button v-bind:key="item.id" :data-id="item.id" :data-start="item.dateStart" :data-end="item.dateEnd" type="button" v-on:click="deleteEl">
                                    {{ item }}
                                </button>
                            </template>
                        </div>
                    </div>
                    <button class="input-button" name="submitGroup">Envoyer</button>
                </form>
            </div>
            <div class="part">
                <div class="title">
                    Liste des groupes
                </div>
                <input type="text" class="input-text" placeholder="Chercher groupe..." v-model="searchGroups">
                <div class="loader" v-if="allGroups.status !== 'success'" style="display:flex;justify-content:center;align-items:center;position:absolute;background-color: rgba(0,0,0,0.3); height:calc(100% - 70px);width:calc(100% - 70px)">
                    <i class="material-icons md-48 progress-load">
                        sync
                    </i>
                </div>
                <table>
                    <thead>
                    <tr>
                        <td colspan="2">groupes</td>
                    </tr>
                    </thead>
                    <tbody v-if="filteredListGroups.length > 0">
                    <tr :key="item.id" v-for="(item) in filteredListGroups.slice().reverse()" >
                        <td class="data-groups">
                            <div @click="showModalGroups(item)">{{ item.name }}</div>
                        </td>
                        <td class="delete">
                            <a href="" class="trash" :data-link="item['@id']" @click.prevent="deleteGroup">
                                <i class="material-icons md-24">delete</i>
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="blocks">
            <div class="part">
                <div class="title">
                    Liste des envois
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import Vue from 'vue'
    import Multiselect from 'vue-multiselect'

    Vue.component('multiselect', Multiselect)

    export default {
        data(){
            return {
                groups: {
                    name: '',
                    date: {
                        start: '',
                        end: ''
                    },
                    ignore: {
                        ai: 0,
                        data: []
                    },
                    users: []
                },
                modal: {
                    content: {
                        name: '',
                        dateStart: '',
                        dateEnd: '',
                        dateIgnore: [],
                        users:[]
                    }
                },
                searchGroups: '',
            }
        },
        computed: {
            allGroups(){
                return this.$store.getters['nikonikoModule/getAllGroups']
            },
            allUsers(){
                return this.$store.getters['nikonikoModule/getAllUsers'].data.members || []
            },
            filteredListGroups() {
                const allGroups = this.$store.getters['nikonikoModule/getAllGroups'].data['hydra:member'] || []
                return allGroups.filter(
                    (n) => n.name.toLowerCase().includes(this.searchGroups.toLowerCase()))
            },
            users(){
                return this.groups.users
            },
            dateIgnore(){
                return this.groups.ignore.data
            }
        },
        methods: {
            deleteEl: function(e){
                this.groups.ignore.data = this.groups.ignore.data.filter(function( obj ) {
                    return obj.id != e.target.dataset.id
                })
            },
            addDateIgnore(){
                const dateStart = $("input[name='date-start-ignore']");
                const dateEnd = $("input[name='date-end-ignore']");
                if(!dateStart.val() || !dateEnd.val()){
                    Vue.toasted.show('Il faut remplir les 2 champs pour ajouter une réponse', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }
                const tsStart = +(new Date(dateStart.val()))
                const tsEnd = +(new Date(dateEnd.val()))
                if(tsStart > tsEnd){
                    Vue.toasted.show('Vous ne pouvez pas commencer après la date de fin...', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }
                for(const [key,value] of Object.entries(this.groups.ignore.data)){
                    let itsStart = +(new Date(value.dateStart))
                    let itsEnd = +(new Date(value.dateEnd))
                    if((tsStart >= itsStart && tsStart <= itsEnd) || (tsEnd >= itsStart && tsEnd <= itsEnd) || (tsStart <= itsStart && tsEnd >= itsEnd)){
                        Vue.toasted.show('Ces jours sont soit déjà pris, soit vous chevauchez dessus ...', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                        return 0
                    }
                }
                let element = {}
                element.id = this.groups.ignore.ai++;
                element.dateStart = dateStart.val()
                element.dateEnd = dateEnd.val()
                this.groups.ignore.data.push(element)
                dateStart.val("")
                dateEnd.val("")
            },
            sendGroup(){
                const { name, date, ignore, users } = this.groups
                if(!name){
                    Vue.toasted.show('Le nom du groupe est vide  ... ', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }
                if(!date.start || !date.end){
                    Vue.toasted.show('La date du début et de fin de formation sont vide  ... ', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }
                if(users.length === 0){
                    Vue.toasted.show('Le groupe n\'a pas d\'apprenant  ... ', { position: 'bottom-right', type: 'error', theme:'outline', icon: 'sentiment_dissatisfied',  duration : 5000})
                    return 0
                }
                this.$store.dispatch('nikonikoModule/addGroup', {name, date, ignore, users }).then(() => {
                    this.groups.name = ""
                    this.groups.date = {start:'', end:''}
                    this.groups.ignore = {ai:0, data:[]}
                })
            },
            beforeOpenGroups(event){
                this.modal.content.name = event.params.item.name
                this.modal.content.dateStart = event.params.item.dateStart
                this.modal.content.dateEnd = event.params.item.dateEnd
                this.modal.content.dateIgnore = JSON.parse(event.params.item.dateIgnore)
                this.modal.content.users = JSON.parse(event.params.item.users)
            },
            showModalGroups (item) {
                this.$modal.show('groups-infos', {item: item});
            },
            hideModalGroups () {
                this.$modal.hide('groups-infos');
            },
            deleteGroup: function(e){
                this.$store.dispatch('nikonikoModule/deleteGroup', {link: $(e.target).parent().data("link")})
            }
        },
        mounted(){
            this.$store.dispatch('nikonikoModule/allGroups')
            this.$store.dispatch('nikonikoModule/allUsers')
        }
    }
</script>

