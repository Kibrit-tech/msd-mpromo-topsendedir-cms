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
                <span class="headline">Yeni Oyun</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-autocomplete
                      v-model="firstTeamId"
                      :items="clubs"
                      label="Birinci komanda"
                      :item-text="'teamName'"
                      :item-value="'id'"
                    ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-autocomplete
                      v-model="secondTeamId"
                      :items="clubs"
                      label="Ikinci komanda"
                      :item-text="'teamName'"
                      :item-value="'id'"
                    ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-datetime-picker 
                    label="Başlama vaxtı"  
                    v-model="MatchDate" 
                    clearText="Təmizlə"> 
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
                    <v-autocomplete
                      v-model="uitem.FirstTeamId"
                      :items="clubs"
                      label="Birinci komanda"
                      :item-text="'teamName'"
                      :item-value="'id'"
                    ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-autocomplete
                      v-model="uitem.SecondTeamId"
                      :items="clubs"
                      label="Ikinci komanda"
                      :item-text="'teamName'"
                      :item-value="'id'"
                    ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-datetime-picker 
                    label="Başlama vaxtı"  
                    v-model="uitem.MatchDate" 
                    clearText="Təmizlə"> 
                    </v-datetime-picker>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-select
                      :items="selectbox"
                      v-model="uitem.MatchScore"
                      label="Nəticə"
                      :item-text="'name'"
                      :item-value="'value'"
                    ></v-select>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                    <v-select
                      :items="status"
                      v-model="uitem.Status"
                      label="Status"
                      :item-text="'name'"
                      :item-value="'value'"
                    ></v-select>
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
          outlined
          color="indigo"
          @click="step"
        >
          Oyun əlavə et  
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
                İlk Komanda
              </th>
              <th class="text-center">
                İkinci Komanda
              </th>
              <th class="text-center">
                Oynama vaxti
              </th>
              <th class="text-center">
                Nəticə
              </th>
              <th class="text-center">
                Status
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
              <td>{{ item.firstTeam }}</td>
              <td>{{ item.secondTeam }}</td>
              <td>{{ format_date(item.matchDate) }}</td>
              <td v-if="item.result==='0'">Heç-Heçə</td>
              <td v-else>{{ item.result }}</td>
              <td v-if="item.status==0">Normal</td>
              <td v-else>Təxirə Salınıb</td>
              <td>
                <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="update(item)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="delette(item)"
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
      searchloading: false,
      form: false,
      formupdate: false,
      config : {
          headers : {
              Authorization: ''
          }
      },
      firstTeamId:'',
      secondTeamId:'',
      MatchDate:'',
      beginDate: '',
      endDate: '',
      uitem:{},
      selectbox:[{name:'',value: null},{name:'Heç-Heçə',value:0},{name:'',value:1},{name:'',value:2}],
      status:[{name:'Normal',value:0},{name:'Təxirə salınıb',value:1}],
      items : [],
      clubs : []
    }),
    methods:{
      add(){
        if(this.formIsValid){

          axios.post(this.$store.getters.getUrl+'/adminmatch/create',{ FirstTeamId:this.firstTeamId, SecondTeamId:this.secondTeamId, MatchDate:this.format_api_date(this.MatchDate)},this.config).then(response=>{
            if(response.data.success){
              this.$toast.success('Uğurla əlavə edildi!')
              this.refresh()
              this.form = false
              this.firstTeamId = ''
              this.secondTeamId = ''
              this.MatchDate = ''
            }
            else{
              this.$toast.error('Bir xəta baş verdiş Bir daha sınayın!')
              this.form = false
              this.firstTeamId = ''
              this.secondTeamId = ''
              this.MatchDate = ''
            }
          }).catch(() => {
            
            this.$store.dispatch('refresh')
          })
        }
        else{
          this.$toast.error('Xanalar düzgün doldurulmayib. Bir daha xanaları yoxlayın!')
        }


      },
      delette(item){
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
          axios.get(this.$store.getters.getUrl+'/adminmatch/delete?id='+item.id,this.config).then(response=>{
            if(response.data.success){
              this.$toast.success('Uğurla silindi!')
              Swal.fire(
              'Uğurla silindi!',
              '',
              'success'
              )
              this.refresh()
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
      update(item){
        console.log(item)
          this.uitem.Id = item.id
          this.uitem.MatchDate = this.ditepicker_format(item.matchDate)
          this.uitem.MatchScore = item.resultId
          this.uitem.Status = item.status
          this.uitem.FirstTeamId = item.firstTeamId
          this.uitem.SecondTeamId = item.secondTeamId
          this.selectbox[2].name = item.firstTeam
          this.selectbox[3].name = item.secondTeam
          this.formupdate = true
      },
      upd(){
        if(this.formUIsValid){
          axios.post(this.$store.getters.getUrl+'/adminmatch/update',{... this.uitem, MatchDate:this.format_api_date(this.uitem.MatchDate)},this.config).then(response=>{
            if(response.data.success){
              this.$toast.success('Uğurla dəyişdirildi!')
              this.refresh()
              this.formupdate = false
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
      refresh(){
        this.searchloading = true
        axios.get(this.$store.getters.getUrl+'/adminmatch/getmatches?beginDate='+this.format_api_date(this.beginDate)+'&endDate='+this.format_api_date(this.endDate),this.config).then(response=>{
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
      ditepicker_format(d){
      return d ? moment(d).format("YYYY-MM-DD HH:mm") : '';
      },
      step(){
        this.form=true
        this.name = ''
        this.base64img = ''
        this.image = ''
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
      axios.get(this.$store.getters.getUrl+'/adminteam/getall',this.config).then(response=>{
          if(response.data.success){
            this.clubs= response.data.value
          }
        }).catch(() => {
            this.$store.dispatch('refresh')
        })
      this.refresh()
    },
    computed : {   
      formIsValid(){
        if(this.firstTeamId=='')
        return false
        if(this.secondTeamId=='')
        return false
        if(this.MatchDate=='')
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