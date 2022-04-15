// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuetify from "vuetify"
import 'vuetify/dist/vuetify.min.css'

import NavBar from "~/components/VNavBar.vue" 
import PhNavBar from "~/components/PharmacyNavBar.vue"
import DNavBar from "~/components/DoctorNavBar.vue"
import PtNavBar from "~/components/PatientNavBar.vue"
import VNavBarToggle from "~/components/VNavBarToggle.vue" 
import xhr from "../static/xhr"

export default function (Vue, { head, appOptions }) {
  
  Vue.component("NavBar", NavBar);
  Vue.component("PharmacyNavBar", PhNavBar);
  Vue.component("DoctorNavBar", DNavBar);
  Vue.component("PatientNavBar", PtNavBar);
  Vue.component("NavBarToggle", VNavBarToggle);

  head.script.push({
    src: "https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"
  })

  head.script.push({
    src: "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
  })

  head.script.push({
    src: "https://kit.fontawesome.com/01d0e49f57.js"
  })
  
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css',
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Material+Icons',
  })
  
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900',
  });
  
  // Vue.prototype.ORIGIN = "http://192.168.0.108:8000/" // 02
  // Vue.prototype.ORIGIN = "http://192.168.69.40:8000/" // Toshit
  Vue.prototype.ORIGIN = "http://127.0.0.1:8000/"  //
  
  Vue.prototype.XHR = xhr;
  let opts={};
  Vue.use(Vuetify)
  
  appOptions.vuetify = new Vuetify(opts);
}
