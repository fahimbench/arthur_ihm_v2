<template>
  <div id="app">
    <nav class="menu">
      <router-link v-if="isLoggedIn" :to="{ name: 'home'}"><i class="material-icons">home</i></router-link>
      <router-link v-if="isLoggedIn" :to="{ name: 'niko-niko'}"><i class="material-icons">tag_faces</i></router-link>
      <router-link v-if="isLoggedIn" :to="{ name: 'questions'}"><i class="material-icons">question_answer</i></router-link>
      <router-link  v-if="isLoggedIn" :to="{ name: 'login'}"><i class="material-icons">exit_to_app</i></router-link>
    </nav>
    <span v-if="Status">{{Status}}</span>
    <router-view/>
  </div>
</template>

<script>
  import store from './_store'

  export default {
    computed: {
      isLoggedIn() {
        return store.getters['authModule/isLoggedIn']
      }
    }
  };
</script>