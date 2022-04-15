<template>
  <v-app>
    <v-main>
      <DoctorNavBar :user="user" :toggle="menuToggle" v-on:tog="checkClickOutside($event)"/>
      <header id="HeadTop">
        <h1 class="topHeading">
        <NavBarToggle v-on:open="toggle = true" id="nav-btn"/>Patients
          <br>
          <v-text-field
            dense outlined rounded autofocus
            color="#6200ee"
            placeholder="Patient's Name"
            style="width:40%; margin:5px auto;"
            v-model="patName"
            @keyup.enter="searchPatients(patName)"
          >
          <template v-slot:append>
            <v-btn fab text x-small color="#6200ee" style="position:relative;top:-4px;right:-15px" @click="searchPatients(patName)"><v-icon>search</v-icon></v-btn>
          </template>
          </v-text-field>
          </h1>
      </header>
      <v-container class="mt-5">
        <!-- <v-row >
          <v-col>
          </v-col>
        </v-row> -->
        <v-row>
          <v-col cols="12" v-if="loading">
            <v-card class="pat-card pa-3">
              <v-skeleton-loader type="heading" width="100%" class="my-3" />
              <v-skeleton-loader width="30%" type="text" class="my-3" />
              <v-skeleton-loader type="text@2" width="60%" class="my-3" />
            </v-card>
          </v-col>
          <v-col cols="12" v-if="patients.length != 0">
            <v-card v-if="terms.length && !!terms[0]" elevation="0" class="pa-5">
              <span class="text-button">Results for:</span>
              <v-chip v-for="t in terms" :key="t" color="#6200ee33" class="mx-1">{{t}}</v-chip>
            </v-card>
            <v-card v-for="p,i in patients" elevation="2" :key="i" class="pat-card my-4">
              <v-card-title class="ct">{{p.fullName}}<v-btn :to="'/doctor/patient/'+p.patId" color="#6200ee" class="mx-5" text fab><v-icon>launch</v-icon></v-btn></v-card-title>
              <v-card-subtitle class="text-button font-weight-bold">{{p.phone}}</v-card-subtitle>
              <table class="mx-3 n2h">
                <tr>
                  <td>Last Visited</td>
                  <td><v-chip color="#6200ee33" class="text-button">{{new Date(p.prescriptions[0].date).toLocaleDateString()}}</v-chip></td>
                </tr>
                <tr>
                  <td>Latest Diagnosis</td>
                  <td><v-chip color="#6200ee33">{{p.prescriptions[0].diagnosis.title}}</v-chip></td>
                </tr>
              </table>
            </v-card>
          </v-col>
          <v-col v-if="patients.length == 0 && !loading">
            <div class="d-flex justify-center">
              <span class="text-button">{{searchStatus}}</span>
            </div>
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
      toggle: true,
      patName: "",
      patients: [],
      user: {},
      loading: false,
      terms: [],
      searchStatus: ""
    }
  },
  async mounted(){
    this.toggle = false;
    this.user = JSON.parse(window.localStorage.user);
    this.searchPatients("");
  },
  methods: {
    searchPatients(patientName){
      const self = this;
      patientName = patientName.trim();
      this.terms = patientName.split(" ");
      this.patName = "";
      let req = new this.XHR("GET", this.ORIGIN+"doctor/patients?name="+patientName, {
        "Authorization": window.localStorage.token
      });
      this.searchStatus = "no results";
      req.onresponse({
        0:(res)=>{ 
          self.loading = false;
        },
        200: (res)=>{
          console.log(res);
          self.patients = res;
        }
      })
      req.send(null, "json");
      this.loading = true;
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
.ct {
  font-weight:bold;
  font-family:Montserrat, sans-serif
}
/*
#HeadTop{
min-height:180px;
height: 25vh;
width: 100vw;
background-image: linear-gradient(0deg, #cae4ee 0%, #e3deec 100%);
clip-path: ellipse(100% 50% at 48% 35%);
text-align: center;
}
*/
.topHeading
{
font-family: Montserrat, sans-serif;
font-size: 2rem;
font-weight: 600;
display:block;
padding-top: 3%;
}
@media screen and (max-width: 1370px){
  .topHeading{margin-left:0}
}
@media screen and (max-width: 750px) {
  .topHeading
  {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  padding-top: 10%;
  }
}
table {
  font-family:Montserrat, sans-serif;
}
.n2h td:nth-child(2) {
  font-weight: 700;
  padding: 5px 15px;
}
.pat-card {
/* background-color:rgba(202, 228, 238, 0.4); */
background-image:linear-gradient(180deg, rgba(202, 228, 238, 0.3) 50%, rgba(227, 222, 236, 0.3) 70%);
transition:0.2s;
/* border:1px solid #0053ee55 !important; */
}
</style>