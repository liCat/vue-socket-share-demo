<template>
    <div class="pageWrap"  tabindex="0"  @keyup="keyUp($event)">
        <div class="logInPage">
            <h1 class="animated zoomIn" :class="{'zoomOut':logIn}"> 随便聊聊 Vue</h1>
            <!--<h1 class="animated zoomIn" :class="{'zoomOut':logIn}">h1h1h1h1h1h1</h1>-->
            <h2 class="animated fadeInLeft" :class="{'fadeOutLeft':logIn}">上海-前端-少侠</h2>

            <h3 class="animated fadeInRight" :class="{'fadeOutRight':logIn}">{{now}}</h3>
            <button class="logInBtn" @click="showModal"></button>
            <button class="logOut" @click="logOut"></button>
        </div>
        <el-dialog title="验证控制" :visible.sync="show" size="tiny">
            <el-form :model="form">
                <el-form-item label="密码">
                    <el-input v-model="form.pwd" type="password" auto-complete="off" :autofocus="show"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">确 定</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>
<script type="text/babel">
    import md5 from 'md5'
    var _now = new Date();
    export default {
        name: 'login',
        data(){
            return {
                msg: 'login',
                show: false,
                now: _now.getFullYear() + '年' + (_now.getMonth() + 1) + '月' + _now.getDate() + '日',
                form: {
                    pwd: ''
                },
                logIn: false
            }
        },

        mounted(){
            this.$http.get('/ioPage')
                .then(res => {
                    if (res.body.page != 0) this.$router.push({path: '/page?p=' + res.body.page});
                })
            this.$parent.socket.on('goPage', res => {
                console.log(res);
                if (res == 1) {
                    setTimeout(() => {
                        this.$router.push({path: '/page'})
                    }, 400)
                }
            })
        },
        methods: {
            keyUp(e){
                if(e.key=='Delete'){
                    this.logOut()
                }
                if(e.key=='Enter'){
                    this.showModal()
                }
            },
            showModal(){
                if (!localStorage.getItem('pwd') || localStorage.getItem('pwd') != '975c9b7d8839a50c204cb4851e1a906b') this.show = true
            },
            logOut(){
                if (localStorage.getItem('pwd') != '975c9b7d8839a50c204cb4851e1a906b') return;
                localStorage.removeItem('pwd');
                this.$parent.socket.emit('goPage', 0)
            },
            submit(e){
                var afterMd5 = '975c9b7d8839a50c204cb4851e1a906b';
                if (afterMd5 == md5(this.form.pwd)) {
                    localStorage.setItem("pwd", '975c9b7d8839a50c204cb4851e1a906b');
                    this.show = false;
                    this.logIn = true;
                    this.$parent.socket.emit('goPage', 1);

                }
                else {
                    this.$message.error('虽然你找到了登录框，但是密码错了');
                }
            }
        }
    }
</script>
<style scoped>
    .pageWrap {
        height: 100%;
        /*background-color: #011211;*/
        color: #fff;
        position: relative;
        height: 100%;
        overflow: hidden;
    }
    .pageWrap:focus{
        border: none;
        outline:none;
    }
    .logInPage {
        /*background-color: #333;*/
        color: #fff;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    h1 {
        font-size: 2.5rem;
    }

    h2 {
        font-size: 2rem;
    }

    h3 {
        font-size: 1.5rem;
    }

    @media (min-device-width: 980px) and (-webkit-max-device-pixel-ratio: 1.6) {
        h1 {
            font-size: 5rem;
        }
        .logInBtn{
            display: block;
        }
    }

    .logInBtn {
        width: 8rem;
        display:none;
        height: 4rem;
        background-color: rgba(3, 3, 3, 0);
        position: fixed;
        top: 0;
        right: 0;
        border: none;
    }

    .logOut {
        width: 8rem;
        height: 4rem;
        background-color: rgba(3, 3, 3, 0);
        position: fixed;
        top: 0;
        left: 0;
        border: none;
    }
</style>