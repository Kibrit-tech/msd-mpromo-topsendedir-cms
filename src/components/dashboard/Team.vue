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
                <span class="headline">Yeni Komanda</span>
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
                      md="8"
                    >
                    <v-file-input
                        accept="image/*"
                        @change="ImageUpload($event)"
                        label="Team logo"
                    ></v-file-input>
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
                        v-model="uitem.teamName"
                        :rules="rules.name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="8"
                    >
                    <v-file-input
                        accept="image/*"
                        @change="ImageUpload2($event)"
                        label="Team logo"
                    ></v-file-input>
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
          Komanda əlavə et  
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
                Logo
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
              <td>{{ item.teamName }}</td>
              <td >
                <v-img
                  style="margin:auto"
                  max-height="150"
                  max-width="150"
                  :src="item.imageName"
                ></v-img>
              </td>
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
      form: false,
      formupdate: false,
      config : {
          headers : {
              Authorization: ''
          }
      },
      name:'',
      image:'',
      base64img:'',
      uitem:{},
      items : []
    }),
    methods:{
      ImageUpload(e){
          var fileReader = new FileReader();
          fileReader.onload = (fileLoadedEvent) => {
            var srcData = fileLoadedEvent.target.result;
            this.base64img = srcData

          }
          fileReader.readAsDataURL(e)
      },
      ImageUpload2(e){
          var fileReader = new FileReader();
          fileReader.onload = (fileLoadedEvent) => {
            var srcData = fileLoadedEvent.target.result;
            this.uitem.ImageName = srcData

          }
          fileReader.readAsDataURL(e)
      },
      add(){
        if(this.formIsValid){

          axios.post(this.$store.getters.getUrl+'/adminteam/create',{ TeamName:this.name, ImageName: this.base64img },this.config).then(response=>{
            if(response.data.success){
              this.$toast.success('Uğurla əlavə edildi!')
              this.refresh()
              this.form = false
            }
            else{
              this.$toast.error('Bir xəta baş verdiş Bir daha sınayın!')
              this.form = false
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
          axios.get(this.$store.getters.getUrl+'/adminteam/delete?id='+item.id,this.config).then(response=>{
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
          this.uitem = item
          this.formupdate = true
      },
      upd(){
        if(this.formUIsValid){
          axios.post(this.$store.getters.getUrl+'/adminteam/update',this.uitem,this.config).then(response=>{
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
        axios.get(this.$store.getters.getUrl+'/adminteam/getall',this.config).then(response=>{
          if(response.data.success){
            this.items= response.data.value
          }
        }).catch(() => {
            this.$store.dispatch('refresh')
        })
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
          return k ? moment(k).format('Y-MM-DDTHH:mm:ss') : '';
      },
    },

    created(){
      this.config.headers.Authorization= this.$store.getters.getTokenCookie
      this.refresh()
    },
    computed : {   
      formIsValid(){
        if(this.name=='')
        return false
        if(this.base64img=='')
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