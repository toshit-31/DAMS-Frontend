<template>
  <v-app>
    <v-main>
      <PharmacyNavBar :user="user" />
      <header id="HeadTop">
        <h1 class="topHeading">Pending Quotes</h1> 
      </header>
      <div class="prescription_Table">
        <table id="table">
          <thead>
            <tr class="red">
              <th>Quote ID</th>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Items</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr class="rowOdd">
              <td><p class="tableData"></p></td>
              <td><p class="tableData"></p></td>
              <td><p class="tableData"></p></td>  
              <td><p class="tableData"></p></td>
              <td><p class="tableData"></p></td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      user: {}
    }
  },
  mounted(){
    this.user = JSON.parse(window.localStorage.user);
    this.getQuoted();
  },
  methods: {
    getQuoted(){
      const self = this;
      let req = new this.XHR("GET", this.ORIGIN+"pharmacy/quote/pending", {
        "Authorization": window.localStorage.token
      });
      req.onresponse({
        200: (res)=>{
          console.log(res);
        },
        400: (res)=>{
          console.log(res)
        }
      })
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
