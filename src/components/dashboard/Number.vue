<template>
    <v-content>
      <v-container >
        <v-row>
                <v-col
                    cols="12"
                    sm="12"
                    md="3"
                    >
                    <v-text-field
                    label="Telefon nömrə"
                    v-model="number"
                ></v-text-field>
                </v-col>
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
                md="3"
                >
                <v-btn
                class="ma-2 text-none"
                :disabled="searchloading"
                :loading="searchloading"
                outlined
                color="indigo"
                @click="upd"
                >
                Axtar 
                </v-btn>
                <v-btn
                  class="ma-2 text-none"
                  outlined
                  :disabled="exportloading"
                  :loading="exportloading"
                  color="success"
                  @click="exportt"
                >
                  Export 
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
                Telefon nömrə
              </th>
              <th class="text-center">
                Səs tarixi
              </th>
              <th class="text-center">
                Vote date
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in items"
              :key="item.id"
              class="text-center"
            >
              <td>{{ (reguest.Pager.CurrentPage-1)*reguest.Pager.PageSize +index+1 }}</td>
              <td>{{ item.msisdn }}</td>
              <td>{{ item.user.userNumber }}</td>
              <td>{{ format_date(item.date) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="text-center" v-if="leng>1">
        <v-pagination
        v-model="reguest.Pager.CurrentPage"
        :length="leng"
        @input="onPageChange"
        ></v-pagination>
    </div>
      </v-container>
    </v-content>
</template>
<script>
import axios from 'axios'
import moment from "moment"
  export default {
    data: () => ({
      loading: true,
      searchloading: false,
      exportloading: false,
      config : {
          headers : {
              Authorization: ''
          }
      },
      reguest: {
        includeStage:true,
        includeUser:true,
        Pager:{
          CurrentPage:1,
          PageSize:10
        },
        value: {
            msisdn : ''
        }
      },
      number:'',
      beginDate:'',
      endDate:'',
      totalCount:0,
      items : []
    }),
    methods:{
      onPageChange(){
        axios.post(this.$store.getters.getUrl+'/voiceVote/getListByFilterPaged',this.reguest,this.config).then(response=>{
            this.items= response.data.value.list
            this.totalCount = response.data.value.totalCount
            this.searchloading = false
        }).catch(() => {
            
            this.$store.dispatch('updateLogin',{user:'', value1:'',value2:'', expires:-1, token:''})
            location.href='/login'
        })
      },
      exportt(){
        this.exportloading = true
        axios.post(this.$store.getters.getUrl+'/VoiceVote/ExportToExcell', {Msisdn:this.number,FromDate:this.format_api_date(this.beginDate),ToDate:this.format_api_date(this.endDate)},{...this.config,responseType: 'blob'})
        .then(response => {
            const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', "statistika")
            document.body.appendChild(link)
            link.click()
            this.exportloading = false

        })
        .catch(() => {
            this.$store.dispatch('updateLogin',{user:'', value1:'',value2:'', expires:-1, token:''})
            location.href='/login'
        })
      },
      upd(){
        this.searchloading = true
        this.reguest.value.msisdn = this.number
        this.reguest.fromDate = this.format_api_date(this.beginDate)
        this.reguest.toDate = this.format_api_date(this.endDate)
        this.reguest.Pager.CurrentPage = 1
        this.onPageChange()
      },
      ditepicker_format(d){
      return d ? moment(d).format("YYYY-MM-DD HH:mm") : '';
      },

      format_date(k){
            return k ? moment(k).format('DD.MM.Y HH:mm') : '';
        },
      format_api_date(k){
          return k ? moment(k).format('Y-MM-DDTHH:mm:ss') : '';
      },
    },

    created(){
      this.config.headers.Authorization= this.$store.getters.getToken
      axios.post(this.$store.getters.getUrl+'/voiceVote/getListByFilterPaged',this.reguest,this.config).then(response=>{
        this.items= response.data.value.list
        this.totalCount = response.data.value.totalCount
      }).catch(() => {
        
        this.$store.dispatch('updateLogin',{user:'', value1:'',value2:'', expires:-1, token:''})
        location.href='/login'
      })
    },
    computed : {   
      leng(){
          return Math.ceil(this.totalCount/this.reguest.Pager.PageSize);
      },
    }

  }
</script>