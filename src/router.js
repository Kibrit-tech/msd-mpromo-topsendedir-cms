import Vue from "vue"
import VueRouter from "vue-router"
import DatetimePicker from 'vuetify-datetime-picker';
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Index from './components/dashboard/Index'
import VueMeta from 'vue-meta'
import Team from './components/dashboard/Team'
import Account from './components/dashboard/Account'
import Statistic from './components/dashboard/Statistic'
import UserStatistic from './components/dashboard/UserStatistic'
import Winner from './components/dashboard/Winner'

Vue.use(DatetimePicker)
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
                        title : 'Dashboard'
                    },


                },
                {
                    path: '/team',
                    name: 'Team', 
                    component: Team,
                    meta : {
                        title : 'Teams'
                    },


                },
                {
                    path: '/account',
                    name: 'Accounts', 
                    component: Account,
                    meta : {
                        title : 'Accounts'
                    },


                },
                {
                    path: '/statistic',
                    name: 'Statistic', 
                    component: Statistic,
                    meta : {
                        title : 'Statistic'
                    },


                },
                {
                    path: '/userstatistic',
                    name: 'UserStatistic', 
                    component: UserStatistic,
                    meta : {
                        title : 'UserStatistic'
                    },


                },
                {
                    path: '/winner',
                    name: 'Winner', 
                    component: Winner,
                    meta : {
                        title : 'Winner'
                    },


                },
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