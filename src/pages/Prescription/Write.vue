<template>
  <v-app>
    <v-main>
      <v-toolbar style="background:linear-gradient(0deg, #cae4ee 0%, #e3deec 100%);">
        <v-toolbar-title><span class="pt mx-5">Write Prescription</span></v-toolbar-title>
      </v-toolbar>
      <v-container class="mt-3">
        <v-row>
          <v-col md="4" lg="2" cols="4" class="d-flex flex-column justify-center align-center">
            <img src="/user-icon.png" class="pat-icon" />
          </v-col>
          <v-col md="6" lg="4">
            <v-text-field
              regular outlined
              label="Patient's Phone"
              color="#6200ee"
              type="tel"
            />
            <v-text-field
              regular outlined
              label="Patient's Name"
              color="#6200ee"
            />
          </v-col>
        </v-row>
        <v-divider color="#aaa" class="my-2" />
        <v-row class="mt-5">
          <v-col lg="4" offset="4">
            <v-tabs color="#000">
              <!-- tabs -->
                <v-tab>Complain/Purpose</v-tab>
                <v-tab>History</v-tab>
                <v-tab>Medicine</v-tab>
                <v-tab>Test</v-tab>
                <v-tab>Diagnosis</v-tab>
              <v-divider color="#6200ee" class="my-2" />
              <!-- Complain tab -->
              <v-tab-item class="my-5 pa-5">
                <v-textarea
                  regular outlined
                  color="#6200ee"
                  placeholder="Write the purpose of visit here"
                />
              </v-tab-item>
              
              <!-- History tab -->
              <v-tab-item class="my-5 pa-5">
                <v-textarea
                  regular outlined
                  color="#6200ee"
                  placeholder="History of patient if any"
                />
              </v-tab-item>
              
              <!-- Medicine tab -->
              <v-tab-item class="my-5 pa-5">
                <table>
                    <thead>
                      <td width="30px"></td>
                      <td>Medicine</td>
                      <td width="150px">Morning Dose</td>
                      <td width="150px">Afternoon Dose</td>
                      <td width="150px">Night Dose</td>
                      <td width="150px">Days</td>
                      <td>Total Doses</td>
                    </thead>
                    <tbody>
                      <tr v-for="m,i in prescription.medicines" :key="i">
                        <td>
                          <v-btn fab small text color="error" @click="deleteMedRow(i)"><v-icon>delete</v-icon></v-btn>
                        </td>
                        <td>
                          <v-combobox
                            regular dense hide-details
                            :items="meds"
                            v-model="m.name"
                            color="#6200ee"
                          />
                        </td>
                        <td>
                          <v-text-field
                            regular dense hide-details
                            width="50px"
                            type="number"
                            v-model="m.mor"
                            min="0" max="2"
                            :rules="[(val)=> val>-1 && val < 3]"
                            validate-on-blur
                            color="#6200ee"
                          />
                        </td>
                        <td>
                          <v-text-field
                            regular dense hide-details
                            width="50px"
                            type="number"
                            v-model="m.aft"
                            min="0" max="2"
                            :rules="[(val)=> val>-1 && val < 3]"
                            validate-on-blur
                            color="#6200ee"
                          />
                        </td>
                        <td>
                          <v-text-field
                            regular dense hide-details
                            width="50px"
                            type="number"
                            v-model="m.evn"
                            min="0" max="2"
                            :rules="[(val)=> val>-1 && val < 3]"
                            validate-on-blur
                          />
                        </td>
                        <td>
                          <v-text-field
                            regular dense hide-details
                            width="50px"
                            type="number"
                            v-model="m.days"
                            color="#6200ee"
                          />
                        </td>
                        <td>
                          {{m.days*(parseInt(m.mor)+parseInt(m.aft)+parseInt(m.evn))}}
                        </td>
                      </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-end">
                  <v-btn color="#6200ee" fab class="my-5" dark @click="addMedRow()"><v-icon>add</v-icon></v-btn>
                </div>
              </v-tab-item>
              
              <!-- Test tab -->
              <v-tab-item class="my-5 pa-5">
                <table>
                  <thead>
                    <td width="30px"></td>
                    <td>Test</td>
                    <td>Part</td>
                    <td>Comment</td>
                  </thead>
                  <tbody>
                    <tr v-for="t,i in prescription.test" :key="i">
                      <td>
                        <v-btn fab small text color="error" @click="deleteTestRow(i)"><v-icon>delete</v-icon></v-btn>
                      </td>
                      <td>
                        <v-text-field
                          regular dense hide-details
                          :items="meds"
                          v-model="t.name"
                          color="#6200ee"
                        />
                      </td>
                      <td>
                        <v-text-field
                          regular dense hide-details
                          v-model="t.part"
                          color="#6200ee"
                        />
                      </td>
                      <td>
                        <v-text-field
                          regular dense hide-details
                          v-model="t.comment"
                          color="#6200ee"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                />
                <v-textarea
                  regular outlined
                  label="Summary"
                  color="#6200ee"
                />
              </v-tab-item>
            </v-tabs>
            <div class="d-flex flex-row justify-center">
              <v-btn large dark color="#6200ee">
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
      patient: {
        phone: "",
        fullName: ""
      },
      doctor: {},
      prescription: {
        medicines: [{
          name: "",
          mor: 0,
          aft: 0,
          evn: 0,
          days:0
        }],
        test: [{
          name: "",
          part: "",
          comment: ""
        }]
      },
      inputs: {
        
      },
      tabs: 0,
      meds: ["Para", "Cetri", "Oflo", "Ibu"]
    }
  },
  methods: {
    addMedRow(){
      this.prescription.medicines.push({
        name: "",
        mor: 0,
        aft: 0,
        evn: 0,
        days:0
      })
    },
    deleteMedRow(i){
      this.prescription.medicines.splice(i, 1);
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
      if(this.prescription.test.length == 0) this.addTestRow();
    }
  }
}
</script>

<style>
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
table {
  border-collapse: collapse;
  border:1px solid grey;
  width:100%;
  overflow:scroll;
}
thead td {
  background-color:#000;
  padding:10px 25px;
  color:white;
  font-weight: bold;
  font-family: Montserrat, sans-serif;
  border:1px solid white;
}
thead td:first-child {
  border-right:0;
}
thead td:nth-child(2) {
  border-left:0;
}
tbody td {
  padding:10px;
  margin:5px 0;
  border:1px solid #ccc;
}
tbody td:first-child {
  border-right:0;
}
tbody td:nth-child(2) {
  border-left:0;
}
td:last-child {
  text-align: center;
}
@media screen and (max-width: 750px) {
  .pat-icon {
    height:100px;
    width:100px;
  }
}
</style>