<template>
  <v-app>
    <v-main>
      <DoctorNavBar :user="user" :toggle="menuToggle" v-on:tog="checkClickOutside($event)"/>
      <header id="HeadTop">
        <h3 class="topHeading">
          <NavBarToggle v-on:open="toggle = true" id="nav-btn"/>
          Medicines
          <v-text-field
            dense outlined rounded autofocus
            color="#6200ee"
            placeholder="Medicine's Name"
            style="margin:5px auto;width:40%;"
            v-model="medName"
            @input="searchMedicine(medName)"
          >
          </v-text-field> 
        </h3>
      </header>
      <v-container fluid class="mt-5">
        <v-row>
          <v-col offset-md="3" md="6" sm="12">
            <v-btn fab color="#6200ee" fixed :bottom="true" :right="true" rounded dark @click="addMedicine()"><v-icon>add</v-icon></v-btn>
            <v-simple-table width="100%" class="ma-2 med-table">
              <thead><th class="pa-3" style="border-radius:5px;">Medicine</th></thead>
              <tbody>
                <tr v-for="m in filteredMeds" :key="m"><td class="d-flex align-center px-3 py-8">{{m}}<v-spacer /><v-btn elevation="0" fab x-small color="error" @click="deleteMedicine(m)"><v-icon>delete</v-icon></v-btn></td></tr>
              </tbody>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      user: {},
      toggle: false,
      meds: [],
      filteredMeds: [],
      medName: ""
    }
  },
  async mounted(){
    this.toggle = false;
    this.user = JSON.parse(window.localStorage.user);
    this.getMedicine()
  },
  methods: {
    searchMedicine(medName){
      let regExp = new RegExp(medName, "gi");
      this.filteredMeds = this.meds.filter( x => {
        return x.search(regExp) > -1
      })
    },
    getMedicine(){
      const self = this;
      let req = new this.XHR("GET", this.ORIGIN+"doctor/medicine", {
        "Authorization": window.localStorage.token
      })
      req.onresponse({
        200: (res)=>{
          self.meds = res.medList;
          self.filteredMeds = res.medList;
        },
        400: (res)=>{
          alert("Medicine not retrieved !");
          console.log(res);
        }
      })
      req.send(null, "json");
    },
    addMedicine(){
      let medName = window.prompt("Enter the medicine name");
      const self = this;
      if(medName.length){
        let req = new this.XHR("POST", this.ORIGIN+"doctor/medicine", {
          "Authorization": window.localStorage.token,
          "Content-type": "application/json"
        })
        req.onresponse({
          200: (res)=>{
            self.meds = res[0].medList;
            self.filteredMeds = res[0].medList;
            alert("Medicine added")
          }
        })
        req.send({medicine: medName}, "json");
      } else window.alert("No medicine name provided")
    },
    deleteMedicine(medName){
      const self = this;
      let req = new this.XHR("DELETE", this.ORIGIN+"doctor/medicine?medicine="+medName, {
        "Authorization": window.localStorage.token
      })
      req.onresponse({
        200: (res)=>{
          self.meds = res[0].medList;
          self.filteredMeds = res[0].medList;
          alert("Medicine deleted")
        },
        500: (res)=>{
          alert("Medicine not deleted !");
          console.log(res);
        }
      })
      req.send(null, "json");
    },
    checkClickOutside(bool){
      if(bool == false) this.toggle = false;
    }
  },
  computed: {
    menuToggle(){
      return this.toggle;
    }
  }
}
</script>

<style>
.med-table {
  font-family:Montserrat, sans-serif;
}
.med-table th {
  background-color:#6200ee;
  text-align:left;
  color:white;
}
</style>