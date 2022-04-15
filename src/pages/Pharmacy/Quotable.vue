<template>
  <v-app>
    <v-main>
      <header id="HeadTop">
        <h1 class="topHeading">Quotables</h1>
      </header>
      <div class="prescription_Table">
      <table id="table">
        <thead>
          <tr class="red">
            <th>Quotable Id</th>
            <th>Date</th>
            <th>Prepare</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="qe,i of q" :key="i" :class="i%2 == 0 ? 'rowOdd' : ''">
            <td><p class="tableData">{{qe.quotableId}}</p></td>
            <td><p class="tableData">{{new Date(qe.date).toDateString()}}</p></td>
            <td><p class="tableData"><v-chip :color="i%2 == 0 ? 'white' : ''">{{qe.prepare}}</v-chip></p></td>
            <td>
              <button class="mdc-button btn mdc-button--raised" @click="openQuotable(qe.quotableId)">
                <span class="mdc-button__label">View Details</span>
              </button>
            </td>
          </tr>
          <!-- <tr class="rowOdd">
            <td><p class="tableData">C38CE</p></td>
            <td><p class="tableData">23-10-2021</p></td>
            <td><p class="tableData">HOME</p></td>
            <td>
              <button class="mdc-button btn mdc-button--raised " id="myBtn">
                <span class="mdc-button__label">View Details</span>
              </button>
            </td>
          </tr>
          <tr>
            <td><p class="tableData">C38CE</p></td>
            <td><p class="tableData">23-10-2021</p></td>
            <td><p class="tableData">HOME</p></td>
            <td>
              <button class="mdc-button btn mdc-button--raised " id="myBtn">
                <span class="mdc-button__label">View Details</span>
              </button>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
    <v-dialog v-model="dialog" id="myModal" class="modal" fullscreen>
    <!-- Modal content -->
      <v-sheet width="100%" height="100%">
        <v-toolbar style="background:linear-gradient(to bottom, #e3deec, #e0eaee)">
          <v-btn fab text small class="mr-5" @click="dialog=false"><v-icon>clear</v-icon></v-btn>
          <v-toolbar-title style="font-family:Montserrat, sans-serif;font-weight:bold;">Quote Details : <span style="letter-spacing:0.09rem">{{qid}}</span></v-toolbar-title>
        </v-toolbar>
        <div class="d-flex flex-column justify-center align-center" v-if="spinner">
          <v-progress-circular class="ma-10" color="primary" size="84" width="8" indeterminate/>
          <span class="text-button">Loading Data ...</span>
        </div>
        <div class="modal-content" v-else>
          <!-- <div>
            <p class="patientName">Patient Name</p>
            <p class="patientHeadingName">{{qdata.patient.fullName}}</p>
          </div> -->
          <div> 
            <p class="patientNameHeading">Patient name: </p>
            <p class="patientName">{{qdata.patient.fullName}}</p>
          </div>
          <div id="doctorDetails">
            <p class="doctorNameHeading">Prepare :</p>
          <p class="doctorName"><v-chip>{{qdata.prepare}}</v-chip></p>
          </div>
          <div id="addressDetails" v-if="qdata.prepare == 'HOME'">
            <p class="patientAddressHeading">Address: </p>
            <p class="patientAddress">{{qdata.address}}</p>
          </div>
          <table>
            <tr>
              <th class="leftTableSide">Medical Name</th>
              <th>Morning Dose </th>
              <th>Afternoon Dose</th>
              <th>Night Dose</th>
              <th>Days</th>
              <th>Total Dose</th>
            </tr>
            <tr v-for="m in qdata.prescription.medicine" :key="m.name">
              <!-- <td><v-icon v-for="i in (m.mor || 0)" :key="i" color="green">circle</v-icon></td>
              <td><v-icon v-for="i in (m.aft || 0)" :key="i" color="green">circle</v-icon></td>
              <td><v-icon v-for="i in (m.evn || 0)" :key="i" color="green">circle</v-icon></td> -->
              <td>{{m.name}}</td>
              <td>{{m.mor || 0}}</td>
              <td>{{m.aft || 0}}</td>
              <td>{{m.evn || 0}}</td>
              <td>{{m.days}}</td>
              <td>{{(m.mor+m.evn+m.aft)*m.days}}</td>
            </tr>
          </table>
          <div class="d-flex flex-row justify-end">
            <v-btn color="#6200ee" dark large @click="sendQuoteDialog = true">send quote</v-btn>
          </div>
        </div>
      </v-sheet>
    </v-dialog>
    <v-dialog v-model="sendQuoteDialog" id="sqd" class="modal" fullscreen>
    <!-- Modal content -->
      <v-sheet width="100%" height="100%" v-if="!!qid">
        <v-toolbar style="background:linear-gradient(to bottom, #e3deec, #e0eaee)">
          <v-btn fab text small class="mr-5" @click="sendQuoteDialog=false"><v-icon>clear</v-icon></v-btn>
          <v-toolbar-title style="font-family:Montserrat, sans-serif;font-weight:bold;">Send Quote : <span style="letter-spacing:0.09rem">{{qid}}</span></v-toolbar-title>
        </v-toolbar>
        <h3 style="font-family: Montserrat;background:#e0eaee" class="pa-3 mt-6 mx-5">Patient Detail </h3>
        <div class="modal-content">
          <div> 
            <p class="patientNameHeading">Patient name: </p>
            <p class="patientName">{{qdata.patient.fullName}}</p>
          </div>
          <div id="doctorDetails">
            <p class="doctorNameHeading">Prepare :</p>
          <p class="doctorName"><v-chip>{{qdata.prepare}}</v-chip></p>
          </div>
          <div id="addressDetails" v-if="qdata.prepare == 'HOME'">
            <p class="patientAddressHeading">Address: </p>
            <p class="patientAddress">{{qdata.address}}</p>
          </div>
        </div>
        <div class="mx-5">
          <table class="my-2" width="100%">
          <thead>
            <tr>
              <th colspan="5"><h3 class="mt">Quote Detail</h3></th>
            </tr>
            <tr>
              <th width="40%">Medicine</th>
              <th width="10%">Total Doses</th>
              <th width="20%">Rate</th>
              <th width="20%">Units</th>
              <th width="10%">Amount</th>
            </tr>
          </thead>
          <tr v-for="m,i in qdata.prescription.medicine" :key="m.name">
            <td class="pa-3">
              <v-checkbox color="#6200ee" style="margin:0" hide-details><template v-slot:label><span class="mt">{{m.name}}</span></template></v-checkbox>
              </td>
            <td class="pa-3"><span class="mt">{{(parseInt(m.mor || 0)+parseInt(m.aft || 0)+parseInt(m.evn || 0))*m.days}}</span></td>
            <td class="pa-3">
              <v-text-field
                regular outlined
                dense hide-details
                color="#6200ee"
                :error="false"
                type="number"
                :id="'mr-'+i"
                :rules="[(val)=> {return (/^[0-9]*(\.[0-9]{0,2})?$/).test(val) && val > 0}]"
                validate-on-blur
              />
            </td>
            <td class="pa-3">
              <v-text-field
                regular outlined
                color="#6200ee"
                dense hide-details
                type="number"
                :id="'mu-'+i"
                :rules="[(val)=> {return (/^[0-9]{1,}$/).test(val) && val > 0}]"
                validate-on-blur
              />
            </td>
            <td class="pa-3">
            </td>
          </tr>
        </table>
        </div>
      </v-sheet>
    </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
export default {
  metaInfo: {
    title: 'Dashboard'
  },
  data(){
    return {
      user: {},
      dialog: false,
      sendQuoteDialog: false,
      spinner: true,
      qCount: 0,
      qLimit: 0,
      qOffset: 0,
      q: [],
      qid: "",
      qdata: {},
      quotePrepare: {

      }
    }
  },
  mounted(){
    this.user = JSON.parse(window.localStorage.user);
    this.getQuotables();
  },
  methods: {
    getQuotables(){
      const self = this;
      let req = new this.XHR("GET", this.ORIGIN+"pharmacy/quotables", {
        "Authorization": window.localStorage.token
      });
      req.onresponse({
        200: (res)=>{
          console.log(res);
          self.qCount = res.count;
          self.qLimit = res.limit;
          self.qOffset = res.offset;
          self.q = res.quotables;
        },
        401: function(res){
          console.log(res);
        }
      })
      req.send(null, "json");
    },
    openQuotable(quotableId){
      const self = this;
      this.qid = quotableId;
      let req = new this.XHR("GET", this.ORIGIN+"pharmacy/quotable/"+quotableId, {
        "Authorization": window.localStorage.token
      });
      self.dialog = true;
      self.spinner = true;
      req.onresponse({
        0: (res)=>{
          self.spinner = false;
        },
        200: (res)=>{
          console.log(res);
          self.qdata = res;
        },
        400: (res)=>{
          console.log(res);
          self.qid = "",
          self.dialog = false;
          alert(res.err.msg);
        }
      });
      req.send(null, "json")
    }
  }
}
</script>

<style>
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

.mt {
  font-family:Montserrat, sans-serif;
  font-weight:700;
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
    margin:15px auto;
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
