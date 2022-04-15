<template>
  <v-app>
    <v-main>
      <header id="HeadTop" style="height:60% !important;min-height:500px;">
        <h1 class="topHeading">Update Password
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
          <v-container>
            <v-row>
              <v-col lg="4" offset-lg="4" md="12" cols="12">
                <v-card elevation="6" class="pa-4 mx-2 mt-5">
                  <v-text-field
                    regular outlined
                    color="#6200ee"
                    label="New Password"
                    type="password"
                    v-model="password"
                  />
                  <v-text-field
                    regular outlined
                    color="#6200ee"
                    label="Confirm Password"
                    type="password"
                    v-model="confPass"
                  />
                </v-card>
                <div class="d-flex justify-center">
                  <v-btn large dark color="#6200ee" class="mt-5" elevation="6" @click="changePassword()"><b>update</b></v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </h1>
      </header>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      token: "",
      password: "",
      confPass: ""
    }
  },
  async mounted(){
    this.token = this.$route.query.token;
  },
  methods: {
    changePassword(){
      if(this.password.length < 8){
        alert("Password should be minimum 8 characters long")
        return;
      }
      if(this.password != this.confPass) return;
      let req = new this.XHR("POST", this.ORIGIN+"patient/password", {
        "Content-type": "application/json"
      })
      req.onresponse({
        200: (res)=>{
          alert("Password changed");
          window.localStorage.token = res.token;
          window.localStorage.user = JSON.stringify(res.user);
          window.location.assign("/patient")
        }
      })
      req.send({
        token: this.token,
        pass: this.password
      }, "json")
    }
  }
}
</script>