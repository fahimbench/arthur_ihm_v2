<template>
    <div class="rc-contenu">
        <div class="rc-content">
            <span>Votre jeton de connexion a expiré ou a été corrompu ... heureusement pour vous qu'il y avait un jeton de reconnexion.</span>
            <span>Veuillez patienter vous allez être redirigé dans {{ time }} secondes !</span>
        </div>
    </div>
</template>

<script>

    import router from "../_helpers/router";

    export default {
        data () {
            return {
                startTime: 5
            }
        },
        methods: {
            decrease() {
                this.startTime = this.startTime - 1
                if(this.startTime === 0){
                    router.push('/')
                }
            }
        },
        computed: {
            time() {
                return this.startTime
            }
        },
        created() {
            let vm = this;
            this.$toasted.show('hello billo', { type: 'info', theme:'outline', icon: 'check_box',  duration : 5000})
            setInterval(function(){ vm.decrease() }, 1000);
        }


    }
</script>