<template>
    <v-content>
      <v-container >
        <v-row>
          <v-dialog
            v-model="smsform"
            persistent
            max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Sms yaz</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-text-field
                      v-model="number"
                      label="Nömrə"
                      disabled
                    ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="8"
                    >
                    <v-textarea
                      outlined
                      v-model="sms"
                      name="input-7-4"
                      label="Mesaj"
                    ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="smsform = false"
                  class="text-none"
                >
                  Bağla
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="send"
                  class="text-none"
                >
                  Göndər
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        <v-col
            cols="12"
            sm="12"
            md="3"
            >
        <v-datetime-picker label="Tarixindən"  v-model="beginDate" clearText="Təmizlə"> 
        </v-datetime-picker>
        </v-col>
        <v-col
        cols="12"
        sm="12"
        md="3"
        >
        <v-datetime-picker label="Tarixinədək"  v-model="endDate" clearText="Təmizlə"> 
        </v-datetime-picker>
        </v-col>
        <v-col
        cols="12"
        sm="12"
        md="6"
        >
        <v-btn
        class="ma-2 text-none"
        :disabled="searchloading"
        :loading="searchloading"
        outlined
        color="indigo"
        @click="search"
        >
        Axtar 
        </v-btn>
        <v-btn
        class="ma-2 text-none"
        :disabled="winloading"
        :loading="winloading"
        outlined
        color="error"
        @click="win"
        >
        Təyin et 
        </v-btn>
        </v-col>
        </v-row>
      <v-simple-table >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                Check
              </th>
              <th class="text-center">
                Nömrə
              </th>
              <th class="text-center">
                Tarix
              </th>
              <th>SMS yaz</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.id"
              class="text-center"
            >
              <td>
              <v-checkbox
                v-model="selected"
                :value="{ Number:item.number, Date:format_api_date(item.date) }"
              ></v-checkbox>
              </td>
              <td>{{ item.number }}</td>
              <td>{{ format_date(item.date) }}</td>
              <td>
              <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="smsupd(item.number)"
              >
              <v-icon>mdi-email</v-icon>
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
  export default {
    data: () => ({
      rules:{
        name:[
          val => !!val || "Boş qoymayın!"
        ]
      },
      loading: true,
      searchloading: false,
      winloading: false,
      smsform:false,
      number : '',
      sms:'',
      config : {
          headers : {
              Authorization: ''
          }
      },
      beginDate: '',
      endDate: '',
      selected: [],
      items : []
    }),
    methods:{
      refresh(){
        this.searchloading = true
        axios.get(this.$store.getters.getUrl+'/adminwinner/getwinners?beginDate='+this.format_api_date(this.beginDate)+'&endDate='+this.format_api_date(this.endDate),this.config).then(response=>{
          this.searchloading = false
          if(response.data.success){
            this.items= response.data.value
          }
        }).catch(() => {
            this.$store.dispatch('refresh')
        })
      },
      search(){
        this.refresh()
      },
      smsupd(num){
        console.log(num)
        this.number = num
        this.smsform = true
      },
      send(){
        axios.post(this.$store.getters.getUrl+'/adminwinner/sendmessage',{Number:this.number,Message:this.sms},this.config).then(response=>{
          if(response.data.success){
            this.$toast.success('Success')
          }
          else {
            this.$toast.error('Xəta!')
          }
        }).catch(() => {
            this.$store.dispatch('refresh')
        })
      },
      win(){
        if(this.formIsValid){
          this.winloading = true
          axios.post(this.$store.getters.getUrl+'/adminwinner/setwinnerhistory',{WinnerHistories:this.selected},this.config).then(response=>{
            this.winloading = false
            if(response.data.success){
              this.$toast.success('Success')
            }
            else {
              this.$toast.error('Xəta!')
            }
          }).catch(() => {
            this.$toast.error('Sistem xətası!')
            this.$store.dispatch('refresh')
          })
        }
        else {
          this.$toast.error('Qalib seçin!')
        }
      },
      ditepicker_format(d){
      return d ? moment(d).format("YYYY-MM-DD HH:mm") : '';
      },
      format_date(k){
            return k ? moment(k).format('DD.MM.Y HH:mm') : '';
        },
      format_api_date(k){
          return k ? moment(k).format('Y-MM-DD HH:mm:ss') : '';
      },
    },

    created(){
      this.config.headers.Authorization= this.$store.getters.getTokenCookie
      this.beginDate = this.ditepicker_format(moment().format("YYYY-MM-DD 00:00"))
      this.endDate = this.ditepicker_format(moment().format("YYYY-MM-DD 23:59"))
      this.refresh()
    },
    computed : {   
      formIsValid(){
        if(this.selected.length==0)
        return false

        return true

      }
    }

  }
</script>