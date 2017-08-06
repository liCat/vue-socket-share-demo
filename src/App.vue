<template>
    <div id="app">
        <vue-particles
                class="particles"
                color="#dedede"
                shapeType="circle"
                particleSize="4"
                particleOpacity="0.3"
                lineOpacity="0.3"
                moveSpeed="1.3"
                :particlesNumber="70"
        ></vue-particles>
        <transition style="position: fixed;left: 0;top: 0; z-index:2"
                    name="fade"
                    enter-active-class="animated fadeInLeft"
                    leave-active-class="animated fadeOutRight">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script type="text/babel">
    import {touchRipple} from 'vue-touch-ripple'
    import io from 'socket.io-client'
    import config from '../config';
    export default {
        name: 'app',
        components: {
            touchRipple
        },
        data () {
            return {
                msg: '还没连上',
                socket: null,
                page: 1,
            }
        },
        created(){
            this.socket = io.connect(config.domain);

        },
        methods: {}
    }
</script>

<style lang="scss">
    html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        /*background-color: #333;*/
        font-family: "Microsoft YaHei UI Light", Arial, Verdana, Sans-serif;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        width: 100%;
        overflow: hidden ;
        position: relative;
    }

    button:focus {
        border: none;
        outline: none;
    }

    .particles {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        top: 0;
        z-index: -1;
        background-color: #333;
        background-position: 0 0;
        background-image: url('./assets/timg.jpg');
        background-size: cover;
        animation:mymove 80s infinite linear;
        -webkit-animation:mymove 80s infinite linear;

    }
    @keyframes mymove
    {
        0%{  transform: scale(1,1);  }
        50%{  transform: scale(1.2,1.2);  }
        100%{  transform: scale(1,1);  }
    }

    @-webkit-keyframes mymove /*Safari and Chrome*/
    {
        0%{  transform: scale(1,1);  }
        50%{  transform: scale(1.2,1.2);  }
        100%{  transform: scale(1,1);  }
    }
</style>
