<template>
    <div tabindex="0" @keyup="keyUp($event)" class="pageWrap">
        <button class="logOut" @click="logOut"></button>
        <div class="nextPage" @click="send(1)"><i class="el-icon-arrow-right"></i></div>
        <div class="prePage" @click="send(-1)"><i class="el-icon-arrow-left"></i></div>
        <transition-group class="content"
                          enter-active-class="fadeInUp"
                          leave-active-class="fadeOutRight">
            <comp1 class="animated myPage" v-show="page==1" :key="1"></comp1>
            <comp2 class="animated myPage" v-show="page==2" :key="2"></comp2>
            <comp3 class="animated myPage" v-show="page==3" :key="3"></comp3>
            <comp4 class="animated myPage" v-show="page==4" :key="4"></comp4>
            <comp5 class="animated myPage" v-show="page==5" :key="5"></comp5>
            <comp6 class="animated myPage" v-show="page==6" :key="6"></comp6>
            <comp7 class="animated myPage" v-show="page==7" :key="7"></comp7>
            <comp8 class="animated myPage" v-show="page==8" :key="8"></comp8>
            <comp9 class="animated myPage" v-show="page==9" :key="9"></comp9>
            <comp10 class="animated myPage" v-show="page==10" :key="10"></comp10>
            <comp11 class="animated myPage" v-show="page==11" :key="11"></comp11>


            <p style="position: fixed;bottom: 0;left:50%;font-size: 1rem;color: #444" :key="35">第{{page}}页</p>
        </transition-group>

    </div>
</template>
<script type="text/babel">
    import Comp1 from './Comp_1.vue'
    import Comp2 from './Comp_2.vue'
    import Comp3 from './Comp_3.vue'
    import Comp4 from './Comp_4.vue'
    import Comp5 from './Comp_5.vue'
    import Comp6 from './Comp_6.vue'
    import Comp7 from './Comp_7.vue'
    import Comp8 from './Comp_8.vue'
    import Comp9 from './Comp_9.vue'
    import Comp10 from './Comp_10.vue'
    import Comp11 from './Comp_11.vue'


    export default {
        name: 'page',
        components: {
            Comp1,
            Comp2,
            Comp3,
            Comp4,
            Comp5,
            Comp6,
            Comp7,
            Comp8,
            Comp9,
            Comp10,
            Comp11,

        },
        data(){
            return {
                page: 0,
                socket: null,
                swiperOption: {
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    direction: 'vertical',
                }

            }
        },
        created(){
            this.$http.get('/ioPage')
                .then(res => {
                    this.page = res.body.page;
                    if (res.body.page == 0) this.$router.push({path: '/logIn'});
                })
            this.$parent.socket.on('goPage', res => {
                this.page = res;
                if (res == 0) {
                    this.$router.push({path: '/logIn'})
                }
            })
        },
        methods: {
            keyUp(e){
                if (e.key == 'ArrowRight') {
                    this.send(1)
                }
                if (e.key == 'ArrowLeft') {
                    this.send(-1)
                }
                ;
            },
            send(cValue){
                var page = this.page + cValue;
                page = page < 1 ? 1 : page;
                page = page > 11 ? 1 : page;
                if (localStorage.getItem('pwd') != '975c9b7d8839a50c204cb4851e1a906b') return;
                this.$parent.socket.emit('goPage', page)
            },
            logOut(){
                if (localStorage.getItem('pwd') != '975c9b7d8839a50c204cb4851e1a906b') return;
                this.$parent.socket.emit('goPage', 0)
                localStorage.removeItem('pwd');
                this.$router.push({path: '/logIn'})
            }
        }
    }
</script>
<style scoped>
    .pageWrap {
        height: 100%;
        color: #fff;
        position: relative;
        height: 100%;
        overflow: hidden;
    }

    .pageWrap:focus {
        border: solid 1px #222;
        outline: none;
    }

    p {
        margin: 0;
        font-size: 2rem;
    }

    .logOut {
        background: none;
        position: fixed;
        top: 0;
        right: 0;
        width: 4rem;
        height: 2rem;
        border: none;
        z-index: 4;
    }

    .nextPage, .prePage {
        /*background-color: rgba(244, 244, 244, .3);*/
        opacity: 0.04;
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 25px;
        position: fixed;
        bottom: 0;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 4;
        transition: all .3s;
    }

    .nextPage:hover, .prePage:hover {
        opacity: .3;
    }

    .nextPage {
        right: 0
    }

    .prePage {
        left: 0;
    }

    @media (min-device-width: 980px) and (-webkit-max-device-pixel-ratio: 1.6) {
        .nextPage, .prePage {
            display: block;
        }
    }

    p {
        margin: 0;
    }

    .content {
        font-size: 1.8rem;
    }

    .myPage {
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        overflow: hidden;
        padding: 5px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>