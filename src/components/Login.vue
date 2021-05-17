<template>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="light"
                dark
                flat
              >
                <v-toolbar-title>Giriş Paneli</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="signIn" id="sign">
                  <v-text-field
                    label="İstifadəçi adı"
                    v-model="username"
                    :rules='rules.username'
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    label="Parol"
                    v-model="password"
                    :rules="rules.password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                <v-btn  color="light"
                form="sign"
                :loading="loading"
                dark
                type="submit"
                >Login</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
</template>
<script>
  import axios from "axios"
  export default {
    props: {
      
    },
    data: ()=>({
      username : '',
      password : '',
      loading:false,
      rules : {
        username: [
          val => val != '' || 'Doldurun!'
        ],
        password: [
          val => val != '' || "Doldurun!"
        ]
      }


    }),
    methods: {
      signIn(){
        if(this.formIsValid){
          this.loading = true
          axios.post(this.$store.getters.getUrl+'/user/signin',{username:this.username,password:this.password})
          .then(response => {
            if(response.data.success){
              this.$toast.success('Success')
            
              this.$store.dispatch('updateLogin',{user:response.data.value.user, value1:JSON.stringify(response.data.value.user),value2:'Bearer '+response.data.value.token, expires:1, token:'Bearer '+response.data.value.token})

              this.loading = false
              location.href='/'
              // this.$router.push('/')
            }
            else {
              this.$toast.error('İstifadəçi adı və ya parol səhvdir!')
              this.loading = false
            }
          })
        }
        else{
          this.$toast.error('Xanalar boşdur!')
          this.loading = false
        }
      },

    },
    computed : {   
      formIsValid(){
        if(this.username=='')
        return false
        if(this.password=='')
        return false

        return true

      }
    },
    beforeCreate() {
      if(this.$store.getters.is_login){
        this.$router.push('/')
      }
    
  }
  }
</script>