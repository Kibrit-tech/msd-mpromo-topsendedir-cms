import Vue from "vue"
import VueRouter from "vue-router"
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Index from './components/dashboard/Index'
import VueMeta from 'vue-meta'
import Number from './components/dashboard/Number'

Vue.use(VueMeta)
Vue.use(VueRouter)

export const router = new VueRouter({
    routes : [
        
        {
            path : '/login',
            component : Login,
            meta : {
                title : 'Giriş Paneli'
            }
        },
        {
            path : '/',
            component : Dashboard,
            name : 'Dashboard',
            children: [
                {
                    path: '/',
                    name: 'Profile', 
                    component: Index,
                    meta : {
                        title : 'Səsvermə tarixçəsi'
                    },


                },

                {
                    path: '/numbers',
                    name: 'Numbers', 
                    component: Number,
                    meta : {
                        title : 'Nömrə tarixçəsi'
                    }
                }
                // {path: '/activity',name: 'Activity', component: activity},
            ],
        },
        // {
        //     name : 'edit-param',
        //     path : '/edit',
        //     component : Edit
        // },
        // dinamik root teyin edilir icine deyisen gondere bilmek ucun
        {
            path : '*',
            redirect : '/'
        }
    ],
    mode : "history"
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
  })