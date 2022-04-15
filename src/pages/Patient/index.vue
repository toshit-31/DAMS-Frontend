<template>
  <v-app>
    <v-main>
      <PatientNavBar :user="user" :toggle="menuToggle" v-on:tog="checkClickOutside($event)"/>
      <header id="HeadTop">
        <h1 class="topHeading">
          <NavBarToggle v-on:open="toggle = true" id="nav-btn"/>Prescriptions
          <!-- <br> -->
          <!-- <v-chip color="#fff">{{user.fullName}}</v-chip> -->
          <!-- <v-text-field
            dense outlined rounded autofocus
            color="#6200ee"
            placeholder="Search by Diagnosis"
            class="mx-10 my-2"
            v-model="patName"
          >
          <template v-slot:append>
            <v-btn fab text x-small color="#6200ee" style="position:relative;top:-4px;right:-15px"><v-icon>search</v-icon></v-btn>
          </template>
          </v-text-field> -->
          </h1>
      </header>
      <v-container>
        <v-row>
          <v-col>
            <v-radio-group v-model="doctorSpecFilter">
              <div class="d-flex justify-space-between">
              <v-radio value="all" key="0" label="All" color="#6200ee" />
              <v-radio v-for="s in Object.keys(specMap)" :value="s" :key="s" :label="specMap[s]" color="#6200ee" />
              </div>
            </v-radio-group>
            <div class="d-flex flex-row justify-space-between">
            <!-- <v-menu bottom nudge-bottom="60" max-width="250px">
              <template v-slot:activator="{on, attrs}" style="display:block;width:250px;">
                <v-text-field
                  outlined
                  label="Filter Min Date"
                  :value="dateFilter.min ? new Date(dateFilter.min).toDateString().replace(' ' , ', ') : ''"
                  v-bind="attrs"
                  v-on="on"
                  style="width:250px;"
                  clearable
                  v-on:clear="dateFilter.min=''"
                />
              </template>
              <v-date-picker v-model="dateFilter.min" width="100%"/>
            </v-menu>
            <v-spacer />
            <v-menu bottom nudge-bottom="60" max-width="250px">
              <template v-slot:activator="{on, attrs}">
                <v-text-field
                  outlined
                  label="Filter Max Date"
                  :value="dateFilter.max ? new Date(dateFilter.max).toDateString().replace(' ' , ', ') : ''"
                  v-bind="attrs"
                  v-on="on"
                  style="width:250px;"
                  clearable
                  v-on:clear="dateFilter.max=''"
                />
              </template>
              <v-date-picker v-model="dateFilter.max" width="100%"/>
            </v-menu> -->
            </div>
          </v-col>
          <v-col lg="2" class="d-flex flex-column justify-center align-end">
            <v-btn outlined color="#6200ee" class="mb-1" @click="getPrescription()">Filter</v-btn>
            <v-btn outlined color="error" class="mt-1" @click="clearFilter();getPrescription()">Clear</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="12" v-if="!!prescriptions.length">
            <v-card v-for="p,i in prescriptions" :key="i" elevation="2" class="pat-card my-4 pa-3">
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
                  <h4 class="mt-2 mb-1"><v-chip class="pa-4" color="#6200ee33" style="letter-spacing:0.09rem"><b>{{p.doctor.fullName}} ({{specMap[p.doctor.specialization]}})</b></v-chip></h4>
                  <h5 align="right"><b style="letter-spacing:0.09rem">{{new Date(p.date).toLocaleDateString()}}</b></h5>
                  <!-- <v-chip class="pa-4" color="#6200ee33" style="letter-spacing:0.09rem"><v-icon class="mr-2">event</v-icon><b>{{new Date(d.date).toLocaleDateString()}}</b></v-chip> -->
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <!-- <v-col lg="12" v-else-if="!!doctorsFiltered.length">
            <v-card v-for="p,i in doctorsFiltered[0].patients[0].prescriptions" :key="i" elevation="2" class="pat-card my-4 pa-3">
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
                  <h4 class="mt-2 mb-1"><v-chip class="pa-4" color="#6200ee33" style="letter-spacing:0.09rem"><b>{{p.doctor.fullName}} ({{specMap[p.doctor.specialization]}})</b></v-chip></h4>
                  <h5 align="right"><b style="letter-spacing:0.09rem">{{new Date(p.date).toLocaleDateString()}}</b></h5>
                </v-col>
              </v-row>
            </v-card>
          </v-col> -->
          <v-col v-else>
            No Result
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="presDialog" fullscreen>
        <v-sheet width="100%" height="100%">
          <v-toolbar style="background:linear-gradient(to bottom, #e3deec, #e0eaee)">
            <v-btn fab text small class="mr-5" @click="presDialog=false"><v-icon>clear</v-icon></v-btn>
            <v-toolbar-title style="font-family:Montserrat, sans-serif;font-weight:bold;">Prescription<v-chip class="mx-5 pa-4" color="#fff" style="letter-spacing:0.09rem"><v-icon class="mr-2">event</v-icon><b>{{new Date(activePrescription.date).toLocaleDateString()}}</b></v-chip></v-toolbar-title>
          </v-toolbar>
          <v-container>
            <v-row>
              <v-col md="8" lg="6" sm="12" offset-lg="3" offset-md="2" offset-sm="0">
                <v-tabs class="my-2" color="#6200ee" grow>
                  <v-tab>Diagnosis</v-tab>
                  <v-tab>Complain</v-tab>
                  <v-tab v-if="activePrescription.medicine.length">Medicine</v-tab>
                  <v-tab v-if="activePrescription.test.length">Test</v-tab>
                  <v-tab v-if="activePrescription.history">History</v-tab>
                  <v-tab-item class="ma-3">
                    <p class="mt">
                      <v-card-title>{{activePrescription.diagnosis.title}}</v-card-title>
                      <v-card-text>{{activePrescription.diagnosis.comment}}</v-card-text>
                    </p>
                  </v-tab-item>
                  <!-- Complain -->
                  <v-tab-item class="ma-3">
                    <!-- <v-card class="pa-3 my-5 pat-card" elevation="6"> -->
                      <p class="pa-1 my-3 mt">{{activePrescription.complain}}</p>
                    <!-- </v-card> -->
                  </v-tab-item>
                  <!-- Medicine -->
                  <v-tab-item class="ma-3" v-if="activePrescription.medicine.length">
                    <v-row>
                      <v-col>
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
                      </v-col>
                    </v-row>
                  </v-tab-item>
                  <!-- test -->
                  <v-tab-item class="ma-3" v-if="activePrescription.test.length">
                    <v-card v-for="t,i in activePrescription.test" :key="i" rounded class="pa-3 my-5 pat-card" elevation="6">
                      <v-card-title class="ct">{{t.name}}</v-card-title>
                      <v-card-subtitle class="ct mt-1">{{t.part}}</v-card-subtitle>
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
                <v-divider class="my-2" />
              </v-col>
            </v-row>
            <!-- <v-row>
              <v-col cols="4" md="8" lg="6" sm="12" offset-lg="3" offset-md="2">
                <h3 class="mt">Quotes</h3>
                <v-btn v-if="activePrescription.quotable == 0 && (activePrescription.medicine.length > 0 || activePrescription.test.length > 0)" dark color="#6200ee" class="my-5" @click="openQuotableDiaglog(activePrescription.presId)">
                  Open for Quotes <v-progress-circular v-if="quotePresId" class="mx-2" size="16" indeterminate width="2" color="#fff" />
                </v-btn>
                <v-card rounded elevation="0" style="border:1px solid #c7b7ee;" class="pa-2">
                  <h4 class="d-flex mt align-center">Open Prescription for Quotes<v-spacer /><v-switch color="#62b8ee" /></h4>
                </v-card> -->
              <!-- </v-col>
            </v-row> -->
          </v-container>
        </v-sheet>
      </v-dialog>
      <v-dialog v-model="openForQuoteDialog" width="80%" persistent>
        <v-sheet class="pa-2">
          <v-container>
            <v-row>
              <v-col>
                <h3 class="mt">Quotable Details</h3>
                <div class="d-flex">
                  <v-checkbox
                    v-model="quoteType"
                    value="e:PHARMACY"
                    label="Medicine"
                    class="mr-5"
                    color="#6200ee"
                    v-if="activePrescription.medicine.length"
                  />
                  <v-checkbox
                    v-model="quoteType"
                    value="e:LAB"
                    label="Test Lab"
                    color="#6200ee"
                    v-if="activePrescription.test.length"
                  />
                </div>
                <v-radio-group v-model="prepare" row>
                  <v-radio value="e:PICKUP" label="Pickup" color="#6200ee" />
                  <v-radio value="e:HOME" label="Home Delivery" color="#6200ee" />
                </v-radio-group>
                <div v-if="prepare == 'e:HOME'">
                  <v-textarea
                    regular outlined
                    v-model="address"
                    label="Address"
                    color="#6200ee"
                  />
                  <v-text-field
                    regular outlined
                    v-model="pincode"
                    label="Pincode"
                    color="#6200ee"
                    :rules="[(val)=>val.length > 0 && val.length <= 6]"
                  />
                </div>
                <div class="d-flex justify-end my-2">
                  <v-btn text color="error" class="mx-5" @click="clearQuotable()">cancel</v-btn>
                  <v-btn dark color="#6200ee" @click="openForQuote()">submit</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>

export default {
  data(){
    return {
      user: {},
      specMap: {
        "GMD" : "General Medicine",
        "CHS" : "Child Specialist",
        "ENT" : "ENT Specialist",
        "CAR" : "Cardiologist"
      },
      prescriptions: [],
      doctorsFiltered: [],
      doctorSpecFilter: "all",
      dateFilter: {
        max: "",
        min: "",
      },
      presDialog: false,
      activePrescription: {},
      openForQuoteDialog: false,
      prepare: "",
      address: "",
      pincode: "",
      quoteType: [],
      quotePresId: "",
      toggle: false
    }
  },
  computed: {
    menuToggle(){
      return this.toggle;
    }
  },
  async mounted(){
    this.toggle = false;
    this.user = JSON.parse(window.localStorage.user);
    this.getPrescription();
  },
  methods: {
    getPrescription(){
      const self = this;
      let baseURL = this.ORIGIN+"patient/prescriptions";
      let q = "";
      if(this.doctorSpecFilter != "all") q += "&specialization="+this.doctorSpecFilter;
      if(!!this.dateFilter.max && !!this.dateFilter.min) q += "&date_max="+new Date(this.dateFilter.max).toISOString()+"&date_min="+new Date(this.dateFilter.min).toISOString();
      let req = new this.XHR("GET", baseURL+(!!q ? "?"+q.substr(1) : ""), {
        "Authorization": window.localStorage.token
      })
      req.onresponse({
        200: (res)=>{
          console.log(res);
          if(res.prescriptions){
            self.prescriptions = res.prescriptions;
            self.activePrescription = res.prescriptions[0];
            self.doctorsFiltered = [];
          } else {
            self.prescriptions = [];
            if(res.doctors.length == 0) {
              self.doctorsFiltered = [];
              return;
            }
            res.doctors.forEach(d => {
              d.patients[0].prescriptions.forEach(p => self.prescriptions.push(p));
              // self.prescriptions.push()
            })
            // self.doctorsFiltered = res.doctors;
            // self.activePrescription = res.doctors[0].patients[0].prescriptions[0];
            self.activePrescription = self.prescriptions[0]
          }
        },
        400: (res)=>{
          console.log(res);
        },
        500: (res)=>{
          console.log(res);
        }
      })
      req.send(null, "json");
    },
    clearFilter(){
      this.doctorSpecFilter = "all";
      this.dateFilter.max = "";
      this.dateFilter.min = "";
    },
    openPrescription(i){
      this.presDialog = true;
      this.activePrescription = (this.prescriptions.length ? this.prescriptions : this.doctorsFiltered[0].patients[0].prescriptions)[i];
    },
    clearQuotable(){
      this.openForQuoteDialog = false;
      this.quoteType = [];
      this.prepare = "";
      this.pincode = "";
      this.address = "";
      this.quotePresId = "";
    },
    openQuotableDiaglog(presId){
      this.quotePresId = presId;
      this.openForQuoteDialog = true;
    },
    quotableData(){
      let data = {};
      data.presId = this.quotePresId;
      data.prepare = this.prepare;
      if(data.prepare == "e:HOME"){
        data.address = this.address;
        data.pincode = this.pincode;
      }
      if(this.quoteType.length) data.type = this.quoteType;
      return data;
    },
    openForQuote(){
      const self = this;
      let req = new this.XHR("POST", this.ORIGIN+"patient/prescription/open", {
        "Authorization": window.localStorage.token,
        "Content-type": "application/json"
      })
      req.onresponse({
        200: (res)=>{
          console.log(res);
          self.activePrescription.quotable = 1;
          this.clearQuotable()
        },
        400: (res)=>{
          console.log(res);
        },
        500: (res)=>{
          console.log(res);
        }
      });
      const data = this.quotableData();
      req.send(data, "json");
    },
    checkClickOutside(bool){
      if(bool == false) this.toggle = false;
    }
  }
}
</script>

<style>
.ct {
  font-weight:bold;
  font-family:Montserrat, sans-serif;
  font-size:18px;
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