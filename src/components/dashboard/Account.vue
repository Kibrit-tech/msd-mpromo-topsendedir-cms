<template>
    <v-content>
      <v-container >
        <v-row>
          <v-dialog
            v-model="form"
            persistent
            max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Yeni Hesab</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        label="Emaili"
                        v-model="email"
                        :rules="rules.name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-text-field
                        label="Parolu"
                        v-model="password"
                        :rules="rules.name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="form = false"
                  class="text-none"
                >
                  Bağla
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="add"
                  class="text-none"
                >
                  Yaddaşa yaz
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

      <div class="text-center">
        <v-btn
          class="ma-2 text-none"
          outlined
          color="indigo"
          @click="step"
        >
          Hesab əlavə et  
        </v-btn>
      </div>
        </v-row>
      <v-simple-table >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                No
              </th>
              <th class="text-center">
                Email
              </th>
              <th>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in items"
              :key="item.id"
              class="text-center"
            >
              <td>{{ index+1 }}</td>
              <td>{{ item.email }}</td>
              <td>
                <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="update(item)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      </v-container>
    </v-content>
</template>
<script>
import axios from 'axios'
import moment from "moment"
import Swal from "sweetalert2"
  export default {
    data: () => ({
      rules:{
        name:[
          val => !!val || "Boş qoymayın!"
        ]
      },
      loading: true,
      form: false,
      config : {
          headers : {
              Authorization: ''
          }
      },
      email:'',
      password:'',
      items : []
    }),
    methods:{
      add(){
        if(this.formIsValid){

          axios.post(this.$store.getters.getUrl+'/adminuser/createadmin',{ Email:this.email, Password:this.password,RoleId:1 },this.config).then(response=>{
            if(response.data.success){
              this.$toast.success('Uğurla əlavə edildi!')
              this.refresh()
              this.form = false
            }
            else{
              this.$toast.error('Bir xəta baş verdiş Bir daha sınayın!')
            }
          }).catch(() => {
            
            this.$store.dispatch('refresh')
          })
        }
        else{
          this.$toast.error('Xanalar düzgün doldurulmayib. Bir daha xanaları yoxlayın!')
        }

      },
      update(item){
        Swal.fire({
        title: 'Sil',
        text: "Əminsiniz?",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "İmtina",
        confirmButtonText: 'Təsdiq'
        }).then((result) => {
        if (result.isConfirmed) {
          axios.get(this.$store.getters.getUrl+'/adminuser/delete?userId='+item.id,this.config).then(response=>{
            if(response.data.success){
              this.$toast.success('Uğurla silindi!')
              Swal.fire(
              'Uğurla silindi!',
              '',
              'success'
              )
              this.refresh()
              this.form = false
            }
            else{
              this.$toast.error('Bir xəta baş verdiş Bir daha sınayın!')
              Swal.fire(
                  'Xəta.',
                  'Bir xəta baş verdiş Bir daha sınayın!',
                  'error'
              )
            }
          }).catch(() => {
            this.$store.dispatch('refresh')
          })
        }
        })
      },
      ditepicker_format(d){
      return d ? moment(d).format("YYYY-MM-DD HH:mm") : '';
      },
      step(){
        this.form=true
        this.email = ''
        this.password = ''
      },
      refresh(){
        axios.get(this.$store.getters.getUrl+'/adminuser/getallusers',this.config).then(response=>{
          if(response.data.success){
            this.items= response.data.value
          }
        }).catch(() => {
            this.$store.dispatch('refresh')
        })
      },
      format_date(k){
            return k ? moment(k).format('DD.MM.Y HH:mm:ss') : '';
        },
      format_api_date(k){
          return k ? moment(k).format('Y-MM-DDTHH:mm:ss') : '';
      },
    },

    created(){
      this.config.headers.Authorization= this.$store.getters.getTokenCookie
      this.refresh()
    },
    computed : {   
      formIsValid(){
        if(this.email=='')
        return false
        if(this.password=='')
        return false

        return true

      },
      formUIsValid(){
        if(this.uitem.beginDate=='')
        return false
        if(this.uitem.endDate=='')
        return false
        if(this.uitem.name=='')
        return false

        return true

      }
    }

  }
</script>