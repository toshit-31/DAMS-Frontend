<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" class="d-flex flex-column align-center">
            <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_1tc23tia/1.json" background="transparent" speed="1" style="width: 100%; height: 300px;" loop autoplay></lottie-player>
            <p class="title"><b>{{qdata.fullName}}</b>, your number in the queue is</p>
            <span class="dot text-button"><p id="your-no"><b>{{qdata.qnumber}}</b></p></span>
            <v-btn type="button" large dark color="#6200ee" class="my-5" @click="notAttend()">Leave Queue</v-btn>
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
      qdata: {}
    }
  },
  mounted(){
    this.qdata = JSON.parse(window.localStorage.appointment)
  },
  methods: {
    notAttend(){
      const self = this;
      let req = new this.XHR("PUT", this.ORIGIN+"doctor/appointment/not-attended?vis="+this.qdata.visId);
      req.onresponse({
        200: (res)=>{
          console.log(res);
          window.close();
        },
        400: (res)=>{
          alert(res.msg)
          console.log(res)
        }
      })
      req.send(null, "json");
    }
  }
}
</script>

<style>
.title {
  font-family: Montserrat, sans-serif;
  margin:8px;
  text-align:center;
}
#current-no {
  margin-top: 50px;
  font-size: 30px;
}

#current-txt {
  font-size: 20px;
}
.dot {
  height: 100px;
  width: 100px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-top: 20px;
}

#your-no {
  margin-top: calc(25% + 5px);
  font-size: 3rem;
  text-align:center;
  font-family: Poppins;
}

.box {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>