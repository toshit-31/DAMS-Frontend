<template>
  <v-app>
    <v-main>
      <DoctorNavBar :user="user" :toggle="menuToggle" v-on:tog="checkClickOutside($event)"/>
      <header id="HeadTop">
        <h3 class="topHeading">
          <NavBarToggle v-on:open="toggle = true" id="nav-btn"/>
          Appointments<br><h6><v-icon class="mr-2">today</v-icon>{{new Date().toDateString()}}</h6></h3>
        <!-- <h3>{{new Date().toDateString()}}</h3> -->
      </header>
      <v-container fluid class="mt-5">
        <v-row>
          <v-col v-for="v,i in visits" class="my-2" :key="i" lg="4" offset-lg="4" sm="12" md="6" offset-md="3">
            <v-card elevation="6" class="pat-card pa-3">
              <v-row>
                <v-col>
                  <v-card-title><span class="text-subtitle mr-5">{{v.qnumber}}</span>{{v.fullName}}</v-card-title>
                  <v-card-subtitle><h3 :class="'pl-'+(v.qnumber < 10 ? '7' : '9')">{{v.phone}}</h3></v-card-subtitle>
                </v-col>
                <v-col cols="3" class="d-flex flex-column justify-center">
                  <v-card-actions class="d-flex justify-end pa-3">
                    <v-btn color="error" class="mx-3 " fab small @click="notAttend(v.visId, i)"><v-icon>close</v-icon></v-btn>
                    <v-btn color="success" fab small @click="attend(v, i)"><v-icon>check</v-icon></v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  metaInfo(){
    return {
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1'}
      ]
    }
  },
  data(){
    return {
      toggle: false,
      user: {},
      visits: [],
      docId: ""
    }
  },
  async mounted(){
    this.toggle = false;
    this.user = JSON.parse(window.localStorage.user);
    this.getAppointments();
  },
  methods: {
    getAppointments(){
      const self = this;
      let req = new this.XHR("GET", this.ORIGIN+"doctor/appointments", {
        "Authorization": window.localStorage.token
      })
      req.onresponse({
        200: (res)=>{
          console.log(res);
          self.docId = res.docId;
          self.visits = res.appointments;
        },
        400: (res)=>{
          console.log(res);
        }
      })
      req.send(null, "json");
    },
    notAttend(visId, i){
      const self = this;
      let req = new this.XHR("PUT", this.ORIGIN+"doctor/appointment/not-attended?vis="+visId, {
        "Authorization": window.localStorage.token
      });
      req.onresponse({
        200: (res)=>{
          console.log(res);
          self.visits.splice(i, 1);
        },
        400: (res)=>{
          console.log(res)
        }
      })
      req.send(null, "json");
    },
    attend(visObj, i){
      let {visId, fullName, phone} = visObj;
      const self = this;
      let req = new this.XHR("POST", this.ORIGIN+"doctor/appointment/attended", {
        "Authorization": window.localStorage.token,
        "Content-type": "application/json"
      })
      req.onresponse({
        200: (res)=>{
          window.localStorage.prescription = JSON.stringify({patId: res.patId, presId: res.presId});
          window.localStorage.patient = JSON.stringify({fullName, phone})
          window.open("./../prescription/m/write", "_blank");
          self.visits.splice(i, 1);
        },
        400: (res)=>{
          console.log(res);
        }
      })
      req.send({visId}, "json");
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

<style scoped>
table {
text-align: center;
border-collapse: collapse; 
}
#btn{
background-color: #e3deec;
font-size: 10px;
padding: 1px 1px;
color: #082032;
font-weight: 500;
border: 0.2px solid #8a96a0;
transition: 0.1s;
width: 90px;
}
.pat-card {
/* background-color:rgba(202, 228, 238, 0.4); */
background-image:linear-gradient(180deg, rgba(202, 228, 238, 0.4) 50%, rgba(227, 222, 236, 0.4) 70%);
transition:0.2s;
}
.pat-card:hover {
background-image:none;
background:#fff;
transition:0.2s;
}
#Topbtn{
background-color: #082032;
font-size: 11px;
color: #e3deec;
font-weight: 500;
border: 0.2px solid #8a96a0;
transition: 0.3s;
margin-left: 67%;
width: 100px;
padding: 2px 2px;
font-weight: 800;
margin-top: -3%;
}

#Topbtn:hover{
background-color: #e3deec;
color: #082032;
}

#btn:hover{
background-color: #082032;
color: #fff;
}
th, td {
padding: 0.8rem;
border: 2px solid #EEEEEE;
border-left: none;
border-right: none;
/* width: 20vh; */
}
.prescription_Table{
border-bottom: 20%;
font-family:  sans-serif;
font-weight: 200;
font-size: 2rem;
}

td{
height: 6px;
}

.textBoxes{
width: 100%;
padding-top: 4%;
padding-bottom: 4%;
border: none;

}
tr.red th {
background: #ffffff;
color:#082032 ;
}

thead{
font-size: 1rem;
font-weight: 300;
height: 3px;
}

th {
background: white;
position: sticky; 
top: 0; /* Don't forget this, required for the stickiness */
box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}

#table{
margin-left: 32%;
margin-top: 1%;
margin-bottom: 20%;
width:65%;
}

.tableData{
font-size: 1rem;
font-family: 'Montserrat', sans-serif;
margin:0 !important;
font-weight:bold;
}
.rowOdd{
background-color:#e0eaee;
}
.modal {
display: none; /* Hidden by default */
position: fixed; /* Stay in place */
z-index: 1; /* Sit on top */
padding-top: 100px; /* Location of the box */
left: 0;
top: 0;
width: 100%; /* Full width */
height: 100%; /* Full height */
overflow: auto; /* Enable scroll if needed */
background-color: rgb(0,0,0); /* Fallback color */
background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
/* Modal Content */
.modal-content {
background-color: #fefefe;
margin: auto;
padding: 20px;
/* border: 1px solid #888; */
/* width: 80%; */
margin:20px auto;
vertical-align: middle;
}

/* The Close Button */
.close {
color: #aaaaaa;
float: right;
font-size: 28px;
font-weight: bold;
}

.close:hover,
.close:focus {
color: #000;
text-decoration: none;
cursor: pointer;
}

.patientNameHeading{
display: inline;
font-family: 'Montserrat', sans-serif;
font-weight: 700;
margin-left: 1%;
}
.patientName{
display: inline;
font-family: 'Montserrat', sans-serif;
margin-left: 3%;
font-weight: 400;
}

.doctorNameHeading{
display: inline;
font-family: 'Montserrat', sans-serif;
font-weight: 700;
margin-left: 1%;
}

.doctorName{
display: inline;
font-family: 'Montserrat', sans-serif;
margin-left: 3%;
font-weight: 400;
}

#doctorDetails{
margin-top: 3%;
}

#addressDetails{
margin-top: 3%; 
margin-left: 1%;
}

.patientAddressHeading{
display: inline;
font-family: 'Montserrat', sans-serif;
font-weight: 700;
}
.patientAddress{
display: inline;
font-family: 'Montserrat', sans-serif;
margin-left: 6.5%;
font-weight: 400;
margin-left: 1%;
}
.modal-content > td,th {
background-color:#e0eaee;
}
.modal-content > td,th{
padding: 10px;
}

.modal-content > table{
border-collapse: collapse;
width: 100%;
font-family: 'Montserrat', sans-serif;
margin: 3% auto;
}

.leftTableSide{
padding-right: 4%;
}
</style>
