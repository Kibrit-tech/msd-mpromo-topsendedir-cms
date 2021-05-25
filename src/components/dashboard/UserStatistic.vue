<template>
    <v-content>
      <v-container >
      <v-simple-table >
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">
                No
              </th>

              <th class="text-center">
                Nömrə
              </th>
              <th class="text-center">
                nextChargeDate
              </th>
              <th class="text-center">
                subscriptionDate
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in items"
              :key="item.id"
              class="text-center"
            >
              <td>{{ (Pager.CurrentPage-1)*Pager.PageSize +index+1 }}</td>
              <td>{{ item.number }}</td>
              <td>{{ format_date(item.nextChargeDate) }}</td>
              <td>{{ format_date(item.subscriptionDate) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="text-center" v-if="leng>1">
          <v-pagination
          v-model="Pager.CurrentPage"
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
      Pager:{
          CurrentPage:1,
          PageSize:10
        },
      totalCount:0,
      items : []
    }),
    methods:{
      onPageChange(){
        this.refresh()
      },
      refresh(){
        axios.get(this.$store.getters.getUrl+'/adminstatistic/getuserstatistic?limit='+this.Pager.PageSize+'&page='+this.Pager.CurrentPage,this.config).then(response=>{
          if(response.data.success){
            this.items= response.data.value.adminUsers
            this.totalCount = response.data.value.count
          }
        }).catch(() => {
            this.$store.dispatch('refresh')
        })
      },
      format_date(k){
            return k ? moment(k).format('DD.MM.Y HH:mm') : '';
        },
    },

    created(){
      this.config.headers.Authorization= this.$store.getters.getTokenCookie
      this.refresh()
    },
    computed : {   
      leng(){
          return Math.ceil(this.totalCount/this.Pager.PageSize);
      },
    }

  }
</script>