import { setTimeout } from "core-js";
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
    state : {
        // deyisenleri global olanlari burada teyin edirik
        url:'http://192.168.181.11/brandvas/api',
    },
    mutations : {
        // mutationun isi state deyerini deyismekdi
        // ---------------------------
        // initState(state, items){
        //     state.items = items
        // }
        // ---------------------------

    },
    actions : {
        // asenkron olaraq alacaqimiz islerde database api falan bunu istifade edeceyik
        setCookie(context,obj) {
            var d = new Date();
            d.setTime(d.getTime() + (obj.expires*24 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = obj.name + "=" + obj.value + ";" + expires + ";path=/";
          },
        updateLogin(context,obj){
          var d = new Date();
          d.setTime(d.getTime() + (obj.expires*24 * 60 * 60 * 1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = 'token' + "=" + obj.token + ";" + expires + ";path=/";
        },
        refresh(){
          setTimeout(()=>{
            this.$store.dispatch('updateLogin',{token:'', expires:-1})
            location.href = '/'
          },2000)
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
          if(store.getters.getTokenCookie != ''){
              return true
          }

            return false
        }
    }
})
