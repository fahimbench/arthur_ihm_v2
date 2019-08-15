<template>
  <div id="app">
    <router-link v-if="isLoggedIn" to="home">home</router-link>
    <router-link v-if="isLoggedIn" to="test">test</router-link>
    <router-link  to="login">{{ (isLoggedIn) ? 'Se déconnecter' : 'Connexion'}}</router-link>
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