import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state : {
        // deyisenleri global olanlari burada teyin edirik
        url:'http://tools.dsc.az/voitingbck',
        token : '',
        user : ''
    },
    mutations : {
        // mutationun isi state deyerini deyismekdi
        // ---------------------------
        // initState(state, items){
        //     state.items = items
        // }
        // ---------------------------
        initToken(state,token){
            state.token = token
        },
        initUser(state,user){
            state.user = user
        }
    },
    actions : {
        // asenkron olaraq alacaqimiz islerde database api falan bunu istifade edeceyik
        updateToken(context,token){
            context.commit('initToken',token)
        },
        updateUser(context,user){
            context.commit('initUser',user)
        },
        setCookie(context,obj) {
            var d = new Date();
            d.setTime(d.getTime() + (obj.expires*24 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = obj.name + "=" + obj.value + ";" + expires + ";path=/";
          },
        updateLogin(context,obj){
          context.commit('initToken',obj.token)
          context.commit('initUser',obj.user)
          var d = new Date();
          d.setTime(d.getTime() + (obj.expires*24 * 60 * 60 * 1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = 'user' + "=" + obj.value1 + ";" + expires + ";path=/";
          document.cookie = 'token' + "=" + obj.value2 + ";" + expires + ";path=/";
        }
    },
    getters : {
        // state icindeki datayi bize geri dondurur
        // ----------------------------
        // getState(state){
        //     return state.items
        // }
        // ----------------------------
        // istifade seklidi de buna benzerdir parametre olaraq state alir ve oda yuxarida gosterilen state gosterir
        getUrl(state){

          return state.url
      },
        getUser(state){

            return state.user
        },
        getToken(state){

            return state.token
        },
        getUserCookie() {
            var cname='user'
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          },
          getTokenCookie() {
            var cname='token'
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          },
          is_login(){
            if(store.getters.getUser != '' && store.getters.getToken != ''){
              return true
            }
            if(store.getters.getTokenCookie != '' && store.getters.getUserCookie != ''){
                store.dispatch('updateToken',store.getters.getTokenCookie)
                store.dispatch('updateUser',JSON.parse(store.getters.getUserCookie))
                return true
            }

              return false
          }
    }
})
