'use strict'
window.REM_UNIT = 64 // NEED CONDIF IN EACH PROJECT
console.log(window.REM_UNIT, window.devicePixelRatio)
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import validator from 'vue-validator'
import filters from './filters'
import routerMap from './routers'
import FastClick from 'fastclick'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(validator);

$.ajaxSettings.crossDomain = true;

//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

//实例化VueRouter
let router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});

//登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach(transition => {
    
    
    FastClick.attach(document.body);
	transition.next();	
    // if (transition.to.auth) {
    //     if (localStorage.userId) {
    //         transition.next();
    //     } else {
    //         var redirect = encodeURIComponent(transition.to.path);
    //         transition.redirect('/login?redirect=' + redirect);
    //     }
    // } else {
    //     transition.next();
    // }
})

let app = Vue.extend({});

routerMap(router);

router.start(app, "#app");
