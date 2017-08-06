import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-default/index.css'
import 'animate.css/animate.min.css'
import './assets/mediaQuery.css'
import VueResource from  "vue-resource"
import ElementUI from 'element-ui'
import VueParticle from './components/particles'
Vue.use(VueParticle);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
import LogIn from './components/Login.vue'
import Page from './components/Page.vue'

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: LogIn},
    {path: '/page', component: Page},
]

const router = new VueRouter({
    routes
});

window.vm = new Vue({
    el: '#app',
    template: '<App/>',
    components: {App},
    router
});
