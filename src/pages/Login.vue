<template>
  <v-app>
    <v-main>
      <v-container fluid id="headtop">
        <v-row>
          <v-col cols="12" lg="4" offset-lg="4" sm="12">
            <v-card class="ma-5 pa-5">
              <v-card-title>LOGIN</v-card-title>
              <v-divider class="mb-3" />
              <v-text-field
                v-model="id"
                outlined regular
                label="Phone"
                color="#6200ee"
                :rules="[(val)=>val.length == 10]"
              />
              <v-text-field
                v-model="pd"
                outlined regular
                label="Password"
                type="password"
                color="#6200ee"
              />
              <v-divider />
                <v-radio-group v-model="role">
                  <v-row>
                    <v-col>
                      <div class="d-flex flex-row justify-space-around">
                        <v-radio value="doctor" color="#6200ee" label="Doctor" />
                        <v-radio value="patient" color="#6200ee" label="Patient" />
                      </div>
                    </v-col>
                    <!-- <v-col>
                      <v-radio value="pharmacy" label="Pharmacy" />
                      <v-radio value="lab" label="Lab" />
                    </v-col> -->
                  </v-row>
                </v-radio-group>
              <div class="d-flex justify-center">
                <v-btn  color="#6200ee" dark large @click="login()">login</v-btn>
              </div>
            </v-card>
            <div class="d-flex justify-end mt-5 mr-5">
              <v-btn to="/register" outlined dark color="#6200ee">Create an Account</v-btn>
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
    title: 'Login'
  },
  data(){
    return{
      id: "",
      pd: "",
      role: ""
    }
  },
  methods: {
    login(){
      const self = this;
      if(this.id.length != 10){ alert("Invalid Phone Number !"); return;}
      let xhr = new XMLHttpRequest();
      xhr.open("POST", self.ORIGIN+self.role+"/login");
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onreadystatechange = function(){
        if(this.readyState == 4){
          if(this.status == 200){
            let resp = JSON.parse(this.response);
            window.localStorage.setItem("role", self.role);
            if(resp.passChangeToken) return window.open("/patient/change-password?token="+resp.passChangeToken)
            window.localStorage.setItem("token", resp.token);
            window.localStorage.setItem("user", JSON.stringify(resp.user));
            switch(self.role){
              case "doctor": window.location.assign(window.location.origin+"/doctor/appointments");break;
              case "patient": window.location.assign(window.location.origin+"/patient/");break;
            }
          } else {
            alert(JSON.parse(this.response).msg)
          }
        }
      }
      xhr.send(JSON.stringify({
        phone: self.id,
        pass: self.pd
      }));
    }
  }
}
</script>

<style>
#headtop{
  height: 70vh;
  width: 100vw;
  background-image: linear-gradient(0deg, #cae4ee 0%, #e3deec 100%);
  clip-path: ellipse(100% 55% at 48% 44%);
  text-align: center;
}
.a {
  color:#000;
  text-decoration: dotted;
  cursor:pointer;
}
</style>
