<template>
  <v-app>
    <v-main>
      <v-toolbar style="background:linear-gradient(0deg, #cae4ee 0%, #e3deec 100%);">
        <v-toolbar-title><v-btn fab text small to="/doctor/appointments"><v-icon>arrow_back</v-icon></v-btn><span class="pt mx-5">Write Prescription</span></v-toolbar-title>
      </v-toolbar>
      <v-container class="mt-3">
        <v-row>
          <v-col md="4" offset="3" lg="2" class="d-flex flex-column justify-center align-center">
            <img src="/user-icon.png" class="pat-icon" />
          </v-col>
          <v-col md="6" lg="4">
            <!-- :readonly="!newPat" -->
            <v-text-field
              regular outlined
              label="Patient's Name"
              color="#6200ee"
              v-model="patient.fullName"
            />
            <v-text-field
              regular outlined
              label="Patient's Phone"
              color="#6200ee"
              type="tel"
              v-model="patient.phone"
            />
          </v-col>
        </v-row>
        <v-divider color="#aaa" class="my-2" />
        <v-row class="mt-5">
          <v-col lg="8" offset="2">
            <v-tabs color="#6200ee" grow>
              <!-- tabs -->
                <v-tab>Complain/Purpose</v-tab>
                <v-tab>History</v-tab>
                <v-tab>Medicine</v-tab>
                <v-tab>Test</v-tab>
                <v-tab>Diagnosis</v-tab>

              <!-- Complain tab -->
              <v-tab-item class="my-5 pa-5">
                <v-textarea
                  regular outlined
                  color="#6200ee"
                  placeholder="Write the purpose of visit here"
                  v-model="prescription.complain"
                />
              </v-tab-item>
              
              <!-- History tab -->
              <v-tab-item class="my-5 pa-5">
                <v-textarea
                  regular outlined
                  color="#6200ee"
                  placeholder="History of patient if any"
                  v-model="prescription.history"
                />
              </v-tab-item>
              
              <!-- Medicine tab -->
              <v-tab-item class="my-5 pa-5">
                <v-card v-for="m,i in prescription.medicine" :key="i" class="my-5" elevation="5" style="background-image:linear-gradient(180deg, rgba(202, 228, 238, 0.4) 50%, rgba(227, 222, 236, 0.4) 70%);">
                  <v-card-title class="d-flex justify-space-between">
                    <span class="ct">Medicine</span>
                    <v-spacer />
                    <v-btn small text fab color="error" @click="deleteMedRow(i)"><v-icon>clear</v-icon></v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-combobox
                      regular outlined dense hide-details
                      :items="meds"
                      label="Medicine Name"
                      v-model="m.name"
                      color="#6200ee"
                      class="my-7"
                    />
                    <v-select
                      regular outlined dense hide-details
                      label="Morning Dose"
                      v-model="m.mor"
                      :items="[0, 1, 2]"
                      validate-on-blur
                      color="#6200ee"
                      class="my-7"
                    />
                    <v-select
                      regular outlined dense hide-details
                      label="Afternoon Dose"
                      v-model="m.aft"
                      :items="[0, 1, 2]"
                      validate-on-blur
                      color="#6200ee"
                      class="my-7"
                    />
                    <v-select
                      regular outlined dense hide-details
                      label="Night Dose"
                      v-model="m.evn"
                      :items="[0, 1, 2]"
                      validate-on-blur
                      color="#6200ee"
                      class="my-7"
                    />
                    <v-text-field
                      regular outlined dense hide-details
                      type="number"
                      v-model="m.days"
                      color="#6200ee"
                      label="Number of Days"
                      class="my-7"
                    />
                    <v-text-field
                      regular outlined dense hide-details
                      type="number"
                      :value="m.days*(parseInt(m.mor)+parseInt(m.aft)+parseInt(m.evn))"
                      color="#6200ee"
                      label="Total Dose"
                      class="my-7"
                      read-only
                    />
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-end">
                  <v-btn color="#6200ee" fab class="my-5" dark @click="addMedRow()"><v-icon>add</v-icon></v-btn>
                </div>
              </v-tab-item>
              
              <!-- Test tab -->
              <v-tab-item class="my-5 pa-5">
                <v-card v-for="t,i in prescription.test" :key="i" elevation="5" class="my-5" style="background-image:linear-gradient(180deg, rgba(202, 228, 238, 0.4) 50%, rgba(227, 222, 236, 0.4) 70%);">
                  <v-card-title class="d-flex justify-space-between">
                    <span class="ct">Test</span>
                    <v-spacer />
                    <v-btn small text fab color="error" @click="deleteTestRow(i)"><v-icon>clear</v-icon></v-btn>
                  </v-card-title>
                  <v-card-text>
                    <v-text-field
                      regular outlined dense hide-details
                      label="Test"
                      v-model="t.name"
                      color="#6200ee"
                      class="my-7"
                    />
                    <v-text-field
                      regular outlined dense hide-details
                      label="Body Part"
                      v-model="t.part"
                      color="#6200ee"
                      class="my-7"
                    />
                    <v-textarea
                      regular outlined dense hide-details
                      label="Comments"
                      v-model="t.comment"
                      color="#6200ee"
                      class="my-7"
                    />
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-end">
                  <v-btn color="#6200ee" fab class="my-5" dark @click="addTestRow()"><v-icon>add</v-icon></v-btn>
                </div>
              </v-tab-item>

              <!-- Diagnosis tab -->
              <v-tab-item class="my-5 pa-5">
                <v-text-field
                  regular outlined
                  label="Title"
                  color="#6200ee"
                  v-model="prescription.diagnosis.title"
                />
                <v-textarea
                  regular outlined
                  label="Summary"
                  color="#6200ee"
                  v-model="prescription.diagnosis.comment"
                />
              </v-tab-item>
            </v-tabs>
            <div class="d-flex flex-row justify-center">
              <v-btn large dark color="#6200ee" @click="submitAlert()">
              <v-icon>check</v-icon>Submit</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  metaInfo: {
    title: "Write Prescription"
  },
  data(){
    return {
      newPat: false,
      patient: {},
      prescription: {
        presId: "",
        medicine: [],
        test: [],
        complain: "",
        history: "",
        diagnosis: {
          title: "",
          comment: ""
        }
      },
      meds: [],
      tabs: 0,
      btnLoading: false
    }
  },
  async mounted(){
    const self = this;
    if(window.localStorage.prescription){
      let presDetail = JSON.parse(window.localStorage.prescription);
      this.prescription.presId = presDetail.presId;
      this.getPatientInfo({
        param: "patid",
        value: presDetail.patId
      })
    }
    this.getMeds();
  },
  methods: {
    getMeds(){
      const self = this;
      let req = new this.XHR("GET", this.ORIGIN+"doctor/medicine", {
        "Authorization": window.localStorage.token
      })
      req.onresponse({
        200: (res)=>{
          self.meds = res.medList;
        },
        400: (res)=>{
          alert("Medicine not retrieved !");
          console.log(res);
        }
      })
      req.send(null, "json");
    },
    getPatientInfo(data){
      const self = this;
      let req = new this.XHR("POST", this.ORIGIN+"doctor/patient/info", {
        "Authorization": window.localStorage.token,
        "Content-type": "application/json"
      });
      req.onresponse({
        200: (res)=>{
          console.log(res)
          if(res.patientInfo != null){
            self.patient = res.patientInfo;
          } else self.newPat = true
        }
      })
      req.send(data, "json");
    },
    submitAlert(){
      if(window.confirm("Submit the Prescription ?")){
        this.submitPrescription()
      }
    },
    validateData(data){
      // if(data.complain.length < 20) {
      //   alert("'Complain/Purpose' must have minimum 20 characters")
      //   throw new Error("Insuf : complain");
      // }
      for(let i = 0; i < data.medicine.length; i++) {
        if(data.medicine[i].name.length == 0){
          alert("'Medicine Name' field is empty");
          throw new Error("Insuf : med_name");
        }
        if((data.medicine[i].mor == 0 && data.medicine[i].aft == 0 && data.medicine[i].evn == 0) || data.medicine[i].days == 0){
          alert("Invalid dose data");
          throw new Error("Inval : dose_data");
        }
        data.medicine[i].days = parseInt(data.medicine[i].days);
      }
      // if(data.diagnosis.title.length < 5 || data.diagnosis.comment.length < 20){
      //   alert("'Diagnosis' section cannot be less than 20 characters");
      //   throw new Error("Inval : diag_data")
      // }
      return data;
    },
    submitPrescription(){
      const self = this;
      let req = new this.XHR("POST", this.ORIGIN+"doctor/prescription/write", {
        "Authorization": window.localStorage.token,
        "Content-type": "application/json"
      });
      req.onresponse({
        200: (res)=>{
          window.localStorage.removeItem("prescription");
          alert("Prescription submitted");
          window.close();
        },
        400: (res)=>{
          console.log(res);
        },
        500: (res)=>{
          console.log(res)
        }
      })
      this.btnLoading = true;
      try{
        let data = this.validateData(JSON.parse(JSON.stringify(this.prescription)));
        req.send(data, "json");
      } catch(e){
        this.btnLoading = false;
      }
      
    },
    addMedRow(){
      this.prescription.medicine.push({
        name: "",
        mor: 0,
        aft: 0,
        evn: 0,
        days:0
      })
    },
    deleteMedRow(i){
      this.prescription.medicine.splice(i, 1);
      // if(this.prescription.medicine.length == 0) this.addMedRow();
    },
    addTestRow(){
      this.prescription.test.push({
        name: "",
        part: "",
        comment: ""
      })
    },
    deleteTestRow(i){
      this.prescription.test.splice(i, 1);
      // if(this.prescription.test.length == 0) this.addTestRow();
    }
  }
}
</script>

<style>
.ct {
  font-weight: 800;
  font-family: 'Montserrat', 'sans-serif';
}
.pt {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700;
  letter-spacing:0.09rem;
}
.pat-icon {
  /* height:200px; */
  width:100%;
  background-color:#fff;
  border-radius:50%;
}

@media screen and (max-width: 750px) {
  .pat-icon {
    height:100px;
    width:100px;
  }
}
</style>