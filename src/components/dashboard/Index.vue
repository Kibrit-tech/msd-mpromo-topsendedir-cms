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
                <span class="headline">Yeni Mərhələ</span>
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
                        label="Adı"
                        v-model="name"
                        :rules="rules.name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-datetime-picker label="Başlama vaxtı"  v-model="startDate" clearText="Təmizlə"> 
                    </v-datetime-picker>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                     <v-datetime-picker label="Bitmə vaxtı" v-model="endDate" clearText="Təmizlə"> 
                    </v-datetime-picker>
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
          <v-dialog
            v-model="formupdate"
            persistent
            max-width="600px"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Yenilə</span>
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
                        label="Adı"
                        v-model="uitem.name"
                        :rules="rules.name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-datetime-picker label="Başlama vaxtı"  v-model="uitem.beginDate"  clearText="Təmizlə"> 
                    </v-datetime-picker>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                     <v-datetime-picker label="Bitmə vaxtı" v-model="uitem.endDate" clearText="Təmizlə"> 
                    </v-datetime-picker>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="formupdate = false"
                  class="text-none"
                >
                  Bağla
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="upd"
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
          Mərhələ əlavə et  
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
                Ad
              </th>
              <th class="text-center">
                Başlama vaxtı
              </th>
              <th class="text-center">
                Bitmə vaxtı
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
              <td>{{ item.name }}</td>
              <td>{{ format_date(item.beginDate) }}</td>
              <td>{{ format_date(item.endDate) }}</td>
              <td>
                <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="tab(item)"
                >
                  <v-icon>mdi-format-list-bulleted-square</v-icon>
                </v-btn>
                <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="update(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </td>
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
      <br>
      <br>
      <hr>
      <br>
      <br>
      <h3>{{tableItem.name}}</h3>
      <v-simple-table style="width:100%">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                Istifadəçi nömrəsi
              </th>
              <th class="text-center">
                Səs sayı
              </th>
              <th class="text-center">
                Faiz
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="subitem in subitems"
              :key="subitem.userId"
              class="text-center"
            >
              <td>{{ subitem.user.userNumber }}</td>
              <td>{{ subitem.count }}</td>
              <td>{{ subitem.total }}</td>
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
      form: false,
      formupdate: false,
      config : {
          headers : {
              Authorization: ''
          }
      },
      reguest: {
        "Pager":{
          "CurrentPage":1,
          "PageSize":10
        }
      },
      name:'',
      startDate:'',
      endDate:'',
      uitem : {

      },
      subitems: [],
      tableItem:{},
      totalCount:0,
      items : []
    }),
    methods:{
      onPageChange(){
        axios.post(this.$store.getters.getUrl+'/VoiceStage/GetListByFilterPaged',this.reguest,this.config).then(response=>{
          this.items= response.data.value.list
          this.totalCount = response.data.value.totalCount
        }).catch(() => {
          
          this.$store.dispatch('updateLogin',{user:'', value1:'',value2:'', expires:-1, token:''})
          location.href='/login'
        })
      },
      add(){
        if(this.formIsValid){

          axios.post(this.$store.getters.getUrl+'/voiceStage/add',{ name:this.name, endDate:this.format_api_date(this.endDate),beginDate:this.format_api_date(this.startDate) },this.config).then(response=>{
            if(response.data.success){
              this.$toast.success('Uğurla əlavə edildi!')
              this.onPageChange()
              this.form = false
            }
            else{
              this.$toast.error('Bir xəta baş verdiş Bir daha sınayın!')
            }
          }).catch(() => {
            
            this.$store.dispatch('updateLogin',{user:'', value1:'',value2:'', expires:-1, token:''})
            location.href='/login'
          })
        }
        else{
          this.$toast.error('Xanalar düzgün doldurulmayib. Bir daha xanaları yoxlayın!')
        }

      },
      update(item){
          this.uitem = item
          this.uitem.beginDate = this.ditepicker_format(item.beginDate)
          this.uitem.endDate = this.ditepicker_format(item.endDate)
          this.formupdate = true
      },
      tab(item){
          this.tableItem = item
          axios.get(this.$store.getters.getUrl+'/voiceVote/GetStageVoiceReport/'+item.id,this.config).then(response=>{
            if(response.data.success){
              this.subitems = response.data.list
            }
            else{
              this.$toast.error('Bir xəta baş verdiş Bir daha sınayın!')
            }
          }).catch(() => {
            
            this.$store.dispatch('updateLogin',{user:'', value1:'',value2:'', expires:-1, token:''})
            location.href='/login'
          })
      },
      upd(){
        if(this.formUIsValid){
          this.uitem.beginDate = this.format_api_date(this.uitem.beginDate)
          this.uitem.endDate = this.format_api_date(this.uitem.endDate)
          axios.post(this.$store.getters.getUrl+'/voiceStage/update',this.uitem,this.config).then(response=>{
            if(response.data.success){
              this.$toast.success('Uğurla dəyişdirildi!')
              this.onPageChange()
              this.formupdate = false
            }
            else{
              this.$toast.error('Bir xəta baş verdiş Bir daha sınayın!')
            }
          }).catch(() => {
            
            this.$store.dispatch('updateLogin',{user:'', value1:'',value2:'', expires:-1, token:''})
            location.href='/login'
          })
        }
        else{
          this.$toast.error('Xanalar düzgün doldurulmayib. Bir daha xanaları yoxlayın!')
        }

      },
      ditepicker_format(d){
      return d ? moment(d).format("YYYY-MM-DD HH:mm") : '';
      },
      step(){
        this.form=true
        this.name = ''
        this.startDate = ''
        this.endDate = ''
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
      axios.post(this.$store.getters.getUrl+'/VoiceStage/GetListByFilterPaged',this.reguest,this.config).then(response=>{
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
      formIsValid(){
        if(this.name=='')
        return false
        if(this.startDate=='')
        return false
        if(this.endDate=='')
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