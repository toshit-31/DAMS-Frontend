<template>
  <v-app>
    <v-main>
      <DoctorNavBar :user="user" :toggle="menuToggle" v-on:tog="checkClickOutside($event)"/>
      <header id="HeadTop">
        <h1 class="topHeading">
          <div id="back_btn">
        <!-- <NavBarToggle v-on:open="toggle = true" id="nav-btn"/> -->
        <v-btn fab text class="mr-3" to="/doctor/patient/search"><v-icon>arrow_back</v-icon></v-btn>
          </div>
        Patient Detail
          <br>
          <v-chip color="#6200ee22"><h2 class="ct pa-3">{{patientDetail.fullName}}</h2></v-chip>
          </h1>
      </header>
      <v-container class="mt-5">
        <v-row>
          <v-col cols="12">
            <v-card v-for="p,i in patientDetail.prescriptions" :key="i" elevation="2" class="pat-card my-4 pa-3">
              <v-row>
                <v-col cols="1">
                  <div class="d-flex flex-column justify-center align-center" style="height:100%;">
                    <h2><i class="fas fa-prescription"></i></h2>
                  </div>
                </v-col>
                <v-divider vertical color="#aaa" />
                <v-col>
                  <h4 class="my-2 d-flex justify-space-between"><b>{{p.diagnosis.title}}</b><v-spacer /><v-btn fab x-small text color="#6200ee" @click="openPrescription(i)"><v-icon>open_in_full</v-icon></v-btn></h4>
                  <p>
                    {{p.diagnosis.comment}}
                  </p>
                  <h5 align="right"><b style="letter-spacing:0.09rem">{{new Date(p.date).toLocaleDateString()}}</b></h5>
                  <!-- <v-chip class="pa-4" color="#6200ee33" style="letter-spacing:0.09rem"><v-icon class="mr-2">event</v-icon><b>{{new Date(d.date).toLocaleDateString()}}</b></v-chip> -->
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="dialog" fullscreen>
        <v-sheet width="100%" height="100%">
          <v-toolbar style="background:linear-gradient(to bottom, #e3deec, #e0eaee)">
            <v-btn fab text small class="mr-5" @click="dialog=false"><v-icon>clear</v-icon></v-btn>
            <v-toolbar-title style="font-family:Montserrat, sans-serif;font-weight:bold;">Prescription<v-chip class="mx-5 pa-4" color="#6200ee33" style="letter-spacing:0.09rem"><v-icon class="mr-2">event</v-icon><b>{{new Date(activePrescription.date).toLocaleDateString()}}</b></v-chip></v-toolbar-title>
          </v-toolbar>
          <v-row class="mx-2 py-5">
            <v-col lg="4" md="8" offset-md="2" offset-lg="4">
              <v-card class="my-5 pa-3 mt" color="#cae4ee66">
                <v-chip class="card-tag text-button" color="#c7b7ee">diagnosis</v-chip>
                <h3>{{activePrescription.diagnosis.title}}</h3>
                <p>{{activePrescription.diagnosis.comment}}</p>
              </v-card>
              <v-tabs grow>
                <v-tab>Complain</v-tab>
                <v-tab>Medicine</v-tab>
                <v-tab>Test</v-tab>
                <v-tab v-if="activePrescription.history">History</v-tab>
                <!-- Complain -->
                <v-tab-item class="ma-3">
                  <!-- <v-card class="pa-3 my-5 pat-card" elevation="6"> -->
                    <p class="pa-3 my-5 mt">{{activePrescription.complain}}</p>
                  <!-- </v-card> -->
                </v-tab-item>
                <!-- Medicine -->
                <v-tab-item class="ma-3">
                  <v-card v-for="m,i in activePrescription.medicine" :key="i" rounded class="pa-3 my-5 pat-card" elevation="6">
                    <span class="ct"><v-icon class="fas fa-prescription-bottle mr-3"></v-icon>{{m.name}}</span>
                      <v-divider class="my-3" />
                      <table class="dose-tb my-2">
                        <tr>
                          <td rowspan="2"><v-icon class="fas fa-clock" size="32"></v-icon></td>
                          <td>Morning</td>
                          <td>Afternoon</td>
                          <td>Night</td>
                        </tr>
                        <tr>
                          <td>{{m.mor || 0}}</td>
                          <td>{{m.aft || 0}}</td>
                          <td>{{m.evn || 0}}</td>
                        </tr>
                      </table>
                      <v-divider />
                      <table class="dose-tb my-2">
                        <tr>
                          <td rowspan="2" width="10%"><v-icon size="32">date_range</v-icon></td>
                          <td>Days</td>
                          <td>Total Doses</td>
                        </tr>
                        <tr>
                          <td>{{m.days}}</td>
                          <td>{{(parseInt(m.evn||0)+parseInt(m.aft||0)+parseInt(m.mor||0))*m.days}}</td>
                        </tr>
                      </table>
                  </v-card>
                </v-tab-item>
                <!-- test -->
                <v-tab-item class="ma-3">
                  <v-card v-for="t,i in activePrescription.test" :key="i" rounded class="pa-3 my-5 pat-card" elevation="6">
                    <v-card-title class="ct">{{t.name}}</v-card-title>
                    <v-card-subtitle class="ct">{{t.part}}</v-card-subtitle>
                    <div v-if="t.comment">
                      <v-divider class="my-3" />
                      <p>{{t.comment}}</p>
                    </div>
                  </v-card>
                </v-tab-item>
                <!-- History -->
                <v-tab-item class="ma-3" v-if="activePrescription.history">
                  <p class="pa-3 my-5 mt">{{activePrescription.history}}</p>
                </v-tab-item>
              </v-tabs>
            </v-col>
          </v-row>
        </v-sheet>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      toggle: true,
      patId: "",
      patientDetail: {},
      user: {},
      dialog: false,
      activePrescription: {}
    }
  },
  async mounted(){
    this.patId = this.$route.params.id;
    this.toggle = false;
    this.user = JSON.parse(window.localStorage.user);
    this.getPatientRecords();
  },
  methods: {
    getPatientRecords(){
      const self = this;
      let req = new this.XHR("GET", this.ORIGIN+"doctor/patient/"+this.patId, {
        "Authorization": window.localStorage.token
      });
      req.onresponse({
        200: (res)=>{
          console.log(res);
          self.activePrescription = res.prescriptions[0];
          self.patientDetail = res;
        },
        500: (res)=>{
          console.log(res);
        }
      })
      req.send(null, "json");
    },
    openPrescription(i){
      this.dialog = true;
      this.activePrescription = this.patientDetail.prescriptions[i];
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
#back_btn {
  display:inline-block;
  position:absolute;
  left:10px;
}
.ct {
  font-weight:bold;
  font-family:Montserrat, sans-serif
}
.mt {
  font-family:Montserrat, sans-serif;
  letter-spacing: 0.06rem;
}
.card-tag{
  position: relative;
  top:-30px;
  background-color: #c7b7ee;
}
#HeadTop{
min-height:180px;
height: 20vh;
width: 100vw;
background-image: linear-gradient(0deg, #cae4ee 0%, #e3deec 100%);
clip-path: ellipse(100% 55% at 48% 44%);
text-align: center;
}
.topHeading
{
font-family: Montserrat, sans-serif;
font-size: 2rem;
font-weight: 600;
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
.dose-tb {
  text-align:center;
  border-collapse: collapse;
  margin:auto;
}
.dose-tb tr:first-child {
  /* background-color:#ddd; */
  font-weight:bold;
  padding:3px;
}
.dose-tb tr:nth-child(2) {
  /* background-color:#eee; */
  font-size:20px;
  padding:3px;
}
.dose-tb td {
  /* border:1px solid black; */
  width:100px;
}
.pat-card {
  font-family: Montserrat, sans-serif;
  background-image:linear-gradient(180deg, rgba(202, 228, 238, 0.3) 50%, rgba(227, 222, 236, 0.3) 70%);
  transition:0.2s;
}
</style>