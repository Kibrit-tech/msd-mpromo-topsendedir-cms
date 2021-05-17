<template>
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-right
      clipped-left
      color="light"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Səs Azərbaycan</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" outlined dark small color="light" @click="logOut" :loading="loading">
        <v-icon  dark>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      clipped
    >
      <v-list dense>
        <v-list-item link class="ma-1">

          <v-list-item-avatar>
                <img
                  src="../assets/kibrit-logo.png"
                  alt="John"
                >
          </v-list-item-avatar>
          <v-list-item-title >VOICE</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon large>list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Səsvermə tarixçəsi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/numbers">
          <v-list-item-action>
            <v-icon large>mdi-domain</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Nömrə tarixçəsi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


<router-view/>


    <v-footer
      app
      color="light"
      class="white--text"
      dark
    >
      <span>Kibrit</span>
      <v-spacer></v-spacer>
      <span>&copy; {{ new Date().getFullYear()}}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      // source: String,
    },
    data: () => ({
      drawer: false,
      loading:false,
      username:''
    }),
    methods:{
      logOut(){
        this.loading = true

        this.$store.dispatch('updateLogin',{user:'', value1:'',value2:'', expires:-1, token:''})

        this.loading = false
        location.href='/login'
        //  this.$router.push('/login')
      }
    },
    created(){
      var usr = this.$store.getters.getUser
      if(usr){
        this.username = usr.username
      }
    },
    beforeCreate() {
      if(!this.$store.getters.is_login){
        this.$router.push('/login')
      }
    
  }
  }
</script>