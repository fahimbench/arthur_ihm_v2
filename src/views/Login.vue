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

<style>
    .wrapper {
        margin-top: 80px;
        margin-bottom: 80px;
    }

    .form-signin {
        max-width: 380px;
        padding: 15px 35px 45px;
        margin: 0 auto;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 30px;
    }
    .form-signin .checkbox {
        font-weight: normal;
    }
    .form-signin .form-control {
        position: relative;
        font-size: 16px;
        height: auto;
        padding: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="text"] {
        margin-bottom: -1px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    .form-signin input[type="password"] {
        margin-bottom: 20px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
