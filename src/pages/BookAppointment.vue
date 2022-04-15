<template>
  <v-app>
    <v-main>
      <header id="HeadTop">
        <h1 class="topHeading">Patient Detail
          <h6 class="my-2" style="text-align:center;">Please fill up the form and wait in the Queue. </h6>
        </h1>
      </header>
      <v-container>
        <v-row>
          <!-- <v-col cols="12" class="d-flex flex-column justify-center">
              <h2 class="my-2" style="text-align:center;">Please fill up the form and wait in the Queue. </h2>
          </v-col> -->
          <v-col cols="12">
              <lottie-player src="https://assets8.lottiefiles.com/datafiles/7U1rGDhr3RKjEj2/data.json" background="transparent" speed="0.7" style="width: 100%;height:200px;" autoplay></lottie-player>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12" lg="4" offset-lg="4">
            <v-text-field
              regular outlined
              v-model="phone"
              class="my-2"
              label="Phone Number"
              prepend-inner-icon="phone"
              color="#6200ee"
            />
            <v-text-field
              regular outlined
              v-model="fullName"
              class="my-2"
              label="Name"
              prepend-inner-icon="badge"
              color="#6200ee"
            />
            <div class="d-flex justify-center">
              <v-btn color="#6200ee" dark @click="makeApp()">confirm</v-btn>
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
      phone: "",
      fullName: "",
      doctorId: ""
    }
  },
  async mounted(){
    this.doctorId = this.$route.query.doc;
  },
  methods: {
    makeApp(){
      const self = this;
      let req = new this.XHR("POST", this.ORIGIN+"doctor/appointments", {
        "Content-type": "application/json"
      });
      req.onresponse({
        200:(res)=>{
          console.log(res);
          window.localStorage.appointment = JSON.stringify(res);
          window.location.assign("/waiting");
        },
        400:(res)=>{
          console.log(res);
        }
      });
      req.send(this.$data, "json");
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.anmi-shadow {
box-shadow: 0 5px 10px #efefef;
border-radius: 6px;
}


</style>