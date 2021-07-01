<template>
    <v-content>
      <v-container >
        <v-row>
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

        </v-col>
        </v-row>
      <v-simple-table >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                No
              </th>
              <th class="text-center">
                Oyun
              </th>
              <th class="text-center">
                Nömrə
              </th>
              <th class="text-center">
                Proqnoz
              </th>
              <th class="text-center">
                Nəticə
              </th>
              <th class="text-center">
                Tarix
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
              <td>{{ item.game }}</td>
              <td>{{ item.number }}</td>
              <td>{{ item.prognoz }}</td>
              <td v-if="item.result==1">Doğru</td>
              <td v-else-if="item.result==0">Yanlış</td>
              <td v-else></td>
              <td>{{ format_date(item.date) }}</td>

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
      config : {
          headers : {
              Authorization: ''
          }
      },
      beginDate: '',
      endDate: '',
      items : []
    }),
    methods:{
      refresh(){
        axios.get(this.$store.getters.getUrl+'/adminstatistic/getstatistic?beginDate='+this.format_api_date(this.beginDate)+'&endDate='+this.format_api_date(this.endDate),this.config).then(response=>{
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
      ditepicker_format(d){
      return d ? moment(d).format("YYYY-MM-DD HH:mm") : '';
      },
      format_date(k){
            return k ? moment(k).format('DD.MM.Y HH:mm:ss') : '';
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

    }

  }
</script>