<template>
    <div class="wrapper">
        <form class="form-signin" @submit.prevent="login">
            <h2 class="form-signin-heading">Connexion</h2>
            <input type="text" class="form-control" name="username" placeholder="Nom d'utilisateur..." required="" autofocus="" v-model="username"/>
            <input type="password" class="form-control" name="password" placeholder="Mot de passe..." required="" v-model="password"/>
            <label class="checkbox">
                <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe" v-model="remember"><label for="rememberMe" style="margin-left:5px">Rester Connecté ?</label>
            </label>

            <button class="btn btn-lg btn-primary btn-block" type="submit">Se connecter</button>
        </form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username : "",
                password : "",
                remember : 0
            }
        },
        methods: {
            login: function () {
                const { username, password, remember } = this
                this.$store.dispatch('authModule/login', { username, password, remember })
            }
        }
    }
</script>
