<template>
  <v-app>
    <v-main>
      <v-container fluid id="headtop">
        <v-row >
          <v-col cols="12" lg="6" offset-lg="3">
            <div class="ma-5 pa-5" rounded="5px" color="transparent">
              <v-row class="mt-1">
                <v-col sm="0" lg="6">
                  <lottie-player src="https://assets8.lottiefiles.com/packages/lf20_wd1udlcz.json"  background="#ffffff99"  speed="1"  style="margin: auto; width: 400px; height: 400px;" loop  autoplay></lottie-player>
                </v-col>
                <!-- <v-divider vertical /> -->
                <v-col v-if="!accountInfo" sm="12" lg="6">
                  <v-text-field
                    v-model="fullName"
                    outlined regular
                    label="Full Name"
                    prepend-inner-icon="person"
                    background-color="white"
                    color="#6200ee"
                  />
                  <v-text-field
                    v-model="email"
                    outlined regular
                    label="Email"
                    type="email"
                    prepend-inner-icon="email"
                    background-color="white"
                    color="#6200ee"
                  />
                  <v-text-field
                    v-model="phone"
                    outlined regular
                    label="Phone Number"
                    prepend-inner-icon="phone"
                    background-color="white"
                    color="#6200ee"
                  />
                  <!-- <v-text-field
                    v-model="regNo"
                    outlined regular
                    label="License/Registration Number"
                    prepend-inner-icon="fingerprint"
                    background-color="white"
                    color="#6200ee"
                  /> -->
                  <v-select
                    regular outlined
                    v-model="spec"
                    label="Specialization"
                    prepend-inner-icon="how_to_reg"
                    background-color="white"
                    color="#6200ee"
                    :items='Object.keys(specMap).map( k => {return {value: k, text: specMap[k]}})'
                    validate-on-blur
                    :rules="[(val)=>!!val]"
                  />
                  <v-file-input
                    outlined regular
                    v-model="logo"
                    id="logo_input"
                    label="Logo / Profile Image"
                    prepend-inner-icon="insert_photo"
                    :prepend-icon="false"
                    background-color="white"
                    color="#6200ee"
                  />
                  <div class="d-flex flex-row justify-center mt-3">
                    <v-btn outlined color="#6200ee" dark large @click="accountInfo = true">enter password<v-icon>arrow_forward</v-icon></v-btn>
                  </div>
                </v-col>
                <v-col v-else sm="12" lg="6" class="pt-15 mt-10">
                  <v-text-field
                    v-model="pd"
                    outlined regular
                    label="Password"
                    type="password"
                    background-color="white"
                    color="#6200ee"
                  />
                  <v-text-field
                    v-model="cnfPd"
                    outlined regular
                    label="Confirm Password"
                    type="password"
                    background-color="white"
                    color="#6200ee"
                    
                  />
                  <div class="d-flex flex-row justify-center mt-3">
                    <!-- <v-btn outlined large color="#6200ee" dark @click="accountInfo = false"><v-icon tag="span" style="margin:0" size="24">arrow_backward</v-icon>Account Info</v-btn> -->
                    <!-- <v-spacer /> -->
                    <v-btn color="#6200ee" dark large @click="register()">register</v-btn>
                  </div>
                </v-col>
              </v-row>
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
      specMap: {
        "GMD" : "General Medicine",
        "CHS" : "Child Specialist",
        "ENT" : "ENT Specialist",
        "CAR" : "Cardiologist"
      },
      fullName: "",
      phone: "",
      email: "",
      pd: "",
      cnfPd: "",
      spec: "",
      logo: "",
      regNo: "",
      accountInfo: false,
    }
  },
  watch: {
    logo: function(nv){
      console.log(nv);
    }
  },
  methods: {
    register(){
      const self = this;
      let xhr = new XMLHttpRequest();
      xhr.open("POST", self.ORIGIN+"doctor/register");
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onreadystatechange = function(){
        if(this.readyState == 4){
          if(this.status == 200){
            let resp = JSON.parse(this.response);
            window.location.assign(window.location.origin+"/login");
          } else {
            alert(JSON.parse(this.response).msg)
          }
        }
      }
      if(self.phone.length != 10) {
        alert("Invalid Phone Number")
        return;
      }
      if(self.phone.length != 10 || self.pd != self.cnfPd) {
        alert("Password and Confirm Password field do not match")
        return;
      }
      xhr.send(JSON.stringify({
        fullName: self.fullName,
        pass: self.phone,
        email: self.email,
        phone: self.phone,
        specialization: "e:"+self.spec,
        password: self.pd
      }));
    }
  }
}
</script>

<style>
#headtop{
  height: 90vh;
  width: 100vw;
  background-image: linear-gradient(0deg, #cae4ee99 0%, #e3deec99 100%);
  clip-path: ellipse(100% 55% at 48% 44%);
  text-align: center;
}
</style>
