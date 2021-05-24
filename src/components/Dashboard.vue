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
      <v-toolbar-title>Top Səndədir - CMS</v-toolbar-title>
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
          <v-list-item-title >Top Səndədir - CMS</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon large>widgets</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Oyunlar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/team">
          <v-list-item-action>
            <v-icon large>mdi-soccer</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Komandalar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/numbers">
          <v-list-item-action>
            <v-icon large>mdi-crystal-ball</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Qaliblər</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/numbers">
          <v-list-item-action>
            <v-icon large>event</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Statistika</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/numbers">
          <v-list-item-action>
            <v-icon large>mdi-handball</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>İstifadəçi Statistikası</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/account">
          <v-list-item-action>
            <v-icon large>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Accounts</v-list-item-title>
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

        this.$store.dispatch('updateLogin',{token:'', expires:-1})

        this.loading = false
        location.href='/login'
      }
    },
    created(){

    },
    beforeCreate() {
      if(!this.$store.getters.is_login){
        this.$router.push('/login')
      }
    
  }
  }
</script>